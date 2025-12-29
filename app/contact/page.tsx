'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Section } from '@/components/common/Section';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/common/Card';
import { messageQueries, serviceQueries } from '@/lib/supabase/queries';
import { useToast } from '@/hooks/use-toast';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle
} from 'lucide-react';

export default function ContactPage() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [selectedService, setSelectedService] = useState<string>('');
  const [serviceOptions, setServiceOptions] = useState<Array<{ id: string; title: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const composedMessage = selectedService
        ? `Service: ${selectedService}\n\n${formData.message}`
        : formData.message;
      await messageQueries.create({
        ...formData,
        message: composedMessage,
        company: null,
        subject: selectedService || null,
        service_interest: selectedService || null,
        budget_range: null,
        project_timeline: null,
        is_responded: false,
        priority: 'normal' as const,
        assigned_to: null
      });
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSelectedService('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load service options and preselect from query param
  useEffect(() => {
    const init = async () => {
      try {
        const data = await serviceQueries.getActive();
        const options = (data || []).map((s: any) => ({ id: s.id, title: s.title }));
        setServiceOptions(options);
        const fromQuery = searchParams.get('service');
        if (fromQuery) {
          setSelectedService(fromQuery);
        }
      } catch (e) {
        // ignore
      }
    };
    init();
  }, [searchParams]);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'admin@webforge.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+62 812-3456-7890',
      description: 'Call us during business hours'
    },
    {
      icon: MapPin,
      title: 'Address',
      value: 'Jakarta, Indonesia',
      description: 'Visit our office'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      value: 'Mon - Fri: 9AM - 6PM',
      description: 'We respond within 24 hours'
    }
  ];

  return (
    <div>
      <Section
        title="Get In Touch"
        subtitle="Kami siap mendengar ide Anda. Hubungi kami dan mari mulai percakapan untuk membangun sesuatu yang luar biasa."
        background="dark"
        className="pt-32 lg:pt-40"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Form */}
          <Card title="Send us a message" className="glass-card-tech p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              {/* Service Selection to ease ordering */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Pilih Layanan (opsional)</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1C1C1E]/50 border border-[#3FA9F5]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3FA9F5] focus:border-transparent text-white"
                >
                  <option value="">— Pilih layanan —</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt.id} value={opt.title} className="bg-[#0A192F] text-white">
                      {opt.title}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-[#D1D1D1]">Admin akan memproses pesanan Anda secara manual setelah kami menerima pesan.</p>
              </div>

              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+62 812-3456-7890"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 bg-[#1C1C1E]/50 border border-[#3FA9F5]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3FA9F5] focus:border-transparent text-white placeholder-[#D1D1D1]"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full tech-button"
                size="lg"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Contact Information
              </h3>
              <p className="text-[#D1D1D1] leading-relaxed">
                Kami selalu siap membantu Anda. Jangan ragu untuk menghubungi kami
                melalui berbagai channel yang tersedia. Tim kami akan merespons
                dalam waktu 24 jam.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#3FA9F5]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#3FA9F5]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        {info.title}
                      </h4>
                      <p className="text-white font-medium mb-1">
                        {info.value}
                      </p>
                      <p className="text-[#D1D1D1] text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Media */}
            <div className="pt-6 border-t border-[#3FA9F5]/20">
              <h4 className="font-semibold text-white mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'LinkedIn', 'Twitter'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-[#3FA9F5]/20 rounded-lg flex items-center justify-center hover:bg-[#3FA9F5]/30 transition-colors"
                  >
                    <span className="text-sm font-medium text-[#3FA9F5]">
                      {social[0]}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <Section
        title="Find Us"
        subtitle="Visit our office for a face-to-face discussion"
        background="dark"
      >
        <div className="max-w-4xl mx-auto">
          <div className="glass-card-tech rounded-lg h-96 flex items-center justify-center">
            <div className="text-center text-[#D1D1D1]">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-[#3FA9F5]" />
              <p className="text-lg font-medium text-white">Interactive Map</p>
              <p className="text-sm">Google Maps integration would go here</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
