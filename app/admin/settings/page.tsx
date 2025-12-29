'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { siteSettingQueries } from '@/lib/supabase/queries';
import { SiteSetting } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Save, Settings, Globe, Mail, Phone, Instagram, Linkedin, Github, Eye, EyeOff, Loader2, RefreshCw } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await siteSettingQueries.getAll();
      setSettings(data || []);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch settings.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (key: string, value: string) => {
    setSettings(prev => prev.map(setting =>
      setting.key === key ? { ...setting, value } : setting
    ));
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      for (const setting of settings) {
        await siteSettingQueries.update(setting.id, { value: setting.value });
      }
      toast({
        title: 'Success',
        description: 'Settings saved successfully.',
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const getSettingValue = (key: string) => {
    return settings.find(s => s.key === key)?.value || '';
  };

  const isSecretKey = (key: string) => {
    return key.includes('api_key') || key.includes('password') || key.includes('secret');
  };

  const maskValue = (value: string) => {
    if (value.length <= 8) return '••••••••';
    return value.substring(0, 4) + '••••••••' + value.substring(value.length - 4);
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

        {/* Settings Cards Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card-tech p-6 animate-pulse">
              <div className="h-6 w-32 bg-[#1C1C1E]/50 rounded mb-4" />
              <div className="space-y-4">
                <div className="h-10 w-full bg-[#1C1C1E]/50 rounded" />
                <div className="h-10 w-full bg-[#1C1C1E]/50 rounded" />
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
          <h1 className="text-xl sm:text-2xl font-bold text-white">Site Settings</h1>
          <p className="text-[#D1D1D1]">Manage your website configuration and preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowSecrets(!showSecrets)}
            className="border-[#3FA9F5]/30 text-[#D1D1D1] hover:text-white hover:border-[#3FA9F5]/50"
          >
            {showSecrets ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showSecrets ? 'Hide' : 'Show'} Secrets
          </Button>
          <Button onClick={handleSaveSettings} disabled={saving} className="tech-button">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="bg-deep-navy/90 border-[#3FA9F5]/50 backdrop-blur-sm p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Settings className="w-5 h-5 text-[#3FA9F5]" />
            <h2 className="text-lg font-semibold text-white">General Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site_name" className="text-white">Site Name</Label>
              <Input
                id="site_name"
                value={getSettingValue('site_name')}
                onChange={(e) => handleSettingChange('site_name', e.target.value)}
                className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site_description" className="text-white">Site Description</Label>
              <Textarea
                id="site_description"
                value={getSettingValue('site_description')}
                onChange={(e) => handleSettingChange('site_description', e.target.value)}
                className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="bg-deep-navy/90 border-[#3FA9F5]/50 backdrop-blur-sm p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Mail className="w-5 h-5 text-[#3FA9F5]" />
            <h2 className="text-lg font-semibold text-white">Contact Information</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact_email" className="text-white">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={getSettingValue('contact_email')}
                onChange={(e) => handleSettingChange('contact_email', e.target.value)}
                className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_phone" className="text-white">Contact Phone</Label>
              <Input
                id="contact_phone"
                value={getSettingValue('contact_phone')}
                onChange={(e) => handleSettingChange('contact_phone', e.target.value)}
                className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
              />
            </div>
          </div>
        </Card>

        {/* Social Media */}
        <Card className="bg-deep-navy/90 border-[#3FA9F5]/50 backdrop-blur-sm p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Globe className="w-5 h-5 text-[#3FA9F5]" />
            <h2 className="text-lg font-semibold text-white">Social Media</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="social_instagram" className="text-white flex items-center">
                <Instagram className="w-4 h-4 mr-2" />
                Instagram URL
              </Label>
              <Input
                id="social_instagram"
                value={getSettingValue('social_instagram')}
                onChange={(e) => handleSettingChange('social_instagram', e.target.value)}
                className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                placeholder="https://instagram.com/yourusername"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="social_linkedin" className="text-white flex items-center">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn URL
              </Label>
              <Input
                id="social_linkedin"
                value={getSettingValue('social_linkedin')}
                onChange={(e) => handleSettingChange('social_linkedin', e.target.value)}
                className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="social_github" className="text-white flex items-center">
                <Github className="w-4 h-4 mr-2" />
                GitHub URL
              </Label>
              <Input
                id="social_github"
                value={getSettingValue('social_github')}
                onChange={(e) => handleSettingChange('social_github', e.target.value)}
                className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                placeholder="https://github.com/yourusername"
              />
            </div>
          </div>
        </Card>

        {/* API Keys & Secrets */}
        <Card className="bg-deep-navy/90 border-[#3FA9F5]/50 backdrop-blur-sm p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Settings className="w-5 h-5 text-[#3FA9F5]" />
            <h2 className="text-lg font-semibold text-white">API Keys & Secrets</h2>
            <Badge variant="destructive" className="text-xs">Sensitive</Badge>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="google_analytics_id" className="text-white">Google Analytics ID</Label>
              <Input
                id="google_analytics_id"
                value={showSecrets ? getSettingValue('google_analytics_id') : maskValue(getSettingValue('google_analytics_id'))}
                onChange={(e) => handleSettingChange('google_analytics_id', e.target.value)}
                className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                type={showSecrets ? 'text' : 'password'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="google_maps_api_key" className="text-white">Google Maps API Key</Label>
              <Input
                id="google_maps_api_key"
                value={showSecrets ? getSettingValue('google_maps_api_key') : maskValue(getSettingValue('google_maps_api_key'))}
                onChange={(e) => handleSettingChange('google_maps_api_key', e.target.value)}
                className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                type={showSecrets ? 'text' : 'password'}
              />
            </div>
          </div>
        </Card>

        {/* SEO Settings */}
        <Card className="bg-deep-navy/90 border-[#3FA9F5]/50 backdrop-blur-sm p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Globe className="w-5 h-5 text-[#3FA9F5]" />
            <h2 className="text-lg font-semibold text-white">SEO Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meta_title" className="text-white">Meta Title</Label>
              <Input
                id="meta_title"
                value={getSettingValue('meta_title')}
                onChange={(e) => handleSettingChange('meta_title', e.target.value)}
                className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                placeholder="Your Website Title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta_description" className="text-white">Meta Description</Label>
              <Textarea
                id="meta_description"
                value={getSettingValue('meta_description')}
                onChange={(e) => handleSettingChange('meta_description', e.target.value)}
                className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                rows={3}
                placeholder="Brief description of your website"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta_keywords" className="text-white">Meta Keywords</Label>
              <Input
                id="meta_keywords"
                value={getSettingValue('meta_keywords')}
                onChange={(e) => handleSettingChange('meta_keywords', e.target.value)}
                className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                placeholder="web development, design, digital agency"
              />
            </div>
          </div>
        </Card>

        {/* System Settings */}
        <Card className="bg-deep-navy/90 border-[#3FA9F5]/50 backdrop-blur-sm p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Settings className="w-5 h-5 text-[#3FA9F5]" />
            <h2 className="text-lg font-semibold text-white">System Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenance_mode" className="text-white">Maintenance Mode</Label>
                <p className="text-sm text-[#D1D1D1]">Enable maintenance mode to show maintenance page</p>
              </div>
              <Switch
                id="maintenance_mode"
                checked={getSettingValue('maintenance_mode') === 'true'}
                onCheckedChange={(checked) => handleSettingChange('maintenance_mode', checked.toString())}
                className="data-[state=checked]:bg-[#3FA9F5] data-[state=unchecked]:bg-gray-700"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable_analytics" className="text-white">Enable Analytics</Label>
                <p className="text-sm text-[#D1D1D1]">Track website visitors and behavior</p>
              </div>
              <Switch
                id="enable_analytics"
                checked={getSettingValue('enable_analytics') === 'true'}
                onCheckedChange={(checked) => handleSettingChange('enable_analytics', checked.toString())}
                className="data-[state=checked]:bg-[#3FA9F5] data-[state=unchecked]:bg-gray-700"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable_contact_form" className="text-white">Enable Contact Form</Label>
                <p className="text-sm text-[#D1D1D1]">Allow visitors to send contact messages</p>
              </div>
              <Switch
                id="enable_contact_form"
                checked={getSettingValue('enable_contact_form') === 'true'}
                onCheckedChange={(checked) => handleSettingChange('enable_contact_form', checked.toString())}
                className="data-[state=checked]:bg-[#3FA9F5] data-[state=unchecked]:bg-gray-700"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={saving} className="tech-button" size="lg">
          {saving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
          {saving ? 'Saving...' : 'Save All Settings'}
        </Button>
      </div>
    </div>
  );
}
