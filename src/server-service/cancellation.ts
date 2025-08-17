// Cancellation service logic
import { supabaseAdmin } from '../lib/supabase';

export type CancellationPayload = {
  user_id: string;
  subscription_id: string;
  employment_status?: 'employed' | 'unemployed';
  found_via_mm?: boolean;
  applied_count?: string;
  emailed_count?: string;
  interviewed_count?: string;
  has_lawyer?: boolean;
  visa_type?: string;
  feedback?: string;
  cancel_reason?: string;
  details?: string;
  downsell_variant: 'A' | 'B';
  accepted_downsell?: boolean;
};


export const requestCancellation = async (payload: CancellationPayload) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('cancellations')
      .insert([payload])
      .select('*')
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('requestCancellation error:', err);
    throw err;
  }
};


export const getCancellationHistory = async (userId: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('cancellations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('getCancellationHistory error:', err);
    throw err;
  }
};


export const getDownsellVariant = async (userId: string, subscriptionId: string) => {
  try {
    // Returns the downsell variant for a user's cancellation, if exists
    const { data, error } = await supabaseAdmin
      .from('cancellations')
      .select('downsell_variant')
      .eq('user_id', userId)
      .eq('subscription_id', subscriptionId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    if (error && error.code !== 'PGRST116') throw error; // ignore not found
    return data?.downsell_variant;
  } catch (err) {
    console.error('getDownsellVariant error:', err);
    throw err;
  }
};
