'use client';

import { useState, useEffect } from 'react';
import { Section } from '@/components/common/Section';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
      image: '/api/placeholder/300/300',
      description: 'Full-stack developer with 5+ years experience'
    },
    {
      name: 'Jane Smith',
      role: 'UI/UX Designer',
      image: '/api/placeholder/300/300',
      description: 'Creative designer passionate about user experience'
    },
    {
      name: 'Mike Johnson',
      role: 'Project Manager',
      image: '/api/placeholder/300/300',
      description: 'Experienced in managing complex web projects'
    }
  ];

  const features = [
    {
      icon: Code,
      title: 'Modern Technology',
      description: 'Menggunakan teknologi terbaru dan framework modern untuk performa optimal'
    },
    {
      icon: Palette,
      title: 'Creative Design',
      description: 'Desain yang kreatif dan unik sesuai dengan brand identity Anda'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Semua website dioptimalkan untuk mobile dan responsive'
    },
    {
      icon: Globe,
      title: 'SEO Optimized',
      description: 'Website dioptimalkan untuk mesin pencari agar mudah ditemukan'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Section 
        title="About WebForge"
        subtitle="Kami berawal dari tim kecil dengan visi besar: membantu brand dan individu tampil maksimal di dunia digital."
        background="gradient"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Sejak 2021, WebForge telah membantu puluhan bisnis dan individu 
            membangun kehadiran digital yang kuat. Kami percaya bahwa setiap 
            proyek adalah kesempatan untuk menciptakan sesuatu yang luar biasa.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {Math.floor(counters.projects)}+
              </div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {Math.floor(counters.clients)}+
              </div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {counters.years.toFixed(1)}+
              </div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section 
        title="Why Choose Us"
        subtitle="Kami menggabungkan desain kreatif, teknologi mutakhir, dan strategi digital untuk memberikan hasil yang nyata."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                title={feature.title}
                description={feature.description}
                hover
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Our Process */}
      <Section 
        title="Our Process"
        subtitle="Kami mengikuti proses yang terstruktur untuk memastikan setiap proyek berjalan lancar"
        background="gray"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'Memahami kebutuhan dan tujuan bisnis Anda'
              },
              {
                step: '02',
                title: 'Design',
                description: 'Membuat mockup dan prototype yang sesuai'
              },
              {
                step: '03',
                title: 'Development',
                description: 'Mengembangkan website dengan teknologi terbaik'
              },
              {
                step: '04',
                title: 'Launch',
                description: 'Deploy dan optimasi untuk performa maksimal'
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{process.title}</h3>
                <p className="text-gray-600 text-sm">{process.description}</p>
              </div>
            ))}
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
            <Card
              key={index}
              title={member.name}
              description={member.description}
              hover
              className="text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <Badge variant="secondary" className="mb-4">
                {member.role}
              </Badge>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section 
        title="Ready to Work Together?"
        subtitle="Mari diskusikan proyek Anda dan wujudkan visi digital Anda"
        background="blue"
      >
        <div className="text-center">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <a href="/contact">
              Get In Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </Section>
    </div>
  );
}
