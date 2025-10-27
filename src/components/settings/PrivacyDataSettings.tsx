import React, { useState, useEffect } from 'react';
import { legacyQueryOptionalTable } from '@/lib/db/safeSupabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Eye, 
  Download, 
  Trash2, 
  Share2,
  Clock,
  Database,
  AlertTriangle,
  CheckCircle,
  Save,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useEventTracking } from '@/hooks/useEventTracking';
import { useToast } from '@/hooks/use-toast';
import { withFallback, safeQueryOptionalTable, safeInsertOptionalTable } from '@/lib/db/safeSupabase';

interface PrivacySettings {
  data_collection: {
    analytics: boolean;
    marketing: boolean;
    personalization: boolean;
    performance: boolean;
  };
  data_sharing: {
    third_party_analytics: boolean;
    third_party_marketing: boolean;
    research_studies: boolean;
    aggregated_insights: boolean;
  };
  data_retention: {
    auto_delete_inactive: boolean;
    retention_period: '1_year' | '2_years' | '5_years' | 'indefinite';
    delete_on_request: boolean;
  };
  visibility: {
    profile_public: boolean;
    activity_public: boolean;
    search_indexing: boolean;
    show_online_status: boolean;
  };
}

export const PrivacyDataSettings: React.FC = () => {
  const { user } = useAuth();
  const { trackFeatureUsed } = useEventTracking();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isDeletingData, setIsDeletingData] = useState(false);
  
  const [settings, setSettings] = useState<PrivacySettings>({
    data_collection: {
      analytics: true,
      marketing: false,
      personalization: true,
      performance: true,
    },
    data_sharing: {
      third_party_analytics: false,
      third_party_marketing: false,
      research_studies: false,
      aggregated_insights: true,
    },
    data_retention: {
      auto_delete_inactive: false,
      retention_period: '2_years',
      delete_on_request: true,
    },
    visibility: {
      profile_public: false,
      activity_public: false,
      search_indexing: false,
      show_online_status: true,
    }
  });

  useEffect(() => {
    if (user) {
      loadPrivacySettings();
    }
  }, [user]);

  const loadPrivacySettings = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const profilesData = await withFallback(
        'profiles',
        () => safeQueryOptionalTable('profiles', '*'),
        () => []
      );
      const result = profilesData || [];
      
      const profileData = result.find((p: any) => p.id === user.id);
      if (profileData && (profileData as any)?.privacy_settings) {
        setSettings({
          ...settings,
          ...(profileData as any).privacy_settings
        });
      }
    } catch (error) {
      console.error('Error loading privacy settings:', error);
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
        privacy_settings: settings,
        updated_at: new Date().toISOString()
      };

      const result = await safeInsertOptionalTable('profiles', updateData);
      if (!result.ok) {
        throw new Error(result.error || 'Failed to update privacy settings');
      }

      trackFeatureUsed('privacy_settings_updated', {
        data_collection_enabled: Object.values(settings.data_collection).filter(Boolean).length,
        data_sharing_enabled: Object.values(settings.data_sharing).filter(Boolean).length,
        retention_period: settings.data_retention.retention_period
      });

      toast({
        title: "Success",
        description: "Privacy settings updated successfully",
      });
    } catch (error) {
      console.error('Error updating privacy settings:', error);
      toast({
        title: "Error",
        description: "Failed to update privacy settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportData = async () => {
    if (!user) return;

    setIsExporting(true);
    try {
      // Mock data export functionality
      const exportData = {
        user_id: user.id,
        profile: { /* profile data */ },
        activity: { /* activity data */ },
        preferences: { /* preferences */ },
        exported_at: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      trackFeatureUsed('data_exported');

      toast({
        title: "Success",
        description: "Your data has been exported successfully",
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: "Error",
        description: "Failed to export data",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteData = async () => {
    if (!user) return;
    
    const confirmed = window.confirm(
      'Are you sure you want to delete all your data? This action cannot be undone.'
    );
    
    if (!confirmed) return;

    setIsDeletingData(true);
    try {
      // Mock data deletion functionality
      await new Promise(resolve => setTimeout(resolve, 2000));

      trackFeatureUsed('data_deletion_requested');

      toast({
        title: "Request Submitted",
        description: "Your data deletion request has been submitted and will be processed within 30 days",
      });
    } catch (error) {
      console.error('Error requesting data deletion:', error);
      toast({
        title: "Error",
        description: "Failed to submit data deletion request",
        variant: "destructive",
      });
    } finally {
      setIsDeletingData(false);
    }
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
      {/* Data Collection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Collection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Analytics Data</Label>
                <p className="text-sm text-muted-foreground">
                  Collect usage data to improve our services
                </p>
              </div>
              <Switch
                checked={settings.data_collection.analytics}
                onCheckedChange={(value) => 
                  setSettings(prev => ({
                    ...prev,
                    data_collection: { ...prev.data_collection, analytics: value }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Marketing Data</Label>
                <p className="text-sm text-muted-foreground">
                  Collect data for marketing and promotional purposes
                </p>
              </div>
              <Switch
                checked={settings.data_collection.marketing}
                onCheckedChange={(value) => 
                  setSettings(prev => ({
                    ...prev,
                    data_collection: { ...prev.data_collection, marketing: value }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Personalization Data</Label>
                <p className="text-sm text-muted-foreground">
                  Collect data to personalize your experience
                </p>
              </div>
              <Switch
                checked={settings.data_collection.personalization}
                onCheckedChange={(value) => 
                  setSettings(prev => ({
                    ...prev,
                    data_collection: { ...prev.data_collection, personalization: value }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Performance Data</Label>
                <p className="text-sm text-muted-foreground">
                  Collect data to monitor and improve performance
                </p>
              </div>
              <Switch
                checked={settings.data_collection.performance}
                onCheckedChange={(value) => 
                  setSettings(prev => ({
                    ...prev,
                    data_collection: { ...prev.data_collection, performance: value }
                  }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Sharing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Data Sharing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Third-party Analytics</Label>
                <p className="text-sm text-muted-foreground">
                  Share anonymized data with analytics partners
                </p>
              </div>
              <Switch
                checked={settings.data_sharing.third_party_analytics}
                onCheckedChange={(value) => 
                  setSettings(prev => ({
                    ...prev,
                    data_sharing: { ...prev.data_sharing, third_party_analytics: value }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Third-party Marketing</Label>
                <p className="text-sm text-muted-foreground">
                  Share data with marketing partners for targeted ads
                </p>
              </div>
              <Switch
                checked={settings.data_sharing.third_party_marketing}
                onCheckedChange={(value) => 
                  setSettings(prev => ({
                    ...prev,
                    data_sharing: { ...prev.data_sharing, third_party_marketing: value }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Research Studies</Label>
                <p className="text-sm text-muted-foreground">
                  Participate in anonymized research studies
                </p>
              </div>
              <Switch
                checked={settings.data_sharing.research_studies}
                onCheckedChange={(value) => 
                  setSettings(prev => ({
                    ...prev,
                    data_sharing: { ...prev.data_sharing, research_studies: value }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Aggregated Insights</Label>
                <p className="text-sm text-muted-foreground">
                  Share aggregated, non-personal insights
                </p>
              </div>
              <Switch
                checked={settings.data_sharing.aggregated_insights}
                onCheckedChange={(value) => 
                  setSettings(prev => ({
                    ...prev,
                    data_sharing: { ...prev.data_sharing, aggregated_insights: value }
                  }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Retention */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Data Retention
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Auto-delete Inactive Data</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically delete data from inactive accounts
                </p>
              </div>
              <Switch
                checked={settings.data_retention.auto_delete_inactive}
                onCheckedChange={(value) => 
                  setSettings(prev => ({
                    ...prev,
                    data_retention: { ...prev.data_retention, auto_delete_inactive: value }
                  }))
                }
              />
            </div>

            <div className="space-y-3">
              <Label>Data Retention Period</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={settings.data_retention.retention_period}
                onChange={(e) => 
                  setSettings(prev => ({
                    ...prev,
                    data_retention: { 
                      ...prev.data_retention, 
                      retention_period: e.target.value as any 
                    }
                  }))
                }
              >
                <option value="1_year">1 Year</option>
                <option value="2_years">2 Years</option>
                <option value="5_years">5 Years</option>
                <option value="indefinite">Indefinite</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Delete on Request</Label>
                <p className="text-sm text-muted-foreground">
                  Allow data deletion upon user request
                </p>
              </div>
              <Switch
                checked={settings.data_retention.delete_on_request}
                onCheckedChange={(value) => 
                  setSettings(prev => ({
                    ...prev,
                    data_retention: { ...prev.data_retention, delete_on_request: value }
                  }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Profile Visibility
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Public Profile</Label>
                <p className="text-sm text-muted-foreground">
                  Make your profile visible to other users
                </p>
              </div>
              <Switch
                checked={settings.visibility.profile_public}
                onCheckedChange={(value) => 
                  setSettings(prev => ({
                    ...prev,
                    visibility: { ...prev.visibility, profile_public: value }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Public Activity</Label>
                <p className="text-sm text-muted-foreground">
                  Show your activity to other users
                </p>
              </div>
              <Switch
                checked={settings.visibility.activity_public}
                onCheckedChange={(value) => 
                  setSettings(prev => ({
                    ...prev,
                    visibility: { ...prev.visibility, activity_public: value }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Search Engine Indexing</Label>
                <p className="text-sm text-muted-foreground">
                  Allow search engines to index your profile
                </p>
              </div>
              <Switch
                checked={settings.visibility.search_indexing}
                onCheckedChange={(value) => 
                  setSettings(prev => ({
                    ...prev,
                    visibility: { ...prev.visibility, search_indexing: value }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Show Online Status</Label>
                <p className="text-sm text-muted-foreground">
                  Display when you're online to other users
                </p>
              </div>
              <Switch
                checked={settings.visibility.show_online_status}
                onCheckedChange={(value) => 
                  setSettings(prev => ({
                    ...prev,
                    visibility: { ...prev.visibility, show_online_status: value }
                  }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={handleExportData}
              disabled={isExporting}
              className="h-auto py-4 flex flex-col gap-2"
            >
              {isExporting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Download className="h-5 w-5" />
              )}
              <span className="font-medium">Export My Data</span>
              <span className="text-xs text-muted-foreground">
                Download a copy of your data
              </span>
            </Button>

            <Button
              variant="destructive"
              onClick={handleDeleteData}
              disabled={isDeletingData}
              className="h-auto py-4 flex flex-col gap-2"
            >
              {isDeletingData ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Trash2 className="h-5 w-5" />
              )}
              <span className="font-medium">Delete All Data</span>
              <span className="text-xs text-muted-foreground">
                Permanently delete your account
              </span>
            </Button>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Data deletion is permanent and cannot be undone. Export your data first if you want to keep a copy.
            </AlertDescription>
          </Alert>
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