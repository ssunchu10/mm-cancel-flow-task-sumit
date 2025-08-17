import { NextResponse } from "next/server";
import { getUserById } from "@/server-service/users";
import { getSubscriptionByUserId } from "@/server-service/subscription";

export async function GET(req: Request) {
  const mockUserId = "550e8400-e29b-41d4-a716-446655440002";
  const cookieHeader = req.headers.get("cookie") || "";
  let userId =  mockUserId;

  try {
    const user = await getUserById(userId);
    if (!user) {
      console.error("User not found for ID:", userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const subscription = await getSubscriptionByUserId(userId);
    if (!subscription) {
      console.error("Subscription not found for user ID:", userId);
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    if (!cookieHeader.match(/user_id=([^;]+)/)) {
      const jsonResponse = NextResponse.json({ user, subscription });
      jsonResponse.cookies.set("user_id", userId, {
        path: "/",
        httpOnly: false,
      });
      return jsonResponse;
    }

    console.log(user, subscription);
    return NextResponse.json({ user, subscription });
  } catch (error) {
    console.error("General API error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
