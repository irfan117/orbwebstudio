'use client';

import { useState, useEffect } from 'react';
import { Section } from '@/components/common/Section';
import { PortfolioCard } from '@/components/sections/Portfolio/PortfolioCard';
import { portfolioQueries } from '@/lib/supabase/queries';
import { Portfolio } from '@/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);

  const categories = ['All', 'Web App', 'E-commerce', 'Corporate', 'Landing Page', 'Mobile App'];

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const data = await portfolioQueries.getAll();
        setPortfolios(data || []);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const filteredPortfolios = selectedCategory === 'All' 
    ? portfolios 
    : portfolios.filter(portfolio => portfolio.category === selectedCategory);

  if (loading) {
    return (
      <div className="pt-20">
        <Section 
          title="Our Portfolio" 
          subtitle="Setiap proyek kami mencerminkan dedikasi, kreativitas, dan kualitas. Lihat hasil kerja kami di berbagai bidang dan industri."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-64" />
              </div>
            ))}
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div>
      <Section 
        title="Our Portfolio" 
        subtitle="Setiap proyek kami mencerminkan dedikasi, kreativitas, dan kualitas. Lihat hasil kerja kami di berbagai bidang dan industri."
      >
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPortfolios.map((portfolio) => (
            <Dialog key={portfolio.id}>
              <DialogTrigger asChild>
                <div 
                  className="cursor-pointer"
                  onClick={() => setSelectedPortfolio(portfolio)}
                >
                  <PortfolioCard portfolio={portfolio} />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{portfolio.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Image */}
                  {portfolio.image_url && (
                    <div className="aspect-video overflow-hidden rounded-lg">
                      <img
                        src={portfolio.image_url}
                        alt={portfolio.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {portfolio.description}
                  </p>
                  
                  {/* Category and Tech Stack */}
                  <div className="flex flex-wrap gap-4">
                    {portfolio.category && (
                      <Badge variant="secondary" className="text-sm">
                        {portfolio.category}
                      </Badge>
                    )}
                    {portfolio.tech_stack?.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    {portfolio.project_url && (
                      <Button asChild>
                        <a
                          href={portfolio.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    <Button variant="outline">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {filteredPortfolios.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </Section>
    </div>
  );
}
