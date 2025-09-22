'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Video, Mic, Image, Plus, Calendar, Eye, Download, Upload } from 'lucide-react';
import { LeaveMessageWizard } from './LeaveMessageWizard';
import { SecureFileUpload } from './SecureFileUpload';
import { VaultCTASection } from './VaultCTASection';
import { useFamilyVault } from '@/hooks/useFamilyVault';

// Mock types for non-existent tables
type LegacyItem = {
  id: string;
  title: string;
  description?: string;
  item_type: string;
  content_url?: string;
  created_at: string;
  created_by: string;
  status?: string;
  file_size?: number;
  duration_seconds?: number;
  is_encrypted?: boolean;
};

type VaultMember = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: string;
};

interface LegacyItemsProps {
  vaultId: string;
  items: LegacyItem[];
  onItemAdded: () => void;
}

export function LegacyItems({ vaultId, items, onItemAdded }: LegacyItemsProps) {
  const [showMessageWizard, setShowMessageWizard] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const { members } = useFamilyVault(vaultId);

  const getItemIcon = (itemType: string) => {
    switch (itemType) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'audio':
        return <Mic className="h-5 w-5" />;
      case 'image':
        return <Image className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getItemTypeColor = (itemType: string) => {
    switch (itemType) {
      case 'video':
        return 'bg-blue-100 text-blue-700';
      case 'audio':
        return 'bg-green-100 text-green-700';
      case 'image':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-gold via-primary to-emerald bg-clip-text text-transparent">
          Legacy Items
        </h2>
        <p className="text-muted-foreground text-lg">
          Messages, videos, and memories preserved for your family's future generations.
        </p>
      </div>

      {/* Enhanced CTA Section */}
      <VaultCTASection 
        onRecordMessage={() => setShowMessageWizard(true)}
        onUploadFile={() => setShowFileUpload(true)}
        onInviteFamily={() => {
          // TODO: Implement invite family functionality
          console.log('Invite family clicked');
        }}
      />

      <div className="grid gap-4">
        {items.filter(item => item.status === 'active').map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${getItemTypeColor(item.item_type)}`}>
                  {getItemIcon(item.item_type)}
                </div>
                
                <div className="flex-1 space-y-2">
                   <div className="flex items-start justify-between">
                     <div>
                       <h3 className="font-semibold text-lg">{item.title || 'Untitled Item'}</h3>
                       {item.description && (
                         <p className="text-muted-foreground mt-1">{item.description}</p>
                       )}
                     </div>
                    <Badge variant="outline" className="capitalize">
                      {item.item_type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                     <div className="flex items-center gap-1">
                       <Calendar className="h-4 w-4" />
                       {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Unknown date'}
                     </div>
                    
                    {item.file_size && (
                      <div>
                        Size: {formatFileSize(item.file_size)}
                      </div>
                    )}
                    
                    {item.duration_seconds && (
                      <div>
                        Duration: {formatDuration(item.duration_seconds)}
                      </div>
                    )}
                  </div>
                  
                  {item.content_url && (
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {item.is_encrypted && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 flex items-center gap-2">
                    🔒 This item is encrypted for secure storage
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {items.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No legacy items yet</h3>
              <p className="text-muted-foreground mb-4">
                Start preserving your family's story by leaving your first message.
              </p>
              <Button onClick={() => setShowMessageWizard(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Leave Your First Message
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {showMessageWizard && members && members.length > 0 && (
        <LeaveMessageWizard
          vaultId={vaultId}
          members={members.map(m => ({ ...m, role: m.permission_level || 'member' }))}
          onClose={() => setShowMessageWizard(false)}
          onSuccess={() => {
            setShowMessageWizard(false);
            onItemAdded();
          }}
        />
      )}

      {showFileUpload && (
        <SecureFileUpload
          vaultId={vaultId}
          userRole="member"
          masterKey={new CryptoKey()}
          onClose={() => setShowFileUpload(false)}
          onSuccess={() => {
            setShowFileUpload(false);
            onItemAdded();
          }}
        />
      )}
    </div>
  );
}