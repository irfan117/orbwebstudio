import Link from 'next/link';
import { Zap, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Tentang', href: '/about' },
    { name: 'Layanan', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Kontak', href: '/contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Twitter', href: '#', icon: Twitter },
  ];

  return (
    <footer className="relative overflow-hidden bg-charcoal">
      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 tech-grid-pattern opacity-40" />
      
      {/* Cyber Glow Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#3FA9F5]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3FA9F5]/5 rounded-full blur-3xl" />
      </div>

      {/* Top Tech Divider */}
      <div className="tech-divider" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#3FA9F5]/30 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-11 h-11 glowing-border rounded-lg flex items-center justify-center group-hover:border-[#3FA9F5] transition-all duration-300">
                  <Zap className="w-6 h-6 text-[#3FA9F5]" />
                </div>
              </div>
              <span className="text-2xl font-semibold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                Orb Web Studio
              </span>
            </Link>
            <p className="text-[#D1D1D1] text-sm leading-relaxed max-w-xs">
              Kami membantu bisnis menciptakan pengalaman digital yang powerful dengan teknologi terkini dan desain modern.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-11 h-11 glowing-border rounded-lg flex items-center justify-center hover:border-[#3FA9F5] hover:bg-[#3FA9F5]/10 transition-all duration-300 cyber-glow"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 icon-tech" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white neon-line" style={{ fontFamily: 'Playfair Display, serif' }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#D1D1D1] hover:text-[#3FA9F5] hover:translate-x-1 inline-block transition-all duration-300 text-sm underline-glow"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white neon-line" style={{ fontFamily: 'Playfair Display, serif' }}>
              Layanan
            </h3>
            <ul className="space-y-3 text-sm text-[#D1D1D1]">
              <li>Website Development</li>
              <li>Web Application</li>
              <li>Sistem Berbasis Web</li>
              <li>UI/UX Design</li>
              <li>Maintenance & Support</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white neon-line" style={{ fontFamily: 'Playfair Display, serif' }}>
              Info Kontak
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 glowing-border rounded-lg flex items-center justify-center group-hover:border-[#3FA9F5] transition-colors">
                  <Mail className="w-5 h-5 icon-tech" />
                </div>
                <span className="text-sm text-[#D1D1D1]">hello@orbwebstudio.com</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 glowing-border rounded-lg flex items-center justify-center group-hover:border-[#3FA9F5] transition-colors">
                  <Phone className="w-5 h-5 icon-tech" />
                </div>
                <span className="text-sm text-[#D1D1D1]">+62 812-3456-7890</span>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 glowing-border rounded-lg flex items-center justify-center group-hover:border-[#3FA9F5] transition-colors">
                  <MapPin className="w-5 h-5 icon-tech mt-0.5" />
                </div>
                <span className="text-sm text-[#D1D1D1]">
                  Jakarta, Indonesia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="tech-divider mt-12 mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-[#D1D1D1]/70">
            © {currentYear} Orb Web Studio. All rights reserved. Crafted with ⚡ in Indonesia
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-[#D1D1D1]/70 hover:text-[#3FA9F5] transition-colors">
              Kebijakan Privasi
            </Link>
            <span className="text-[#3FA9F5]/30">•</span>
            <Link href="/terms" className="text-[#D1D1D1]/70 hover:text-[#3FA9F5] transition-colors">
              Syarat Layanan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}