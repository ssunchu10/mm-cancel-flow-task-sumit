// Subscription service logic
import { supabaseAdmin } from "../lib/supabase";

export const getSubscriptionByUserId = async (userId: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("getSubscriptionByUserId error:", err);
    throw err;
  }
};

export const updateSubscriptionStatus = async (
  subscriptionId: string,
  status: string
) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("subscriptions")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", subscriptionId)
      .select("*")
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("updateSubscriptionStatus error:", err);
    throw err;
  }
};
