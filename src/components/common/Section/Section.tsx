import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps {
  title?: string;
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
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    gradient: 'bg-gradient-to-br from-blue-50 to-purple-50',
  };

  return (
    <section
      className={cn(
        'py-16 lg:py-24',
        backgroundClasses[background],
        className
      )}
    >
      {container && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {(title || subtitle) && (
            <div className="text-center mb-12">
              {title && (
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
