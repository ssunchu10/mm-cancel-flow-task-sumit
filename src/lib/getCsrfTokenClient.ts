import { generateCsrfToken } from "@/utils/server/csrf";

export async function getCsrfTokenClient() {
  return generateCsrfToken();
}
