'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Briefcase, 
  Star, 
  Mail, 
  Plus,
  TrendingUp,
  Users,
  Eye
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  services: number;
  portfolios: number;
  testimonials: number;
  unreadMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    services: 0,
    portfolios: 0,
    testimonials: 0,
    unreadMessages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading stats
    const loadStats = async () => {
      setLoading(true);
      // In a real app, you would fetch from your API
      setTimeout(() => {
        setStats({
          services: 6,
          portfolios: 12,
          testimonials: 8,
          unreadMessages: 3
        });
        setLoading(false);
      }, 1000);
    };

    loadStats();
  }, []);

  const statsCards = [
    {
      title: 'Active Services',
      value: stats.services,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      href: '/admin/services'
    },
    {
      title: 'Portfolio Items',
      value: stats.portfolios,
      icon: Briefcase,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      href: '/admin/portfolio'
    },
    {
      title: 'Testimonials',
      value: stats.testimonials,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      href: '/admin/testimonials'
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessages,
      icon: Mail,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      href: '/admin/messages'
    }
  ];

  const recentMessages = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Interested in a new website for my business...',
      date: '2 hours ago',
      isRead: false
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      message: 'Can you help with e-commerce development?',
      date: '4 hours ago',
      isRead: false
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      message: 'Thank you for the great work on our project!',
      date: '1 day ago',
      isRead: true
    }
  ];

  const quickActions = [
    {
      title: 'Add New Service',
      description: 'Create a new service offering',
      icon: Plus,
      href: '/admin/services?action=create',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Add Portfolio Item',
      description: 'Showcase a new project',
      icon: Briefcase,
      href: '/admin/portfolio?action=create',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Add Testimonial',
      description: 'Add client feedback',
      icon: Star,
      href: '/admin/testimonials?action=create',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="h-8 w-64 bg-[#1C1C1E]/50 rounded animate-pulse mb-2" />
            <div className="h-4 w-96 bg-[#1C1C1E]/50 rounded animate-pulse" />
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card-tech p-6 animate-pulse">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 w-24 bg-[#1C1C1E]/50 rounded mb-2" />
                  <div className="h-8 w-16 bg-[#1C1C1E]/50 rounded" />
                </div>
                <div className="h-12 w-12 bg-[#1C1C1E]/50 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="glass-card-tech p-6 animate-pulse">
              <div className="h-6 w-48 bg-[#1C1C1E]/50 rounded mb-4" />
              <div className="space-y-4">
                <div className="h-20 bg-[#1C1C1E]/50 rounded" />
                <div className="h-20 bg-[#1C1C1E]/50 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-[#D1D1D1]">Welcome back! Here's what's happening with your website.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center border-[#3FA9F5]/30 text-[#3FA9F5]">
            <TrendingUp className="w-4 h-4 mr-1" />
            All systems operational
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link key={index} href={stat.href}>
              <Card className="glass-card-tech p-4 sm:p-6 hover:border-[#3FA9F5]/60 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-[#D1D1D1]">{stat.title}</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#3FA9F5]/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#3FA9F5]" />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Messages */}
        <Card title="Recent Messages" className="glass-card-tech p-4 sm:p-6">
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div
                key={message.id}
                className={`p-3 sm:p-4 rounded-lg border ${
                  message.isRead ? 'bg-[#1C1C1E]/50 border-[#3FA9F5]/20' : 'bg-[#3FA9F5]/10 border-[#3FA9F5]/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-white truncate">
                        {message.name}
                      </p>
                      {!message.isRead && (
                        <Badge variant="destructive" className="text-xs bg-[#3FA9F5] text-white">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-[#D1D1D1] truncate">
                      {message.email}
                    </p>
                    <p className="text-sm text-[#D1D1D1] mt-1">
                      {message.message}
                    </p>
                  </div>
                  <span className="text-xs text-[#3FA9F5]/70 ml-2">
                    {message.date}
                  </span>
                </div>
              </div>
            ))}
            <div className="pt-4">
              <Button asChild variant="outline" className="w-full border-[#3FA9F5]/30 text-[#3FA9F5] hover:bg-[#3FA9F5]/10">
                <Link href="/admin/messages">View All Messages</Link>
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card title="Quick Actions" className="glass-card-tech p-4 sm:p-6">
          <div className="space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} href={action.href}>
                  <div className="p-3 sm:p-4 rounded-lg border border-[#3FA9F5]/20 bg-[#3FA9F5]/5 hover:bg-[#3FA9F5]/10 hover:border-[#3FA9F5]/40 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#3FA9F5]/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#3FA9F5]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white">
                          {action.title}
                        </h3>
                        <p className="text-sm text-[#D1D1D1]">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card title="Recent Activity" className="glass-card-tech p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-[#1C1C1E]/50 rounded-lg">
            <div className="w-8 h-8 bg-[#3FA9F5]/20 rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4 text-[#3FA9F5]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white">
                New service "E-commerce Development" was added
              </p>
              <p className="text-xs text-[#3FA9F5]/70">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-[#1C1C1E]/50 rounded-lg">
            <div className="w-8 h-8 bg-[#3FA9F5]/20 rounded-full flex items-center justify-center">
              <Eye className="w-4 h-4 text-[#3FA9F5]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white">
                Portfolio item "Corporate Website" was updated
              </p>
              <p className="text-xs text-[#3FA9F5]/70">4 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-[#1C1C1E]/50 rounded-lg">
            <div className="w-8 h-8 bg-[#3FA9F5]/20 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-[#3FA9F5]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white">
                New testimonial from John Doe was approved
              </p>
              <p className="text-xs text-[#3FA9F5]/70">1 day ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
