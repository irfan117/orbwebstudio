'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Star, Rocket } from 'lucide-react';

export default function CTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-stone-50">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23475569' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} 
        />
      </div>

      {/* Decorative Matte Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-slate-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-36 h-36 bg-stone-300/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Matte Icon Container */}
          <div 
            className={`flex justify-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-slate-600/20 rounded-full blur-xl" />
              <div className="relative w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform border-4 border-slate-600/20">
                <Rocket className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-4 h-4 text-white fill-current" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div 
            className={`space-y-4 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="heading-lg text-slate-900">
              Siap Memulai Proyek Anda?
            </h2>
            <p className="body-lg text-slate-600 max-w-2xl mx-auto">
              Mari wujudkan ide Anda menjadi karya digital yang berdampak. Konsultasi gratis untuk membahas kebutuhan proyek Anda.
            </p>
          </div>

          {/* Features Grid with Matte Colors */}
          <div 
            className={`grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-700">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                </div>
                <span>Konsultasi Gratis</span>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-700">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-slate-700" />
                </div>
                <span>Estimasi Gratis</span>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-700">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-orange-700" />
                </div>
                <span>Garansi 100%</span>
              </div>
            </div>
          </div>
          
          {/* CTA Button - Matte Style */}
          <div 
            className={`space-y-4 transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Button 
              asChild 
              size="lg" 
              className="group text-xl px-12 py-8 bg-slate-800 hover:bg-slate-900 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-slate-700"
            >
              <Link href="/contact" className="flex items-center">
                Mulai Proyek Sekarang
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            
            <p className="text-sm text-slate-500 font-medium">
              🚀 Respon cepat dalam 24 jam • 💬 Tim siap membantu Anda
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}