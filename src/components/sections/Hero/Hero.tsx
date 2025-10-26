'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy">
      {/* Geometric Pattern Background */}
      <div className="absolute inset-0 geometric-pattern opacity-40" />
      
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/50 to-navy" />

      {/* Decorative Gold Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#C6A664]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C6A664]/5 rounded-full blur-3xl" />
      </div>

      {/* Thin Gold Lines Decoration */}
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-[#C6A664]/30 to-transparent" />
      <div className="absolute bottom-0 right-1/3 w-px h-40 bg-gradient-to-t from-transparent via-[#C6A664]/30 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="text-center">
          {/* Luxury Badge */}
          <div
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full luxury-glass mb-8 border border-gold-light transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm font-light text-[#D1D1D1] tracking-wide">Premium Digital Solutions</span>
          </div>

          {/* Main Headline with Luxury Gradient */}
          <h1
            className={`heading-xl text-white mb-6 transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Bangun identitas digital yang{' '}
            <span className="gradient-text-luxury relative inline-block">
              memukau
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                <path d="M2 6C50 2 150 2 198 6" stroke="url(#luxuryGradient)" strokeWidth="2" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="luxuryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C6A664" />
                    <stop offset="100%" stopColor="#D1D1D1" />
                  </linearGradient>
                </defs>
              </svg>
            </span>{' '}
            bersama kami.
          </h1>
          
          {/* Subheadline */}
          <p
            className={`body-lg text-[#D1D1D1]/80 max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Kami membantu bisnis dan individu menciptakan pengalaman digital yang kuat, modern, dan berkesan dengan teknologi terkini dan desain yang memukau.
          </p>
          
          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Button 
              asChild 
              size="lg" 
              className="group luxury-button text-lg px-10 py-6"
            >
              <Link href="/contact" className="flex items-center">
                Mulai Sekarang
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="group text-lg px-10 py-6 bg-transparent border-2 border-[#C6A664]/40 text-[#C6A664] hover:bg-[#C6A664]/10 hover:border-[#C6A664] transition-all duration-300"
            >
              <Link href="/portfolio" className="flex items-center">
                Lihat Portfolio
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          {/* Stats with Luxury Style */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="group luxury-card p-8 gold-glow">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 border border-[#C6A664]/30 rounded-lg flex items-center justify-center group-hover:border-[#C6A664]/60 transition-colors">
                  <TrendingUp className="w-6 h-6 icon-luxury" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-light gradient-text-luxury mb-2">
                50+
              </div>
              <div className="text-[#D1D1D1]/70 font-light text-sm tracking-wide">Proyek Selesai</div>
              <div className="mt-2 text-xs text-[#C6A664]/60">Dengan kepuasan 100%</div>
            </div>

            <div className="group luxury-card p-8 gold-glow">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 border border-[#C6A664]/30 rounded-lg flex items-center justify-center group-hover:border-[#C6A664]/60 transition-colors">
                  <Sparkles className="w-6 h-6 icon-luxury" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-light gradient-text-luxury mb-2">
                30+
              </div>
              <div className="text-[#D1D1D1]/70 font-light text-sm tracking-wide">Klien Puas</div>
              <div className="mt-2 text-xs text-[#C6A664]/60">Rating 4.9/5.0</div>
            </div>

            <div className="group luxury-card p-8 gold-glow">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 border border-[#C6A664]/30 rounded-lg flex items-center justify-center group-hover:border-[#C6A664]/60 transition-colors">
                  <Zap className="w-6 h-6 icon-luxury" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-light gradient-text-luxury mb-2">
                3+
              </div>
              <div className="text-[#D1D1D1]/70 font-light text-sm tracking-wide">Tahun Pengalaman</div>
              <div className="mt-2 text-xs text-[#C6A664]/60">Terus berkembang</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Luxury Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border border-[#C6A664]/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-[#C6A664] to-transparent rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}