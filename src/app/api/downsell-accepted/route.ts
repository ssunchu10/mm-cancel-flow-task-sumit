import { NextResponse } from "next/server";
import { acceptDownsell } from "@/server-service/cancellation";
import { decrementSubscriptionPrice } from "@/server-service/subscription";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const csrfToken = req.headers.get("x-csrf-token");
    if (!csrfToken) {
      return NextResponse.json(
        { error: "CSRF token missing" },
        { status: 401 }
      );
    }

    const { userId, subscriptionId } = await req.json();

    const { data: subscription, error: subscriptionError } = await supabaseAdmin
      .from("subscriptions")
      .select("monthly_price")
      .eq("id", subscriptionId)
      .single();

    if (subscriptionError || !subscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    await acceptDownsell(userId, subscriptionId);
    const updatedSubscription = await decrementSubscriptionPrice(
      subscriptionId,
      subscription.monthly_price,
      1000
    );

    return NextResponse.json({ updatedSubscription });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
