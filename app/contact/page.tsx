'use client';

import { useState } from 'react';
import { Section } from '@/components/common/Section';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/common/Card';
import { messageQueries } from '@/lib/supabase/queries';
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
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
      await messageQueries.create(formData);
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
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
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card title="Send us a message" className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              
              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+62 812-3456-7890"
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full"
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Contact Information
              </h3>
              <p className="text-gray-600 leading-relaxed">
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
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h4>
                      <p className="text-gray-900 font-medium mb-1">
                        {info.value}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Media */}
            <div className="pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'LinkedIn', 'Twitter'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-600">
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
        background="gray"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg font-medium">Interactive Map</p>
              <p className="text-sm">Google Maps integration would go here</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
