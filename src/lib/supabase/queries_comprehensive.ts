/**
 * Comprehensive Supabase Database Queries
 * 
 * @description Updated database query functions for all features
 * All CRUD operations for services, portfolios, testimonials, messages, templates, etc.
 * 
 * @usage Import specific query functions as needed
 * @example
 * import { getActiveServices, createService, getTemplates, createTemplatePurchase } from '@/lib/supabase/queries'
 */

import { supabase } from './client';
import type {
  Service,
  Portfolio,
  Testimonial,
  ContactMessage,
  DashboardStats,
  ProjectType,
  Template,
  TemplatePurchase,
  NewsletterSubscriber,
  BlogPost,
  BlogCategory,
  SiteSetting,
} from '@/types';

// =====================================================
// PROJECT TYPES QUERIES
// =====================================================

export const projectTypeQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('project_types')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data as ProjectType[];
  },

  async getActive() {
    const { data, error } = await supabase
      .from('project_types')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data as ProjectType[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('project_types')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as ProjectType | null;
  },

  async create(projectType: Omit<ProjectType, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('project_types')
      .insert([projectType])
      .select()
      .single();

    if (error) throw error;
    return data as ProjectType;
  },

  async update(id: string, projectType: Partial<ProjectType>) {
    const { data, error } = await supabase
      .from('project_types')
      .update(projectType)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as ProjectType;
  },

  async delete(id: string) {
    const { error } = await supabase.from('project_types').delete().eq('id', id);

    if (error) throw error;
  },
};

// =====================================================
// CATEGORIES QUERIES
// =====================================================

export const categoryQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getActive() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async create(category: any) {
    const { data, error } = await supabase
      .from('categories')
      .insert([category])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, category: any) {
    const { data, error } = await supabase
      .from('categories')
      .update(category)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from('categories').delete().eq('id', id);

    if (error) throw error;
  },
};

// =====================================================
// PORTFOLIO QUERIES
// =====================================================

export const portfolioQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('active_portfolios')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data as Portfolio[];
  },

  async getFeatured() {
    const { data, error } = await supabase
      .from('active_portfolios')
      .select('*')
      .eq('is_featured', true)
      .order('sort_order', { ascending: true })
      .limit(6);

    if (error) throw error;
    return data as Portfolio[];
  },

  async getByCategory(categoryId: string) {
    const { data, error } = await supabase
      .from('active_portfolios')
      .select('*')
      .eq('category_id', categoryId)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data as Portfolio[];
  },

  async getByProjectType(projectTypeId: string) {
    const { data, error } = await supabase
      .from('active_portfolios')
      .select('*')
      .eq('project_type_id', projectTypeId)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data as Portfolio[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('active_portfolios')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as Portfolio | null;
  },

  async create(portfolio: Omit<Portfolio, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('portfolios')
      .insert([portfolio])
      .select()
      .single();

    if (error) throw error;
    return data as Portfolio;
  },

  async update(id: string, portfolio: Partial<Portfolio>) {
    const { data, error } = await supabase
      .from('portfolios')
      .update(portfolio)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Portfolio;
  },

  async delete(id: string) {
    const { error } = await supabase.from('portfolios').delete().eq('id', id);

    if (error) throw error;
  },
};

// =====================================================
// SERVICES QUERIES
// =====================================================

export const serviceQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data as Service[];
  },

  async getActive() {
    const { data, error } = await supabase
      .from('active_services')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data as Service[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as Service | null;
  },

  async create(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('services')
      .insert([service])
      .select()
      .single();

    if (error) throw error;
    return data as Service;
  },

  async update(id: string, service: Partial<Service>) {
    const { data, error } = await supabase
      .from('services')
      .update(service)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Service;
  },

  async delete(id: string) {
    const { error } = await supabase.from('services').delete().eq('id', id);

    if (error) throw error;
  },
};

// =====================================================
// TEMPLATES QUERIES
// =====================================================

export const templateQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Template[];
  },

  async getFeatured() {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Template[];
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('is_active', true)
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Template[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as Template | null;
  },

  async create(template: Omit<Template, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('templates')
      .insert([template])
      .select()
      .single();

    if (error) throw error;
    return data as Template;
  },

  async update(id: string, template: Partial<Template>) {
    const { data, error } = await supabase
      .from('templates')
      .update(template)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Template;
  },

  async delete(id: string) {
    const { error } = await supabase.from('templates').delete().eq('id', id);

    if (error) throw error;
  },

  async incrementDownloadCount(id: string) {
    const { error } = await supabase.rpc('increment_template_downloads', {
      template_id: id
    });

    if (error) throw error;
  },
};

// =====================================================
// TEMPLATE PURCHASES QUERIES
// =====================================================

