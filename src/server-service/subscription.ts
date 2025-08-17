// Subscription service logic
import { supabaseAdmin } from "../lib/supabase-admin";

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
  const allowedStatuses = ["active", "pending_cancellation", "cancelled"];
  if (!allowedStatuses.includes(status)) {
    throw new Error(
      `Invalid status: ${status}. Allowed values are: ${allowedStatuses.join(
        ", "
      )}`
    );
  }
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

export const decrementSubscriptionPrice = async (
  subscriptionId: string,
  currentPrice: number,
  amount: number
) => {
  try {
    const newPrice = currentPrice - amount;
    const { data, error } = await supabaseAdmin
      .from("subscriptions")
      .update({
        monthly_price: newPrice,
        updated_at: new Date().toISOString(),
      })
      .eq("id", subscriptionId)
      .select("*")
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("decrementSubscriptionPrice error:", err);
    throw err;
  }
};
