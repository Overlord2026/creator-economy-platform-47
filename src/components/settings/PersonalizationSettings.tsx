import React, { useState, useEffect } from 'react';
import { legacyQueryOptionalTable } from '@/lib/db/safeSupabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Palette, 
  Moon, 
  Sun, 
  Monitor,
  Upload,
  Crown,
  ChevronDown,
  ChevronRight,
  Eye,
  Globe,
  Layout,
  Image,
  Save,
  Loader2,
  Lock
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSubscriptionAccess } from '@/hooks/useSubscriptionAccess';
import { useEventTracking } from '@/hooks/useEventTracking';
import { useToast } from '@/hooks/use-toast';
import { sb } from '@/lib/supabase-relaxed';
import { withFallback, safeQueryOptionalTable, safeInsertOptionalTable, isOk } from '@/lib/db/safeSupabase';

interface PersonalizationSettings {
  theme: 'light' | 'dark' | 'system';
  dashboard_layout: 'compact' | 'comfortable' | 'spacious';
  primary_color: string;
  show_advanced_features: boolean;
  show_beta_features: boolean;
  default_dashboard_view: 'overview' | 'detailed' | 'analytics';
  sidebar_collapsed: boolean;
  show_tooltips: boolean;
  animation_level: 'none' | 'reduced' | 'full';
  // Premium features
  custom_logo_url?: string;
  custom_domain?: string;
  white_label_enabled?: boolean;
  custom_brand_colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const PersonalizationSettings: React.FC = () => {
  const { user } = useAuth();
  const { subscriptionPlan, checkFeatureAccess } = useSubscriptionAccess();
  const { trackFeatureUsed } = useEventTracking();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);
  
  const [settings, setSettings] = useState<PersonalizationSettings>({
    theme: 'system',
    dashboard_layout: 'comfortable',
    primary_color: '#3b82f6',
    show_advanced_features: false,
    show_beta_features: false,
    default_dashboard_view: 'overview',
    sidebar_collapsed: false,
    show_tooltips: true,
    animation_level: 'full'
  });

  const isPremium = checkFeatureAccess('premium');
  const isWhiteLabelEnabled = checkFeatureAccess('white_label_access' as any);

  useEffect(() => {
    if (user) {
      loadPersonalizationSettings();
    }
  }, [user]);

  const loadPersonalizationSettings = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const profilesData = await withFallback(
        'profiles',
        async () => {
          const res = await safeQueryOptionalTable('profiles', '*');
          return isOk(res) ? (res.data || []) : [];
        },
        async () => []
      );
      const result = profilesData;
      
