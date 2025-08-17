-- seed.sql
-- Database schema and seed data for subscription cancellation flow
-- Does not include production-level optimizations or advanced RLS policies

-- Enable Row Level Security

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  monthly_price INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending_cancellation', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cancellations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE,
  employment_status TEXT CHECK (employment_status IN ('employed', 'unemployed')),
  found_via_mm BOOLEAN,
  applied_count TEXT,
  emailed_count TEXT,
  interviewed_count TEXT,
  has_lawyer BOOLEAN,
  visa_type TEXT,
  feedback TEXT,
  cancel_reason TEXT,
  details TEXT,
  downsell_variant TEXT NOT NULL CHECK (downsell_variant IN ('A', 'B')),
  accepted_downsell BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed data
INSERT INTO users (id, email) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'user1@example.com'),
  ('550e8400-e29b-41d4-a716-446655440002', 'user2@example.com'),
  ('550e8400-e29b-41d4-a716-446655440003', 'user3@example.com')
ON CONFLICT (email) DO NOTHING;

-- Seed subscriptions with $25 and $29 plans
INSERT INTO subscriptions (user_id, monthly_price, status) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 2500, 'active'), -- $25.00
  ('550e8400-e29b-41d4-a716-446655440002', 2900, 'active'), -- $29.00
  ('550e8400-e29b-41d4-a716-446655440003', 2500, 'active')  -- $25.00
ON CONFLICT DO NOTHING; 