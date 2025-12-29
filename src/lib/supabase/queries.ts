/**
 * Supabase Database Queries
 *
 * @description Centralized database query functions
 * All CRUD operations for services, portfolios, testimonials, messages, templates, etc.
 *
 * @usage Import specific query functions as needed
 * @example
 * import { serviceQueries, portfolioQueries } from '@/lib/supabase/queries'
 */

import { supabase } from './client';
import type {
  Service,
  Portfolio,
  Testimonial,
  ContactMessage,
  DashboardStats,
  ProjectType,
  Category,
  Template,
  TemplatePurchase,
  BlogPost,
  BlogCategory,
  SiteSetting,
} from '@/types';

// =====================================================
// SERVICES QUERIES
// =====================================================

export const serviceQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true }); // Prefer sort_order

    if (error) throw error;
    return data as Service[];
  },

  async getActive() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
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
    return data as Category[];
  },

  async getActive() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data as Category[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as Category | null;
  },
  
  // Minimal implementation for now as full CRUD might not be needed immediately
  // Add create/update/delete if needed
};


// =====================================================
// PORTFOLIO QUERIES
// =====================================================

export const portfolioQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('portfolios')
      .select(`
        *,
        project_type:project_types(*),
        category:categories(*)
      `)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data as Portfolio[];
  },

  async getFeatured() {
    const { data, error } = await supabase
      .from('portfolios')
      .select(`
        *,
        project_type:project_types(*)
      `)
      .eq('is_featured', true)
      .order('sort_order', { ascending: true })
      .limit(6);

    if (error) throw error;
    return data as Portfolio[];
  },

  async getByCategory(categoryId: string) {
    const { data, error } = await supabase
      .from('portfolios')
      .select(`
        *,
        project_type:project_types(*)
      `)
      .eq('category_id', categoryId)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data as Portfolio[];
  },

  async getByProjectType(projectTypeId: string) {
    const { data, error } = await supabase
      .from('portfolios')
      .select(`
        *,
        project_type:project_types(*)
      `)
      .eq('project_type_id', projectTypeId)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data as Portfolio[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('portfolios')
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

export const contactMessageQueries = {
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

  async getById(id: string) {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as ContactMessage | null;
  },

  async create(message: Omit<ContactMessage, 'id' | 'created_at' | 'updated_at' | 'is_read'>) {
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
  
  async update(id: string, updates: Partial<ContactMessage>) {
      const { data, error } = await supabase
        .from('contact_messages')
        .update(updates)
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
// TEMPLATES QUERIES
// =====================================================

export const templateQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
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

  async getById(id: string) {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as Template | null;
  },
  
  // Add other methods as needed
};

// =====================================================
// DASHBOARD STATS
// =====================================================

export const dashboardQueries = {
  async getStats(): Promise<DashboardStats> {
    const [services, portfolios, testimonials, unreadMessages] = await Promise.all([
      supabase.from('services').select('id', { count: 'exact', head: true }),
      supabase.from('portfolios').select('id', { count: 'exact', head: true }),
      supabase.from('testimonials').select('id', { count: 'exact', head: true }),
      supabase
        .from('contact_messages')
        .select('id', { count: 'exact', head: true })
    ]);

    return {
      totalServices: services.count || 0,
      totalPortfolios: portfolios.count || 0,
      totalTestimonials: testimonials.count || 0,
      unreadMessages: unreadMessages.count || 0,
    };
  },
};

// =====================================================
// SITE SETTINGS QUERIES
// =====================================================

export const siteSettingQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('category', { ascending: true })
      .order('key', { ascending: true });

    if (error) throw error;
    return data as SiteSetting[];
  },

  async getPublic() {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('is_public', true);

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

  async update(id: string, updates: Partial<SiteSetting>) {
    const { data, error } = await supabase
      .from('site_settings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as SiteSetting;
  },
};

// Export alias for backward compatibility
export const messageQueries = contactMessageQueries;
