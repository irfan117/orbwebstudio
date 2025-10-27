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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient-bg"> {/* Section hero dengan background gradient yang beranimasi */}
      {/* Tech Grid Pattern - Pola grid sebagai background */}
      <div className="absolute inset-0 tech-grid-pattern" />

      {/* Dots Pattern Overlay - Pola titik sebagai overlay */}
      <div className="absolute inset-0 dots-pattern" />

      {/* Cyber Blue Glow Elements - Elemen glow biru sebagai dekorasi */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#3FA9F5]/10 rounded-full blur-3xl float-animation" /> {/* Glow biru besar dengan animasi float */}
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#3FA9F5]/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '3s' }} /> {/* Glow biru dengan delay */}
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#C6A664]/5 rounded-full blur-3xl float-animation" style={{ animationDelay: '1.5s' }} /> {/* Glow emas kecil */}
      </div>

      {/* Animated Decorative Lines */}
      <div className="absolute top-0 left-1/4 w-px h-40 bg-gradient-to-b from-transparent via-[#3FA9F5]/40 to-transparent animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-0 right-1/3 w-px h-48 bg-gradient-to-t from-transparent via-[#3FA9F5]/40 to-transparent animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-0 h-px w-32 bg-gradient-to-l from-transparent via-[#3FA9F5]/40 to-transparent animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
      <div className="absolute top-1/2 left-0 h-px w-24 bg-gradient-to-r from-transparent via-[#3FA9F5]/30 to-transparent animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '2s' }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="text-center">
          {/* Tech Badge - Badge dengan efek glassmorphism */}
          <div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card-tech mb-10 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8' // Animasi fade in dari bawah
            }`}
          >
            <Code2 className="w-5 h-5 text-[#3FA9F5]" />
            <span className="text-sm font-medium text-white tracking-wide">Modern Web Solutions</span>
          </div>

          {/* Main Headline - Judul utama dengan efek neon line */}
          <h1
            className={`heading-xl text-white mb-8 neon-line transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8' // Animasi fade in dengan delay
            }`}
          >
            Transformasi Digital untuk{' '}
            <span className="gradient-text-tech relative inline-block"> {/* Teks dengan gradient biru ke emas */}
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
              className="group tech-button text-lg px-10 py-7" // Tombol dengan styling tech modern
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
              className="group text-lg px-10 py-7 !bg-transparent backdrop-blur-md border-2 border-white/30 text-white hover:!bg-white/10 hover:border-white/50 hover:backdrop-blur-lg active:!bg-white/20 active:backdrop-blur-xl transition-all duration-300" // Tombol transparan seperti kaca tanpa background default, hanya blur dan border
            >
              <Link href="/portfolio" className="flex items-center">
                Lihat Portfolio
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
        </div>
      </div>
      
      {/* Tech Scroll Indicator - Indikator scroll dengan efek glow */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 glowing-border rounded-full flex justify-center pulse-glow"> {/* Container dengan border glow dan pulse */}
          <div className="w-1.5 h-3 bg-[#3FA9F5] rounded-full mt-2 animate-pulse" /> {/* Indikator scroll biru */}
        </div>
      </div>
    </section>
  );
}