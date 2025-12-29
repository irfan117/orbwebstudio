'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/common/Modal';
import { ArrayInput } from '@/components/common/ArrayInput';
import { serviceQueries } from '@/lib/supabase/queries';
import { Service } from '@/types';
import { Plus, Edit, Trash2, Search, Package, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [currentService, setCurrentService] = useState<Partial<Service>>({
    is_active: true,
    features: [],
    sort_order: 0
  });

  const { toast } = useToast();

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
      toast({
        title: 'Error',
        description: 'Failed to fetch services',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setCurrentService(service);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setCurrentService({
      is_active: true,
      features: [],
      sort_order: services.length + 1
    });
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await serviceQueries.delete(id);
        toast({
          title: 'Success',
          description: 'Service deleted successfully',
        });
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete service',
          variant: 'destructive',
        });
      }
    }
  };

  const handleSave = async () => {
    if (!currentService.title || !currentService.price) {
      toast({
        title: 'Error',
        description: 'Title and Price are required',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (currentService.id) {
        await serviceQueries.update(currentService.id, currentService);
        toast({ title: 'Success', description: 'Service updated successfully' });
      } else {
        await serviceQueries.create(currentService as Omit<Service, 'id' | 'created_at' | 'updated_at'>);
        toast({ title: 'Success', description: 'Service created successfully' });
      }
      fetchServices();
      resetForm();
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: 'Error',
        description: 'Failed to save service',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#3FA9F5]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 sm:pb-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Services</h1>
          <p className="text-[#D1D1D1]">Manage your service packages</p>
        </div>
        <Button onClick={() => { resetForm(); setIsModalOpen(true); }} className="tech-button">
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Search */}
      <div className="max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <Input
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-[#1C1C1E] border-gray-700 text-white placeholder-gray-500"
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="glass-card-tech p-6 relative group hover:border-[#3FA9F5]/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#3FA9F5]/20 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#3FA9F5]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white line-clamp-1" title={service.title}>{service.title}</h3>
                  <Badge className={service.is_active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                    {service.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>

              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg p-1 backdrop-blur-sm absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 sm:bg-transparent sm:backdrop-blur-none">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(service)} className="text-[#3FA9F5] hover:text-white hover:bg-[#3FA9F5]/20 h-8 w-8 p-0">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(service.id)} className="text-red-500 hover:text-red-400 hover:bg-red-500/20 h-8 w-8 p-0">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <p className="text-[#D1D1D1] text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
              {service.description}
            </p>

            <div className="flex items-end justify-between mt-auto">
              <div className="text-lg font-bold text-[#3FA9F5]">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(service.price || 0)}
              </div>
              <div className="text-xs text-[#D1D1D1] bg-[#1C1C1E] px-2 py-1 rounded">
                {(service.features?.length || 0)} Features
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12 bg-[#1C1C1E]/30 rounded-xl border border-dashed border-gray-700">
          <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No services found</h3>
          <p className="text-[#D1D1D1]">Get started by adding your first service package.</p>
        </div>
      )}

      {/* Service Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={resetForm}
        className="bg-deep-navy/95 border-[#3FA9F5]/50 backdrop-blur-sm w-full max-w-2xl mx-auto sm:my-8 h-full sm:h-auto sm:rounded-xl overflow-y-auto"
        title={currentService.id ? 'Edit Service' : 'Add New Service'}
        size="lg"
      >
        <div className="space-y-6 pt-2">
          {/* Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Service Title *</Label>
              <Input
                value={currentService.title || ''}
                onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                placeholder="e.g., Web Development"
                className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Price (IDR) *</Label>
              <Input
                type="number"
                value={currentService.price || ''}
                onChange={(e) => setCurrentService({ ...currentService, price: parseFloat(e.target.value) })}
                placeholder="15000000"
                className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Description</Label>
            <Textarea
              value={currentService.description || ''}
              onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
              placeholder="Brief description of the service..."
              rows={3}
              className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Icon Name (Lucide React)</Label>
              <Input
                value={currentService.icon || ''}
                onChange={(e) => setCurrentService({ ...currentService, icon: e.target.value })}
                placeholder="e.g., Code, Smartphone"
                className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Sort Order</Label>
              <Input
                type="number"
                value={currentService.sort_order || 0}
                onChange={(e) => setCurrentService({ ...currentService, sort_order: parseInt(e.target.value) })}
                className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white"
              />
            </div>
          </div>

          {/* Features Array Input */}
          <div className="space-y-2">
            <Label className="text-white">Features</Label>
            <p className="text-xs text-[#D1D1D1]">Press Enter to add feature</p>
            <ArrayInput
              value={currentService.features || []}
              onChange={(features) => setCurrentService({ ...currentService, features })}
              placeholder="Add a feature (e.g., SEO Optimization)"
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Switch
              checked={currentService.is_active}
              onCheckedChange={(checked) => setCurrentService({ ...currentService, is_active: checked })}
            />
            <Label className="text-white">Active Status</Label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800">
            <Button variant="ghost" onClick={resetForm} className="text-gray-400 hover:text-white">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSubmitting} className="tech-button">
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {currentService.id ? 'Save Changes' : 'Create Service'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
