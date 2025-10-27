'use client';

import { useState, useEffect } from 'react';
import { Section } from '@/components/common/Section';
import { PortfolioCard } from '@/components/sections/Portfolio/PortfolioCard';
import { portfolioQueries, projectTypeQueries } from '@/lib/supabase/queries';
import { Portfolio, ProjectType } from '@/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portfoliosData, projectTypesData] = await Promise.all([
          portfolioQueries.getAll(),
          projectTypeQueries.getActive()
        ]);
        setPortfolios(portfoliosData || []);
        setProjectTypes(projectTypesData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPortfolios = selectedCategory === 'All' 
    ? portfolios 
    : portfolios.filter(portfolio => 
        portfolio.project_type?.name === selectedCategory || 
        portfolio.category === selectedCategory
      );

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
        background="dark"
      >
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12">
          <Button
            variant={selectedCategory === 'All' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('All')}
            className={`mb-2 ${
              selectedCategory === 'All' 
                ? 'tech-button' 
                : 'border-[#3FA9F5]/30 text-[#D1D1D1] hover:text-white hover:border-[#3FA9F5]/50'
            }`}
          >
            All
          </Button>
          {projectTypes.map((projectType) => (
            <Button
              key={projectType.id}
              variant={selectedCategory === projectType.name ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(projectType.name)}
              className={`mb-2 ${
                selectedCategory === projectType.name 
                  ? 'tech-button' 
                  : 'border-[#3FA9F5]/30 text-[#D1D1D1] hover:text-white hover:border-[#3FA9F5]/50'
              }`}
            >
              {projectType.name}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid-responsive">
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
              <DialogContent className="max-w-4xl bg-deep-navy border-[#3FA9F5]/30">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-white">{portfolio.title}</DialogTitle>
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
                  <p className="text-[#D1D1D1] leading-relaxed">
                    {portfolio.description}
                  </p>
                  
                  {/* Project Type, Category and Tech Stack */}
                  <div className="flex flex-wrap gap-4">
                    {portfolio.project_type && (
                      <Badge variant="secondary" className="text-sm bg-[#3FA9F5]/20 text-[#3FA9F5] border-[#3FA9F5]/30">
                        {portfolio.project_type.name}
                      </Badge>
                    )}
                    {portfolio.category && (
                      <Badge variant="secondary" className="text-sm bg-[#C6A664]/20 text-[#C6A664] border-[#C6A664]/30">
                        {portfolio.category}
                      </Badge>
                    )}
                    {portfolio.tech_stack?.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-sm border-[#3FA9F5]/30 text-[#D1D1D1]">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {portfolio.project_url && (
                      <Button asChild className="tech-button">
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
                    <Button variant="outline" className="border-[#3FA9F5]/30 text-[#D1D1D1] hover:text-white hover:border-[#3FA9F5]/50">
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
            <p className="text-[#D1D1D1] text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </Section>
    </div>
  );
}
