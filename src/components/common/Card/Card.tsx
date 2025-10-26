import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  image?: string;
  description?: string;
  footer?: React.ReactNode;
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, image, description, footer, hover = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border bg-card text-card-foreground shadow-sm',
          hover && 'hover:shadow-md transition-shadow duration-200',
          className
        )}
        {...props}
      >
        {image && (
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img
              src={image}
              alt={title || 'Card image'}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
          )}
          
          {description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {description}
            </p>
          )}
          
          {footer && (
            <div className="mt-4">
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