      const profileData = result.find((p: any) => p.id === user.id);
      if (profileData && (profileData as any)?.personalization_settings) {
        setSettings({
          ...settings,
          ...(profileData as any).personalization_settings
        });
      }
    } catch (error) {
      console.error('Error loading personalization settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const updateData = {
        id: user.id,
        personalization_settings: settings,
        updated_at: new Date().toISOString()
      };

      const result = await safeInsertOptionalTable('profiles', updateData);
      if (!result.ok) {
        throw new Error(result.error || 'Failed to update personalization settings');
      }

      trackFeatureUsed('personalization_settings_updated', {
        theme: settings.theme,
        layout: settings.dashboard_layout,
        premium_features_used: isPremium ? Object.keys(settings.custom_brand_colors || {}).length : 0
      });

      toast({
        title: "Success",
        description: "Personalization settings updated successfully",
      });
    } catch (error) {
      console.error('Error updating personalization settings:', error);
      toast({
        title: "Error",
        description: "Failed to update personalization settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    if (!isWhiteLabelEnabled) {
      toast({
        title: "Premium Feature",
        description: "Upgrade to access custom branding features",
        variant: "destructive",
      });
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-logo-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await sb.storage
        .from('branding')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = sb.storage
        .from('branding')
        .getPublicUrl(fileName);

      setSettings(prev => ({ ...prev, custom_logo_url: publicUrl }));
      
      trackFeatureUsed('custom_logo_uploaded');
      
      toast({
        title: "Success",
        description: "Custom logo uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast({
        title: "Error",
        description: "Failed to upload custom logo",
        variant: "destructive",
      });
    }
  };

  const PremiumFeatureWrapper: React.FC<{ 
    children: React.ReactNode; 
    feature: string;
    description: string;
  }> = ({ children, feature, description }) => {
    const hasAccess = isPremium;
    
    return (
      <div className={`relative ${!hasAccess ? 'opacity-60' : ''}`}>
        {!hasAccess && (
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
            <div className="text-center space-y-2">
              <Crown className="h-6 w-6 text-amber-500 mx-auto" />
              <p className="text-sm font-medium">Premium Feature</p>
              <p className="text-xs text-muted-foreground">{description}</p>
              <Button size="sm" onClick={() => trackFeatureUsed('upgrade_prompt_clicked', { feature })}>
                <Crown className="h-3 w-3 mr-1" />
                Upgrade
              </Button>
            </div>
          </div>
        )}
        {children}
      </div>
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Theme & Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme & Display
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Selection */}
          <div className="space-y-3">
            <Label>Theme Preference</Label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'light', icon: Sun, label: 'Light' },
                { value: 'dark', icon: Moon, label: 'Dark' },
                { value: 'system', icon: Monitor, label: 'System' }
              ].map(({ value, icon: Icon, label }) => (
                <Button
                  key={value}
                  variant={settings.theme === value ? "default" : "outline"}
                  className="flex flex-col gap-2 h-auto py-3"
                  onClick={() => setSettings(prev => ({ ...prev, theme: value as any }))}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs">{label}</span>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Layout Options */}
          <div className="space-y-3">
            <Label>Dashboard Layout</Label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'compact', label: 'Compact' },
                { value: 'comfortable', label: 'Comfortable' },
                { value: 'spacious', label: 'Spacious' }
              ].map(({ value, label }) => (
                <Button
                  key={value}
                  variant={settings.dashboard_layout === value ? "default" : "outline"}
                  className="text-xs"
                  onClick={() => setSettings(prev => ({ ...prev, dashboard_layout: value as any }))}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Primary Color */}
          <div className="space-y-3">
            <Label>Primary Color</Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.primary_color}
                onChange={(e) => setSettings(prev => ({ ...prev, primary_color: e.target.value }))}
                className="w-12 h-10 rounded-md border border-input"
              />
              <Input
                value={settings.primary_color}
                onChange={(e) => setSettings(prev => ({ ...prev, primary_color: e.target.value }))}
                className="max-w-[200px]"
                placeholder="#3b82f6"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            User Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic UX Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Show Tooltips</Label>
                <p className="text-sm text-muted-foreground">
                  Display helpful tooltips throughout the interface
                </p>
              </div>
              <Switch
                checked={settings.show_tooltips}
                onCheckedChange={(value) => setSettings(prev => ({ ...prev, show_tooltips: value }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Collapse Sidebar by Default</Label>
                <p className="text-sm text-muted-foreground">
                  Start with a collapsed navigation sidebar
                </p>
              </div>
              <Switch
                checked={settings.sidebar_collapsed}
                onCheckedChange={(value) => setSettings(prev => ({ ...prev, sidebar_collapsed: value }))}
              />
            </div>

            <div className="space-y-3">
              <Label>Animation Level</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'none', label: 'None' },
                  { value: 'reduced', label: 'Reduced' },
                  { value: 'full', label: 'Full' }
                ].map(({ value, label }) => (
                  <Button
                    key={value}
                    variant={settings.animation_level === value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSettings(prev => ({ ...prev, animation_level: value as any }))}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0">
                <span className="font-medium">Advanced Options</span>
                {isAdvancedOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Show Advanced Features</Label>
                  <p className="text-sm text-muted-foreground">
                    Display advanced options and controls
                  </p>
                </div>
                <Switch
                  checked={settings.show_advanced_features}
                  onCheckedChange={(value) => setSettings(prev => ({ ...prev, show_advanced_features: value }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Beta Features</Label>
                  <p className="text-sm text-muted-foreground">
                    Access experimental features (may be unstable)
                  </p>
                </div>
                <Switch
                  checked={settings.show_beta_features}
                  onCheckedChange={(value) => setSettings(prev => ({ ...prev, show_beta_features: value }))}
                />
              </div>

              <div className="space-y-3">
                <Label>Default Dashboard View</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={settings.default_dashboard_view}
                  onChange={(e) => setSettings(prev => ({ ...prev, default_dashboard_view: e.target.value as any }))}
                >
                  <option value="overview">Overview</option>
                  <option value="detailed">Detailed</option>
                  <option value="analytics">Analytics</option>
                </select>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} className="min-w-[120px]">
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>
    </div>
  );
};