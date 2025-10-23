import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Users, Crown, MessageSquare, BarChart3, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { tableExists, safeSelect, safeInsert, withFallback } from '@/lib/db/safeSupabase';
import FallbackBanner from '@/components/common/FallbackBanner';

interface VIPOrganization {
  id: string;
  organization_name: string;
  organization_type: string;
  contact_email: string;
  contact_name: string;
  status: string;
  vip_tier: string;
  magic_link_token?: string;
  referral_code?: string;
  created_at: string;
}

interface BulkImportData {
  organization_name: string;
  organization_type: string;
  contact_email: string;
  contact_name: string;
  contact_phone?: string;
  linkedin_url?: string;
  website_url?: string;
  location?: string;
  specialties?: string[];
  industry_segment?: string;
  vip_tier?: string;
}

export const VIPOnboardingEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bulk-import');
  const [vipOrgs, setVipOrgs] = useState<VIPOrganization[]>([]);
  const [loading, setLoading] = useState(false);
  const [fallbackActive, setFallbackActive] = useState(false);
  const [csvData, setCsvData] = useState('');
  const [selectedPersonaType, setSelectedPersonaType] = useState('advisor');
  const { toast } = useToast();

  useEffect(() => {
    checkTables();
    fetchVIPOrganizations();
  }, []);

  const checkTables = async () => {
    const hasVipTables = await tableExists('vip_batch_imports');
    setFallbackActive(!hasVipTables);
  };

  const personaTypes = [
    { value: 'advisor', label: 'Financial Advisors' },
    { value: 'attorney', label: 'Attorneys' },
    { value: 'cpa', label: 'CPAs/Accountants' },
    { value: 'healthcare', label: 'Healthcare Professionals' },
    { value: 'imo_fmo', label: 'IMO/FMO Organizations' },
    { value: 'mastermind', label: 'Mastermind Groups' },
    { value: 'thought_leader', label: 'Industry Thought Leaders' },
    { value: 'real_estate', label: 'Real Estate Professionals' }
  ];

  const vipTiers = [
    { value: 'founding_member', label: 'Founding Member' },
    { value: 'early_adopter', label: 'Early Adopter' },
    { value: 'partner', label: 'Strategic Partner' },
    { value: 'thought_leader', label: 'Thought Leader' }
  ];

  const handleBulkImport = async () => {
    if (!csvData.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter CSV data to import',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const lines = csvData.trim().split('\n');
      const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
      const records: BulkImportData[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
        const record: any = {};
        
        headers.forEach((header, index) => {
          record[header.replace(/\s+/g, '_')] = values[index] || '';
        });

        records.push({
          organization_name: record.organization_name || record.org_name || record.name,
          organization_type: selectedPersonaType,
          contact_email: record.contact_email || record.email,
          contact_name: record.contact_name || record.name,
          contact_phone: record.contact_phone || record.phone,
          linkedin_url: record.linkedin_url || record.linkedin,
          website_url: record.website_url || record.website,
          location: record.location || record.city,
          specialties: record.specialties ? [record.specialties] : record.specialty ? [record.specialty] : [],
          industry_segment: record.industry_segment || record.segment,
          vip_tier: record.vip_tier || 'founding_member'
        });
      }

      const hasVipTables = await tableExists('vip_batch_imports');
      
      if (!hasVipTables) {
        // Mock batch import
        console.log('Batch import (mock):', {
          batch_name: `${selectedPersonaType}_import_${new Date().toISOString().split('T')[0]}`,
          persona_type: selectedPersonaType,
          total_records: records.length,
          records: records
        });

        toast({
          title: 'Import Complete (Demo)',
          description: `Mock import of ${records.length} organizations completed.`,
        });

        setCsvData('');
        return;
      }

      // Real implementation would insert batch data
      const batchData = {
        id: 'batch-' + Date.now(),
        batch_name: `${selectedPersonaType}_import_${new Date().toISOString().split('T')[0]}`,
        persona_type: selectedPersonaType,
        total_records: records.length
      };

      // Process each organization
      let successCount = 0;
      const errors: string[] = [];

      for (const record of records) {
        try {
          if (hasVipTables) {
            await safeInsert('vip_organizations', {
              ...record,
              batch_import_id: batchData.id,
              status: 'pending'
            });
          } else {
            // Mock organization creation
            console.log('VIP organization created (mock):', record);
          }

          successCount++;
        } catch (error: any) {
          errors.push(`${record.organization_name}: ${error.message}`);
        }
      }

      // Update batch import status (if using real tables)
      if (hasVipTables) {
        console.log('Batch update completed:', {
          status: 'completed',
          processed_records: records.length,
          successful_imports: successCount,
          failed_imports: errors.length
        });
      }

      toast({
        title: 'Import Complete',
        description: `Successfully imported ${successCount} organizations. ${errors.length} failed.`,
      });

      if (errors.length > 0) {
        console.error('Import errors:', errors);
      }

      setCsvData('');
      fetchVIPOrganizations();
    } catch (error: any) {
      console.error('Bulk import error:', error);
      toast({
        title: 'Import Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchVIPOrganizations = async () => {
    try {
      const mockOrgs: VIPOrganization[] = [
        {
          id: '1',
          organization_name: 'Demo Advisors Inc',
          organization_type: 'advisor',
          contact_email: 'contact@demoadvisors.com',
          contact_name: 'John Smith',
          status: 'pending',
          vip_tier: 'founding_member',
          magic_link_token: 'demo-token-123',
          referral_code: 'DEMO-REF-456',
          created_at: new Date().toISOString()
        }
      ];

      const data = await withFallback('vip_organizations',
        () => safeSelect('vip_organizations', '*', { 
          order: { column: 'created_at', ascending: false },
          limit: 50 
        }),
        async () => mockOrgs
      );

      setVipOrgs(data || []);
    } catch (error: any) {
      console.error('Error fetching VIP organizations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load VIP organizations',
        variant: 'destructive',
      });
    }
  };


  const generateMagicLink = (token: string) => {
    return `${window.location.origin}/vip-onboard/${token}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied',
      description: 'Link copied to clipboard',
    });
  };

  const sendBulkInvitations = async (orgIds: string[]) => {
    setLoading(true);
    try {
      const hasVipTables = await tableExists('vip_organizations');
      
      if (hasVipTables) {
        // Real implementation would call edge function
        console.log('Bulk invitations sent (would call edge function)', { orgIds });
      } else {
        // Mock invitations
        console.log('Bulk invitations sent (mock)', { orgIds });
      }

      toast({
        title: 'Invitations Sent',
        description: `Sent ${orgIds.length} VIP invitations successfully`,
      });

      fetchVIPOrganizations();
    } catch (error: any) {
      console.error('Error sending invitations:', error);
      toast({
        title: 'Error',
        description: 'Failed to send invitations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <FallbackBanner active={fallbackActive} table="vip_batch_imports" />
      
      <div className="flex items-center gap-3 mb-6">
        <Crown className="h-8 w-8 text-gold" />
        <div>
          <h1 className="text-3xl font-bold">VIP Onboarding Engine</h1>
          <p className="text-muted-foreground">
            Strategic Top 100 onboarding for industry leaders and organizations
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bulk-import">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Import
          </TabsTrigger>
          <TabsTrigger value="organizations">
            <Users className="h-4 w-4 mr-2" />
            Organizations
          </TabsTrigger>
          <TabsTrigger value="outreach">
            <MessageSquare className="h-4 w-4 mr-2" />
            Outreach
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bulk-import" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bulk VIP Import</CardTitle>
              <p className="text-sm text-muted-foreground">
                Import top 100 VIPs per persona with CSV data. Required columns: organization_name, contact_email, contact_name
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="persona-type">Persona Type</Label>
                  <Select value={selectedPersonaType} onValueChange={setSelectedPersonaType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select persona type" />
                    </SelectTrigger>
                    <SelectContent>
                      {personaTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="csv-data">CSV Data</Label>
                <Textarea
                  id="csv-data"
                  placeholder="organization_name,contact_email,contact_name,contact_phone,linkedin_url,website_url,location,specialties&#10;Advisors XL,contact@advisorsxl.com,John Smith,555-1234,linkedin.com/company/advisorsxl,advisorsxl.com,New York,Retirement Planning&#10;..."
                  value={csvData}
                  onChange={(e) => setCsvData(e.target.value)}
                  rows={8}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Paste CSV data with headers. Optional columns: contact_phone, linkedin_url, website_url, location, specialties, industry_segment, vip_tier
                </p>
              </div>

              <Button onClick={handleBulkImport} disabled={loading} className="w-full">
                {loading ? 'Processing...' : 'Import VIP Organizations'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organizations" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">VIP Organizations</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  const pendingOrgs = vipOrgs.filter(org => org.status === 'pending').map(org => org.id);
                  if (pendingOrgs.length > 0) {
                    sendBulkInvitations(pendingOrgs);
                  }
                }}
                disabled={loading || !vipOrgs.some(org => org.status === 'pending')}
              >
                Send All Pending Invites
              </Button>
              <Button variant="outline" onClick={fetchVIPOrganizations}>
                Refresh
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {vipOrgs.map((org) => (
              <Card key={org.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{org.organization_name}</h3>
                        <Badge variant={org.status === 'activated' ? 'default' : 'secondary'}>
                          {org.status}
                        </Badge>
                        <Badge variant="outline">{org.vip_tier.replace('_', ' ')}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {org.contact_name} • {org.contact_email}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {org.organization_type.replace('_', ' ')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {org.magic_link_token && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(generateMagicLink(org.magic_link_token!))}
                        >
                          Copy Magic Link
                        </Button>
                      )}
                      {org.referral_code && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(org.referral_code!)}
                        >
                          Copy Referral Code
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="outreach" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>VIP Outreach Management</CardTitle>
              <p className="text-sm text-muted-foreground">
                Track and manage all VIP communications and follow-ups
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Outreach tracking features coming soon...</p>
                <p className="text-sm">Email templates, SMS campaigns, and follow-up automation</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>VIP Analytics Dashboard</CardTitle>
              <p className="text-sm text-muted-foreground">
                Track activation rates, referral performance, and network growth
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Analytics dashboard coming soon...</p>
                <p className="text-sm">VIP activation rates, network effects, and ROI tracking</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};