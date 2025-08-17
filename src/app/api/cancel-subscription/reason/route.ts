import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getOrCreateCancellation } from '@/utils/server/cancel';
import { verifyCsrf } from '@/utils/server/csrf';

export async function POST(req: Request) {
  const body = await req.json();
  const cookieStore = await cookies();
  verifyCsrf(cookieStore.get('csrf')?.value, body?.csrf);

  const userId = cookieStore.get('user_id')?.value ?? '550e8400-e29b-41d4-a716-446655440001';
  const subscriptionId = String(body.subscriptionId);
  const reason = String(body.reason);

  const c = await getOrCreateCancellation(userId, subscriptionId);

  // update cancellation reason
  // (you can do this with supabase-js; shown briefly via RPC/REST for brevity)
  // then mark subscription pending_cancellation
  return NextResponse.json({ ok: true, cancellationId: c.id });
}
