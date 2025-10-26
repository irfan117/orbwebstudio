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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
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
      title="Apa Kata Klien Kami"
      subtitle="Apa kata mereka tentang bekerja bersama kami — kepercayaan dan kepuasan klien adalah prioritas utama."
      background="blue"
    >
      <div className="max-w-5xl mx-auto">
        {/* Testimonial Carousel */}
        <div className="relative px-4 md:px-16">
          <div className="transition-all duration-500 ease-in-out">
            <TestimonialCard testimonial={testimonials[currentIndex]} />
          </div>

          {/* Navigation Buttons */}
          {testimonials.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 glass shadow-xl hover:shadow-2xl transition-all duration-300 border-2 hover:scale-110 w-12 h-12"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 glass shadow-xl hover:shadow-2xl transition-all duration-300 border-2 hover:scale-110 w-12 h-12"
                onClick={nextTestimonial}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        {testimonials.length > 1 && (
          <div className="flex justify-center items-center space-x-3 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 h-3 bg-gradient-to-r from-slate-600 to-slate-800' 
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
