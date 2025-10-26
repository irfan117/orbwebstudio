/**
 * Helper Utilities
 *
 * @description Common utility functions used across the application
 * Includes formatting, date handling, and storage helpers
 */

import { format, formatDistance } from 'date-fns';

export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) return 'Contact us';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string | Date, formatStr: string = 'dd MMM yyyy'): string {
  return format(new Date(date), formatStr);
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export async function uploadImage(
  file: File,
  bucket: string = 'images'
): Promise<string> {
  const { supabase } = await import('@/lib/supabase/client');

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return publicUrl;
}

export async function deleteImage(url: string, bucket: string = 'images'): Promise<void> {
  const { supabase } = await import('@/lib/supabase/client');

  const path = url.split('/').pop();
  if (!path) return;

  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) throw error;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export { cn } from './index';
