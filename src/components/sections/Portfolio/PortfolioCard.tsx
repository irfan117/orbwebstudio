'use client';

import type { Portfolio } from '@/types';
import { Button } from '@/components/ui/button';
import { ExternalLink, Eye, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

interface PortfolioCardProps {
  portfolio: Portfolio;
}

export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  const getNormalizedUrl = (url: string | null) => {
    if (!url) return '';
    if (!/^https?:\/\//i.test(url)) {
      return 'https://' + url;
    }
    return url;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent redirect if clicking on a button or link
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
      return;
    }

    if (portfolio.project_url) {
      const url = getNormalizedUrl(portfolio.project_url);
      console.log('Redirecting to:', url);
      window.open(url, '_blank');
    }
  };

  const normalizedProjectUrl = getNormalizedUrl(portfolio.project_url);

  return (
    <div
      onClick={handleCardClick}
      className={`group relative overflow-hidden rounded-xl glass-card-tech hover-lift h-full flex flex-col ${portfolio.project_url ? 'cursor-pointer' : ''}`}
    >
      {/* Image Container with Overlay */}
      <div className="relative h-56 sm:h-64 overflow-hidden bg-[#1C1C1E]">
        {portfolio.image_url ? (
          <Image
            src={portfolio.image_url}
            alt={portfolio.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl opacity-20">🎨</div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="lg"
            className="bg-white text-gray-900 hover:bg-white/90 shadow-2xl scale-90 sm:scale-100"
          >
            <Eye className="w-5 h-5 mr-2" />
            Lihat Detail
          </Button>
        </div>

        {/* Category Badge */}
        {portfolio.category && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-semibold glass-card-tech text-white rounded-full shadow-lg border border-[#3FA9F5]/30">
              {portfolio.category.name}
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {portfolio.is_featured && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-semibold bg-[#3FA9F5] text-white rounded-full shadow-lg">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-grow flex flex-col bg-[#1C1C1E]">
        {/* Title - High Contrast */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#3FA9F5] transition-colors line-clamp-1">
          {portfolio.title}
        </h3>

        {/* Description - High Contrast */}
        <p className="text-[#D1D1D1] text-xs sm:text-sm mb-4 line-clamp-3 flex-grow">
          {portfolio.description}
        </p>

        {/* Tech Stack - High Contrast */}
        {portfolio.tech_stack && portfolio.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            {portfolio.tech_stack.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-[#0A192F] text-[#3FA9F5] rounded-lg border border-[#3FA9F5]/30"
              >
                {tech}
              </span>
            ))}
            {portfolio.tech_stack.length > 3 && (
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium text-[#D1D1D1] bg-[#0A192F] rounded-lg border border-[#3FA9F5]/20">
                +{portfolio.tech_stack.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Button */}
        {portfolio.project_url && (
          <Button
            asChild
            className="w-full tech-button h-10 sm:h-11 text-xs sm:text-sm"
          >
            <a
              href={normalizedProjectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              Lihat Proyek
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}