export const templatePurchaseQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('template_purchases')
      .select(`
        *,
        template:templates(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as TemplatePurchase[];
  },

  async getByEmail(email: string) {
    const { data, error } = await supabase
      .from('template_purchases')
      .select(`
        *,
        template:templates(*)
      `)
      .eq('customer_email', email)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as TemplatePurchase[];
  },

  async create(purchase: Omit<TemplatePurchase, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('template_purchases')
      .insert([purchase])
      .select()
      .single();

    if (error) throw error;
    return data as TemplatePurchase;
  },

  async updatePaymentStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('template_purchases')
      .update({ payment_status: status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as TemplatePurchase;
  },
};

// =====================================================
// TESTIMONIALS QUERIES
// =====================================================

export const testimonialQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Testimonial[];
  },

  async getApproved() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Testimonial[];
  },

  async getFeatured() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Testimonial[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as Testimonial | null;
  },

  async create(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('testimonials')
      .insert([testimonial])
      .select()
      .single();

    if (error) throw error;
    return data as Testimonial;
  },

  async update(id: string, testimonial: Partial<Testimonial>) {
    const { data, error } = await supabase
      .from('testimonials')
      .update(testimonial)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Testimonial;
  },

  async delete(id: string) {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);

    if (error) throw error;
  },
};

// =====================================================
// CONTACT MESSAGES QUERIES
// =====================================================

export const messageQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as ContactMessage[];
  },

  async getUnread() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('is_read', false)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as ContactMessage[];
  },

  async getByPriority(priority: string) {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('priority', priority)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as ContactMessage[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as ContactMessage | null;
  },

  async create(message: Omit<ContactMessage, 'id' | 'created_at' | 'is_read'>) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{ ...message, is_read: false }])
      .select()
      .single();

    if (error) throw error;
    return data as ContactMessage;
  },

  async markAsRead(id: string) {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as ContactMessage;
  },

  async markAsResponded(id: string) {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ is_responded: true })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as ContactMessage;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

// =====================================================
// NEWSLETTER QUERIES
// =====================================================

export const newsletterQueries = {
  async subscribe(email: string, name?: string) {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email, name }])
      .select()
      .single();

    if (error) throw error;
    return data as NewsletterSubscriber;
  },

  async unsubscribe(email: string) {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({ is_active: false, unsubscribed_at: new Date().toISOString() })
      .eq('email', email)
      .select()
      .single();

    if (error) throw error;
    return data as NewsletterSubscriber;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) throw error;
    return data as NewsletterSubscriber[];
  },

  async getActive() {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('is_active', true)
      .order('subscribed_at', { ascending: false });

    if (error) throw error;
    return data as NewsletterSubscriber[];
  },
};

// =====================================================
// BLOG QUERIES
// =====================================================

export const blogQueries = {
  async getPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:admin_users(full_name),
        category:blog_categories(*)
      `)
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data as BlogPost[];
  },

  async getFeaturedPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:admin_users(full_name),
        category:blog_categories(*)
      `)
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data as BlogPost[];
  },

  async getPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:admin_users(full_name),
        category:blog_categories(*)
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error) throw error;
    return data as BlogPost | null;
  },

  async getCategories() {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data as BlogCategory[];
  },

  async incrementViewCount(slug: string) {
    const { error } = await supabase.rpc('increment_blog_views', {
      post_slug: slug
    });

    if (error) throw error;
  },
};

// =====================================================
// SITE SETTINGS QUERIES
// =====================================================

export const settingsQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('category', { ascending: true });

    if (error) throw error;
    return data as SiteSetting[];
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('category', category)
      .order('key');

    if (error) throw error;
    return data as SiteSetting[];
  },

  async getPublic() {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('is_public', true)
      .order('category', { ascending: true });

    if (error) throw error;
    return data as SiteSetting[];
  },

  async getByKey(key: string) {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', key)
      .maybeSingle();

    if (error) throw error;
    return data as SiteSetting | null;
  },

  async update(key: string, value: string) {
    const { data, error } = await supabase
      .from('site_settings')
      .update({ value })
      .eq('key', key)
      .select()
      .single();

    if (error) throw error;
    return data as SiteSetting;
  },
};

// =====================================================
// ANALYTICS QUERIES
// =====================================================

export const analyticsQueries = {
  async trackPageView(pageData: {
    page_url: string;
    page_title: string;
    visitor_ip: string;
    user_agent: string;
    referrer?: string;
    session_id: string;
  }) {
    const { error } = await supabase
      .from('website_analytics')
      .insert([pageData]);

    if (error) throw error;
  },

  async trackFormSubmission(formData: {
    form_type: string;
    form_data: any;
    ip_address: string;
    user_agent: string;
  }) {
    const { error } = await supabase
      .from('form_submissions')
      .insert([formData]);

    if (error) throw error;
  },

  async getPageViews(days: number = 30) {
    const { data, error } = await supabase
      .from('website_analytics')
      .select('*')
      .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getPopularPages(limit: number = 10) {
    const { data, error } = await supabase
      .rpc('get_popular_pages', { limit_count: limit });

    if (error) throw error;
    return data;
  },
};

// =====================================================
// DASHBOARD QUERIES
// =====================================================

export const dashboardQueries = {
  async getStats(): Promise<DashboardStats> {
    const { data, error } = await supabase
      .from('dashboard_stats')
      .select('*')
      .single();

    if (error) throw error;
    return data as DashboardStats;
  },

  async getRecentActivity(limit: number = 10) {
    const [messages, purchases, testimonials] = await Promise.all([
      supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit),
      supabase
        .from('template_purchases')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit),
      supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit),
    ]);

    return {
      messages: messages.data || [],
      purchases: purchases.data || [],
      testimonials: testimonials.data || [],
    };
  },
};

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

export const utilityQueries = {
  async search(query: string, type: 'portfolios' | 'services' | 'templates' | 'blog') {
    let table = '';
    let searchFields: string[] = [];

    switch (type) {
      case 'portfolios':
        table = 'active_portfolios';
        searchFields = ['title', 'description'];
        break;
      case 'services':
        table = 'services';
        searchFields = ['title', 'description'];
        break;
      case 'templates':
        table = 'templates';
        searchFields = ['name', 'description'];
        break;
      case 'blog':
        table = 'blog_posts';
        searchFields = ['title', 'excerpt', 'content'];
        break;
    }

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .or(searchFields.map(field => `${field}.ilike.%${query}%`).join(','))

    if (error) throw error;
    return data;
  },

  async getStatsByDateRange(startDate: string, endDate: string) {
    const { data, error } = await supabase
      .rpc('get_stats_by_date_range', {
        start_date: startDate,
        end_date: endDate
      });

    if (error) throw error;
    return data;
  },
};
