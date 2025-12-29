/**
 * Comprehensive TypeScript Type Definitions
 *
 * @description Complete type definitions for all website features
 * All database models and shared types are defined here
 */

// =====================================================
// CORE ENTITIES
// =====================================================

export interface ProjectType {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Portfolio {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  category_id: string | null;
  project_type_id: string | null;
  project_type?: ProjectType;
  category?: Category;
  tech_stack: string[];
  project_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  currency: string;
  features: string[];
  icon: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServicePackage {
  id: string;
  service_id: string;
  name: string;
  description: string | null;
  price: number | null;
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Template {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  currency: string;
  image_url: string | null;
  preview_url: string | null;
  demo_url: string | null;
  features: string[];
  tech_stack: string[];
  is_featured: boolean;
  is_active: boolean;
  download_count: number;
  created_at: string;
  updated_at: string;
}

export interface TemplatePurchase {
  id: string;
  template_id: string;
  template?: Template;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  amount: number;
  currency: string;
  payment_method: string | null;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  download_url: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_company: string | null;
  client_position: string | null;
  rating: number;
  review: string;
  avatar_url: string | null;
  project_id: string | null;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  service_interest: string | null;
  budget_range: string | null;
  project_timeline: string | null;
  is_read: boolean;
  is_responded: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string | null;
  is_active: boolean;
  subscribed_at: string;
  unsubscribed_at: string | null;
}

// =====================================================
// BLOG & CONTENT
// =====================================================

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  author_id: string;
  author?: {
    full_name: string;
  };
  category_id: string;
  category?: BlogCategory;
  tags: string[];
  is_published: boolean;
  is_featured: boolean;
  view_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// =====================================================
// ADMIN & AUTHENTICATION
// =====================================================

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  full_name: string | null;
  role: string;
  avatar_url: string | null;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

// Alias for backwards compatibility if needed
export type AdminProfile = AdminUser;

export interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
  };
}

// =====================================================
// ANALYTICS & TRACKING
// =====================================================

export interface WebsiteAnalytics {
  id: string;
  page_url: string;
  page_title: string;
  visitor_ip: string;
  user_agent: string;
  referrer: string | null;
  session_id: string;
  visit_duration: number | null;
  created_at: string;
}

export interface FormSubmission {
  id: string;
  form_type: string;
  form_data: any;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

// =====================================================
// SYSTEM & SETTINGS
// =====================================================

export interface SiteSetting {
  id: string;
  key: string;
  value: string | null;
  description: string | null;
  category: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

// =====================================================
// DASHBOARD & STATISTICS
// =====================================================

export interface DashboardStats {
  totalServices: number; // Changed to match index.ts (CamelCase)
  totalPortfolios: number;
  totalTestimonials: number;
  unreadMessages: number;
  total_templates?: number; // Optional as they might be new
  newsletter_subscribers?: number;
  template_sales?: number;
}

export interface RecentActivity {
  messages: ContactMessage[];
  purchases: TemplatePurchase[];
  testimonials: Testimonial[];
}

// =====================================================
// UTILITY TYPES
// =====================================================

export interface PaginationParams {
  page: number;
  pageSize: number;
  total: number;
}

export interface SortParams {
  column: string;
  direction: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  category?: string;
  project_type?: string;
  is_active?: boolean;
  is_approved?: boolean;
  is_featured?: boolean;
  priority?: string;
  payment_status?: string;
}

export interface SearchResult {
  type: 'portfolios' | 'services' | 'templates' | 'blog';
  results: any[];
  total: number;
  query: string;
}

// =====================================================
// FORM TYPES
// =====================================================

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  service_interest?: string;
  budget_range?: string;
  project_timeline?: string;
}

export interface NewsletterFormData {
  email: string;
  name?: string;
}

export interface TestimonialFormData {
  client_name: string;
  client_company?: string;
  client_position?: string;
  rating: number;
  review: string;
  project_id?: string;
}

export interface TemplatePurchaseFormData {
  template_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  payment_method: string;
}

// =====================================================
// API RESPONSE TYPES
// =====================================================

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
}

// =====================================================
// COMPONENT PROPS TYPES
// =====================================================

export interface PortfolioCardProps {
  portfolio: Portfolio;
  featured?: boolean;
}

export interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}

export interface TemplateCardProps {
  template: Template;
  onPurchase?: (template: Template) => void;
  onPreview?: (template: Template) => void;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  loading?: boolean;
}

export interface NewsletterFormProps {
  onSubmit: (data: NewsletterFormData) => Promise<void>;
  loading?: boolean;
}

// =====================================================
// FILTER & SORT TYPES
// =====================================================

export interface PortfolioFilters {
  category_id?: string;
  project_type_id?: string;
  is_featured?: boolean;
  search?: string;
}

export interface ServiceFilters {
  search?: string;
  price_range?: {
    min: number;
    max: number;
  };
}

export interface TemplateFilters {
  category?: string;
  price_range?: {
    min: number;
    max: number;
  };
  is_featured?: boolean;
  search?: string;
}

export interface BlogFilters {
  category_id?: string;
  tags?: string[];
  is_featured?: boolean;
  search?: string;
}
