'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/common/Input';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/common/Modal';
import { serviceQueries } from '@/lib/supabase/queries';
import { Service } from '@/types';
import { Plus, Edit, Trash2, Search, Package } from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await serviceQueries.getAll();
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await serviceQueries.delete(id);
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-6 max-w-full mx-auto">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="h-8 w-64 bg-[#1C1C1E]/50 rounded animate-pulse mb-2" />
            <div className="h-4 w-96 bg-[#1C1C1E]/50 rounded animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-[#1C1C1E]/50 rounded animate-pulse" />
        </div>

        {/* Services Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card-tech p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-[#1C1C1E]/50 rounded-lg" />
                <div className="h-4 w-16 bg-[#1C1C1E]/50 rounded" />
              </div>
              <div className="h-6 w-3/4 bg-[#1C1C1E]/50 rounded mb-2" />
              <div className="h-4 w-full bg-[#1C1C1E]/50 rounded mb-2" />
              <div className="h-4 w-5/6 bg-[#1C1C1E]/50 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Services</h1>
          <p className="text-[#D1D1D1]">Manage your service offerings</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <Input
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={Search}
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="glass-card-tech p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-[#3FA9F5]/20 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#3FA9F5]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{service.title}</h3>
                  <Badge className={service.is_active ? 'bg-[#3FA9F5]/90 text-white' : 'bg-gray-500/90 text-white'}>
                    {service.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(service)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(service.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <p className="text-[#D1D1D1] text-sm mb-4 line-clamp-3">
              {service.description}
            </p>
            
            {service.price && (
              <div className="text-lg font-bold text-[#3FA9F5] mb-2">
                ${service.price}
              </div>
            )}
            
            {service.features && Array.isArray(service.features) && service.features.length > 0 && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-white">Features:</p>
                <ul className="text-sm text-[#D1D1D1]">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#3FA9F5] rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                  {service.features.length > 3 && (
                    <li className="text-[#D1D1D1] text-xs">
                      +{service.features.length - 3} more features
                    </li>
                  )}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-[#D1D1D1] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No services found</h3>
          <p className="text-[#D1D1D1] mb-4">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first service.'}
          </p>
          {!searchTerm && (
            <Button onClick={() => setIsModalOpen(true)} className="tech-button">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          )}
        </div>
      )}

      {/* Service Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        className="bg-deep-navy/95 border-[#3FA9F5]/50 backdrop-blur-sm"
        title={editingService ? 'Edit Service' : 'Add New Service'}
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Service form would go here. This is a placeholder for the actual form implementation.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button onClick={handleModalClose}>
              {editingService ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
