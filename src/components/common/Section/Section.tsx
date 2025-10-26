import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps {
  title?: string | React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  background?: 'white' | 'gray' | 'blue' | 'gradient';
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
    gray: 'gradient-bg-1',
    blue: 'gradient-bg-3',
    gradient: 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600',
  };

  const textColorClasses = {
    white: 'text-gray-900',
    gray: 'text-gray-900',
    blue: 'text-gray-900',
    gradient: 'text-white',
  };

  const subtitleColorClasses = {
    white: 'text-gray-600',
    gray: 'text-gray-600',
    blue: 'text-gray-600',
    gradient: 'text-white/90',
  };

  return (
    <section
      className={cn(
        'py-20 lg:py-28 relative overflow-hidden',
        backgroundClasses[background],
        className
      )}
    >
      {container && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {(title || subtitle) && (
            <div className="text-center mb-16 space-y-4">
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
                  'body-lg max-w-3xl mx-auto',
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