-- =====================================================
-- RPC FUNCTIONS FOR ORB WEB STUDIO
-- Custom database functions for complex operations
-- =====================================================

-- Function to increment template download count
CREATE OR REPLACE FUNCTION increment_template_downloads(template_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE templates 
  SET download_count = download_count + 1 
  WHERE id = template_id;
END;
$$ LANGUAGE plpgsql;

-- Function to increment blog post view count
CREATE OR REPLACE FUNCTION increment_blog_views(post_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts 
  SET view_count = view_count + 1 
  WHERE slug = post_slug AND is_published = true;
END;
$$ LANGUAGE plpgsql;

-- Function to get popular pages
CREATE OR REPLACE FUNCTION get_popular_pages(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(
  page_url TEXT,
  page_title TEXT,
  views BIGINT,
  unique_visitors BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    wa.page_url,
    wa.page_title,
    COUNT(*) as views,
    COUNT(DISTINCT wa.visitor_ip) as unique_visitors
  FROM website_analytics wa
  WHERE wa.created_at >= NOW() - INTERVAL '30 days'
  GROUP BY wa.page_url, wa.page_title
  ORDER BY views DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get stats by date range
CREATE OR REPLACE FUNCTION get_stats_by_date_range(
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE
)
RETURNS TABLE(
  stat_type TEXT,
  count BIGINT,
  date DATE
) AS $$
BEGIN
  RETURN QUERY
  WITH date_series AS (
    SELECT generate_series(
      start_date::DATE,
      end_date::DATE,
      '1 day'::INTERVAL
    )::DATE as date
  )
  SELECT 
    'portfolios'::TEXT as stat_type,
    COUNT(p.id) as count,
    ds.date
  FROM date_series ds
  LEFT JOIN portfolios p ON DATE(p.created_at) = ds.date
  GROUP BY ds.date
  
  UNION ALL
  
  SELECT 
    'services'::TEXT as stat_type,
    COUNT(s.id) as count,
    ds.date
  FROM date_series ds
  LEFT JOIN services s ON DATE(s.created_at) = ds.date
  GROUP BY ds.date
  
  UNION ALL
  
  SELECT 
    'templates'::TEXT as stat_type,
    COUNT(t.id) as count,
    ds.date
  FROM date_series ds
  LEFT JOIN templates t ON DATE(t.created_at) = ds.date
  GROUP BY ds.date
  
  UNION ALL
  
  SELECT 
    'messages'::TEXT as stat_type,
    COUNT(cm.id) as count,
    ds.date
  FROM date_series ds
  LEFT JOIN contact_messages cm ON DATE(cm.created_at) = ds.date
  GROUP BY ds.date
  
  UNION ALL
  
  SELECT 
    'sales'::TEXT as stat_type,
    COUNT(tp.id) as count,
    ds.date
  FROM date_series ds
  LEFT JOIN template_purchases tp ON DATE(tp.created_at) = ds.date AND tp.payment_status = 'completed'
  GROUP BY ds.date
  
  ORDER BY date, stat_type;
END;
$$ LANGUAGE plpgsql;

-- Function to search across multiple tables
CREATE OR REPLACE FUNCTION search_all(
  search_query TEXT,
  limit_count INTEGER DEFAULT 20
)
RETURNS TABLE(
  result_type TEXT,
  result_id UUID,
  result_title TEXT,
  result_description TEXT,
  result_url TEXT,
  relevance_score REAL
) AS $$
BEGIN
  RETURN QUERY
  -- Search portfolios
  SELECT 
    'portfolio'::TEXT as result_type,
    p.id as result_id,
    p.title as result_title,
    COALESCE(p.description, '') as result_description,
    COALESCE(p.project_url, '') as result_url,
    (
      CASE 
        WHEN p.title ILIKE '%' || search_query || '%' THEN 1.0
        WHEN p.description ILIKE '%' || search_query || '%' THEN 0.8
        ELSE 0.5
      END
    ) as relevance_score
  FROM portfolios p
  WHERE p.is_active = true 
    AND (p.title ILIKE '%' || search_query || '%' OR p.description ILIKE '%' || search_query || '%')
  
  UNION ALL
  
  -- Search services
  SELECT 
    'service'::TEXT as result_type,
    s.id as result_id,
    s.title as result_title,
    COALESCE(s.description, '') as result_description,
    ''::TEXT as result_url,
    (
      CASE 
        WHEN s.title ILIKE '%' || search_query || '%' THEN 1.0
        WHEN s.description ILIKE '%' || search_query || '%' THEN 0.8
        ELSE 0.5
      END
    ) as relevance_score
  FROM services s
  WHERE s.is_active = true 
    AND (s.title ILIKE '%' || search_query || '%' OR s.description ILIKE '%' || search_query || '%')
  
  UNION ALL
  
  -- Search templates
  SELECT 
    'template'::TEXT as result_type,
    t.id as result_id,
    t.name as result_title,
    COALESCE(t.description, '') as result_description,
    COALESCE(t.preview_url, '') as result_url,
    (
      CASE 
        WHEN t.name ILIKE '%' || search_query || '%' THEN 1.0
        WHEN t.description ILIKE '%' || search_query || '%' THEN 0.8
        ELSE 0.5
      END
    ) as relevance_score
  FROM templates t
  WHERE t.is_active = true 
    AND (t.name ILIKE '%' || search_query || '%' OR t.description ILIKE '%' || search_query || '%')
  
  UNION ALL
  
  -- Search blog posts
  SELECT 
    'blog'::TEXT as result_type,
    bp.id as result_id,
    bp.title as result_title,
    COALESCE(bp.excerpt, '') as result_description,
    '/blog/' || bp.slug as result_url,
    (
      CASE 
        WHEN bp.title ILIKE '%' || search_query || '%' THEN 1.0
        WHEN bp.excerpt ILIKE '%' || search_query || '%' THEN 0.8
        WHEN bp.content ILIKE '%' || search_query || '%' THEN 0.6
        ELSE 0.5
      END
    ) as relevance_score
  FROM blog_posts bp
  WHERE bp.is_published = true 
    AND (bp.title ILIKE '%' || search_query || '%' OR bp.excerpt ILIKE '%' || search_query || '%' OR bp.content ILIKE '%' || search_query || '%')
  
  ORDER BY relevance_score DESC, result_title
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get monthly revenue
CREATE OR REPLACE FUNCTION get_monthly_revenue(
  year_param INTEGER DEFAULT EXTRACT(YEAR FROM NOW())
)
RETURNS TABLE(
  month INTEGER,
  month_name TEXT,
  revenue DECIMAL(10,2),
  sales_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    EXTRACT(MONTH FROM tp.created_at)::INTEGER as month,
    TO_CHAR(tp.created_at, 'Month') as month_name,
    COALESCE(SUM(tp.amount), 0) as revenue,
    COUNT(*) as sales_count
  FROM template_purchases tp
  WHERE EXTRACT(YEAR FROM tp.created_at) = year_param
    AND tp.payment_status = 'completed'
  GROUP BY EXTRACT(MONTH FROM tp.created_at), TO_CHAR(tp.created_at, 'Month')
  ORDER BY month;
END;
$$ LANGUAGE plpgsql;

-- Function to get conversion rates
CREATE OR REPLACE FUNCTION get_conversion_rates(
  days_back INTEGER DEFAULT 30
)
RETURNS TABLE(
  metric TEXT,
  count BIGINT,
  conversion_rate DECIMAL(5,2)
) AS $$
DECLARE
  total_visitors BIGINT;
BEGIN
  -- Get total visitors
  SELECT COUNT(DISTINCT visitor_ip) INTO total_visitors
  FROM website_analytics
  WHERE created_at >= NOW() - (days_back || ' days')::INTERVAL;
  
  RETURN QUERY
  WITH conversions AS (
    SELECT 
      'contact_form'::TEXT as metric,
      COUNT(*) as count
    FROM contact_messages
    WHERE created_at >= NOW() - (days_back || ' days')::INTERVAL
    
    UNION ALL
    
    SELECT 
      'newsletter_signup'::TEXT as metric,
      COUNT(*) as count
    FROM newsletter_subscribers
    WHERE subscribed_at >= NOW() - (days_back || ' days')::INTERVAL
    
    UNION ALL
    
    SELECT 
      'template_purchase'::TEXT as metric,
      COUNT(*) as count
    FROM template_purchases
    WHERE created_at >= NOW() - (days_back || ' days')::INTERVAL
      AND payment_status = 'completed'
  )
  SELECT 
    c.metric,
    c.count,
    CASE 
      WHEN total_visitors > 0 THEN (c.count::DECIMAL / total_visitors * 100)
      ELSE 0
    END as conversion_rate
  FROM conversions c;
END;
$$ LANGUAGE plpgsql;

-- Function to clean up old analytics data
CREATE OR REPLACE FUNCTION cleanup_old_analytics(days_to_keep INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM website_analytics
  WHERE created_at < NOW() - (days_to_keep || ' days')::INTERVAL;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get dashboard overview
CREATE OR REPLACE FUNCTION get_dashboard_overview()
RETURNS TABLE(
  total_portfolios BIGINT,
  total_services BIGINT,
  total_templates BIGINT,
  total_testimonials BIGINT,
  unread_messages BIGINT,
  newsletter_subscribers BIGINT,
  template_sales BIGINT,
  monthly_revenue DECIMAL(10,2),
  conversion_rate DECIMAL(5,2)
) AS $$
DECLARE
  monthly_rev DECIMAL(10,2);
  conv_rate DECIMAL(5,2);
BEGIN
  -- Get monthly revenue
  SELECT COALESCE(SUM(amount), 0) INTO monthly_rev
  FROM template_purchases
  WHERE created_at >= DATE_TRUNC('month', NOW())
    AND payment_status = 'completed';
  
  -- Get conversion rate
  SELECT 
    CASE 
      WHEN COUNT(DISTINCT visitor_ip) > 0 
      THEN (COUNT(*)::DECIMAL / COUNT(DISTINCT visitor_ip) * 100)
      ELSE 0
    END INTO conv_rate
  FROM website_analytics
  WHERE created_at >= NOW() - INTERVAL '30 days';
  
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM portfolios WHERE is_active = true) as total_portfolios,
    (SELECT COUNT(*) FROM services WHERE is_active = true) as total_services,
    (SELECT COUNT(*) FROM templates WHERE is_active = true) as total_templates,
    (SELECT COUNT(*) FROM testimonials WHERE is_approved = true) as total_testimonials,
    (SELECT COUNT(*) FROM contact_messages WHERE is_read = false) as unread_messages,
    (SELECT COUNT(*) FROM newsletter_subscribers WHERE is_active = true) as newsletter_subscribers,
    (SELECT COUNT(*) FROM template_purchases WHERE payment_status = 'completed') as template_sales,
    monthly_rev as monthly_revenue,
    conv_rate as conversion_rate;
END;
$$ LANGUAGE plpgsql;

-- Function to generate sitemap data
CREATE OR REPLACE FUNCTION generate_sitemap_data()
RETURNS TABLE(
  url TEXT,
  lastmod TIMESTAMP WITH TIME ZONE,
  changefreq TEXT,
  priority DECIMAL(2,1)
) AS $$
BEGIN
  RETURN QUERY
  -- Static pages
  SELECT '/', NOW(), 'weekly', 1.0
  UNION ALL
  SELECT '/about', NOW(), 'monthly', 0.8
  UNION ALL
  SELECT '/services', NOW(), 'weekly', 0.9
  UNION ALL
  SELECT '/portfolio', NOW(), 'weekly', 0.9
  UNION ALL
  SELECT '/contact', NOW(), 'monthly', 0.7
  UNION ALL
  SELECT '/blog', NOW(), 'daily', 0.8
  
  UNION ALL
  
  -- Portfolio pages
  SELECT '/portfolio/' || p.id, p.updated_at, 'monthly', 0.6
  FROM portfolios p
  WHERE p.is_active = true
  
  UNION ALL
  
  -- Blog posts
  SELECT '/blog/' || bp.slug, bp.updated_at, 'monthly', 0.7
  FROM blog_posts bp
  WHERE bp.is_published = true
  
  UNION ALL
  
  -- Template pages
  SELECT '/templates/' || t.id, t.updated_at, 'monthly', 0.6
  FROM templates t
  WHERE t.is_active = true;
END;
$$ LANGUAGE plpgsql;
