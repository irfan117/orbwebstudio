'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/common/Section';
import { ServiceCard } from './ServiceCard';
import { serviceQueries } from '@/lib/supabase/queries';
import { Service } from '@/types';

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
      <Section title="Our Services" subtitle="Layanan kami dirancang untuk memberikan solusi menyeluruh — mulai dari desain, pengembangan, hingga pemeliharaan.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-64" />
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section 
      title="Our Services" 
      subtitle="Layanan kami dirancang untuk memberikan solusi menyeluruh — mulai dari desain, pengembangan, hingga pemeliharaan."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Button asChild size="lg">
          <Link href="/services">View All Services</Link>
        </Button>
      </div>
    </Section>
  );
}
