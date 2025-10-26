import type { Portfolio } from '@/types';
import { Button } from '@/components/ui/button';
import { ExternalLink, Eye, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

interface PortfolioCardProps {
  portfolio: Portfolio;
}

export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl glass hover-lift h-full flex flex-col">
      {/* Image Container with Overlay */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 to-stone-100">
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
            className="bg-white text-gray-900 hover:bg-white/90 shadow-2xl"
          >
            <Eye className="w-5 h-5 mr-2" />
            Lihat Detail
          </Button>
        </div>

        {/* Category Badge */}
        {portfolio.category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-900 rounded-full shadow-lg">
              {portfolio.category}
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {portfolio.is_featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full shadow-lg">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-slate-700 transition-colors">
          {portfolio.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {portfolio.description}
        </p>

        {/* Tech Stack */}
        {portfolio.tech_stack && portfolio.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {portfolio.tech_stack.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-slate-50 to-stone-50 text-slate-700 rounded-lg border border-slate-200"
              >
                {tech}
              </span>
            ))}
            {portfolio.tech_stack.length > 3 && (
              <span className="px-2.5 py-1 text-xs font-medium text-gray-500 bg-gray-50 rounded-lg">
                +{portfolio.tech_stack.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Button */}
        {portfolio.project_url && (
          <Button 
            asChild 
            className="w-full bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
          >
            <a
              href={portfolio.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              Lihat Proyek
              <ArrowUpRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}