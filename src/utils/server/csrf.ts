import crypto from 'crypto';

export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function verifyCsrf(cookieValue?: string, formValue?: string) {
  if (!cookieValue || !formValue || cookieValue !== formValue) {
    throw new Error('Invalid CSRF token');
  }
}
