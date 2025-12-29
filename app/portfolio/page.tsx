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
import Image from 'next/image';

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
        portfolio.category?.name === selectedCategory
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
                <div className="bg-[#1C1C1E] rounded-lg h-64" />
              </div>
            ))}
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section with Image */}
      <section className="section-tech bg-deep-navy relative overflow-hidden">
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 tech-grid-pattern opacity-20" />

        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="heading-lg text-white mb-6">Our Portfolio</h1>
              <p className="body-lg text-[#D1D1D1] mb-6">
                Setiap proyek kami mencerminkan dedikasi, kreativitas, dan kualitas.
              </p>
              <p className="body-lg text-[#D1D1D1] mb-8">
                Lihat hasil kerja kami di berbagai bidang dan industri. Dari website perusahaan
                hingga aplikasi mobile, kami telah membantu banyak bisnis mencapai tujuan digital mereka.
              </p>

              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center glass-card-tech p-4 rounded-xl">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    50+
                  </div>
                  <div className="text-xs sm:text-sm text-[#D1D1D1] font-medium">Projects</div>
                </div>
                <div className="text-center glass-card-tech p-4 rounded-xl">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    15+
                  </div>
                  <div className="text-xs sm:text-sm text-[#D1D1D1] font-medium">Industries</div>
                </div>
                <div className="text-center glass-card-tech p-4 rounded-xl">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    100%
                  </div>
                  <div className="text-xs sm:text-sm text-[#D1D1D1] font-medium">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-[#3FA9F5]/20 rounded-2xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#3FA9F5]/30">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                  alt="Portfolio showcase"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        title={
          <span className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 border-2 border-[#3FA9F5]/50 rounded-xl flex items-center justify-center bg-[#3FA9F5]/10">
              <svg className="w-6 h-6 text-[#3FA9F5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            Featured Projects
          </span>
        }
        subtitle="Koleksi proyek inovatif yang telah membantu klien kami mencapai kesuksesan digital."
        background="dark"
      >
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 sm:mb-12">
          <Button
            variant={selectedCategory === 'All' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('All')}
            className={`mb-2 transition-all duration-300 ${
              selectedCategory === 'All'
                ? 'tech-button shadow-lg shadow-[#3FA9F5]/30'
                : 'border-2 border-[#3FA9F5]/40 bg-[#3FA9F5]/10 text-[#3FA9F5] hover:bg-[#3FA9F5]/20 hover:border-[#3FA9F5]/60 hover:text-white hover:shadow-md hover:shadow-[#3FA9F5]/20'
            }`}
          >
            All
          </Button>
          {projectTypes.map((projectType) => (
            <Button
              key={projectType.id}
              variant={selectedCategory === projectType.name ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(projectType.name)}
              className={`mb-2 transition-all duration-300 ${
                selectedCategory === projectType.name
                  ? 'tech-button shadow-lg shadow-[#3FA9F5]/30'
                  : 'border-2 border-[#3FA9F5]/40 bg-[#3FA9F5]/10 text-[#3FA9F5] hover:bg-[#3FA9F5]/20 hover:border-[#3FA9F5]/60 hover:text-white hover:shadow-md hover:shadow-[#3FA9F5]/20'
              }`}
            >
              {projectType.name}
            </Button>
          ))}
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="text-center glass-card-tech p-6 rounded-xl">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              50<span className="text-[#3FA9F5]">+</span>
            </div>
            <div className="text-xs md:text-sm text-[#D1D1D1] font-medium">Projects Completed</div>
          </div>
          <div className="text-center glass-card-tech p-6 rounded-xl">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              30<span className="text-[#3FA9F5]">+</span>
            </div>
            <div className="text-xs md:text-sm text-[#D1D1D1] font-medium">Happy Clients</div>
          </div>
          <div className="text-center glass-card-tech p-6 rounded-xl">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              3<span className="text-[#3FA9F5]">+</span>
            </div>
            <div className="text-xs md:text-sm text-[#D1D1D1] font-medium">Years Experience</div>
          </div>
          <div className="text-center glass-card-tech p-6 rounded-xl">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              15<span className="text-[#3FA9F5]">+</span>
            </div>
            <div className="text-xs md:text-sm text-[#D1D1D1] font-medium">Industries Served</div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPortfolios.map((portfolio) => (
            <Dialog key={portfolio.id}>
              <DialogTrigger asChild>
                <div
                  className="cursor-pointer h-full"
                  onClick={() => setSelectedPortfolio(portfolio)}
                >
                  <PortfolioCard portfolio={portfolio} />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-deep-navy border-[#3FA9F5]/30">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-white pr-8">{portfolio.title}</DialogTitle>
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
                  <div className="flex flex-wrap gap-3">
                    {portfolio.project_type && (
                      <Badge variant="secondary" className="text-sm bg-[#3FA9F5]/20 text-[#3FA9F5] border-[#3FA9F5]/30">
                        {portfolio.project_type.name}
                      </Badge>
                    )}
                    {portfolio.category && (
                      <Badge variant="secondary" className="text-sm bg-[#C6A664]/20 text-[#C6A664] border-[#C6A664]/30">
                        {portfolio.category.name}
                      </Badge>
                    )}
                    {portfolio.tech_stack?.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-sm border-[#3FA9F5]/30 text-[#D1D1D1]">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    {portfolio.project_url && (
                      <Button asChild className="tech-button flex-1 sm:flex-none">
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
                    <Button variant="outline" className="border-[#3FA9F5]/30 text-[#D1D1D1] hover:text-white hover:border-[#3FA9F5]/50 flex-1 sm:flex-none">
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
          <div className="text-center py-16">
            <div className="glass-card-tech inline-block p-8 rounded-xl">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-white text-lg font-medium mb-2">
                No projects found in this category
              </p>
              <p className="text-[#D1D1D1] text-sm">
                Try selecting a different category or check back later for new projects.
              </p>
            </div>
          </div>
        )}
      </Section>

      {/* Client Testimonials Section */}
      <Section
        title={
          <span className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 border-2 border-[#3FA9F5]/50 rounded-xl flex items-center justify-center bg-[#3FA9F5]/10">
              <svg className="w-6 h-6 text-[#3FA9F5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            What Our Clients Say
          </span>
        }
        subtitle="Testimoni dari klien yang telah bekerja sama dengan kami."
        background="dark"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card-tech p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#3FA9F5]/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-[#3FA9F5] font-bold">A</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">Ahmad Rahman</h4>
                <p className="text-[#D1D1D1] text-sm">CEO, TechStart Indonesia</p>
              </div>
            </div>
            <p className="text-[#D1D1D1] italic">
              "Orb Web Studio berhasil mentransformasi bisnis online kami. Website yang dibuat tidak hanya cantik tapi juga sangat fungsional."
            </p>
            <div className="flex text-[#3FA9F5] mt-4">
              ★★★★★
            </div>
          </div>

          <div className="glass-card-tech p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#3FA9F5]/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-[#3FA9F5] font-bold">S</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">Sarah Wijaya</h4>
                <p className="text-[#D1D1D1] text-sm">Founder, BeautyHub</p>
              </div>
            </div>
            <p className="text-[#D1D1D1] italic">
              "Tim profesional dan responsif. Proyek selesai tepat waktu dengan hasil yang melebihi ekspektasi kami."
            </p>
            <div className="flex text-[#3FA9F5] mt-4">
              ★★★★★
            </div>
          </div>

          <div className="glass-card-tech p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#3FA9F5]/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-[#3FA9F5] font-bold">B</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">Budi Santoso</h4>
                <p className="text-[#D1D1D1] text-sm">Manager, FoodExpress</p>
              </div>
            </div>
            <p className="text-[#D1D1D1] italic">
              "Aplikasi yang dibuat sangat membantu meningkatkan penjualan kami. Support tim sangat baik selama maintenance."
            </p>
            <div className="flex text-[#3FA9F5] mt-4">
              ★★★★★
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <section className="section-tech bg-deep-navy relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern opacity-20" />

        <div className="container-wide relative z-10 text-center">
          <h2 className="heading-md text-white mb-4">Ready to Start Your Project?</h2>
          <p className="body-lg text-[#D1D1D1] mb-8 max-w-2xl mx-auto">
            Punya ide proyek menarik? Mari diskusikan dan wujudkan visi digital Anda bersama kami.
          </p>
          <Button asChild size="lg" className="tech-button text-lg px-8 py-6">
            <a href="/contact" className="flex items-center">
              Start Your Project
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
