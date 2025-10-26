import Link from 'next/link';
import { Palette, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

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
      {/* Geometric Pattern Background */}
      <div className="absolute inset-0 geometric-pattern opacity-30" />
      
      {/* Decorative Gold Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#C6A664] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C6A664] rounded-full blur-3xl" />
      </div>

      {/* Top Gold Divider */}
      <div className="luxury-divider" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#C6A664]/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-10 h-10 border border-[#C6A664]/40 rounded-lg flex items-center justify-center group-hover:border-[#C6A664] transition-all duration-300">
                  <Palette className="w-6 h-6 text-[#C6A664]" />
                </div>
              </div>
              <span className="text-2xl font-light gradient-text-luxury" style={{ fontFamily: 'Cormorant Garamond, serif' }}>WebForge</span>
            </Link>
            <p className="text-[#D1D1D1]/70 text-sm leading-relaxed max-w-xs font-light">
              Kami membantu bisnis dan individu menciptakan pengalaman digital yang kuat, modern, dan berkesan.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-11 h-11 border border-[#C6A664]/30 rounded-lg flex items-center justify-center hover:border-[#C6A664] hover:bg-[#C6A664]/10 transition-all duration-300 gold-glow"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 icon-luxury" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-light mb-4 gradient-text-luxury" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#D1D1D1]/70 hover:text-[#C6A664] hover:translate-x-1 inline-block transition-all duration-300 text-sm font-light border-animate"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-light mb-4 gradient-text-luxury" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Layanan</h3>
            <ul className="space-y-3 text-sm text-[#D1D1D1]/70 font-light">
              <li>Pengembangan Web</li>
              <li>Desain UI/UX</li>
              <li>Solusi E-commerce</li>
              <li>Aplikasi Mobile</li>
              <li>Digital Marketing</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-light mb-4 gradient-text-luxury" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Info Kontak</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 border border-[#C6A664]/30 rounded-lg flex items-center justify-center group-hover:border-[#C6A664] transition-colors">
                  <Mail className="w-5 h-5 icon-luxury" />
                </div>
                <span className="text-sm text-[#D1D1D1]/70 font-light">admin@webforge.com</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 border border-[#C6A664]/30 rounded-lg flex items-center justify-center group-hover:border-[#C6A664] transition-colors">
                  <Phone className="w-5 h-5 icon-luxury" />
                </div>
                <span className="text-sm text-[#D1D1D1]/70 font-light">+62 812-3456-7890</span>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 border border-[#C6A664]/30 rounded-lg flex items-center justify-center group-hover:border-[#C6A664] transition-colors">
                  <MapPin className="w-5 h-5 icon-luxury mt-0.5" />
                </div>
                <span className="text-sm text-[#D1D1D1]/70 font-light">
                  Jakarta, Indonesia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="luxury-divider mt-12 mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-[#D1D1D1]/60 font-light">
            © {currentYear} WebForge. All rights reserved. Made with ❤️ in Indonesia
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-[#D1D1D1]/60 hover:text-[#C6A664] transition-colors font-light">
              Kebijakan Privasi
            </Link>
            <span className="text-[#C6A664]/30">•</span>
            <Link href="/terms" className="text-[#D1D1D1]/60 hover:text-[#C6A664] transition-colors font-light">
              Syarat Layanan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}