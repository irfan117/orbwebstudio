/**
 * Validation Utilities
 *
 * @description Form validation schemas using Zod
 * Provides type-safe validation for all forms
 *
 * @usage Import validation schemas and use with react-hook-form
 * @example
 * import { serviceSchema } from '@/lib/utils/validators'
 * const form = useForm({ resolver: zodResolver(serviceSchema) })
 */

import { z } from 'zod';

export const serviceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive').optional().nullable(),
  features: z.array(z.string()).default([]),
  icon: z.string().optional().nullable(),
  is_active: z.boolean().default(true),
});

export const portfolioSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  image_url: z.string().url('Invalid URL').optional().nullable(),
  category: z.string().optional().nullable(),
  tech_stack: z.array(z.string()).default([]),
  project_url: z.string().url('Invalid URL').optional().nullable(),
  is_featured: z.boolean().default(false),
});

export const testimonialSchema = z.object({
  client_name: z.string().min(2, 'Name must be at least 2 characters'),
  client_company: z.string().optional().nullable(),
  rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
  review: z.string().min(10, 'Review must be at least 10 characters'),
  avatar_url: z.string().url('Invalid URL').optional().nullable(),
  is_approved: z.boolean().default(false),
});

export const contactMessageSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().nullable(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Name must be at least 2 characters').optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type ServiceFormData = z.infer<typeof serviceSchema>;
export type PortfolioFormData = z.infer<typeof portfolioSchema>;
export type TestimonialFormData = z.infer<typeof testimonialSchema>;
export type ContactMessageFormData = z.infer<typeof contactMessageSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
