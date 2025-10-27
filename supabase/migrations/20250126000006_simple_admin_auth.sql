-- =====================================================
-- SIMPLE ADMIN AUTH SETUP
-- =====================================================

-- This migration ensures that any user in Supabase Auth can access admin
-- without needing separate admin_profiles table

-- Create a simple function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- For now, any authenticated user is considered admin
  -- You can modify this logic later to check specific emails or roles
  RETURN auth.role() = 'authenticated';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get current user info
CREATE OR REPLACE FUNCTION public.get_current_user()
RETURNS JSON AS $$
BEGIN
  RETURN json_build_object(
    'id', auth.uid(),
    'email', auth.jwt() ->> 'email',
    'role', 'admin',
    'is_admin', true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_current_user() TO authenticated;

-- Create a simple admin_users table for additional admin info (optional)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users
CREATE POLICY "Public admin users are viewable by everyone"
  ON admin_users FOR SELECT
  USING (TRUE);

CREATE POLICY "Authenticated users can create admin users"
  ON admin_users FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update admin users"
  ON admin_users FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete admin users"
  ON admin_users FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create trigger for updated_at (only if not exists)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_admin_users_updated_at') THEN
        CREATE TRIGGER update_admin_users_updated_at
        BEFORE UPDATE ON admin_users
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Migration complete - admin_users table ready
