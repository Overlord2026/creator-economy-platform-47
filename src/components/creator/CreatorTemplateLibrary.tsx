import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { FileText, Download, Eye, Star } from 'lucide-react';
import { toast } from 'sonner';

interface CreatorTemplate {
  id: string;
  name: string;
  category: 'nil_contracts' | 'influencer_agreements' | 'brand_partnerships' | 'compliance_docs' | 'tax_forms';
  description: string;
  creatorTypes: string[];
  states?: string[];
  isPremium: boolean;
  lastUpdated: string;
  downloads: number;
  rating: number;
}

const creatorTemplates: CreatorTemplate[] = [
  {
    id: 'nil-standard-agreement',
    name: 'NIL Standard Partnership Agreement',
    category: 'nil_contracts',
    description: 'Complete NIL partnership template with compliance safeguards for all 50 states',
    creatorTypes: ['NIL Athletes', 'Sports Personalities'],
    states: ['All States'],
    isPremium: false,
    lastUpdated: '2024-01-15',
    downloads: 1247,
    rating: 4.8
  },
  {
    id: 'influencer-sponsorship',
    name: 'Influencer Sponsorship Contract',
    category: 'influencer_agreements',
    description: 'FTC-compliant sponsorship agreement with disclosure requirements',
    creatorTypes: ['Social Media Influencers', 'Content Creators'],
    isPremium: true,
    lastUpdated: '2024-01-10',
    downloads: 892,
    rating: 4.9
  },
  {
    id: 'multi-state-tax-guide',
    name: 'Multi-State Creator Tax Compliance Guide',
    category: 'tax_forms',
    description: 'Comprehensive tax planning guide for creators earning across multiple states',
    creatorTypes: ['All Creator Types'],
    states: ['CA', 'NY', 'TX', 'FL', 'IL'],
    isPremium: true,
    lastUpdated: '2024-01-08',
    downloads: 634,
    rating: 4.7
  },
  {
    id: 'brand-protection-checklist',
    name: 'Brand Protection & Trademark Checklist',
    category: 'compliance_docs',
    description: 'Essential checklist for protecting your personal brand and intellectual property',
    creatorTypes: ['Entertainment Industry', 'Business Leaders'],
    isPremium: false,
    lastUpdated: '2024-01-12',
    downloads: 445,
    rating: 4.6
  }
];

export function CreatorTemplateLibrary() {
  const [selectedTemplate, setSelectedTemplate] = useState<CreatorTemplate | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const handleDownload = (template: CreatorTemplate) => {
    toast.success(`Downloaded: ${template.name}`);
  };

  const handlePreview = (template: CreatorTemplate) => {
    setSelectedTemplate(template);
    setPreviewOpen(true);
  };

  const filteredTemplates = filter === 'all' 
    ? creatorTemplates 
    : creatorTemplates.filter(t => t.category === filter);

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'nil_contracts', label: 'NIL Contracts' },
    { id: 'influencer_agreements', label: 'Influencer Agreements' },
    { id: 'brand_partnerships', label: 'Brand Partnerships' },
    { id: 'compliance_docs', label: 'Compliance Documents' },
    { id: 'tax_forms', label: 'Tax Forms' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Creator Template Library</h2>
          <p className="text-muted-foreground">
            Professional templates specifically designed for the creator economy
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={filter === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <Card key={template.id} className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <FileText className="h-8 w-8 text-primary" />
                <div className="flex gap-2">
                  {template.isPremium && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      Premium
                    </Badge>
                  )}
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {template.rating}
                  </div>
                </div>
              </div>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {template.creatorTypes.map(type => (
                    <Badge key={type} variant="outline" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
                
                {template.states && (
                  <div className="text-xs text-muted-foreground">
                    States: {template.states.join(', ')}
                  </div>
                )}
                
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{template.downloads} downloads</span>
                  <span>Updated {template.lastUpdated}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreview(template)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDownload(template)}
                    className="flex-1"
                    disabled={template.isPremium}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    {template.isPremium ? 'Premium' : 'Download'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Template Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.name}</DialogTitle>
            <DialogDescription>
              {selectedTemplate?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Template Preview</h4>
              <p className="text-sm text-muted-foreground mb-4">
                This is a sample preview of the template structure and key clauses.
              </p>
              
              <div className="space-y-3 text-sm">
                <div className="border-l-4 border-primary pl-4">
                  <strong>Section 1: Creator Rights & Obligations</strong>
                  <p className="text-muted-foreground">
                    Defines the creator's rights to their name, image, and likeness while establishing clear performance obligations...
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <strong>Section 2: Compensation & Payment Terms</strong>
                  <p className="text-muted-foreground">
                    Structured payment terms with milestone-based deliverables and compliance safeguards...
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <strong>Section 3: Multi-State Compliance</strong>
                  <p className="text-muted-foreground">
                    Built-in compliance framework addressing varying state regulations and requirements...
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setPreviewOpen(false)}>
                Close Preview
              </Button>
              <Button 
                onClick={() => {
                  if (selectedTemplate) handleDownload(selectedTemplate);
                  setPreviewOpen(false);
                }}
                disabled={selectedTemplate?.isPremium}
              >
                <Download className="h-4 w-4 mr-2" />
                {selectedTemplate?.isPremium ? 'Upgrade for Access' : 'Download Template'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}