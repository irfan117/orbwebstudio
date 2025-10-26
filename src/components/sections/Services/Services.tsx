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
          <Sparkles className="w-8 h-8 text-amber-600" />
          Layanan Kami
        </span>
      }
      subtitle="Layanan kami dirancang untuk memberikan solusi menyeluruh — mulai dari desain, pengembangan, hingga pemeliharaan."
    >
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
        {services.map((service, index) => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            featured={index === 0}
          />
        ))}
      </div>

      <div className="text-center mt-16">
        <Button 
          asChild 
          size="lg" 
          className="group bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black shadow-2xl hover:shadow-slate-500/50 transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
        >
          <Link href="/services" className="flex items-center">
            Lihat Semua Layanan
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}