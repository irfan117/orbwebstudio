import type { Service } from '@/types';
import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Star } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}

export function ServiceCard({ service, featured = false }: ServiceCardProps) {
  const features = Array.isArray(service.features) ? service.features : [];

  return (
    <div className={`group relative ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}>
      {/* Accent Border Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3FA9F5]/30 via-[#3FA9F5]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />

      <div className={`relative glass-card-tech rounded-2xl p-6 ${featured ? 'md:p-8' : ''} h-full flex flex-col`}
      >
        {/* Featured Badge */}
        {featured && (
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            POPULER
          </div>
        )}

        {/* Icon */}
        {service.icon && (
          <div className="w-14 h-14 bg-[#3FA9F5]/15 border border-[#3FA9F5]/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
            <span className="text-2xl">{service.icon}</span>
          </div>
        )}

        {/* Title */}
        <h3 className={`font-bold text-white mb-3 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          {service.title}
        </h3>

        {/* Description */}
        <p className={`text-[#D1D1D1] mb-6 flex-grow ${featured ? 'text-base md:text-lg' : 'text-sm'}`}>
          {service.description}
        </p>

        {/* Price */}
        {service.price && (
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className={`font-bold ${featured ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>
                <span className="gradient-text-tech">Rp{(service.price / 1000000).toFixed(1)}jt</span>
              </span>
              <span className="text-[#D1D1D1]/70 text-sm">/proyek</span>
            </div>
          </div>
        )}

        {/* Features */}
        {features.length > 0 && (
          <ul className="space-y-3 mb-6">
            {features.slice(0, featured ? 6 : 4).map((feature, index) => (
              <li key={index} className="flex items-start text-sm text-[#D1D1D1]">
                <div className="w-5 h-5 bg-[#3FA9F5]/20 border border-[#3FA9F5]/40 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#3FA9F5]" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
            {features.length > (featured ? 6 : 4) && (
              <li className="text-sm text-[#D1D1D1]/70 pl-8">
                +{features.length - (featured ? 6 : 4)} fitur lainnya
              </li>
            )}
          </ul>
        )}

        {/* CTA Button */}
        <Button 
          asChild
          className={`w-full tech-button text-white shadow-lg hover:shadow-[#3FA9F5]/40 transition-all duration-300 group/btn ${featured ? 'py-6 text-lg' : ''}`}
        >
          <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="flex items-center justify-center">
            Mulai Sekarang
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
}