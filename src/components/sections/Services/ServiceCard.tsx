import { Service } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const features = Array.isArray(service.features) ? service.features : [];

  return (
    <Card
      title={service.title}
      description={service.description}
      hover
      className="group hover:scale-105 transition-transform duration-300"
    >
      <div className="space-y-4">
        {/* Price */}
        {service.price && (
          <div className="text-center">
            <span className="text-3xl font-bold text-blue-600">
              ${service.price}
            </span>
            <span className="text-gray-500 ml-1">/project</span>
          </div>
        )}
        
        {/* Features */}
        {features.length > 0 && (
          <ul className="space-y-2">
            {features.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
            {features.length > 4 && (
              <li className="text-sm text-gray-500">
                +{features.length - 4} more features
              </li>
            )}
          </ul>
        )}
        
        {/* CTA Button */}
        <Button className="w-full group-hover:bg-blue-700 transition-colors">
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
