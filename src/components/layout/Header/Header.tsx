'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang', href: '/about' },
    { name: 'Layanan', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Kontak', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-card-tech shadow-lg border-b border-[#3FA9F5]/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Orb Web Studio */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#3FA9F5]/30 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-11 h-11 glowing-border rounded-lg flex items-center justify-center group-hover:border-[#3FA9F5] transition-all duration-300 bg-[#0A192F]/50">
                <Zap className="w-6 h-6 text-[#3FA9F5]" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-semibold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                Orb Web Studio
              </span>
              <p className="text-xs text-[#D1D1D1]/70 -mt-1 font-light tracking-wider">Modern Web Solutions</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-5 py-2 rounded-lg font-medium transition-all duration-300 underline-glow ${
                    isActive
                      ? 'text-[#3FA9F5] bg-[#3FA9F5]/10'
                      : 'text-[#D1D1D1] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              asChild 
              className="group tech-button"
            >
              <Link href="/contact" className="flex items-center">
                Mulai Proyek
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 rounded-lg text-[#D1D1D1] hover:text-[#3FA9F5] hover:bg-[#3FA9F5]/10 transition-all duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-4 pt-4 pb-6 space-y-2 glass-card-tech rounded-xl mx-4 mt-2 shadow-lg border border-[#3FA9F5]/30">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'text-[#3FA9F5] bg-[#3FA9F5]/10 border border-[#3FA9F5]/30'
                        : 'text-[#D1D1D1] hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-[#3FA9F5]/20">
                <Button 
                  asChild 
                  className="w-full tech-button"
                >
                  <Link href="/contact" className="flex items-center justify-center">
                    Mulai Proyek
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}