import 'server only';
import crypto from 'crypto';
import { cookies } from 'next/headers';

export async function issueCsrf() {
  const token = crypto.randomBytes(32).toString('hex');
  const cookieStore = await cookies();
  cookieStore.set('csrf', token, { httpOnly: true, sameSite: 'strict', secure: true, path: '/' });
  return token;
}

export function verifyCsrf(cookieValue?: string, formValue?: string) {
  if (!cookieValue || !formValue || cookieValue !== formValue) {
    throw new Error('Invalid CSRF token');
  }
}