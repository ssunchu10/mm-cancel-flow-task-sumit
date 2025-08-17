import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyCsrf } from "@/utils/server/csrf";
import { cancellationInputSchema } from "@/utils/validation";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const csrfCookie = cookieStore.get("csrf")?.value;
  const csrfHeader = req.headers.get("x-csrf-token") ?? undefined;
  try {
    verifyCsrf(csrfCookie, csrfHeader);
  } catch {
    return NextResponse.json(
      { error: "CSRF validation failed" },
      { status: 401 }
    );
  }
  
  const userId = body?.user_id;

  const subscriptionId = String(body?.subscriptionId ?? "").trim();
  if (!subscriptionId) {
    return NextResponse.json(
      { error: "subscriptionId is required" },
      { status: 400 }
    );
  }

  const r = body?.response ?? {};

  const randomArray = new Uint8Array(1);
  crypto.getRandomValues(randomArray);
  const variant = randomArray[0] < 128 ? 'A' : 'B';

  const cancellationInput = {
    user_id: userId,
    subscription_id: subscriptionId,
    employment_status: r.employment_status,
    found_via_mm: r.foundViaMM,
    applied_count: r.appliedCount,
    emailed_count: r.emailedCount,
    interviewed_count: r.interviewedCount,
    has_lawyer: r.hasLawyer,
    visa_type: r.visa,
    feedback: r.feedback,
    cancel_reason: r.cancelReason ?? body.reason,
    details: r.details,
    downsell_variant: variant,
    accepted_downsell: r.offerAccepted,
    created_at: new Date().toISOString(),
  };

  const parsed = cancellationInputSchema.safeParse(cancellationInput);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid cancellation input", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  try {
    const { requestCancellation } = await import(
      "@/server-service/cancellation"
    );
    const cancellationPayload = {
      ...parsed.data,
      updated_at: new Date().toISOString(),
    };
    try {
      await requestCancellation(cancellationPayload);
    } catch (cancelErr: any) {
      console.error("Cancellation service error:", cancelErr);
      return NextResponse.json(
        {
          error: "Failed to save cancellation entry",
          details: cancelErr?.message ?? String(cancelErr),
        },
        { status: 500 }
      );
    }

    const { updateSubscriptionStatus } = await import(
      "@/server-service/subscription"
    );
    try {
      await updateSubscriptionStatus(subscriptionId, "cancelled");
    } catch (subErr: any) {
      console.error("Subscription service error:", subErr);
      return NextResponse.json(
        {
          error: "Failed to update subscription status",
          details: subErr?.message ?? String(subErr),
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("Unexpected server error:", e);
    return NextResponse.json(
      {
        error: "Unexpected server error",
        details: e?.message ?? String(e),
        stack: e?.stack ?? null,
      },
      { status: 500 }
    );
  }
}
