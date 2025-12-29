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
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

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
      <section className="section-tech bg-deep-navy relative overflow-hidden pt-32 lg:pt-40">
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 tech-grid-pattern opacity-20" />

        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="heading-lg text-white mb-6">
                <span className="gradient-text-tech">Solusi Digital</span> Terdepan
              </h1>
              <p className="body-lg text-[#D1D1D1] mb-6">
                Transformasi bisnis Anda dengan teknologi terkini dan layanan profesional yang terpercaya.
              </p>
              <p className="body-lg text-[#D1D1D1] mb-8">
                Kami mengkhususkan diri dalam pengembangan website, aplikasi mobile, dan solusi digital
                yang membantu bisnis Anda mencapai kesuksesan di dunia digital.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center glass-card-tech p-4 rounded-xl">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    10+
                  </div>
                  <div className="text-xs sm:text-sm text-[#D1D1D1] font-medium">Services</div>
                </div>
                <div className="text-center glass-card-tech p-4 rounded-xl">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    50+
                  </div>
                  <div className="text-xs sm:text-sm text-[#D1D1D1] font-medium">Projects</div>
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
                  src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop"
                  alt="Services overview"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <Section
        title="Layanan Kami"
        subtitle="Pilih layanan yang sesuai dengan kebutuhan bisnis Anda dari berbagai pilihan solusi digital profesional."
        background="dark"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Section>

      {/* Website Templates Section */}
      <Section
        title="Template Website Siap Pakai"
        subtitle="Koleksi template website premium yang siap pakai dengan desain modern dan fitur lengkap untuk berbagai kebutuhan bisnis."
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

      {/* Process & Pricing Section */}
      <Section
        title="Proses & Harga"
        subtitle="Pelajari proses kerja kami dan bandingkan paket harga yang sesuai dengan budget Anda."
        background="dark"
      >
        <div className="space-y-12">
          {/* Process Steps */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3FA9F5]/30 via-[#3FA9F5]/60 to-[#3FA9F5]/30"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
              <div className="relative text-center glass-card-tech p-8 rounded-2xl hover:border-[#3FA9F5]/60 transition-all duration-300 group">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#3FA9F5] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-[#3FA9F5]/20 to-[#3FA9F5]/10 rounded-xl flex items-center justify-center mx-auto mb-6 mt-4 border border-[#3FA9F5]/30">
                  <svg className="w-8 h-8 text-[#3FA9F5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#3FA9F5] transition-colors">Konsultasi</h3>
                <p className="text-[#D1D1D1] text-sm leading-relaxed">Diskusi mendalam tentang kebutuhan dan visi proyek Anda</p>
              </div>

              <div className="relative text-center glass-card-tech p-8 rounded-2xl hover:border-[#3FA9F5]/60 transition-all duration-300 group">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#3FA9F5] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-[#3FA9F5]/20 to-[#3FA9F5]/10 rounded-xl flex items-center justify-center mx-auto mb-6 mt-4 border border-[#3FA9F5]/30">
                  <svg className="w-8 h-8 text-[#3FA9F5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#3FA9F5] transition-colors">Perencanaan</h3>
                <p className="text-[#D1D1D1] text-sm leading-relaxed">Perencanaan strategis dan desain solusi teknis yang tepat</p>
              </div>

              <div className="relative text-center glass-card-tech p-8 rounded-2xl hover:border-[#3FA9F5]/60 transition-all duration-300 group">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#3FA9F5] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-[#3FA9F5]/20 to-[#3FA9F5]/10 rounded-xl flex items-center justify-center mx-auto mb-6 mt-4 border border-[#3FA9F5]/30">
                  <svg className="w-8 h-8 text-[#3FA9F5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#3FA9F5] transition-colors">Development</h3>
                <p className="text-[#D1D1D1] text-sm leading-relaxed">Pengembangan berkualitas dengan testing dan iterasi berkala</p>
              </div>

              <div className="relative text-center glass-card-tech p-8 rounded-2xl hover:border-[#3FA9F5]/60 transition-all duration-300 group">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#3FA9F5] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-[#3FA9F5]/20 to-[#3FA9F5]/10 rounded-xl flex items-center justify-center mx-auto mb-6 mt-4 border border-[#3FA9F5]/30">
                  <svg className="w-8 h-8 text-[#3FA9F5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#3FA9F5] transition-colors">Launch</h3>
                <p className="text-[#D1D1D1] text-sm leading-relaxed">Peluncuran dan dukungan maintenance jangka panjang</p>
              </div>
            </div>
          </div>

          {/* Pricing Comparison */}
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

      {/* CTA Section */}
      <section className="section-tech bg-deep-navy relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern opacity-20" />

        <div className="container-wide relative z-10 text-center">
          <h2 className="heading-md text-white mb-4">Ready to Start Your Project?</h2>
          <p className="body-lg text-[#D1D1D1] mb-8 max-w-2xl mx-auto">
            Mari diskusikan kebutuhan Anda dan dapatkan solusi digital yang tepat untuk bisnis Anda.
          </p>
          <Button asChild size="lg" className="tech-button text-lg px-8 py-6">
            <a href="/contact" className="flex items-center">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
