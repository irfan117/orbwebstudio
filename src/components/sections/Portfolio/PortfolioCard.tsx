import { Portfolio } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Eye } from 'lucide-react';

interface PortfolioCardProps {
  portfolio: Portfolio;
}

export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  return (
    <Card
      title={portfolio.title}
      description={portfolio.description}
      image={portfolio.image_url}
      hover
      className="group overflow-hidden"
    >
      <div className="space-y-4">
        {/* Category */}
        {portfolio.category && (
          <div className="inline-block">
            <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {portfolio.category}
            </span>
          </div>
        )}
        
        {/* Tech Stack */}
        {portfolio.tech_stack && portfolio.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {portfolio.tech_stack.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
              >
                {tech}
              </span>
            ))}
            {portfolio.tech_stack.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500">
                +{portfolio.tech_stack.length - 3} more
              </span>
            )}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          {portfolio.project_url && (
            <Button asChild size="sm" className="flex-1">
              <a
                href={portfolio.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
          
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="w-4 h-4 mr-2" />
            Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
