'use client';

import { useState, useEffect } from 'react';
import { Section } from '@/components/common/Section';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  Users,
  Award,
  Target,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Code,
  Palette,
  Smartphone,
  Globe
} from 'lucide-react';

export default function AboutPage() {
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    years: 0
  });

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      const incrementCounters = () => {
        setCounters(prev => ({
          projects: Math.min(prev.projects + 1, 50),
          clients: Math.min(prev.clients + 1, 30),
          years: Math.min(prev.years + 0.1, 3)
        }));
      };

      const interval = setInterval(incrementCounters, stepDuration);
      setTimeout(() => clearInterval(interval), duration);
    };

    animateCounters();
  }, []);

  const team = [
    {
      name: 'John Doe',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      description: 'Full-stack developer with 5+ years experience'
    },
    {
      name: 'Jane Smith',
      role: 'UI/UX Designer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      description: 'Creative designer passionate about user experience'
    },
    {
      name: 'Mike Johnson',
      role: 'Project Manager',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      description: 'Experienced in managing complex web projects'
    }
  ];

  const features = [
    {
      icon: Code,
      title: 'Modern Technology',
      description: 'Menggunakan teknologi terbaru dan framework modern untuk performa optimal',
      color: 'slate'
    },
    {
      icon: Palette,
      title: 'Creative Design',
      description: 'Desain yang kreatif dan unik sesuai dengan brand identity Anda',
      color: 'amber'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Semua website dioptimalkan untuk mobile dan responsive',
      color: 'stone'
    },
    {
      icon: Globe,
      title: 'SEO Optimized',
      description: 'Website dioptimalkan untuk mesin pencari agar mudah ditemukan',
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string }> = {
      slate: { bg: 'bg-slate-100', icon: 'text-slate-700' },
      amber: { bg: 'bg-amber-100', icon: 'text-amber-700' },
      stone: { bg: 'bg-stone-100', icon: 'text-stone-700' },
      orange: { bg: 'bg-orange-100', icon: 'text-orange-700' }
    };
    return colors[color] || colors.slate;
  };

  return (
    <div>
      {/* Hero Section with Image */}
      <section className="section-tech bg-deep-navy relative overflow-hidden pt-32 lg:pt-40">
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 tech-grid-pattern opacity-20" />

        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="heading-lg text-white mb-6">About Orb Web Studio</h1>
              <p className="body-lg text-[#D1D1D1] mb-6">
                Kami berawal dari tim kecil dengan visi besar: membantu brand dan individu tampil maksimal di dunia digital.
              </p>
              <p className="body-lg text-[#D1D1D1] mb-8">
                Sejak 2021, Orb Web Studio telah membantu puluhan bisnis dan individu
                membangun kehadiran digital yang kuat. Kami percaya bahwa setiap
                proyek adalah kesempatan untuk menciptakan sesuatu yang luar biasa.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center glass-card-tech p-4 rounded-xl">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    {Math.floor(counters.projects)}+
                  </div>
                  <div className="text-xs sm:text-sm text-[#D1D1D1] font-medium">Projects Completed</div>
                </div>
                <div className="text-center glass-card-tech p-4 rounded-xl">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    {Math.floor(counters.clients)}+
                  </div>
                  <div className="text-xs sm:text-sm text-[#D1D1D1] font-medium">Happy Clients</div>
                </div>
                <div className="text-center glass-card-tech p-4 rounded-xl">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    {counters.years.toFixed(1)}+
                  </div>
                  <div className="text-xs sm:text-sm text-[#D1D1D1] font-medium">Years Experience</div>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-[#3FA9F5]/20 rounded-2xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#3FA9F5]/30">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Team collaboration"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <Section
        title="Why Choose Us"
        subtitle="Kami menggabungkan desain kreatif, teknologi mutakhir, dan strategi digital untuk memberikan hasil yang nyata."
        background="dark"
      >
        <div className="grid-responsive">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass-card-tech p-6 hover:-translate-y-2 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-[#3FA9F5]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-[#3FA9F5]" />
                </div>
                <h3 className="heading-sm text-white mb-2">{feature.title}</h3>
                <p className="body-md text-[#D1D1D1]">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Our Process with Image */}
      <Section
        title="Our Process"
        subtitle="Kami mengikuti proses yang terstruktur untuk memastikan setiap proyek berjalan lancar"
        background="dark"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-[#3FA9F5]/20 rounded-2xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#3FA9F5]/30">
              <Image
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop"
                alt="Work process"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 order-1 lg:order-2">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'Memahami kebutuhan dan tujuan bisnis Anda',
                color: 'slate'
              },
              {
                step: '02',
                title: 'Design',
                description: 'Membuat mockup dan prototype yang sesuai',
                color: 'amber'
              },
              {
                step: '03',
                title: 'Development',
                description: 'Mengembangkan website dengan teknologi terbaik',
                color: 'stone'
              },
              {
                step: '04',
                title: 'Launch',
                description: 'Deploy dan optimasi untuk performa maksimal',
                color: 'orange'
              }
            ].map((process, index) => {
              return (
                <div key={index} className="text-center glass-card-tech p-4 sm:p-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#3FA9F5] text-white rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4 shadow-lg">
                    {process.step}
                  </div>
                  <h3 className="text-sm sm:text-lg font-semibold text-white mb-2">{process.title}</h3>
                  <p className="text-xs sm:text-sm text-[#D1D1D1]">{process.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Team Section */}
      <Section
        title="Meet Our Team"
        subtitle="Tim profesional yang berdedikasi untuk kesuksesan proyek Anda"
        background="dark"
      >
        <div className="grid-responsive">
          {team.map((member, index) => (
            <div
              key={index}
              className="glass-card-tech p-6 hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4">
                <div className="absolute inset-0 bg-[#3FA9F5]/30 rounded-full blur-lg" />
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#3FA9F5]/30 shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{member.name}</h3>
              <Badge variant="secondary" className="mb-3 bg-[#3FA9F5]/20 text-[#3FA9F5] border-[#3FA9F5]/30">
                {member.role}
              </Badge>
              <p className="text-sm text-[#D1D1D1]">{member.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <section className="section-tech bg-deep-navy relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern opacity-20" />

        <div className="container-wide relative z-10 text-center">
          <h2 className="heading-md text-white mb-4">Ready to Work Together?</h2>
          <p className="body-lg text-[#D1D1D1] mb-8 max-w-2xl mx-auto">
            Mari diskusikan proyek Anda dan wujudkan visi digital Anda
          </p>
          <Button asChild size="lg" className="tech-button text-lg px-8 py-6">
            <a href="/contact" className="flex items-center">
              Get In Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}