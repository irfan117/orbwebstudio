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
      <section className="relative py-20 lg:py-28 bg-stone-50 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23475569' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} 
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="heading-lg text-slate-900 mb-6">About WebForge</h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Kami berawal dari tim kecil dengan visi besar: membantu brand dan individu tampil maksimal di dunia digital.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Sejak 2021, WebForge telah membantu puluhan bisnis dan individu 
                membangun kehadiran digital yang kuat. Kami percaya bahwa setiap 
                proyek adalah kesempatan untuk menciptakan sesuatu yang luar biasa.
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-800 mb-2">
                    {Math.floor(counters.projects)}+
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-800 mb-2">
                    {Math.floor(counters.clients)}+
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-800 mb-2">
                    {counters.years.toFixed(1)}+
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Years Experience</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-slate-300/20 rounded-2xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
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
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = getColorClasses(feature.color);
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <div className={`w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-8 h-8 ${colors.icon}`} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 text-center">{feature.title}</h3>
                <p className="text-sm text-slate-600 text-center">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Our Process with Image */}
      <Section 
        title="Our Process"
        subtitle="Kami mengikuti proses yang terstruktur untuk memastikan setiap proyek berjalan lancar"
        background="gray"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-amber-300/20 rounded-2xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop"
                alt="Work process"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 order-1 lg:order-2">
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
              const bgColors: Record<string, string> = {
                slate: 'bg-slate-700',
                amber: 'bg-amber-600',
                stone: 'bg-stone-600',
                orange: 'bg-orange-600'
              };
              return (
                <div key={index} className="text-center bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <div className={`w-16 h-16 ${bgColors[process.color]} text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg`}>
                    {process.step}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{process.title}</h3>
                  <p className="text-sm text-slate-600">{process.description}</p>
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
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-lg text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="absolute inset-0 bg-slate-300/30 rounded-full blur-lg" />
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{member.name}</h3>
              <Badge variant="secondary" className="mb-3 bg-slate-100 text-slate-700 border-slate-200">
                {member.role}
              </Badge>
              <p className="text-sm text-slate-600">{member.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-28 bg-stone-50 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23475569' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} 
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <h2 className="heading-md text-slate-900 mb-4">Ready to Work Together?</h2>
          <p className="body-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Mari diskusikan proyek Anda dan wujudkan visi digital Anda
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6 bg-slate-800 hover:bg-slate-900 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-slate-700">
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