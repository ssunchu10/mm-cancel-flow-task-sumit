import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getOrCreateCancellation } from '@/utils/server/cancel';
import { verifyCsrf } from '@/utils/server/csrf';

export async function POST(req: Request) {
  const body = await req.json();
  const cookieStore = await cookies();
  verifyCsrf(cookieStore.get('csrf')?.value, body?.csrf);

  // mock user (replace with real auth in prod)
  const userId = cookieStore.get('user_id')?.value ?? '550e8400-e29b-41d4-a716-446655440001';
  const subscriptionId = String(body.subscriptionId);

  const c = await getOrCreateCancellation(userId, subscriptionId);
  await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/cancellations', {
    method: 'PATCH',
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ accepted_downsell: true }),
  });

  return NextResponse.json({ ok: true, cancellationId: c.id });
}
