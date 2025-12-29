'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Home,
  Package,
  Briefcase,
  Star,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  // Desktop: defaulted to expanded (false checks for collapse, so false = wide)
  // Mobile: handled by isOpen state (default false = hidden)
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Services', href: '/admin/services', icon: Package },
    { name: 'Portfolio', href: '/admin/portfolio', icon: Briefcase },
    { name: 'Testimonials', href: '/admin/testimonials', icon: Star },
    {
      name: 'Messages',
      href: '/admin/messages',
      icon: Mail,
      badge: 3 // This would come from unread messages count
    },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-deep-navy border-[#3FA9F5]/30 text-white hover:bg-[#3FA9F5]/20 hover:text-white"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 left-0 z-40 h-full bg-deep-navy border-r border-[#3FA9F5]/30 transition-transform duration-300 w-64',
          // Mobile: hidden unless open. Desktop: always visible (translate-x-0)
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center space-x-2 p-6 border-b border-[#3FA9F5]/30">
            <div className="w-8 h-8 bg-gradient-to-br from-[#3FA9F5] to-[#C6A664] rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Admin Panel
            </span>
          </div>

          {/* User Info */}
          {user && (
            <div className="p-4 border-b border-[#3FA9F5]/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#3FA9F5] to-[#C6A664] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className="text-sm font-medium text-white truncate">
                    {user.email}
                  </p>
                  <p className="text-xs text-[#D1D1D1]">Admin</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#3FA9F5]/20 text-[#3FA9F5] border border-[#3FA9F5]/30'
                      : 'text-[#D1D1D1] hover:bg-[#3FA9F5]/10 hover:text-white'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge variant="destructive" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-[#3FA9F5]/30 space-y-2">
            <Link href="/" target="_blank">
              <Button
                variant="ghost"
                className="w-full justify-start text-[#D1D1D1] hover:bg-[#3FA9F5]/10 hover:text-white group"
              >
                <ExternalLink className="w-5 h-5 mr-3 text-[#3FA9F5] group-hover:text-white" />
                <span>View Site</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full justify-start text-[#D1D1D1] hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

