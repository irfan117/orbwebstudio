'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const [activeLink, setActiveLink] = useState('');
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={cn('flex items-center space-x-8', className)}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => scrollToSection(item.href)}
          className={cn(
            'relative font-medium transition-colors duration-200 hover:text-blue-600',
            activeLink === item.href
              ? 'text-blue-600'
              : 'text-gray-700'
          )}
        >
          {item.name}
          {activeLink === item.href && (
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </Link>
      ))}
    </nav>
  );
}
