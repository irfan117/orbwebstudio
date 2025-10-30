'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/common/Section';
import { ArrowRight, Sparkles, Zap, Star, Rocket } from 'lucide-react';

export default function CTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Section
      title={
        <span className="flex items-center justify-center gap-3">
          <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-[#3FA9F5]" />
          Siap Memulai Proyek Anda?
        </span>
      }
      subtitle="Mari wujudkan ide Anda menjadi karya digital yang berdampak. Konsultasi gratis untuk membahas kebutuhan proyek Anda."
      background="transparent"
    >
      <div className="text-center space-y-6 sm:space-y-8 max-w-6xl mx-auto">
        {/* Enhanced Features Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass-card-tech p-4 sm:p-6 rounded-xl hover:border-[#3FA9F5]/60 transition-all duration-300 group">
            <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[#3FA9F5]/40 rounded-lg flex items-center justify-center group-hover:border-[#3FA9F5]">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#3FA9F5]" />
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Konsultasi Gratis</h3>
            <p className="text-[#D1D1D1] text-xs sm:text-sm">Diskusi awal tanpa biaya untuk memahami kebutuhan Anda</p>
          </div>

          <div className="glass-card-tech p-4 sm:p-6 rounded-xl hover:border-[#3FA9F5]/60 transition-all duration-300 group">
            <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[#3FA9F5]/40 rounded-lg flex items-center justify-center group-hover:border-[#3FA9F5]">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#3FA9F5]" />
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Estimasi Gratis</h3>
            <p className="text-[#D1D1D1] text-xs sm:text-sm">Perkiraan biaya dan timeline yang transparan</p>
          </div>

          <div className="glass-card-tech p-4 sm:p-6 rounded-xl hover:border-[#3FA9F5]/60 transition-all duration-300 group">
            <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[#3FA9F5]/40 rounded-lg flex items-center justify-center group-hover:border-[#3FA9F5]">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-[#3FA9F5]" />
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Garansi 100%</h3>
            <p className="text-[#D1D1D1] text-xs sm:text-sm">Kepuasan pelanggan adalah prioritas utama kami</p>
          </div>
        </div>

        {/* Enhanced CTA Button */}
        <div
          className={`space-y-4 sm:space-y-6 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Button
            asChild
            size="lg"
            className="group tech-button text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-8 hover:scale-105"
          >
            <Link href="/contact" className="flex items-center">
              Mulai Proyek Sekarang
              <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#D1D1D1]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#3FA9F5] rounded-full"></div>
              <span>Respon cepat dalam 24 jam</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#C6A664] rounded-full"></div>
              <span>Tim siap membantu Anda</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}