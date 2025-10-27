-- =====================================================
-- ORB WEB STUDIO DATABASE SCHEMA (CLEAN VERSION)
-- Comprehensive database design for all features
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. USERS & AUTHENTICATION
-- =====================================================

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. PROJECT MANAGEMENT
-- =====================================================

-- Project types table (CRUD enabled)
CREATE TABLE IF NOT EXISTS project_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(7) DEFAULT '#3FA9F5',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table for additional classification
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(7) DEFAULT '#C6A664',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio projects table
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  category_id UUID REFERENCES categories(id),
  project_type_id UUID REFERENCES project_types(id),
  tech_stack TEXT[], -- Array of technologies used
  project_url TEXT,
  github_url TEXT,
  demo_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. SERVICES & PRICING
-- =====================================================

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'IDR',
  features TEXT[], -- Array of features
  icon VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service packages table
CREATE TABLE IF NOT EXISTS service_packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  features TEXT[],
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 4. TEMPLATES & PRODUCTS
-- =====================================================

-- Website templates table
CREATE TABLE IF NOT EXISTS templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'IDR',
  image_url TEXT,
  preview_url TEXT,
  demo_url TEXT,
  features TEXT[],
  tech_stack TEXT[],
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Template purchases table
CREATE TABLE IF NOT EXISTS template_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id UUID REFERENCES templates(id),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  amount DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'IDR',
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pending',
  download_url TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 5. TESTIMONIALS & REVIEWS
-- =====================================================

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  client_company VARCHAR(255),
  client_position VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  avatar_url TEXT,
  project_id UUID REFERENCES portfolios(id),
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 6. CONTACT & COMMUNICATION
-- =====================================================

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  service_interest VARCHAR(255),
  budget_range VARCHAR(50),
  project_timeline VARCHAR(50),
  is_read BOOLEAN DEFAULT false,
  is_responded BOOLEAN DEFAULT false,
  priority VARCHAR(20) DEFAULT 'normal', -- low, normal, high, urgent
  assigned_to UUID REFERENCES admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- 7. BLOG & CONTENT MANAGEMENT
-- =====================================================

-- Blog categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7) DEFAULT '#3FA9F5',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_id UUID REFERENCES admin_users(id),
  category_id UUID REFERENCES blog_categories(id),
  tags TEXT[],
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 8. ANALYTICS & TRACKING
-- =====================================================

-- Website analytics table
CREATE TABLE IF NOT EXISTS website_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_url VARCHAR(500),
  page_title VARCHAR(255),
  visitor_ip VARCHAR(45),
  user_agent TEXT,
  referrer VARCHAR(500),
  session_id VARCHAR(255),
  visit_duration INTEGER, -- in seconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Form submissions tracking
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_type VARCHAR(50), -- contact, newsletter, quote, etc.
  form_data JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 9. SYSTEM SETTINGS
-- =====================================================

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  category VARCHAR(50), -- general, seo, social, etc.
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 10. INDEXES FOR PERFORMANCE
-- =====================================================

-- Portfolio indexes
CREATE INDEX IF NOT EXISTS idx_portfolios_featured ON portfolios(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_portfolios_active ON portfolios(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_portfolios_category ON portfolios(category_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_project_type ON portfolios(project_type_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_sort_order ON portfolios(sort_order);

-- Services indexes
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_services_sort_order ON services(sort_order);

-- Templates indexes
CREATE INDEX IF NOT EXISTS idx_templates_active ON templates(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_templates_featured ON templates(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);

-- Testimonials indexes
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved) WHERE is_approved = true;
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured) WHERE is_featured = true;

-- Contact messages indexes
CREATE INDEX IF NOT EXISTS idx_contact_messages_unread ON contact_messages(is_read) WHERE is_read = false;
CREATE INDEX IF NOT EXISTS idx_contact_messages_priority ON contact_messages(priority);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at);

-- Blog indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published) WHERE is_published = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);

-- Analytics indexes
CREATE INDEX IF NOT EXISTS idx_analytics_created ON website_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_page_url ON website_analytics(page_url);

-- =====================================================
-- 11. TRIGGERS FOR UPDATED_AT (WITH IF NOT EXISTS)
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables with updated_at column (only if not exists)
DO $$
BEGIN
    -- Admin users trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_admin_users_updated_at') THEN
        CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Project types trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_project_types_updated_at') THEN
        CREATE TRIGGER update_project_types_updated_at BEFORE UPDATE ON project_types FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Categories trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_categories_updated_at') THEN
        CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Portfolios trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_portfolios_updated_at') THEN
        CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON portfolios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Services trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_services_updated_at') THEN
        CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Service packages trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_service_packages_updated_at') THEN
        CREATE TRIGGER update_service_packages_updated_at BEFORE UPDATE ON service_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Templates trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_templates_updated_at') THEN
        CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Template purchases trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_template_purchases_updated_at') THEN
        CREATE TRIGGER update_template_purchases_updated_at BEFORE UPDATE ON template_purchases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Testimonials trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_testimonials_updated_at') THEN
        CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Contact messages trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_contact_messages_updated_at') THEN
        CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Blog categories trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_blog_categories_updated_at') THEN
        CREATE TRIGGER update_blog_categories_updated_at BEFORE UPDATE ON blog_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Blog posts trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_blog_posts_updated_at') THEN
        CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Site settings trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_site_settings_updated_at') THEN
        CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- =====================================================
-- 12. INITIAL DATA SEEDING
-- =====================================================

