import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyCsrf } from "@/utils/server/csrf";
import { acceptDownsell } from "@/server-service/cancellation";
import { decrementSubscriptionPrice } from "@/server-service/subscription";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const csrfCookie = cookieStore.get("csrf")?.value;
    const csrfHeader = req.headers.get("x-csrf-token") ?? undefined;
    verifyCsrf(csrfCookie, csrfHeader);
  } catch {
    return NextResponse.json(
      { success: false, error: "CSRF validation failed" },
      { status: 401 }
    );
  }

  try {
    const { user_id, subscriptionId, monthly_price } = await req.json();

    if (!user_id ) {
      return NextResponse.json(
        { success: false, error: "Valid user_id is required" },
        { status: 400 }
      );
    }

    if (!subscriptionId) {
      return NextResponse.json(
        { success: false, error: "Valid subscriptionId is required" },
        { status: 400 }
      );
    }

    if (!monthly_price) {
      return NextResponse.json(
        { success: false, error: "Valid monthly_price is required" },
        { status: 400 }
      );
    }

    const [cancellation, updatedSub] = await Promise.all([
      acceptDownsell(user_id, subscriptionId),
      decrementSubscriptionPrice(subscriptionId, monthly_price, 1000),
    ]);

    return NextResponse.json({
      success: true,
      cancellation,
      subscription: updatedSub,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
