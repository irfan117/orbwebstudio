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
import { testimonialQueries, portfolioQueries } from '@/lib/supabase/queries_comprehensive';
import { Testimonial, Portfolio } from '@/types/comprehensive';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash, Star, Check, X, Loader2, User } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial> | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [testimonialsData, portfoliosData] = await Promise.all([
        testimonialQueries.getAll(),
        portfolioQueries.getAll()
      ]);
      setTestimonials(testimonialsData || []);
      setPortfolios(portfoliosData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch testimonials data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTestimonial?.client_name || !currentTestimonial?.review) {
      toast({
        title: 'Error',
        description: 'Client name and review are required.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (currentTestimonial.id) {
        await testimonialQueries.update(currentTestimonial.id, currentTestimonial);
        toast({
          title: 'Success',
          description: 'Testimonial updated successfully.',
        });
      } else {
        await testimonialQueries.create(currentTestimonial as Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>);
        toast({
          title: 'Success',
          description: 'Testimonial created successfully.',
        });
      }
      setOpenDialog(false);
      setCurrentTestimonial(null);
      fetchData();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast({
        title: 'Error',
        description: 'Failed to save testimonial.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await testimonialQueries.delete(id);
      toast({
        title: 'Success',
        description: 'Testimonial deleted successfully.',
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete testimonial.',
        variant: 'destructive',
      });
    }
  };

  const handleApproveTestimonial = async (id: string, approved: boolean) => {
    try {
      await testimonialQueries.update(id, { is_approved: approved });
      toast({
        title: 'Success',
        description: `Testimonial ${approved ? 'approved' : 'unapproved'} successfully.`,
      });
      fetchData();
    } catch (error) {
      console.error('Error updating testimonial:', error);
      toast({
        title: 'Error',
        description: 'Failed to update testimonial.',
        variant: 'destructive',
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
        }`}
      />
    ));
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

        {/* Testimonials Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card-tech p-6 animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-[#1C1C1E]/50 rounded-full" />
                <div className="h-4 w-32 bg-[#1C1C1E]/50 rounded" />
              </div>
              <div className="h-4 w-full bg-[#1C1C1E]/50 rounded mb-2" />
              <div className="h-4 w-5/6 bg-[#1C1C1E]/50 rounded" />
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
          <h1 className="text-xl sm:text-2xl font-bold text-white">Testimonials Management</h1>
          <p className="text-[#D1D1D1]">Manage client testimonials and reviews</p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => setCurrentTestimonial({ is_approved: false, is_featured: false, rating: 5 })} className="tech-button">
              <Plus className="w-4 h-4 mr-2" /> Add New Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-deep-navy/95 border-[#3FA9F5]/50 text-white p-6 sm:p-8 max-w-2xl backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle className="text-white">{currentTestimonial?.id ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveTestimonial} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client_name" className="text-white">Client Name *</Label>
                  <Input
                    id="client_name"
                    value={currentTestimonial?.client_name || ''}
                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, client_name: e.target.value })}
                    className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client_company" className="text-white">Company</Label>
                  <Input
                    id="client_company"
                    value={currentTestimonial?.client_company || ''}
                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, client_company: e.target.value })}
                    className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="client_position" className="text-white">Position</Label>
                <Input
                  id="client_position"
                  value={currentTestimonial?.client_position || ''}
                  onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, client_position: e.target.value })}
                  className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating" className="text-white">Rating (1-5)</Label>
                <select
                  id="rating"
                  value={currentTestimonial?.rating || 5}
                  onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, rating: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#2A2A2E] border border-[#3FA9F5]/50 rounded-md text-white focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                >
                  <option value={1}>1 Star</option>
                  <option value={2}>2 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="review" className="text-white">Review *</Label>
                <Textarea
                  id="review"
                  value={currentTestimonial?.review || ''}
                  onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, review: e.target.value })}
                  className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project_id" className="text-white">Related Project</Label>
                <select
                  id="project_id"
                  value={currentTestimonial?.project_id || ''}
                  onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, project_id: e.target.value || null })}
                    className="w-full px-3 py-2 bg-[#2A2A2E] border border-[#3FA9F5]/50 rounded-md text-white focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                >
                  <option value="">Select Project (Optional)</option>
                  {portfolios.map((portfolio) => (
                    <option key={portfolio.id} value={portfolio.id}>{portfolio.title}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar_url" className="text-white">Avatar URL</Label>
                <Input
                  id="avatar_url"
                  value={currentTestimonial?.avatar_url || ''}
                  onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, avatar_url: e.target.value })}
                  className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="is_approved" className="text-white">Approved</Label>
                    <Switch
                      id="is_approved"
                      checked={currentTestimonial?.is_approved || false}
                      onCheckedChange={(checked) => setCurrentTestimonial({ ...currentTestimonial, is_approved: checked })}
                      className="data-[state=checked]:bg-[#3FA9F5] data-[state=unchecked]:bg-gray-700"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="is_featured" className="text-white">Featured</Label>
                    <Switch
                      id="is_featured"
                      checked={currentTestimonial?.is_featured || false}
                      onCheckedChange={(checked) => setCurrentTestimonial({ ...currentTestimonial, is_featured: checked })}
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
                  {currentTestimonial?.id ? 'Save Changes' : 'Create Testimonial'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="bg-deep-navy/90 border-[#3FA9F5]/50 backdrop-blur-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {testimonial.avatar_url ? (
                  <img
                    src={testimonial.avatar_url}
                    alt={testimonial.client_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-[#3FA9F5]/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-[#3FA9F5]" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-white">{testimonial.client_name}</h3>
                  {testimonial.client_company && (
                    <p className="text-sm text-[#D1D1D1]">{testimonial.client_company}</p>
                  )}
                  {testimonial.client_position && (
                    <p className="text-xs text-[#3FA9F5]/70">{testimonial.client_position}</p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => { setCurrentTestimonial(testimonial); setOpenDialog(true); }} className="text-[#3FA9F5] hover:bg-[#3FA9F5]/10">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteTestimonial(testimonial.id)} className="text-red-500 hover:bg-red-500/10">
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                {renderStars(testimonial.rating || 5)}
                <span className="text-sm text-[#D1D1D1]">({testimonial.rating}/5)</span>
              </div>
              <p className="text-[#D1D1D1] text-sm leading-relaxed">{testimonial.review}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {testimonial.is_approved ? (
                  <Badge className="bg-green-500/90 text-white flex items-center">
                    <Check className="w-3 h-3 mr-1" />
                    Approved
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="bg-red-500/90 text-white flex items-center">
                    <X className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                )}
                {testimonial.is_featured && (
                  <Badge className="bg-[#C6A664]/90 text-white">Featured</Badge>
                )}
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleApproveTestimonial(testimonial.id, !testimonial.is_approved)}
                  className={testimonial.is_approved ? "text-red-500 hover:bg-red-500/10" : "text-green-500 hover:bg-green-500/10"}
                >
                  {testimonial.is_approved ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-[#1C1C1E]/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-12 h-12 text-[#D1D1D1]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Testimonials</h3>
          <p className="text-[#D1D1D1] mb-4">Get started by adding your first client testimonial.</p>
          <Button onClick={() => { setCurrentTestimonial({ is_approved: false, is_featured: false, rating: 5 }); setOpenDialog(true); }} className="tech-button">
            <Plus className="w-4 h-4 mr-2" /> Add First Testimonial
          </Button>
        </div>
      )}
    </div>
  );
}
