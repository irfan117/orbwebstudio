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
        background="dark"
      >
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="glass-card-tech rounded-lg h-64" />
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
        background="dark"
      >
        <div className="text-center text-[#D1D1D1]">
          No testimonials available yet.
        </div>
      </Section>
    );
  }

  return (
    <Section
      title={
        <span className="flex items-center justify-center gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 border border-[#3FA9F5]/40 rounded-lg flex items-center justify-center">
            <span className="text-[#3FA9F5] text-lg font-bold">"</span>
          </div>
          Apa Kata Klien Kami
        </span>
      }
      subtitle="Apa kata mereka tentang bekerja bersama kami — kepercayaan dan kepuasan klien adalah prioritas utama."
      background="dark"
    >
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Testimonial Carousel */}
        <div className="relative px-4 md:px-16">
          <div className="transition-all duration-700 ease-in-out transform">
            <TestimonialCard testimonial={testimonials[currentIndex]} />
          </div>

          {/* Enhanced Navigation Buttons */}
          {testimonials.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 glass-card-tech shadow-2xl hover:shadow-[#3FA9F5]/30 transition-all duration-500 border-2 hover:scale-125 hover:border-[#3FA9F5]/60 w-12 h-12 sm:w-14 sm:h-14 backdrop-blur-xl"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 glass-card-tech shadow-2xl hover:shadow-[#3FA9F5]/30 transition-all duration-500 border-2 hover:scale-125 hover:border-[#3FA9F5]/60 w-12 h-12 sm:w-14 sm:h-14 backdrop-blur-xl"
                onClick={nextTestimonial}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </Button>
            </>
          )}
        </div>

        {/* Enhanced Dots Indicator */}
        {testimonials.length > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-8 sm:mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? 'w-8 h-3 sm:w-10 sm:h-4 bg-gradient-to-r from-[#3FA9F5] to-[#C6A664] shadow-lg shadow-[#3FA9F5]/50'
                    : 'w-3 h-3 sm:w-4 sm:h-4 bg-[#3FA9F5]/30 hover:bg-[#3FA9F5]/60 hover:scale-110'
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

        {/* Auto-play indicator */}
        {isAutoPlaying && testimonials.length > 1 && (
          <div className="text-center mt-4 sm:mt-6">
            <div className="inline-flex items-center gap-2 text-xs text-[#3FA9F5]/70">
              <div className="w-2 h-2 bg-[#3FA9F5] rounded-full animate-pulse"></div>
              Auto-play aktif
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