-- Insert default project types
INSERT INTO project_types (name, description, icon, color, sort_order) VALUES
('Web App', 'Aplikasi web interaktif dengan fitur dinamis', 'Globe', '#3FA9F5', 1),
('E-commerce', 'Toko online dengan sistem pembayaran', 'ShoppingCart', '#C6A664', 2),
('Corporate', 'Website perusahaan dengan informasi lengkap', 'Building', '#3FA9F5', 3),
('Landing Page', 'Halaman tunggal untuk konversi tinggi', 'Target', '#C6A664', 4),
('Mobile App', 'Aplikasi mobile responsive', 'Smartphone', '#3FA9F5', 5),
('Blog', 'Website blog dengan CMS', 'BookOpen', '#C6A664', 6)
ON CONFLICT (name) DO NOTHING;

-- Insert default categories
INSERT INTO categories (name, description, icon, color, sort_order) VALUES
('Technology', 'Proyek teknologi dan inovasi', 'Cpu', '#3FA9F5', 1),
('Business', 'Solusi bisnis dan korporat', 'Briefcase', '#C6A664', 2),
('Creative', 'Desain kreatif dan artistik', 'Palette', '#3FA9F5', 3),
('Education', 'Platform edukasi dan pembelajaran', 'GraduationCap', '#C6A664', 4),
('Healthcare', 'Solusi kesehatan dan medis', 'Heart', '#3FA9F5', 5),
('Finance', 'Aplikasi keuangan dan fintech', 'DollarSign', '#C6A664', 6)
ON CONFLICT (name) DO NOTHING;

-- Insert default services
INSERT INTO services (title, description, price, features, icon, sort_order) VALUES
('Web Development', 'Pengembangan website custom sesuai kebutuhan bisnis', 15000000, ARRAY['Responsive Design', 'CMS Integration', 'SEO Optimization', 'Performance Optimization'], 'Code', 1),
('E-commerce Solutions', 'Toko online dengan sistem pembayaran terintegrasi', 25000000, ARRAY['Payment Gateway', 'Inventory Management', 'Order Tracking', 'Admin Dashboard'], 'ShoppingCart', 2),
('Mobile App Development', 'Aplikasi mobile untuk iOS dan Android', 30000000, ARRAY['Cross Platform', 'Push Notifications', 'Offline Support', 'App Store Submission'], 'Smartphone', 3),
('UI/UX Design', 'Desain interface yang user-friendly dan modern', 8000000, ARRAY['User Research', 'Wireframing', 'Prototyping', 'Design System'], 'Palette', 4),
('SEO & Digital Marketing', 'Optimasi website dan strategi pemasaran digital', 12000000, ARRAY['Keyword Research', 'Content Strategy', 'Social Media', 'Analytics'], 'TrendingUp', 5),
('Maintenance & Support', 'Pemeliharaan website dan dukungan teknis', 3000000, ARRAY['24/7 Support', 'Security Updates', 'Performance Monitoring', 'Backup & Recovery'], 'Shield', 6)
ON CONFLICT DO NOTHING;

-- Insert default templates
INSERT INTO templates (name, description, category, price, features, tech_stack, is_featured) VALUES
('Corporate Pro', 'Template profesional untuk perusahaan dengan desain modern dan fitur lengkap', 'Corporate', 2500000, ARRAY['Responsive Design', 'CMS Integration', 'SEO Ready', 'Contact Forms'], ARRAY['React', 'Next.js', 'Tailwind CSS'], true),
('E-commerce Elite', 'Template toko online dengan sistem pembayaran terintegrasi', 'E-commerce', 5000000, ARRAY['Shopping Cart', 'Payment Gateway', 'Inventory Management', 'Order Tracking'], ARRAY['React', 'Node.js', 'Stripe'], true),
('Portfolio Creative', 'Template kreatif untuk menampilkan portfolio dan karya seni', 'Portfolio', 1800000, ARRAY['Gallery Showcase', 'Blog Integration', 'Social Media', 'Contact Portfolio'], ARRAY['React', 'Framer Motion', 'Tailwind CSS'], true),
('Restaurant Deluxe', 'Template restoran dengan sistem pemesanan online', 'Restaurant', 3200000, ARRAY['Menu Display', 'Online Ordering', 'Reservation System', 'Location Map'], ARRAY['React', 'Firebase', 'Google Maps'], false),
('Blog Modern', 'Template blog modern dengan fitur lengkap untuk content creator', 'Blog', 1500000, ARRAY['Article Management', 'Comment System', 'Social Sharing', 'Newsletter'], ARRAY['Next.js', 'MDX', 'Prisma'], false),
('Landing Page Boost', 'Template landing page yang dioptimalkan untuk konversi tinggi', 'Landing Page', 2000000, ARRAY['High Conversion', 'A/B Testing', 'Lead Capture', 'Analytics'], ARRAY['React', 'Vercel', 'Analytics'], true)
ON CONFLICT DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (key, value, description, category, is_public) VALUES
('site_name', 'Orb Web Studio', 'Nama website', 'general', true),
('site_description', 'Solusi digital kreatif untuk bisnis modern', 'Deskripsi website', 'general', true),
('contact_email', 'hello@orbwebstudio.com', 'Email kontak utama', 'general', true),
('contact_phone', '+62 812-3456-7890', 'Nomor telepon kontak', 'general', true),
('social_instagram', 'https://instagram.com/orbwebstudio', 'Link Instagram', 'social', true),
('social_linkedin', 'https://linkedin.com/company/orbwebstudio', 'Link LinkedIn', 'social', true),
('social_github', 'https://github.com/orbwebstudio', 'Link GitHub', 'social', true),
('google_analytics_id', 'GA-XXXXXXXXX', 'Google Analytics ID', 'seo', false),
('google_maps_api_key', 'AIzaSyXXXXXXXXXXXXXXX', 'Google Maps API Key', 'general', false)
ON CONFLICT (key) DO NOTHING;

-- =====================================================
-- SCHEMA COMPLETE
-- =====================================================
