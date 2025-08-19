export async function cancelSubscriptionApi(
  csrfToken: string,
  subscriptionId: string,
  userId: string,
  nextResponse: Record<string, unknown>
) {
  const response = await fetch("/api/cancel-subscription/cancel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify({
      response: nextResponse,
      subscriptionId,
      user_id: userId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to cancel subscription");
  }

  return response.json();
}
