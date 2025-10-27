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
  ({ className, title, image, description, footer, hover = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border shadow-sm',
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
        
        {/* Render title/description/footer structure if they exist */}
        {title && (
          <h3 className="text-lg font-semibold text-white mb-2">
            {title}
          </h3>
        )}
        
        {description && (
          <p className="text-[#D1D1D1] text-sm leading-relaxed mb-4">
            {description}
          </p>
        )}
        
        {children}
        
        {footer && (
          <div className="mt-4">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
