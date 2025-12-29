-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- Security policies for Orb Web Studio database
-- =====================================================

-- Enable RLS on all tables (conditionally for admin_users)
-- Enable RLS on all tables
-- admin_users table removed, using Supabase Auth directly

-- View for dashboard stats (Added here to ensure availability)
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM portfolios) as total_projects,
  (SELECT COUNT(*) FROM services) as total_services,
  (SELECT COUNT(*) FROM contact_messages WHERE is_read = false) as unread_messages,
  (SELECT COUNT(*) FROM testimonials WHERE is_approved = true) as active_testimonials;

ALTER TABLE project_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PUBLIC ACCESS POLICIES (Read-only for public data)
-- =====================================================

-- Project types - public read
CREATE POLICY "Project types are viewable by everyone" ON project_types
  FOR SELECT USING (is_active = true);

-- Categories - public read
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (is_active = true);

-- Portfolios - public read
CREATE POLICY "Active portfolios are viewable by everyone" ON portfolios
  FOR SELECT USING (is_active = true);

-- Services - public read
CREATE POLICY "Active services are viewable by everyone" ON services
  FOR SELECT USING (is_active = true);

-- Service packages - public read
CREATE POLICY "Active service packages are viewable by everyone" ON service_packages
  FOR SELECT USING (is_active = true);

-- Templates - public read
CREATE POLICY "Active templates are viewable by everyone" ON templates
  FOR SELECT USING (is_active = true);

-- Testimonials - public read approved only
CREATE POLICY "Approved testimonials are viewable by everyone" ON testimonials
  FOR SELECT USING (is_approved = true);

-- Blog categories - public read
CREATE POLICY "Active blog categories are viewable by everyone" ON blog_categories
  FOR SELECT USING (is_active = true);

-- Blog posts - public read published only
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (is_published = true);

-- Site settings - public read public only
CREATE POLICY "Public site settings are viewable by everyone" ON site_settings
  FOR SELECT USING (is_public = true);

-- =====================================================
-- AUTHENTICATED USER POLICIES
-- =====================================================

-- Admin users - full access for authenticated admins


-- Project types - full access for authenticated users
CREATE POLICY "Authenticated users can manage project types" ON project_types
  FOR ALL USING (auth.role() = 'authenticated');

-- Categories - full access for authenticated users
CREATE POLICY "Authenticated users can manage categories" ON categories
  FOR ALL USING (auth.role() = 'authenticated');

-- Portfolios - full access for authenticated users
CREATE POLICY "Authenticated users can manage portfolios" ON portfolios
  FOR ALL USING (auth.role() = 'authenticated');

-- Services - full access for authenticated users
CREATE POLICY "Authenticated users can manage services" ON services
  FOR ALL USING (auth.role() = 'authenticated');

-- Service packages - full access for authenticated users
CREATE POLICY "Authenticated users can manage service packages" ON service_packages
  FOR ALL USING (auth.role() = 'authenticated');

-- Templates - full access for authenticated users
CREATE POLICY "Authenticated users can manage templates" ON templates
  FOR ALL USING (auth.role() = 'authenticated');

-- Template purchases - full access for authenticated users
CREATE POLICY "Authenticated users can manage template purchases" ON template_purchases
  FOR ALL USING (auth.role() = 'authenticated');

-- Testimonials - full access for authenticated users
CREATE POLICY "Authenticated users can manage testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

-- Contact messages - full access for authenticated users
CREATE POLICY "Authenticated users can manage contact messages" ON contact_messages
  FOR ALL USING (auth.role() = 'authenticated');

-- Newsletter subscribers - full access for authenticated users
CREATE POLICY "Authenticated users can manage newsletter subscribers" ON newsletter_subscribers
  FOR ALL USING (auth.role() = 'authenticated');

-- Blog categories - full access for authenticated users
CREATE POLICY "Authenticated users can manage blog categories" ON blog_categories
  FOR ALL USING (auth.role() = 'authenticated');

-- Blog posts - full access for authenticated users
CREATE POLICY "Authenticated users can manage blog posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Website analytics - full access for authenticated users
CREATE POLICY "Authenticated users can manage website analytics" ON website_analytics
  FOR ALL USING (auth.role() = 'authenticated');

