import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyCsrf } from "@/utils/server/csrf";
import { getOrCreateCancellation } from "@/utils/server/cancel";
import { updateSubscriptionStatus } from "@/server-service/subscription";

interface BodyType {
  user_id: string;
  subscription_id: string;
  employment_status: string;
}

export async function POST(req: NextRequest) {
  let body: BodyType;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const cookieStore = await cookies();
    const csrfCookie = cookieStore.get("csrf")?.value;
    const csrfHeader = req.headers.get("x-csrf-token") ?? undefined;
    verifyCsrf(csrfCookie, csrfHeader);
  } catch {
    return NextResponse.json(
      { error: "CSRF validation failed" },
      { status: 401 }
    );
  }

  const { user_id, subscription_id, employment_status } = body || {};
  if (!user_id || !subscription_id || !employment_status) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await updateSubscriptionStatus(subscription_id, "pending_cancellation");
    const cancellation = await getOrCreateCancellation(
      user_id,
      subscription_id,
      employment_status
    );
    return NextResponse.json({ cancellation }, { status: 200 });
  } catch (error) {
    console.error("Error initializing cancellation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
