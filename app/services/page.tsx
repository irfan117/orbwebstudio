'use client';

import { useState, useEffect } from 'react';
import { Section } from '@/components/common/Section';
import { ServiceCard } from '@/components/sections/Services/ServiceCard';
import { serviceQueries } from '@/lib/supabase/queries';
import { Service } from '@/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WebDesignSVG, EcommerceSVG, MobileAppSVG, SeoSVG } from '@/components/svg/ServicesIllustrations';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceQueries.getActive();
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const faqs = [
    {
      question: "Berapa lama waktu pengerjaan proyek?",
      answer: "Waktu pengerjaan bervariasi tergantung kompleksitas proyek. Website sederhana membutuhkan 1-2 minggu, sementara aplikasi web kompleks bisa memakan waktu 1-3 bulan."
    },
    {
      question: "Apakah ada garansi untuk website yang dibuat?",
      answer: "Ya, kami memberikan garansi 6 bulan untuk bug fixes dan maintenance dasar. Kami juga menyediakan support teknis selama periode garansi."
    },
    {
      question: "Bisakah website di-update sendiri setelah selesai?",
      answer: "Tentu! Kami akan memberikan training singkat dan dokumentasi lengkap untuk mengelola website. Atau Anda bisa menggunakan layanan maintenance kami."
    },
    {
      question: "Apakah website akan mobile-friendly?",
      answer: "Semua website yang kami buat sudah responsive dan mobile-friendly. Kami mengutamakan user experience di semua perangkat."
    },
    {
      question: "Bagaimana proses pembayaran?",
      answer: "Pembayaran dilakukan secara bertahap: 50% di awal proyek, 30% saat development selesai, dan 20% saat website live. Kami menerima transfer bank dan payment gateway."
    }
  ];

  if (loading) {
    return (
      <div className="pt-20">
        <Section title="Our Services" subtitle="Temukan layanan yang sesuai dengan kebutuhan Anda dan bandingkan paket harga dengan transparan.">
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
      {/* Services Grid */}
      <Section 
        title="Our Services" 
        subtitle="Temukan layanan yang sesuai dengan kebutuhan Anda dan bandingkan paket harga dengan transparan."
        background="dark"
      >
        <div className="grid-responsive">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Section>

      {/* Pricing Comparison */}
      <Section 
        title="Pricing Comparison" 
        subtitle="Pilih paket yang sesuai dengan budget dan kebutuhan bisnis Anda"
        background="dark"
      >
        <div className="max-w-6xl mx-auto">
          <div className="glass-card-tech rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#3FA9F5]/20">
                  <tr>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium text-white">Service</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium text-white">Basic</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium text-white">Professional</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium text-white">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3FA9F5]/20">
                  <tr>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#D1D1D1]">Website Design</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#3FA9F5]">✓</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#3FA9F5]">✓</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#3FA9F5]">✓</td>
                  </tr>
                  <tr>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#D1D1D1]">Responsive Design</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#3FA9F5]">✓</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#3FA9F5]">✓</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#3FA9F5]">✓</td>
                  </tr>
                  <tr>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#D1D1D1]">CMS Integration</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">✗</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#3FA9F5]">✓</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#3FA9F5]">✓</td>
                  </tr>
                  <tr>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#D1D1D1]">E-commerce Features</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">✗</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">✗</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#3FA9F5]">✓</td>
                  </tr>
                  <tr>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#D1D1D1]">SEO Optimization</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">✗</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#3FA9F5]">✓</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#3FA9F5]">✓</td>
                  </tr>
                  <tr>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#D1D1D1]">Maintenance Support</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">1 month</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#3FA9F5]">3 months</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#3FA9F5]">6 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      {/* Service Illustrations Section */}
      <Section 
        title="Visualisasi Layanan Kami" 
        subtitle="Lihat bagaimana setiap layanan kami bekerja dan memberikan nilai untuk bisnis Anda"
        background="dark"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Web Design Illustration */}
          <div className="glass-card-tech rounded-xl p-6 hover:border-[#3FA9F5]/60 transition-all duration-300 group">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Web Design & Development</h3>
              <p className="text-[#D1D1D1] text-sm">Desain website yang responsif dan modern</p>
            </div>
            <div className="flex justify-center mb-4">
              <WebDesignSVG />
            </div>
            <div className="text-center">
              <Button 
                asChild 
                className="tech-button"
                onClick={() => window.open('https://www.figma.com/design/example', '_blank')}
              >
                <a href="https://www.figma.com/design/example" target="_blank" rel="noopener noreferrer">
                  Lihat Portfolio Design
                </a>
              </Button>
            </div>
          </div>

          {/* E-commerce Illustration */}
          <div className="glass-card-tech rounded-xl p-6 hover:border-[#3FA9F5]/60 transition-all duration-300 group">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">E-commerce Solutions</h3>
              <p className="text-[#D1D1D1] text-sm">Toko online dengan sistem pembayaran terintegrasi</p>
            </div>
            <div className="flex justify-center mb-4">
              <EcommerceSVG />
            </div>
            <div className="text-center">
              <Button 
                asChild 
                className="tech-button"
                onClick={() => window.open('https://shopify.com/partners', '_blank')}
              >
                <a href="https://shopify.com/partners" target="_blank" rel="noopener noreferrer">
                  Lihat E-commerce Demo
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile App Illustration */}
          <div className="glass-card-tech rounded-xl p-6 hover:border-[#3FA9F5]/60 transition-all duration-300 group">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Mobile App Development</h3>
              <p className="text-[#D1D1D1] text-sm">Aplikasi mobile yang user-friendly dan performant</p>
            </div>
            <div className="flex justify-center mb-4">
              <MobileAppSVG />
            </div>
            <div className="text-center">
              <Button 
                asChild 
                className="tech-button"
                onClick={() => window.open('https://expo.dev/example', '_blank')}
              >
                <a href="https://expo.dev/example" target="_blank" rel="noopener noreferrer">
                  Lihat App Demo
                </a>
              </Button>
            </div>
          </div>

          {/* SEO Illustration */}
          <div className="glass-card-tech rounded-xl p-6 hover:border-[#3FA9F5]/60 transition-all duration-300 group">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">SEO & Digital Marketing</h3>
              <p className="text-[#D1D1D1] text-sm">Optimasi website untuk mesin pencari</p>
            </div>
            <div className="flex justify-center mb-4">
              <SeoSVG />
            </div>
            <div className="text-center">
              <Button 
                asChild 
                className="tech-button"
                onClick={() => window.open('https://analytics.google.com', '_blank')}
              >
                <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer">
                  Lihat SEO Tools
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Website Templates Section */}
      <Section 
        title="Ready-to-Use Templates" 
        subtitle="Template website siap pakai yang bisa Anda beli dan customize sesuai kebutuhan"
        background="dark"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              id: 1,
              name: "Corporate Pro",
              category: "Corporate",
              price: "2.5M",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
              features: ["Responsive Design", "CMS Integration", "SEO Ready", "Contact Forms"],
              description: "Template profesional untuk perusahaan dengan desain modern dan fitur lengkap"
            },
            {
              id: 2,
              name: "E-commerce Elite",
              category: "E-commerce",
              price: "5M",
              image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
              features: ["Shopping Cart", "Payment Gateway", "Inventory Management", "Order Tracking"],
              description: "Template toko online dengan sistem pembayaran terintegrasi"
            },
            {
              id: 3,
              name: "Portfolio Creative",
              category: "Portfolio",
              price: "1.8M",
              image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop",
              features: ["Gallery Showcase", "Blog Integration", "Social Media", "Contact Portfolio"],
              description: "Template kreatif untuk menampilkan portfolio dan karya seni"
            },
            {
              id: 4,
              name: "Restaurant Deluxe",
              category: "Restaurant",
              price: "3.2M",
              image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop",
              features: ["Menu Display", "Online Ordering", "Reservation System", "Location Map"],
              description: "Template restoran dengan sistem pemesanan online"
            },
            {
              id: 5,
              name: "Blog Modern",
              category: "Blog",
              price: "1.5M",
              image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&h=300&fit=crop",
              features: ["Article Management", "Comment System", "Social Sharing", "Newsletter"],
              description: "Template blog modern dengan fitur lengkap untuk content creator"
            },
            {
              id: 6,
              name: "Landing Page Boost",
              category: "Landing Page",
              price: "2M",
              image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop",
              features: ["High Conversion", "A/B Testing", "Lead Capture", "Analytics"],
              description: "Template landing page yang dioptimalkan untuk konversi tinggi"
            }
          ].map((template) => (
            <div key={template.id} className="glass-card-tech rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 group">
              <div className="relative">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[#3FA9F5]/90 text-white">
                    {template.category}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="text-2xl font-bold text-white">
                    Rp {template.price}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{template.name}</h3>
                <p className="text-[#D1D1D1] text-sm mb-4">{template.description}</p>
                <div className="space-y-2 mb-4">
                  {template.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-[#D1D1D1]">
                      <div className="w-1.5 h-1.5 bg-[#3FA9F5] rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    asChild 
                    className="flex-1 tech-button"
                    onClick={() => window.open(`https://orbwebstudio.com/templates/${template.id}`, '_blank')}
                  >
                    <a href={`https://orbwebstudio.com/templates/${template.id}`} target="_blank" rel="noopener noreferrer">
                      Buy Now
                    </a>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="border-[#3FA9F5]/30 text-[#3FA9F5] hover:bg-[#3FA9F5]/10"
                    onClick={() => window.open(`https://orbwebstudio.com/preview/${template.id}`, '_blank')}
                  >
                    <a href={`https://orbwebstudio.com/preview/${template.id}`} target="_blank" rel="noopener noreferrer">
                      Preview
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section 
        title="Frequently Asked Questions" 
        subtitle="Pertanyaan yang sering diajukan tentang layanan kami"
        background="dark"
      >
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="glass-card-tech rounded-lg px-4 sm:px-6">
                <AccordionTrigger className="text-left hover:no-underline text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#D1D1D1]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </div>
  );
}
