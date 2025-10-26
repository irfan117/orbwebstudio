'use client';

import { useState, useEffect } from 'react';
import { Section } from '@/components/common/Section';
import { ServiceCard } from '@/components/sections/Services/ServiceCard';
import { serviceQueries } from '@/lib/supabase/queries';
import { Service } from '@/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Section>

      {/* Pricing Comparison */}
      <Section 
        title="Pricing Comparison" 
        subtitle="Pilih paket yang sesuai dengan budget dan kebutuhan bisnis Anda"
        background="gray"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Basic</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Professional</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Website Design</td>
                    <td className="px-6 py-4 text-sm text-gray-900">✓</td>
                    <td className="px-6 py-4 text-sm text-gray-900">✓</td>
                    <td className="px-6 py-4 text-sm text-gray-900">✓</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Responsive Design</td>
                    <td className="px-6 py-4 text-sm text-gray-900">✓</td>
                    <td className="px-6 py-4 text-sm text-gray-900">✓</td>
                    <td className="px-6 py-4 text-sm text-gray-900">✓</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">CMS Integration</td>
                    <td className="px-6 py-4 text-sm text-gray-500">✗</td>
                    <td className="px-6 py-4 text-sm text-gray-900">✓</td>
                    <td className="px-6 py-4 text-sm text-gray-900">✓</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">E-commerce Features</td>
                    <td className="px-6 py-4 text-sm text-gray-500">✗</td>
                    <td className="px-6 py-4 text-sm text-gray-500">✗</td>
                    <td className="px-6 py-4 text-sm text-gray-900">✓</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">SEO Optimization</td>
                    <td className="px-6 py-4 text-sm text-gray-500">✗</td>
                    <td className="px-6 py-4 text-sm text-gray-900">✓</td>
                    <td className="px-6 py-4 text-sm text-gray-900">✓</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Maintenance Support</td>
                    <td className="px-6 py-4 text-sm text-gray-500">1 month</td>
                    <td className="px-6 py-4 text-sm text-gray-900">3 months</td>
                    <td className="px-6 py-4 text-sm text-gray-900">6 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section 
        title="Frequently Asked Questions" 
        subtitle="Pertanyaan yang sering diajukan tentang layanan kami"
      >
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
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
