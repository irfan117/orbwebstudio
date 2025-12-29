'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { portfolioQueries, projectTypeQueries, categoryQueries } from '@/lib/supabase/queries';
import { Portfolio, ProjectType, Category } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash, Eye, EyeOff, ExternalLink, Github, Loader2, Image as ImageIcon } from 'lucide-react';

export default function AdminPortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPortfolio, setCurrentPortfolio] = useState<Partial<Portfolio> | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [portfoliosData, projectTypesData, categoriesData] = await Promise.all([
        portfolioQueries.getAll(),
        projectTypeQueries.getAll(),
        categoryQueries.getAll()
      ]);
      setPortfolios(portfoliosData || []);
      setProjectTypes(projectTypesData || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch portfolio data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPortfolio?.title) {
      toast({
        title: 'Error',
        description: 'Portfolio title is required.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (currentPortfolio.id) {
        await portfolioQueries.update(currentPortfolio.id, currentPortfolio);
        toast({
          title: 'Success',
          description: 'Portfolio updated successfully.',
        });
      } else {
        await portfolioQueries.create(currentPortfolio as Omit<Portfolio, 'id' | 'created_at' | 'updated_at'>);
        toast({
          title: 'Success',
          description: 'Portfolio created successfully.',
        });
      }
      setOpenDialog(false);
      setCurrentPortfolio(null);
      fetchData();
    } catch (error) {
      console.error('Error saving portfolio:', error);
      toast({
        title: 'Error',
        description: 'Failed to save portfolio.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePortfolio = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this portfolio item?')) return;
    try {
      await portfolioQueries.delete(id);
      toast({
        title: 'Success',
        description: 'Portfolio deleted successfully.',
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete portfolio.',
        variant: 'destructive',
      });
    }
  };

  const handleTechStackChange = (value: string) => {
    const techStack = value.split(',').map(tech => tech.trim()).filter(tech => tech);
    setCurrentPortfolio({ ...currentPortfolio, tech_stack: techStack });
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

        {/* Portfolio Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card-tech overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-[#1C1C1E]/50" />
              <div className="p-6">
                <div className="h-6 w-3/4 bg-[#1C1C1E]/50 rounded mb-2" />
                <div className="h-4 w-full bg-[#1C1C1E]/50 rounded mb-2" />
                <div className="h-4 w-5/6 bg-[#1C1C1E]/50 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Portfolio Management</h1>
          <p className="text-[#D1D1D1]">Manage your portfolio projects and showcase your work</p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => setCurrentPortfolio({ is_featured: false, is_active: true, sort_order: portfolios.length })} className="tech-button">
              <Plus className="w-4 h-4 mr-2" /> Add New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-deep-navy/95 border-[#3FA9F5]/50 text-white p-6 sm:p-8 max-w-2xl backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle className="text-white">{currentPortfolio?.id ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSavePortfolio} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">Title *</Label>
                  <Input
                    id="title"
                    value={currentPortfolio?.title || ''}
                    onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, title: e.target.value })}
                    className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sort_order" className="text-white">Sort Order</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={currentPortfolio?.sort_order || 0}
                    onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, sort_order: parseInt(e.target.value) })}
                    className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={currentPortfolio?.description || ''}
                  onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, description: e.target.value })}
                  className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project_type_id" className="text-white">Project Type</Label>
                  <select
                    id="project_type_id"
                    value={currentPortfolio?.project_type_id || ''}
                    onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, project_type_id: e.target.value || null })}
                    className="w-full px-3 py-2 bg-[#2A2A2E] border border-[#3FA9F5]/50 rounded-md text-white focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                  >
                    <option value="">Select Project Type</option>
                    {projectTypes.map((type) => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category_id" className="text-white">Category</Label>
                  <select
                    id="category_id"
                    value={currentPortfolio?.category_id || ''}
                    onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, category_id: e.target.value || null })}
                    className="w-full px-3 py-2 bg-[#2A2A2E] border border-[#3FA9F5]/50 rounded-md text-white focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url" className="text-white">Image URL</Label>
                <Input
                  id="image_url"
                  value={currentPortfolio?.image_url || ''}
                  onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, image_url: e.target.value })}
                  className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tech_stack" className="text-white">Tech Stack (comma separated)</Label>
                <Input
                  id="tech_stack"
                  value={currentPortfolio?.tech_stack?.join(', ') || ''}
                  onChange={(e) => handleTechStackChange(e.target.value)}
                  className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                  placeholder="React, Next.js, TypeScript"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project_url" className="text-white">Project URL</Label>
                  <Input
                    id="project_url"
                    value={currentPortfolio?.project_url || ''}
                    onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, project_url: e.target.value })}
                    className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github_url" className="text-white">GitHub URL</Label>
                  <Input
                    id="github_url"
                    value={currentPortfolio?.github_url || ''}
                    onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, github_url: e.target.value })}
                    className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                    placeholder="https://github.com/user/repo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demo_url" className="text-white">Demo URL</Label>
                  <Input
                    id="demo_url"
                    value={currentPortfolio?.demo_url || ''}
                    onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, demo_url: e.target.value })}
                    className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                    placeholder="https://demo.example.com"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="is_featured" className="text-white">Featured</Label>
                    <Switch
                      id="is_featured"
                      checked={currentPortfolio?.is_featured || false}
                      onCheckedChange={(checked) => setCurrentPortfolio({ ...currentPortfolio, is_featured: checked })}
                      className="data-[state=checked]:bg-[#3FA9F5] data-[state=unchecked]:bg-gray-700"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="is_active" className="text-white">Active</Label>
                    <Switch
                      id="is_active"
                      checked={currentPortfolio?.is_active || false}
                      onCheckedChange={(checked) => setCurrentPortfolio({ ...currentPortfolio, is_active: checked })}
                      className="data-[state=checked]:bg-[#3FA9F5] data-[state=unchecked]:bg-gray-700"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpenDialog(false)} className="border-[#3FA9F5]/30 text-[#D1D1D1] hover:bg-[#3FA9F5]/10">
                  Cancel
                </Button>
                <Button type="submit" className="tech-button" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {currentPortfolio?.id ? 'Save Changes' : 'Create Project'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <Card key={portfolio.id} className="bg-deep-navy/90 border-[#3FA9F5]/50 backdrop-blur-sm overflow-hidden">
            <div className="relative">
              {portfolio.image_url ? (
                <img
                  src={portfolio.image_url}
                  alt={portfolio.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-[#1C1C1E]/50 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-[#D1D1D1]" />
                </div>
              )}
              <div className="absolute top-4 right-4 flex space-x-2">
                {portfolio.is_featured && (
                  <Badge className="bg-[#C6A664]/90 text-white">Featured</Badge>
                )}
                {!portfolio.is_active && (
                  <Badge variant="destructive" className="bg-red-500/90">Inactive</Badge>
                )}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">{portfolio.title}</h3>
              <p className="text-sm text-[#D1D1D1] mb-4 line-clamp-2">{portfolio.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {portfolio.tech_stack?.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-[#3FA9F5]/20 text-[#3FA9F5] border-[#3FA9F5]/30">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => { setCurrentPortfolio(portfolio); setOpenDialog(true); }} className="text-[#3FA9F5] hover:bg-[#3FA9F5]/10">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeletePortfolio(portfolio.id)} className="text-red-500 hover:bg-red-500/10">
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex space-x-1">
                  {portfolio.project_url && (
                    <Button variant="ghost" size="icon" onClick={() => portfolio.project_url && window.open(portfolio.project_url, '_blank')} className="text-[#3FA9F5] hover:bg-[#3FA9F5]/10">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                  {portfolio.github_url && (
                    <Button variant="ghost" size="icon" onClick={() => portfolio.github_url && window.open(portfolio.github_url, '_blank')} className="text-[#D1D1D1] hover:bg-[#3FA9F5]/10">
                      <Github className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {portfolios.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-[#1C1C1E]/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-12 h-12 text-[#D1D1D1]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Portfolio Items</h3>
          <p className="text-[#D1D1D1] mb-4">Get started by adding your first portfolio project.</p>
          <Button onClick={() => { setCurrentPortfolio({ is_featured: false, is_active: true, sort_order: 0 }); setOpenDialog(true); }} className="tech-button">
            <Plus className="w-4 h-4 mr-2" /> Add First Project
          </Button>
        </div>
      )}
    </div>
  );
}
