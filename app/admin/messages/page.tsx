'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { contactMessageQueries } from '@/lib/supabase/queries_comprehensive';
import { ContactMessage } from '@/types/comprehensive';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, Building, Calendar, Eye, EyeOff, Reply, Trash, Loader2, Search, Filter } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read' | 'responded'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await contactMessageQueries.getAll();
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch messages.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string, isRead: boolean) => {
    try {
      await contactMessageQueries.update(id, { is_read: isRead });
      toast({
        title: 'Success',
        description: `Message marked as ${isRead ? 'read' : 'unread'}.`,
      });
      fetchMessages();
    } catch (error) {
      console.error('Error updating message:', error);
      toast({
        title: 'Error',
        description: 'Failed to update message.',
        variant: 'destructive',
      });
    }
  };

  const handleMarkAsResponded = async (id: string, isResponded: boolean) => {
    try {
      await contactMessageQueries.update(id, { is_responded: isResponded });
      toast({
        title: 'Success',
        description: `Message marked as ${isResponded ? 'responded' : 'not responded'}.`,
      });
      fetchMessages();
    } catch (error) {
      console.error('Error updating message:', error);
      toast({
        title: 'Error',
        description: 'Failed to update message.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await contactMessageQueries.delete(id);
      toast({
        title: 'Success',
        description: 'Message deleted successfully.',
      });
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete message.',
        variant: 'destructive',
      });
    }
  };

  const handleReply = async (message: ContactMessage) => {
    if (!replyText.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a reply message.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Here you would typically send an email or save the reply
      // For now, we'll just mark as responded
      await contactMessageQueries.update(message.id, { is_responded: true });
      toast({
        title: 'Success',
        description: 'Reply sent successfully.',
      });
      setReplyText('');
      setSelectedMessage(null);
      fetchMessages();
    } catch (error) {
      console.error('Error sending reply:', error);
      toast({
        title: 'Error',
        description: 'Failed to send reply.',
        variant: 'destructive',
      });
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'unread' && !message.is_read) ||
                         (filterStatus === 'read' && message.is_read) ||
                         (filterStatus === 'responded' && message.is_responded);
    
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/90';
      case 'high': return 'bg-orange-500/90';
      case 'normal': return 'bg-blue-500/90';
      case 'low': return 'bg-gray-500/90';
      default: return 'bg-blue-500/90';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
          <div className="h-6 w-24 bg-[#1C1C1E]/50 rounded animate-pulse" />
        </div>

        {/* Filters Skeleton */}
        <div className="glass-card-tech p-4 animate-pulse">
          <div className="h-10 w-full bg-[#1C1C1E]/50 rounded" />
        </div>

        {/* Messages Skeleton */}
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="glass-card-tech p-6 animate-pulse">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="h-5 w-40 bg-[#1C1C1E]/50 rounded mb-2" />
                  <div className="h-4 w-56 bg-[#1C1C1E]/50 rounded mb-2" />
                  <div className="h-4 w-full bg-[#1C1C1E]/50 rounded" />
                </div>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-[#1C1C1E]/50 rounded" />
                  <div className="w-8 h-8 bg-[#1C1C1E]/50 rounded" />
                </div>
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
          <h1 className="text-xl sm:text-2xl font-bold text-white">Contact Messages</h1>
          <p className="text-[#D1D1D1]">Manage incoming contact messages and inquiries</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-[#3FA9F5]/30 text-[#3FA9F5]">
            {messages.filter(m => !m.is_read).length} Unread
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-deep-navy/90 border-[#3FA9F5]/50 backdrop-blur-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D1D1D1] w-4 h-4" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              className={filterStatus === 'all' ? 'tech-button' : 'border-[#3FA9F5]/30 text-[#D1D1D1] hover:text-white hover:border-[#3FA9F5]/50'}
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'unread' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('unread')}
              className={filterStatus === 'unread' ? 'tech-button' : 'border-[#3FA9F5]/30 text-[#D1D1D1] hover:text-white hover:border-[#3FA9F5]/50'}
            >
              Unread
            </Button>
            <Button
              variant={filterStatus === 'read' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('read')}
              className={filterStatus === 'read' ? 'tech-button' : 'border-[#3FA9F5]/30 text-[#D1D1D1] hover:text-white hover:border-[#3FA9F5]/50'}
            >
              Read
            </Button>
            <Button
              variant={filterStatus === 'responded' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('responded')}
              className={filterStatus === 'responded' ? 'tech-button' : 'border-[#3FA9F5]/30 text-[#D1D1D1] hover:text-white hover:border-[#3FA9F5]/50'}
            >
              Responded
            </Button>
          </div>
        </div>
      </Card>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <Card key={message.id} className={`bg-deep-navy/90 border-[#3FA9F5]/50 backdrop-blur-sm p-6 ${!message.is_read ? 'border-[#3FA9F5]/70 bg-[#3FA9F5]/10' : ''}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-white">{message.name}</h3>
                    <Badge className={getPriorityColor(message.priority || 'normal')}>
                      {message.priority || 'normal'}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    {!message.is_read && (
                      <Badge className="bg-[#3FA9F5]/90 text-white">New</Badge>
                    )}
                    {message.is_responded && (
                      <Badge className="bg-green-500/90 text-white">Responded</Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-[#D1D1D1]">
                    <Mail className="w-4 h-4" />
                    <span>{message.email}</span>
                  </div>
                  {message.phone && (
                    <div className="flex items-center space-x-2 text-sm text-[#D1D1D1]">
                      <Phone className="w-4 h-4" />
                      <span>{message.phone}</span>
                    </div>
                  )}
                  {message.company && (
                    <div className="flex items-center space-x-2 text-sm text-[#D1D1D1]">
                      <Building className="w-4 h-4" />
                      <span>{message.company}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-sm text-[#D1D1D1]">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(message.created_at)}</span>
                  </div>
                </div>

                {message.subject && (
                  <h4 className="text-md font-medium text-white mb-2">{message.subject}</h4>
                )}

                <p className="text-[#D1D1D1] mb-4 leading-relaxed">{message.message}</p>

                {(message.service_interest || message.budget_range || message.project_timeline) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {message.service_interest && (
                      <div>
                        <Label className="text-xs text-[#3FA9F5]">Service Interest</Label>
                        <p className="text-sm text-white">{message.service_interest}</p>
                      </div>
                    )}
                    {message.budget_range && (
                      <div>
                        <Label className="text-xs text-[#3FA9F5]">Budget Range</Label>
                        <p className="text-sm text-white">{message.budget_range}</p>
                      </div>
                    )}
                    {message.project_timeline && (
                      <div>
                        <Label className="text-xs text-[#3FA9F5]">Timeline</Label>
                        <p className="text-sm text-white">{message.project_timeline}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleMarkAsRead(message.id, !message.is_read)}
                  className={message.is_read ? "text-[#3FA9F5] hover:bg-[#3FA9F5]/10" : "text-green-500 hover:bg-green-500/10"}
                >
                  {message.is_read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedMessage(message)}
                  className="text-[#3FA9F5] hover:bg-[#3FA9F5]/10"
                >
                  <Reply className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteMessage(message.id)}
                  className="text-red-500 hover:bg-red-500/10"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-[#1C1C1E]/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-12 h-12 text-[#D1D1D1]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Messages Found</h3>
          <p className="text-[#D1D1D1]">
            {searchTerm || filterStatus !== 'all' 
              ? 'No messages match your current filters.' 
              : 'No contact messages have been received yet.'}
          </p>
        </div>
      )}

      {/* Reply Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="bg-deep-navy/95 border-[#3FA9F5]/50 text-white p-6 sm:p-8 max-w-2xl backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-white">Reply to {selectedMessage?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-[#1C1C1E]/50 rounded-lg">
              <h4 className="text-sm font-medium text-white mb-2">Original Message:</h4>
              <p className="text-[#D1D1D1] text-sm">{selectedMessage?.message}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reply" className="text-white">Your Reply</Label>
              <Textarea
                id="reply"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                rows={6}
                placeholder="Type your reply here..."
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedMessage(null)} className="border-[#3FA9F5]/30 text-[#D1D1D1] hover:bg-[#3FA9F5]/10">
                Cancel
              </Button>
              <Button onClick={() => selectedMessage && handleReply(selectedMessage)} className="tech-button">
                Send Reply
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
