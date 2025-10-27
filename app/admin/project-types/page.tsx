'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/common/Input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { projectTypeQueries } from '@/lib/supabase/queries';
import { ProjectType } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

export default function ProjectTypesPage() {
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState<ProjectType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    color: '#3FA9F5',
    is_active: true,
    sort_order: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProjectTypes();
  }, []);

  const fetchProjectTypes = async () => {
    try {
      const data = await projectTypeQueries.getAll();
      setProjectTypes(data || []);
    } catch (error) {
      console.error('Error fetching project types:', error);
      toast({
        title: "Error",
        description: "Failed to fetch project types",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingType) {
        await projectTypeQueries.update(editingType.id, formData);
        toast({
          title: "Success",
          description: "Project type updated successfully",
        });
      } else {
        await projectTypeQueries.create(formData);
        toast({
          title: "Success",
          description: "Project type created successfully",
        });
      }
      setIsDialogOpen(false);
      setEditingType(null);
      setFormData({
        name: '',
        description: '',
        icon: '',
        color: '#3FA9F5',
        is_active: true,
        sort_order: 0
      });
      fetchProjectTypes();
    } catch (error) {
      console.error('Error saving project type:', error);
      toast({
        title: "Error",
        description: "Failed to save project type",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (projectType: ProjectType) => {
    setEditingType(projectType);
    setFormData({
      name: projectType.name,
      description: projectType.description || '',
      icon: projectType.icon || '',
      color: projectType.color,
      is_active: projectType.is_active,
      sort_order: projectType.sort_order
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project type?')) {
      try {
        await projectTypeQueries.delete(id);
        toast({
          title: "Success",
          description: "Project type deleted successfully",
        });
        fetchProjectTypes();
      } catch (error) {
        console.error('Error deleting project type:', error);
        toast({
          title: "Error",
          description: "Failed to delete project type",
          variant: "destructive",
        });
      }
    }
  };

  const handleToggleActive = async (projectType: ProjectType) => {
    try {
      await projectTypeQueries.update(projectType.id, {
        is_active: !projectType.is_active
      });
      toast({
        title: "Success",
        description: `Project type ${!projectType.is_active ? 'activated' : 'deactivated'}`,
      });
      fetchProjectTypes();
    } catch (error) {
      console.error('Error updating project type:', error);
      toast({
        title: "Error",
        description: "Failed to update project type",
        variant: "destructive",
      });
    }
  };

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

        {/* Project Types Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card-tech p-6 animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-[#1C1C1E]/50 rounded-lg" />
                <div>
                  <div className="h-5 w-32 bg-[#1C1C1E]/50 rounded mb-2" />
                  <div className="h-3 w-16 bg-[#1C1C1E]/50 rounded" />
                </div>
              </div>
              <div className="h-4 w-full bg-[#1C1C1E]/50 rounded" />
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
          <h1 className="text-xl sm:text-2xl font-bold text-white">Project Types</h1>
          <p className="text-[#D1D1D1]">Manage project categories for portfolio</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="tech-button">
              <Plus className="w-4 h-4 mr-2" />
              Add Project Type
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-deep-navy/95 border-[#3FA9F5]/50 backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingType ? 'Edit Project Type' : 'Add New Project Type'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g., Web App"
              />
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1C1C1E]/50 border border-[#3FA9F5]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3FA9F5] focus:border-transparent text-white placeholder-[#D1D1D1]"
                  placeholder="Brief description of this project type"
                  rows={3}
                />
              </div>
              <Input
                label="Icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="e.g., Globe, ShoppingCart"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Color</label>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full h-10 rounded-md border border-[#3FA9F5]/30"
                  />
                </div>
                <Input
                  label="Sort Order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4 text-[#3FA9F5] focus:ring-[#3FA9F5] border-[#3FA9F5]/30 rounded bg-[#1C1C1E]/50"
                />
                <label htmlFor="is_active" className="text-sm text-[#D1D1D1]">
                  Active
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingType(null);
                    setFormData({
                      name: '',
                      description: '',
                      icon: '',
                      color: '#3FA9F5',
                      is_active: true,
                      sort_order: 0
                    });
                  }}
                  className="border-[#3FA9F5]/30 text-[#3FA9F5] hover:bg-[#3FA9F5]/10"
                >
                  Cancel
                </Button>
                <Button type="submit" className="tech-button">
                  {editingType ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Project Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {projectTypes.map((projectType) => (
          <Card key={projectType.id} className="bg-deep-navy/90 border-[#3FA9F5]/50 backdrop-blur-sm p-4 sm:p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: projectType.color + '20' }}
                >
                  <span className="text-lg" style={{ color: projectType.color }}>
                    {projectType.icon || '📁'}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{projectType.name}</h3>
                  <Badge 
                    variant={projectType.is_active ? "default" : "secondary"}
                    className={`text-xs ${
                      projectType.is_active 
                        ? 'bg-[#3FA9F5]/20 text-[#3FA9F5] border-[#3FA9F5]/30' 
                        : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    }`}
                  >
                    {projectType.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleActive(projectType)}
                  className="p-2 border-[#3FA9F5]/30 text-[#3FA9F5] hover:bg-[#3FA9F5]/10"
                >
                  {projectType.is_active ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(projectType)}
                  className="p-2 border-[#3FA9F5]/30 text-[#3FA9F5] hover:bg-[#3FA9F5]/10"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(projectType.id)}
                  className="p-2 border-red-500/30 text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {projectType.description && (
              <p className="text-sm text-[#D1D1D1] mb-3">{projectType.description}</p>
            )}
            <div className="flex items-center justify-between text-xs text-[#3FA9F5]/70">
              <span>Sort Order: {projectType.sort_order}</span>
              <span>Created: {new Date(projectType.created_at).toLocaleDateString()}</span>
            </div>
          </Card>
        ))}
      </div>

      {projectTypes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#D1D1D1] text-lg">No project types found</p>
          <p className="text-sm text-[#3FA9F5]/70 mt-2">Create your first project type to get started</p>
        </div>
      )}
    </div>
  );
}
