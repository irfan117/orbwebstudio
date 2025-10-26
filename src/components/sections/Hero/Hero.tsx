'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingUp, Zap, Code2 } from 'lucide-react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient-bg">
      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 tech-grid-pattern" />
      
      {/* Dots Pattern Overlay */}
      <div className="absolute inset-0 dots-pattern" />

      {/* Cyber Blue Glow Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#3FA9F5]/10 rounded-full blur-3xl float-animation" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#3FA9F5]/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#C6A664]/5 rounded-full blur-3xl float-animation" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-1/4 w-px h-40 bg-gradient-to-b from-transparent via-[#3FA9F5]/40 to-transparent" />
      <div className="absolute bottom-0 right-1/3 w-px h-48 bg-gradient-to-t from-transparent via-[#3FA9F5]/40 to-transparent" />
      <div className="absolute top-1/3 right-0 h-px w-32 bg-gradient-to-l from-transparent via-[#3FA9F5]/40 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="text-center">
          {/* Tech Badge */}
          <div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card-tech mb-10 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Code2 className="w-5 h-5 text-[#3FA9F5]" />
            <span className="text-sm font-medium text-white tracking-wide">Modern Web Solutions</span>
          </div>

          {/* Main Headline */}
          <h1
            className={`heading-xl text-white mb-8 neon-line transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Transformasi Digital untuk{' '}
            <span className="gradient-text-tech relative inline-block">
              Bisnis Modern
            </span>
          </h1>
          
          {/* Subheadline - High Contrast */}
          <p
            className={`text-xl md:text-2xl text-[#D1D1D1] max-w-4xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <strong className="text-white">Orb Web Studio</strong> membantu bisnis menciptakan pengalaman digital yang powerful dengan teknologi terkini. Dari website hingga web app kompleks, kami wujudkan visi digital Anda.
          </p>
          
          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-5 mb-20 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Button 
              asChild 
              size="lg" 
              className="group tech-button text-lg px-10 py-7"
            >
              <Link href="/contact" className="flex items-center">
                Mulai Proyek
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="group text-lg px-10 py-7 bg-transparent border-2 border-[#3FA9F5]/50 text-white hover:bg-[#3FA9F5]/10 hover:border-[#3FA9F5] transition-all duration-300"
            >
              <Link href="/portfolio" className="flex items-center">
                Lihat Portfolio
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          {/* Stats with Tech Style */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="group glass-card-tech p-10 rounded-xl cyber-glow">
              <div className="flex items-center justify-center mb-5">
                <div className="w-14 h-14 glowing-border rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 icon-tech" />
                </div>
              </div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-3">
                50<span className="text-[#3FA9F5]">+</span>
              </div>
              <div className="text-[#D1D1D1] font-medium text-base tracking-wide mb-2">Proyek Selesai</div>
              <div className="text-sm text-[#3FA9F5]/70">Dengan kepuasan 100%</div>
            </div>

            <div className="group glass-card-tech p-10 rounded-xl cyber-glow">
              <div className="flex items-center justify-center mb-5">
                <div className="w-14 h-14 glowing-border rounded-lg flex items-center justify-center">
                  <Sparkles className="w-7 h-7 icon-tech" />
                </div>
              </div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-3">
                30<span className="text-[#3FA9F5]">+</span>
              </div>
              <div className="text-[#D1D1D1] font-medium text-base tracking-wide mb-2">Klien Puas</div>
              <div className="text-sm text-[#3FA9F5]/70">Rating 4.9/5.0</div>
            </div>

            <div className="group glass-card-tech p-10 rounded-xl cyber-glow">
              <div className="flex items-center justify-center mb-5">
                <div className="w-14 h-14 glowing-border rounded-lg flex items-center justify-center">
                  <Zap className="w-7 h-7 icon-tech" />
                </div>
              </div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-3">
                3<span className="text-[#3FA9F5]">+</span>
              </div>
              <div className="text-[#D1D1D1] font-medium text-base tracking-wide mb-2">Tahun Pengalaman</div>
              <div className="text-sm text-[#3FA9F5]/70">Terus berkembang</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tech Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 glowing-border rounded-full flex justify-center pulse-glow">
          <div className="w-1.5 h-3 bg-[#3FA9F5] rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}