import { Testimonial } from '@/types';
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
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      {/* Quote Icon */}
      <div className="flex justify-center mb-6">
        <Quote className="w-12 h-12 text-blue-100" />
      </div>
      
      {/* Rating */}
      <div className="flex justify-center mb-4">
        {renderStars(testimonial.rating)}
      </div>
      
      {/* Review Text */}
      <blockquote className="text-lg text-gray-700 mb-6 italic">
        "{testimonial.review}"
      </blockquote>
      
      {/* Client Info */}
      <div className="flex items-center justify-center space-x-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
          {testimonial.client_name.charAt(0).toUpperCase()}
        </div>
        
        {/* Name and Company */}
        <div className="text-left">
          <div className="font-semibold text-gray-900">
            {testimonial.client_name}
          </div>
          {testimonial.client_company && (
            <div className="text-sm text-gray-600">
              {testimonial.client_company}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
