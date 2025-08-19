export async function fetchUserSubscription() {
  const response = await fetch("/api/user-subscription");
  if (!response.ok) {
    throw new Error("Failed to fetch user subscription");
  }
  return response.json();
}

export async function fetchCsrfToken() {
  const response = await fetch("/api/csrf");
  if (!response.ok) {
    throw new Error("Failed to fetch CSRF token");
  }
  return response.json();
}
