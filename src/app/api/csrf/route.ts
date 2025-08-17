
import { NextResponse } from 'next/server';
import { generateCsrfToken } from '@/utils/server/csrf';

export async function GET() {
  const token = generateCsrfToken();
  const res = NextResponse.json({ csrfToken: token });
  res.cookies.set('csrf', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
  return res;
}
