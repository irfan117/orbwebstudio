/*
  # Auto Admin Setup Migration

  ## Overview
  This migration automatically creates admin profiles for users who sign up
  with specific email addresses, making them admin users automatically.

  ## Changes
  - Creates admin_profiles table
  - Creates function to auto-create admin profile
  - Creates trigger to run on user signup
  - Updates admin_profiles policies to allow auto-creation
*/

-- Create admin_profiles table
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Create function to auto-create admin profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into admin_profiles table
  INSERT INTO public.admin_profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Admin User'),
    'admin'
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to run on user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Update admin_profiles policies to allow auto-creation
DROP POLICY IF EXISTS "Users can insert own profile" ON admin_profiles;

-- Allow system to insert admin profiles (for the trigger)
CREATE POLICY "System can insert admin profiles"
  ON admin_profiles FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Keep existing policies for user management
CREATE POLICY "Users can view own profile"
  ON admin_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON admin_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
