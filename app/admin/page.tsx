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
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-32" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your website.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            All systems operational
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link key={index} href={stat.href}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <Card title="Recent Messages" className="p-6">
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg border ${
                  message.isRead ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {message.name}
                      </p>
                      {!message.isRead && (
                        <Badge variant="destructive" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {message.email}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {message.message}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">
                    {message.date}
                  </span>
                </div>
              </div>
            ))}
            <div className="pt-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/messages">View All Messages</Link>
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card title="Quick Actions" className="p-6">
          <div className="space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} href={action.href}>
                  <div className={`p-4 rounded-lg border ${action.bgColor} hover:shadow-md transition-shadow cursor-pointer`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${action.bgColor} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${action.color}`} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600">
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
      <Card title="Recent Activity" className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                New service "E-commerce Development" was added
              </p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Eye className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                Portfolio item "Corporate Website" was updated
              </p>
              <p className="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                New testimonial from John Doe was approved
              </p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
