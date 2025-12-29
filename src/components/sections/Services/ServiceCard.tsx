import type { Service } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Star, Sparkles } from 'lucide-react';
import { IconRenderer } from '@/components/common/IconRenderer';

interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}

export function ServiceCard({ service, featured = false }: ServiceCardProps) {
  const features = Array.isArray(service.features) ? service.features : [];

  return (
    <div className={`group relative h-full flex ${featured ? 'md:col-span-2' : ''}`}>
      {/* Accent Border Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3FA9F5]/40 via-[#3FA9F5]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />

      <div className={`relative w-full glass-card-tech rounded-2xl p-6 sm:p-8 ${featured ? 'md:p-10' : ''} flex flex-col justify-between transition-all duration-300 group-hover:translate-y-[-4px]`}>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#3FA9F5] to-[#C6A664] text-white px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg z-20">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current animate-pulse" />
            MOST POPULAR
          </div>
        )}

        {/* Content Wrapper */}
        <div className={`flex flex-col h-full ${featured ? 'md:flex-row md:gap-12' : ''}`}>

          {/* Top/Left Section: Icon, Title, Price */}
          <div className={`flex flex-col ${featured ? 'md:w-5/12' : ''}`}>
            {/* Header: Icon & Title */}
            <div className="mb-5 sm:mb-6">
              {service.icon && (
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#3FA9F5]/10 border border-[#3FA9F5]/20 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 group-hover:bg-[#3FA9F5]/20 transition-all duration-300 shadow-[0_0_20px_rgba(63,169,245,0.15)]">
                  <IconRenderer name={service.icon} className="text-[#3FA9F5]" size={28} /> {/* Size fixed via class or just keep 28/32 if component allows */}
                </div>
              )}

              <h3 className={`font-bold text-white mb-2 sm:mb-3 leading-tight ${featured ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-xl sm:text-2xl'}`}>
                {service.title}
              </h3>

              <p className={`text-[#D1D1D1]/80 leading-relaxed text-sm sm:text-base ${featured ? 'sm:text-lg' : ''}`}>
                {service.description}
              </p>
            </div>

            {/* Price section pushes down in standard card, stays top in featured */}
            <div className="mt-auto pt-5 sm:pt-6 border-t border-white/5">
              {service.price && (
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm text-[#D1D1D1]/60 uppercase tracking-wider font-medium mb-1">Mulai dari</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`font-bold tracking-tight ${featured ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-3xl sm:text-4xl'}`}>
                      <span className="gradient-text-tech">Rp{(service.price / 1000000).toFixed(0)}</span>
                      <span className="text-[#3FA9F5]">jt</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom/Right Section: Features & Button */}
          <div className={`flex flex-col ${featured ? 'md:w-7/12 border-t-0 border-l border-white/5 md:pl-12' : 'mt-6 sm:mt-8'}`}>

            {/* Features List */}
            <div className="flex-grow">
              <h4 className="flex items-center gap-2 text-white font-semibold mb-4 sm:mb-6 text-sm sm:text-base">
                <Sparkles className="w-4 h-4 text-[#C6A664]" />
                What's Included:
              </h4>

              {features.length > 0 && (
                <ul className="space-y-3 sm:space-y-4">
                  {features.slice(0, featured ? 8 : 5).map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-[#D1D1D1] group/item">
                      <div className="w-5 h-5 rounded-full bg-[#3FA9F5]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#3FA9F5]/20 transition-colors">
                        <Check className="w-3 h-3 text-[#3FA9F5]" />
                      </div>
                      <span className={`text-sm leading-relaxed ${featured ? 'md:text-base' : ''}`}>{feature}</span>
                    </li>
                  ))}
                  {features.length > (featured ? 8 : 5) && (
                    <li className="text-sm text-[#C6A664] pl-8 italic font-medium">
                      + {features.length - (featured ? 8 : 5)} premium benefits
                    </li>
                  )}
                </ul>
              )}
            </div>

            {/* Action Button */}
            <div className="mt-6 sm:mt-8 pt-6">
              <Button
                asChild
                className={`w-full tech-button-gradient relative overflow-hidden group/btn ${featured ? 'h-12 sm:h-14 text-base sm:text-lg' : 'h-11 sm:h-12 text-sm sm:text-base'}`}
              >
                <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="flex items-center justify-center gap-2">
                  <span className="relative z-10 font-medium">Konsultasi Sekarang</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3FA9F5] to-[#2d8fd5] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}