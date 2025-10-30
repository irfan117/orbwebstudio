import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps {
  title?: string | React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  background?: 'white' | 'gray' | 'blue' | 'gradient' | 'dark' | 'transparent';
  className?: string;
  container?: boolean;
}

const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  background = 'white',
  className,
  container = true,
}) => {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    gradient: 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600',
    dark: 'bg-deep-navy relative overflow-hidden', // Tema gelap konsisten
    transparent: 'bg-transparent',
  };

  const textColorClasses = {
    white: 'text-gray-900',
    gray: 'text-gray-900',
    blue: 'text-gray-900',
    gradient: 'text-white',
    dark: 'text-white', // Teks putih untuk tema gelap
    transparent: 'text-white',
  };

  const subtitleColorClasses = {
    white: 'text-gray-600',
    gray: 'text-gray-600',
    blue: 'text-gray-600',
    gradient: 'text-white/90',
    dark: 'text-[#D1D1D1]', // Abu-abu terang untuk tema gelap
    transparent: 'text-[#D1D1D1]',
  };

  return (
    <section
      className={cn(
        'section-tech relative overflow-hidden',
        backgroundClasses[background],
        className
      )}
    >
      {/* Tech Grid Pattern untuk tema gelap */}
      {background === 'dark' && (
        <div className="absolute inset-0 tech-grid-pattern opacity-20" />
      )}
      
      {container && (
        <div className="container-wide relative z-10">
          {(title || subtitle) && (
            <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
              {title && (
                <h2 className={cn(
                  'heading-md',
                  textColorClasses[background]
                )}>
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className={cn(
                  'body-lg max-w-4xl mx-auto',
                  subtitleColorClasses[background]
                )}>
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      )}
      
      {!container && children}
    </section>
  );
};

export { Section };