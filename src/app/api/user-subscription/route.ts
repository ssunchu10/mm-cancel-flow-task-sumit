import { NextResponse } from 'next/server';
import { getUserById } from '@/server-service/users';
import { getSubscriptionByUserId } from '@/server-service/subscription';

export async function GET(req: Request) {
  // For demo, use a hardcoded user ID. Replace with auth logic in production.
  const userId = '550e8400-e29b-41d4-a716-446655440001';

  try {
    let user, subscription;
    try {
      user = await getUserById(userId);
      if (!user) {
        console.error('User not found for ID:', userId);
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
    } catch (userError) {
      console.error('Error fetching user:', userError);
      return NextResponse.json({ error: 'Error fetching user', details: String(userError) }, { status: 500 });
    }

    try {
      subscription = await getSubscriptionByUserId(userId);
      if (!subscription) {
        console.error('Subscription not found for user ID:', userId);
        return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
      }
    } catch (subError) {
      console.error('Error fetching subscription:', subError);
      return NextResponse.json({ error: 'Error fetching subscription', details: String(subError) }, { status: 500 });
    }

    return NextResponse.json({ user, subscription });
  } catch (error) {
    console.error('General API error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
