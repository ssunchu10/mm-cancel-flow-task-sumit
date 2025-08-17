import 'server-only';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

export function assignVariant(): 'A' | 'B' {
  return crypto.randomBytes(1)[0] < 128 ? 'A' : 'B';
}

export async function getOrCreateCancellation(userId: string, subscriptionId: string) {
  const { data: existing } = await supabase
    .from('cancellations')
    .select('*')
    .eq('user_id', userId)
    .eq('subscription_id', subscriptionId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existing) return existing;

  const variant = assignVariant();
  const { data, error } = await supabase
    .from('cancellations')
    .insert({
      user_id: userId,
      subscription_id: subscriptionId,
      downsell_variant: variant,
      accepted_downsell: false,
    })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export function downsellPriceCents(cents: number) {
  if (cents === 2500) return 1500;
  if (cents === 2900) return 1900;
  return Math.max(0, cents - 1000);
}
