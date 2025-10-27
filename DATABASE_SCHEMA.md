# Orb Web Studio Database Schema

## Overview
Comprehensive database design untuk Orb Web Studio yang mendukung semua fitur website termasuk portfolio, services, templates, blog, analytics, dan admin management.

## Database Structure

### 🗂️ Core Tables

#### 1. **Project Management**
- `project_types` - Tipe project (Web App, E-commerce, dll.)
- `categories` - Kategori project (Technology, Business, dll.)
- `portfolios` - Data portfolio project

#### 2. **Services & Pricing**
- `services` - Layanan yang ditawarkan
- `service_packages` - Paket layanan dengan harga

#### 3. **Templates & Products**
- `templates` - Template website siap pakai
- `template_purchases` - Data pembelian template

#### 4. **Content & Blog**
- `blog_categories` - Kategori blog
- `blog_posts` - Artikel blog
- `testimonials` - Testimoni klien

#### 5. **Communication**
- `contact_messages` - Pesan dari form kontak
- `newsletter_subscribers` - Subscriber newsletter

#### 6. **Analytics & Tracking**
- `website_analytics` - Data analytics website
- `form_submissions` - Tracking form submissions

#### 7. **Admin & Settings**
- `admin_users` - User admin
- `site_settings` - Pengaturan website

## 🚀 Key Features

### ✅ CRUD Operations
- **Project Types**: Full CRUD dengan admin interface
- **Categories**: Kategori dinamis untuk portfolio
- **Portfolios**: Portfolio dengan project types dan categories
- **Services**: Layanan dengan packages
- **Templates**: Template dengan purchase tracking
- **Blog**: Sistem blog lengkap
- **Testimonials**: Testimoni dengan approval system

### ✅ Advanced Features
- **Search Function**: Pencarian across multiple tables
- **Analytics**: Tracking page views dan conversions
- **Revenue Tracking**: Monthly revenue dan sales
- **Audit Log**: Log semua perubahan data
- **Security**: Row Level Security (RLS) policies

### ✅ Performance Optimizations
- **Indexes**: Optimized indexes untuk query performance
- **Views**: Pre-computed views untuk dashboard
- **RPC Functions**: Custom functions untuk complex operations

## 📊 Database Views

### `active_portfolios`
View untuk portfolio aktif dengan data terkait:
```sql
SELECT p.*, pt.name as project_type_name, c.name as category_name
FROM portfolios p
LEFT JOIN project_types pt ON p.project_type_id = pt.id
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.is_active = true
```

### `active_services`
View untuk services aktif dengan packages:
```sql
SELECT s.*, json_agg(sp.*) as packages
FROM services s
LEFT JOIN service_packages sp ON s.id = sp.service_id
WHERE s.is_active = true
GROUP BY s.id
```

### `dashboard_stats`
View untuk statistik dashboard:
```sql
SELECT 
  COUNT(*) as total_portfolios,
  COUNT(*) as total_services,
  COUNT(*) as total_templates,
  COUNT(*) as total_testimonials,
  COUNT(*) as unread_messages
FROM respective_tables
```

## 🔧 RPC Functions

### Analytics Functions
- `increment_template_downloads(template_id)` - Increment download count
- `increment_blog_views(post_slug)` - Increment view count
- `get_popular_pages(limit)` - Get popular pages
- `get_conversion_rates(days)` - Get conversion rates

### Business Functions
- `get_monthly_revenue(year)` - Monthly revenue data
- `get_dashboard_overview()` - Dashboard statistics
- `search_all(query, limit)` - Search across tables

### Utility Functions
- `cleanup_old_analytics(days)` - Clean old analytics data
- `generate_sitemap_data()` - Generate sitemap URLs

## 🔒 Security Features

### Row Level Security (RLS)
- **Public Access**: Read-only untuk data publik
- **Authenticated Access**: Full access untuk admin
- **Anonymous Access**: Insert-only untuk forms

### Policies
```sql
-- Public read access
CREATE POLICY "Active portfolios are viewable by everyone" ON portfolios
  FOR SELECT USING (is_active = true);

-- Admin full access
CREATE POLICY "Authenticated users can manage portfolios" ON portfolios
  FOR ALL USING (auth.role() = 'authenticated');
```

### Audit Logging
- Automatic audit log untuk semua perubahan
- Track user actions dan data changes
- Compliance dan security monitoring

## 📈 Analytics & Tracking

### Website Analytics
- Page views tracking
- Visitor IP dan user agent
- Session tracking
- Referrer tracking

### Form Submissions
- Contact form submissions
- Newsletter signups
- Template purchases
- Testimonial submissions

### Conversion Tracking
- Contact form conversion rate
- Newsletter signup rate
- Template purchase rate
- Overall conversion metrics

## 🛠️ Usage Examples

### Portfolio Queries
```typescript
// Get featured portfolios
const portfolios = await portfolioQueries.getFeatured();

// Get portfolios by project type
const webApps = await portfolioQueries.getByProjectType('web-app-id');

// Get portfolios by category
const techProjects = await portfolioQueries.getByCategory('technology-id');
```

### Template Management
```typescript
// Get all templates
const templates = await templateQueries.getAll();

// Increment download count
await templateQueries.incrementDownloadCount(templateId);

// Create purchase record
const purchase = await templatePurchaseQueries.create({
  template_id: templateId,
  customer_name: 'John Doe',
  customer_email: 'john@example.com',
  amount: 2500000,
  payment_status: 'completed'
});
```

### Analytics
```typescript
// Track page view
await analyticsQueries.trackPageView({
  page_url: '/portfolio',
  page_title: 'Portfolio',
  visitor_ip: '192.168.1.1',
  user_agent: 'Mozilla/5.0...',
  session_id: 'session-123'
});

// Get conversion rates
const rates = await analyticsQueries.getConversionRates(30);
```

## 🔄 Migration Files

1. **`20250126000001_create_project_types.sql`** - Initial project types
2. **`20250126000002_comprehensive_schema.sql`** - Complete schema
3. **`20250126000003_rpc_functions.sql`** - RPC functions
4. **`20250126000004_security_policies.sql`** - Security policies

## 📝 Initial Data

Database includes initial seed data:
- 6 default project types
- 6 default categories  
- 6 default services
- 6 default templates
- Site settings

## 🚀 Getting Started

1. **Run Migrations**:
   ```bash
   supabase db reset
   ```

2. **Import Types**:
   ```typescript
   import { Portfolio, Service, Template } from '@/types/comprehensive';
   ```

3. **Use Queries**:
   ```typescript
   import { portfolioQueries, serviceQueries } from '@/lib/supabase/queries_comprehensive';
   ```

## 📊 Performance Considerations

- **Indexes**: Optimized untuk common queries
- **Views**: Pre-computed untuk dashboard
- **Pagination**: Built-in pagination support
- **Caching**: Consider Redis untuk frequently accessed data

## 🔧 Maintenance

### Regular Tasks
- Clean old analytics data (90+ days)
- Update statistics views
- Monitor performance metrics
- Review audit logs

### Backup Strategy
- Daily automated backups
- Point-in-time recovery
- Cross-region replication

## 📞 Support

Untuk pertanyaan atau issues dengan database schema, silakan hubungi tim development atau buat issue di repository.

---

**Last Updated**: January 26, 2025  
**Version**: 1.0.0  
**Database**: PostgreSQL 15+  
**ORM**: Supabase Client
