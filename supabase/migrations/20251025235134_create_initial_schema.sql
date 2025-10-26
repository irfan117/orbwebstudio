/*
  # Initial Schema for Website Profile Service
  
  ## Overview
  Creates complete database schema for a website service profile business with:
  - Services management
  - Portfolio showcase
  - Client testimonials
  - Contact messages
  - Admin profiles
  
  ## New Tables
  
  ### 1. services
  Manages service offerings with pricing and features
  - `id` (uuid, primary key)
  - `title` (text) - Service name
  - `description` (text) - Service description
  - `price` (decimal) - Service price
  - `features` (jsonb) - Array of features
  - `icon` (text) - Icon identifier
  - `is_active` (boolean) - Active status
  - `created_at`, `updated_at` (timestamptz)
  
  ### 2. portfolios
  Showcases completed projects
  - `id` (uuid, primary key)
  - `title` (text) - Project name
  - `description` (text) - Project description
  - `image_url` (text) - Image URL
  - `category` (text) - Project category
  - `tech_stack` (text[]) - Technologies used
  - `project_url` (text) - Live project URL
  - `is_featured` (boolean) - Featured status
  - `created_at`, `updated_at` (timestamptz)
  
  ### 3. testimonials
  Client reviews and ratings
  - `id` (uuid, primary key)
  - `client_name` (text) - Client name
  - `client_company` (text) - Company name
  - `rating` (integer) - 1-5 star rating
  - `review` (text) - Review text
  - `avatar_url` (text) - Client avatar
  - `is_approved` (boolean) - Approval status
  - `created_at`, `updated_at` (timestamptz)
  
  ### 4. contact_messages
  Stores messages from contact form
  - `id` (uuid, primary key)
  - `name` (text) - Sender name
  - `email` (text) - Sender email
  - `phone` (text) - Phone number
  - `message` (text) - Message content
  - `is_read` (boolean) - Read status
  - `created_at` (timestamptz)
  
  ### 5. admin_profiles
  Extended profile data for admin users
  - `id` (uuid, primary key, references auth.users)
  - `full_name` (text) - Admin full name
  - `role` (text) - Admin role
  - `created_at` (timestamptz)
  
  ## Security
  
  ### Row Level Security (RLS)
  All tables have RLS enabled with the following policies:
  
  #### Public Access (Unauthenticated Users)
  - Can read active services
  - Can read featured/active portfolios
  - Can read approved testimonials
  - Can insert contact messages
  
  #### Admin Access (Authenticated Users)
  - Full CRUD access to all tables
  - Can manage all records
  - Can approve testimonials
  - Can read and mark messages as read
  
  ## Important Notes
  
  1. All timestamps use `timestamptz` for timezone awareness
  2. UUIDs are auto-generated using `gen_random_uuid()`
  3. RLS is restrictive by default - no access without explicit policies
  4. Admin users must be authenticated via Supabase Auth
  5. Images stored in Supabase Storage (URLs only in DB)
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  features JSONB DEFAULT '[]'::jsonb,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT,
  tech_stack TEXT[] DEFAULT '{}'::text[],
  project_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_company TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  avatar_url TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create admin_profiles table
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Services Policies
CREATE POLICY "Public can view active services"
  ON services FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all services"
  ON services FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert services"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update services"
  ON services FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete services"
  ON services FOR DELETE
  TO authenticated
  USING (true);

-- Portfolios Policies
CREATE POLICY "Public can view portfolios"
  ON portfolios FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can view all portfolios"
  ON portfolios FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert portfolios"
  ON portfolios FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update portfolios"
  ON portfolios FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete portfolios"
  ON portfolios FOR DELETE
  TO authenticated
  USING (true);

-- Testimonials Policies
CREATE POLICY "Public can view approved testimonials"
  ON testimonials FOR SELECT
  TO anon
  USING (is_approved = true);

CREATE POLICY "Authenticated users can view all testimonials"
  ON testimonials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert testimonials"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials"
  ON testimonials FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete testimonials"
  ON testimonials FOR DELETE
  TO authenticated
  USING (true);

-- Contact Messages Policies
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);

-- Admin Profiles Policies
CREATE POLICY "Users can view own profile"
  ON admin_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON admin_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON admin_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_portfolios_category ON portfolios(category);
CREATE INDEX IF NOT EXISTS idx_portfolios_is_featured ON portfolios(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_approved ON testimonials(is_approved);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_portfolios_updated_at ON portfolios;
CREATE TRIGGER update_portfolios_updated_at
  BEFORE UPDATE ON portfolios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();