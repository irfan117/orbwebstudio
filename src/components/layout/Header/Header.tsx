'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Palette, ArrowRight } from 'lucide-react';
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
          ? 'luxury-glass shadow-luxury border-b border-gold-light'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Luxury Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#C6A664]/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-10 h-10 border border-[#C6A664]/40 rounded-lg flex items-center justify-center group-hover:border-[#C6A664] transition-all duration-300">
                <Palette className="w-6 h-6 text-[#C6A664]" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-light gradient-text-luxury" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                WebForge
              </span>
              <p className="text-xs text-[#D1D1D1]/60 -mt-1 font-light tracking-wider">Digital Solutions</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 rounded font-light transition-all duration-300 border-animate ${
                    isActive
                      ? 'text-[#C6A664]'
                      : 'text-[#D1D1D1]/80 hover:text-[#C6A664]'
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
              className="group luxury-button"
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
            className="lg:hidden p-3 rounded text-[#D1D1D1]/80 hover:text-[#C6A664] hover:bg-[#C6A664]/10 transition-all duration-300"
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
            <div className="px-4 pt-4 pb-6 space-y-2 luxury-glass rounded-xl mx-4 mt-2 shadow-luxury border border-gold-light">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-base font-light rounded transition-all duration-300 ${
                      isActive
                        ? 'text-[#C6A664] bg-[#C6A664]/10 border border-[#C6A664]/30'
                        : 'text-[#D1D1D1]/80 hover:text-[#C6A664] hover:bg-[#C6A664]/5'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-[#C6A664]/20">
                <Button 
                  asChild 
                  className="w-full luxury-button"
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
