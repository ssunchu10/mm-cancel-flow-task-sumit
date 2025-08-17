import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase-admin";

export function assignVariant(): "A" | "B" {
  return crypto.randomBytes(1)[0] < 128 ? "A" : "B";
}

export async function getOrCreateCancellation(
  userId: string,
  subscriptionId: string,
  employment_status: string
) {
  const { data: existing } = await supabaseAdmin
    .from("cancellations")
    .select("*")
    .eq("user_id", userId)
    .eq("subscription_id", subscriptionId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existing) return existing;

  const variant = assignVariant();
  const { data, error } = await supabaseAdmin
    .from("cancellations")
    .insert({
      user_id: userId,
      subscription_id: subscriptionId,
      employment_status: null,
      downsell_variant: variant,
      accepted_downsell: false,
      created_at: new Date().toISOString(),
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

