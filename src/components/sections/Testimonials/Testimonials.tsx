'use client';

import { useState, useEffect } from 'react';
import { Section } from '@/components/common/Section';
import { TestimonialCard } from './TestimonialCard';
import { testimonialQueries } from '@/lib/supabase/queries';
import { Testimonial } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialQueries.getApproved();
        setTestimonials(data || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <Section 
        title="What Our Clients Say" 
        subtitle="Apa kata mereka tentang bekerja bersama kami — kepercayaan dan kepuasan klien adalah prioritas utama."
        background="blue"
      >
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-64" />
          </div>
        </div>
      </Section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <Section 
        title="What Our Clients Say" 
        subtitle="Apa kata mereka tentang bekerja bersama kami — kepercayaan dan kepuasan klien adalah prioritas utama."
        background="blue"
      >
        <div className="text-center text-gray-500">
          No testimonials available yet.
        </div>
      </Section>
    );
  }

  return (
    <Section 
      title="What Our Clients Say" 
      subtitle="Apa kata mereka tentang bekerja bersama kami — kepercayaan dan kepuasan klien adalah prioritas utama."
      background="blue"
    >
      <div className="max-w-4xl mx-auto">
        {/* Testimonial Carousel */}
        <div className="relative">
          <TestimonialCard testimonial={testimonials[currentIndex]} />
          
          {/* Navigation */}
          {testimonials.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg"
                onClick={nextTestimonial}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
        
        {/* Dots Indicator */}
        {testimonials.length > 1 && (
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
