'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/common/Section';
import { PortfolioCard } from './PortfolioCard';
import { portfolioQueries } from '@/lib/supabase/queries';
import { Portfolio } from '@/types';

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const data = await portfolioQueries.getFeatured();
        setPortfolios(data || []);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  if (loading) {
    return (
      <Section 
        title="Our Portfolio" 
        subtitle="Kami percaya hasil berbicara lebih keras dari kata-kata. Berikut beberapa proyek yang kami kembangkan dari nol hingga siap digunakan 👇"
        background="gray"
      >
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
      title="Our Portfolio" 
      subtitle="Kami percaya hasil berbicara lebih keras dari kata-kata. Berikut beberapa proyek yang kami kembangkan dari nol hingga siap digunakan 👇"
      background="gray"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolios.map((portfolio) => (
          <PortfolioCard key={portfolio.id} portfolio={portfolio} />
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Button asChild size="lg">
          <Link href="/portfolio">View All Projects</Link>
        </Button>
      </div>
    </Section>
  );
}
