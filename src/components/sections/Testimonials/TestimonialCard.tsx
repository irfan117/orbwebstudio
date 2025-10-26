import type { Testimonial } from '@/types';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="relative glass rounded-3xl p-8 md:p-10 hover-lift">
      {/* Decorative Elements */}
      <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-slate-400/20 to-gray-400/20 rounded-full blur-2xl" />
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-2xl" />
      
      <div className="relative">
        {/* Quote Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg rotate-6 hover:rotate-0 transition-transform">
            <Quote className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Rating */}
        <div className="flex justify-center mb-6 gap-1">
          {renderStars(testimonial.rating)}
        </div>

        {/* Review Text */}
        <blockquote className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed text-center">
          <span className="text-amber-600 font-serif text-3xl">"</span>
          {testimonial.review}
          <span className="text-amber-600 font-serif text-3xl">"</span>
        </blockquote>

        {/* Client Info */}
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full blur-md opacity-50" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white font-bold text-2xl shadow-xl border-4 border-white">
              {testimonial.client_name.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Name and Company */}
          <div className="text-center">
            <div className="font-bold text-gray-900 text-xl mb-1">
              {testimonial.client_name}
            </div>
            {testimonial.client_company && (
              <div className="text-sm text-gray-600 font-medium px-4 py-1 bg-gray-100 rounded-full inline-block">
                {testimonial.client_company}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}