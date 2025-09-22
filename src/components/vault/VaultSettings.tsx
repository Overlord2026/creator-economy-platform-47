'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Settings, Save, Trash2, Shield, Upload } from 'lucide-react';
import { FileUpload } from '@/components/ui/file-upload';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { tableExists, safeUpdate } from '@/lib/db/safeSupabase';
import FallbackBanner from '@/components/common/FallbackBanner';
import type { VaultSettingsForm } from '@/types/vault-fallback';

// Mock type for non-existent table
type FamilyVault = {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  user_id: string;
  vault_name?: string;
  family_motto?: string;
  family_values?: string[];
  vault_photo_url?: string;
};

interface VaultSettingsProps {
  vault: FamilyVault;
  onVaultUpdated: () => void;
}

export function VaultSettings({ vault, onVaultUpdated }: VaultSettingsProps) {
  const [loading, setLoading] = useState(false);
  const [fallbackActive, setFallbackActive] = useState(false);
  const [formData, setFormData] = useState<VaultSettingsForm>({
    family_name: vault.vault_name || '',
    description: vault.description || '',
    family_motto: vault.family_motto || '',
    family_values: vault.family_values || [],
    vault_photo_url: vault.vault_photo_url || '',
  });
  const [newValue, setNewValue] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const tables = ['family_vaults'];
      const checks = await Promise.all(tables.map(t => tableExists(t)));
      setFallbackActive(!checks.some(Boolean));
    })();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      
      const has = await tableExists('family_vaults');
      if (!has) {
        console.log('Mock vault update:', formData);
        toast({
          title: "Demo Mode",
          description: "Vault updates are disabled in demo mode.",
          variant: "destructive"
        });
        return;
      }

      await safeUpdate('family_vaults', {
        vault_name: formData.family_name,
        description: formData.description,
        family_motto: formData.family_motto,
        family_values: Array.isArray(formData.family_values) ? formData.family_values : null,
        vault_photo_url: formData.vault_photo_url,
      }, { id: vault.id });

      toast({
        title: "Settings saved",
        description: "Your vault settings have been updated successfully.",
      });

      onVaultUpdated();
    } catch (error) {
      console.error('Error saving vault settings:', error);
      toast({
        title: "Save failed",
        description: "Failed to save vault settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addFamilyValue = () => {
    if (newValue.trim() && Array.isArray(formData.family_values)) {
      setFormData(prev => ({
        ...prev,
        family_values: [...(prev.family_values || []), newValue.trim()]
      }));
      setNewValue('');
    }
  };

  const removeFamilyValue = (value: string) => {
    setFormData(prev => ({
      ...prev,
      family_values: (prev.family_values || []).filter(v => v !== value)
    }));
  };

  const handleDeactivateVault = async () => {
    try {
      setLoading(true);
      
      const has = await tableExists('family_vaults');
      if (!has) {
        console.log('Mock vault deletion');
        toast({
          title: "Demo Mode",
          description: "Vault deletion is disabled in demo mode.",
          variant: "destructive"
        });
        return;
      }

      await safeUpdate('family_vaults', { is_active: false }, { id: vault.id });

      toast({
        title: "Vault deactivated",
        description: "Your vault has been deactivated successfully.",
      });

      onVaultUpdated();
    } catch (error) {
      console.error('Error deactivating vault:', error);
      toast({
        title: "Deactivation failed",
        description: "Failed to deactivate vault. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <FallbackBanner active={fallbackActive} table="family_vaults" />
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Vault Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="vault-name">Vault Name</Label>
            <Input
              id="vault-name"
              value={String(formData.family_name || '')}
              onChange={(e) => setFormData(prev => ({ ...prev, family_name: e.target.value }))}
              placeholder="Enter vault name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={String(formData.description || '')}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your family vault..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="motto">Family Motto</Label>
            <Input
              id="motto"
              value={String(formData.family_motto || '')}
              onChange={(e) => setFormData(prev => ({ ...prev, family_motto: e.target.value }))}
              placeholder="Enter your family motto"
            />
          </div>

          <div className="space-y-4">
            <Label>Family Values</Label>
            <div className="flex flex-wrap gap-2">
              {(formData.family_values || []).map((value, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {value}
                  <button
                    onClick={() => removeFamilyValue(value)}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Add a family value"
                onKeyPress={(e) => e.key === 'Enter' && addFamilyValue()}
              />
              <Button onClick={addFamilyValue} variant="outline">
                Add
              </Button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              onClick={handleSave} 
              disabled={loading || fallbackActive}
              className="gap-2"
              title={fallbackActive ? "Unavailable in this environment" : ""}
            >
              <Save className="h-4 w-4" />
              {loading ? 'Saving...' : 'Save Settings'}
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  disabled={loading || fallbackActive}
                  className="gap-2"
                  title={fallbackActive ? "Unavailable in this environment" : ""}
                >
                  <Trash2 className="h-4 w-4" />
                  Deactivate Vault
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Deactivate Vault</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will deactivate your family vault. This action can be reversed later.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeactivateVault}>
                    Deactivate
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default VaultSettings;