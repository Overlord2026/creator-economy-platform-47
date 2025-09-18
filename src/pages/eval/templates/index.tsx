import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CreateTemplateDialog } from './CreateTemplateDialog';

interface EvalTemplate {
  id: string;
  name: string;
  sport: string;
  role: string;
  criteria: Array<{ name: string; description: string }>;
  weights: Record<string, number>;
  scale: number;
  created_at: string;
}

// Mock templates data
const mockTemplates: EvalTemplate[] = [
  {
    id: '1',
    name: 'Quarterback Evaluation',
    sport: 'Football',
    role: 'Quarterback',
    criteria: [
      { name: 'Arm Strength', description: 'Throwing power and velocity' },
      { name: 'Accuracy', description: 'Precision in passing' },
      { name: 'Decision Making', description: 'Quick reads and choices' },
      { name: 'Leadership', description: 'Command of the huddle' }
    ],
    weights: { 'Arm Strength': 25, 'Accuracy': 30, 'Decision Making': 25, 'Leadership': 20 },
    scale: 10,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Point Guard Assessment',
    sport: 'Basketball',
    role: 'Point Guard',
    criteria: [
      { name: 'Ball Handling', description: 'Dribbling skills and control' },
      { name: 'Court Vision', description: 'Ability to see the floor' },
      { name: 'Speed', description: 'Quickness and agility' }
    ],
    weights: { 'Ball Handling': 35, 'Court Vision': 40, 'Speed': 25 },
    scale: 10,
    created_at: '2024-01-14T14:30:00Z'
  }
];

export default function EvaluationTemplates() {
  const [templates, setTemplates] = useState<EvalTemplate[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const deleteTemplate = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      // Simulate API call - in mock mode, just remove from state
      setTemplates(templates.filter(t => t.id !== id));
      toast({
        title: 'Success',
        description: 'Template deleted successfully (mock mode)',
      });
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete template',
        variant: 'destructive',
      });
    }
  };

  const duplicateTemplate = async (template: EvalTemplate) => {
    try {
      // Simulate API call - in mock mode, add to state with new ID
      const newTemplate = {
        ...template,
        id: `${Date.now()}`,
        name: `${template.name} (Copy)`,
        created_at: new Date().toISOString()
      };
      
      setTemplates([newTemplate, ...templates]);
      toast({
        title: 'Success',
        description: 'Template duplicated successfully (mock mode)',
      });
    } catch (error) {
      console.error('Error duplicating template:', error);
      toast({
        title: 'Error',
        description: 'Failed to duplicate template',
        variant: 'destructive',
      });
    }
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTemplateCreated = (newTemplate: Omit<EvalTemplate, 'id' | 'created_at'>) => {
    const template: EvalTemplate = {
      ...newTemplate,
      id: `${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setTemplates([template, ...templates]);
    setCreateDialogOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Evaluation Templates</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage evaluation templates for different sports and roles.
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredTemplates.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Create your first evaluation template to get started.'}
            </p>
            {!searchTerm && (
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">{template.sport}</Badge>
                      <Badge variant="secondary">{template.role}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <p>{template.criteria.length} criteria</p>
                    <p>Scale: 1-{template.scale}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => duplicateTemplate(template)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteTemplate(template.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CreateTemplateDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={handleTemplateCreated}
      />
    </div>
  );
}