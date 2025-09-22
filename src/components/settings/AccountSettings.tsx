import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Camera,
  Save,
  Loader2,
  Check
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useEventTracking } from '@/hooks/useEventTracking';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { withFallback, safeQueryOptionalTable, safeInsertOptionalTable } from '@/lib/db/safeSupabase';

export const AccountSettings: React.FC = () => {
  const { user } = useAuth();
  const { trackFeatureUsed } = useEventTracking();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    display_name: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    avatar_url: '',
    timezone: '',
    date_format: 'MM/DD/YYYY',
    language: 'en'
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const result = await withFallback(
        'profiles',
        () => safeQueryOptionalTable('profiles', '*'),
        () => []
      );
      
      const profileData = result.find((p: any) => p.id === user.id);
      if (profileData) {
        setProfile({
          first_name: (profileData as any).first_name || '',
          last_name: (profileData as any).last_name || '',
          display_name: (profileData as any).display_name || '',
          email: user.email || '',
          phone: (profileData as any).phone || '',
          bio: (profileData as any).bio || '',
          location: (profileData as any).location || '',
          avatar_url: (profileData as any).avatar_url || '',
          timezone: (profileData as any).timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
          date_format: (profileData as any).date_format || 'MM/DD/YYYY',
          language: (profileData as any).language || 'en'
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile information",
        variant: "destructive",
      });
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
        first_name: profile.first_name,
        last_name: profile.last_name,
        display_name: profile.display_name,
        phone: profile.phone,
        bio: profile.bio,
        location: profile.location,
        timezone: profile.timezone,
        date_format: profile.date_format,
        language: profile.language,
        updated_at: new Date().toISOString()
      };

      const result = await safeInsertOptionalTable('profiles', updateData);
      if (!result.ok) {
        throw new Error(result.error || 'Failed to update profile');
      }

      // Track the settings change
      trackFeatureUsed('account_settings_updated', {
        fields_updated: Object.keys(profile).filter(key => profile[key as keyof typeof profile])
      });

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      setProfile(prev => ({ ...prev, avatar_url: publicUrl }));
      
      // Update profile with new avatar URL using safe pattern
      const updateData = {
        id: user.id,
        avatar_url: publicUrl,
        updated_at: new Date().toISOString()
      };
      
      const result = await safeInsertOptionalTable('profiles', updateData);
      if (!result.ok) {
        throw new Error(result.error || 'Failed to update avatar');
      }

      trackFeatureUsed('avatar_uploaded');
      
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Error",
        description: "Failed to upload profile picture",
        variant: "destructive",
      });
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
      {/* Profile Picture & Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback className="text-lg">
                  {profile.first_name?.[0]}{profile.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <label className="absolute -bottom-2 -right-2 cursor-pointer">
                <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:bg-primary/90 transition-colors">
                  <Camera className="h-3 w-3" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="font-medium">{profile.display_name || `${profile.first_name} ${profile.last_name}`}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {profile.email}
              </p>
              {user?.user_metadata?.role && (
                <Badge variant="secondary" className="text-xs">
                  {user.user_metadata.role}
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                value={profile.first_name}
                onChange={(e) => setProfile(prev => ({ ...prev, first_name: e.target.value }))}
                placeholder="Enter your first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={profile.last_name}
                onChange={(e) => setProfile(prev => ({ ...prev, last_name: e.target.value }))}
                placeholder="Enter your last name"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="display_name">Display Name</Label>
              <Input
                id="display_name"
                value={profile.display_name}
                onChange={(e) => setProfile(prev => ({ ...prev, display_name: e.target.value }))}
                placeholder="How others see your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, State"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={profile.timezone}
                onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
                placeholder="America/New_York"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date_format">Date Format</Label>
              <select
                id="date_format"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={profile.date_format}
                onChange={(e) => setProfile(prev => ({ ...prev, date_format: e.target.value }))}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
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