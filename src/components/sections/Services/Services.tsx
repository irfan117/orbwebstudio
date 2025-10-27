'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/common/Section';
import { ServiceCard } from './ServiceCard';
import { serviceQueries } from '@/lib/supabase/queries';
import type { Service } from '@/types';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceQueries.getActive();
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <Section title="Layanan Kami" subtitle="Layanan kami dirancang untuk memberikan solusi menyeluruh — mulai dari desain, pengembangan, hingga pemeliharaan.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="glass rounded-2xl h-96" />
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section
      title={
        <span className="flex items-center justify-center gap-3">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-[#3FA9F5]" />
          Layanan Kami
        </span>
      }
      subtitle="Kami membantu bisnis menciptakan pengalaman digital yang powerful dengan teknologi terkini dan desain modern."
      background="dark"
    >
      {/* Bento Grid Layout */}
      <div className="grid-responsive auto-rows-fr">
        {services.map((service, index) => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            featured={index === 0}
          />
        ))}
      </div>

      <div className="text-center mt-12 sm:mt-16">
        <Button 
          asChild 
          size="lg" 
          className="group tech-button text-lg px-6 sm:px-8 py-4 sm:py-6"
        >
          <Link href="/services" className="flex items-center">
            Lihat Semua Layanan
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}