'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/common/Section';
import { PortfolioCard } from './PortfolioCard';
import { portfolioQueries } from '@/lib/supabase/queries';
import type { Portfolio } from '@/types';
import { ArrowRight, Briefcase } from 'lucide-react';

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
        title="Portfolio Kami" 
        subtitle="Kami percaya hasil berbicara lebih keras dari kata-kata. Berikut beberapa proyek yang kami kembangkan dari nol hingga siap digunakan 👇"
        background="gray"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <Briefcase className="w-8 h-8 text-amber-600" />
          Portfolio Kami
        </span>
      }
      subtitle="Kami percaya hasil berbicara lebih keras dari kata-kata. Berikut beberapa proyek yang kami kembangkan dari nol hingga siap digunakan 👇"
      background="gray"
    >
      {/* Masonry-style Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {portfolios.map((portfolio) => (
          <PortfolioCard key={portfolio.id} portfolio={portfolio} />
        ))}
      </div>

      <div className="text-center mt-16">
        <Button 
          asChild 
          size="lg" 
          className="group bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black shadow-2xl hover:shadow-slate-500/50 transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
        >
          <Link href="/portfolio" className="flex items-center">
            Lihat Semua Proyek
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}