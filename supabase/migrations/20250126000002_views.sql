-- =====================================================
-- DATABASE VIEWS
-- =====================================================

-- View for active portfolios
CREATE OR REPLACE VIEW active_portfolios AS
SELECT *
FROM portfolios
WHERE is_active = true;

-- View for active services
CREATE OR REPLACE VIEW active_services AS
SELECT *
FROM services
WHERE is_active = true;

-- View for dashboard stats
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM portfolios) as total_projects,
  (SELECT COUNT(*) FROM services) as total_services,
  (SELECT COUNT(*) FROM contact_messages WHERE is_read = false) as unread_messages,
  (SELECT COUNT(*) FROM testimonials WHERE is_approved = true) as active_testimonials;
