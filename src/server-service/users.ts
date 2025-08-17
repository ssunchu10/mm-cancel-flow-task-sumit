// User service logic
import { supabaseAdmin } from '../lib/supabase';


export const getUserById = async (userId: string) => {
  try {
    if (!userId) throw new Error('User ID is required');
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('getUserById error:', err);
    throw err;
  }
};


export const getUserByEmail = async (email: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('getUserByEmail error:', err);
    throw err;
  }
};


export const createUser = async (userData: { email: string }) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([userData])
      .select('*')
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('createUser error:', err);
    throw err;
  }
};
