import { useCancelFlowStore } from "@/store/cancelFlowStore";

export async function callDownsellAcceptedApi() {
  const { state, setState } = useCancelFlowStore.getState();

  const csrfToken = state.csrfToken || "";
  const subscriptionID = state.subscription?.id;
  const userID = state.user?.id;
  const monthlyPrice = state.subscription?.monthly_price;

  try {
    const res = await fetch("/api/cancel-subscription/downsell-accepted", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({
        user_id: userID,
        subscriptionId: subscriptionID,
        monthly_price: monthlyPrice,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to accept downsell offer");
    }

    setState({ accepted_downsell: true });

    return await res.json();
  } catch (err) {
    console.error("Error in callDownsellAcceptedApi:", err);
    throw err;
  }
}
