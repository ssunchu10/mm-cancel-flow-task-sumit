export async function initializeCancellationApi(
  csrfToken: string,
  userId: string,
  subscriptionId: string,
  employmentStatus: string
) {
  const response = await fetch("/api/cancel-subscription/initialize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify({
      user_id: userId,
      subscription_id: subscriptionId,
      employment_status: employmentStatus,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to initialize cancellation");
  }

  return response.json();
}
