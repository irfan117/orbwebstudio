'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/common/Section';
import { PortfolioCard } from './PortfolioCard';
import { portfolioQueries } from '@/lib/supabase/queries';
import type { Portfolio } from '@/types';
import { ArrowRight, Briefcase, TrendingUp, Sparkles, Zap } from 'lucide-react';

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
        background="transparent"
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
          <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-[#3FA9F5]" />
          Portfolio Kami
        </span>
      }
      subtitle="Kami percaya hasil berbicara lebih keras dari kata-kata. Berikut beberapa proyek yang kami kembangkan dari nol hingga siap digunakan 👇"
      background="transparent"
    >
      {/* Portfolio Grid */}
      <div className="grid-responsive mb-12 sm:mb-16">
        {portfolios.map((portfolio) => (
          <PortfolioCard key={portfolio.id} portfolio={portfolio} />
        ))}
      </div>

      {/* Tech Divider */}
      <div className="tech-divider mb-8 sm:mb-12" />

      {/* Stats Cards - Moved to bottom and made more compact */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className="group glass-card-tech p-4 sm:p-6 rounded-xl hover:border-[#3FA9F5]/60 transition-all duration-300 text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 border border-[#3FA9F5]/40 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#3FA9F5]" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white mb-1">
            50<span className="text-[#3FA9F5]">+</span>
          </div>
          <div className="text-[#D1D1D1] text-xs sm:text-sm font-medium">Proyek Selesai</div>
          <div className="text-xs text-[#3FA9F5]/70">Dengan kepuasan 100%</div>
        </div>

        <div className="group glass-card-tech p-4 sm:p-6 rounded-xl hover:border-[#3FA9F5]/60 transition-all duration-300 text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 border border-[#3FA9F5]/40 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#3FA9F5]" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white mb-1">
            30<span className="text-[#3FA9F5]">+</span>
          </div>
          <div className="text-[#D1D1D1] text-xs sm:text-sm font-medium">Klien Puas</div>
          <div className="text-xs text-[#3FA9F5]/70">Rating 4.9/5.0</div>
        </div>

        <div className="group glass-card-tech p-4 sm:p-6 rounded-xl hover:border-[#3FA9F5]/60 transition-all duration-300 text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 border border-[#3FA9F5]/40 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#3FA9F5]" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white mb-1">
            3<span className="text-[#3FA9F5]">+</span>
          </div>
          <div className="text-[#D1D1D1] text-xs sm:text-sm font-medium">Tahun Pengalaman</div>
          <div className="text-xs text-[#3FA9F5]/70">Terus berkembang</div>
        </div>
      </div>

      <div className="text-center">
        <Button
          asChild
          size="lg"
          className="group tech-button text-lg px-6 sm:px-8 py-4 sm:py-6"
        >
          <Link href="/portfolio" className="flex items-center">
            Lihat Semua Proyek
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}