-- Form submissions - full access for authenticated users
CREATE POLICY "Authenticated users can manage form submissions" ON form_submissions
  FOR ALL USING (auth.role() = 'authenticated');

-- Site settings - full access for authenticated users
CREATE POLICY "Authenticated users can manage site settings" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- ANONYMOUS USER POLICIES (Insert only)
-- =====================================================

-- Contact messages - anonymous users can create
CREATE POLICY "Anyone can create contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Newsletter subscribers - anonymous users can create
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Testimonials - anonymous users can create
CREATE POLICY "Anyone can create testimonials" ON testimonials
  FOR INSERT WITH CHECK (true);

-- Template purchases - anonymous users can create
CREATE POLICY "Anyone can create template purchases" ON template_purchases
  FOR INSERT WITH CHECK (true);

-- Website analytics - anonymous users can create
CREATE POLICY "Anyone can create analytics records" ON website_analytics
  FOR INSERT WITH CHECK (true);

-- Form submissions - anonymous users can create
CREATE POLICY "Anyone can create form submissions" ON form_submissions
  FOR INSERT WITH CHECK (true);

-- =====================================================
-- FUNCTION-BASED POLICIES
-- =====================================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Any authenticated user is considered admin for simplicity
  RETURN auth.role() = 'authenticated';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin-only policies using function


-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant select permissions for public tables
GRANT SELECT ON project_types TO anon, authenticated;
GRANT SELECT ON categories TO anon, authenticated;
GRANT SELECT ON portfolios TO anon, authenticated;
GRANT SELECT ON services TO anon, authenticated;
GRANT SELECT ON service_packages TO anon, authenticated;
GRANT SELECT ON templates TO anon, authenticated;
GRANT SELECT ON testimonials TO anon, authenticated;
GRANT SELECT ON blog_categories TO anon, authenticated;
GRANT SELECT ON blog_posts TO anon, authenticated;
GRANT SELECT ON site_settings TO anon, authenticated;

-- Grant all permissions for authenticated users
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Grant insert permissions for anonymous users
GRANT INSERT ON contact_messages TO anon;
GRANT INSERT ON newsletter_subscribers TO anon;
GRANT INSERT ON testimonials TO anon;
GRANT INSERT ON template_purchases TO anon;
GRANT INSERT ON website_analytics TO anon;
GRANT INSERT ON form_submissions TO anon;

-- =====================================================
-- VIEW PERMISSIONS
-- =====================================================

-- Grant select on views
GRANT SELECT ON active_portfolios TO anon, authenticated;
GRANT SELECT ON active_services TO anon, authenticated;
GRANT SELECT ON dashboard_stats TO authenticated;

-- =====================================================
-- FUNCTION PERMISSIONS
-- =====================================================

-- Grant execute on RPC functions
GRANT EXECUTE ON FUNCTION increment_template_downloads(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_blog_views(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_popular_pages(INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_stats_by_date_range(TIMESTAMP WITH TIME ZONE, TIMESTAMP WITH TIME ZONE) TO authenticated;
GRANT EXECUTE ON FUNCTION search_all(TEXT, INTEGER) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_monthly_revenue(INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_conversion_rates(INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION cleanup_old_analytics(INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_dashboard_overview() TO authenticated;
GRANT EXECUTE ON FUNCTION generate_sitemap_data() TO anon, authenticated;

-- =====================================================
-- SECURITY SETTINGS
-- =====================================================

-- Set default privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;

-- =====================================================
-- AUDIT TRIGGERS
-- =====================================================

-- Create audit table
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL,
  old_data JSONB,
  new_data JSONB,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to create audit log
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (table_name, operation, old_data, new_data, user_id)
  VALUES (
    TG_TABLE_NAME,
    TG_OP,
    CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN row_to_json(NEW) ELSE NULL END,
    auth.uid()
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply audit triggers to sensitive tables


CREATE TRIGGER audit_portfolios AFTER INSERT OR UPDATE OR DELETE ON portfolios
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_services AFTER INSERT OR UPDATE OR DELETE ON services
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_templates AFTER INSERT OR UPDATE OR DELETE ON templates
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_template_purchases AFTER INSERT OR UPDATE OR DELETE ON template_purchases
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- =====================================================
-- SECURITY COMPLETE
-- =====================================================
