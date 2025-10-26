/**
 * TypeScript Type Definitions
 *
 * @description Central type definitions for the website profile service
 * All database models and shared types are defined here
 */

export interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  features: string[];
  icon: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Portfolio {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  tech_stack: string[];
  project_url: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_company: string | null;
  rating: number;
  review: string;
  avatar_url: string | null;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface AdminProfile {
  id: string;
  full_name: string | null;
  role: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
  };
}

export interface DashboardStats {
  totalServices: number;
  totalPortfolios: number;
  totalTestimonials: number;
  unreadMessages: number;
}

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
  isActive?: boolean;
  isApproved?: boolean;
}
