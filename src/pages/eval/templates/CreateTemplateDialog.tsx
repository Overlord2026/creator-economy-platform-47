import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Criterion {
  name: string;
  description: string;
  weight: number;
}

interface CreateTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const SPORTS = ['Football', 'Basketball', 'Baseball', 'Soccer', 'Tennis', 'Track & Field', 'Swimming', 'Wrestling'];
const ROLES = ['Quarterback', 'Running Back', 'Wide Receiver', 'Linebacker', 'Point Guard', 'Center', 'Forward', 'Midfielder', 'Goalkeeper'];

export function CreateTemplateDialog({ open, onOpenChange, onSuccess }: CreateTemplateDialogProps) {
  const [name, setName] = useState('');
  const [sport, setSport] = useState('');
  const [role, setRole] = useState('');
  const [scale, setScale] = useState(10);
  const [criteria, setCriteria] = useState<Criterion[]>([
    { name: 'Technical Skills', description: 'Fundamental technique and execution', weight: 25 },
    { name: 'Physical Attributes', description: 'Speed, strength, agility, and conditioning', weight: 25 },
    { name: 'Mental Game', description: 'Game IQ, decision making, and focus', weight: 25 },
    { name: 'Leadership', description: 'Communication and team leadership qualities', weight: 25 },
  ]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const addCriterion = () => {
    const remainingWeight = 100 - criteria.reduce((sum, c) => sum + c.weight, 0);
    setCriteria([...criteria, { name: '', description: '', weight: Math.max(remainingWeight, 0) }]);
  };

  const removeCriterion = (index: number) => {
    setCriteria(criteria.filter((_, i) => i !== index));
  };

  const updateCriterion = (index: number, field: keyof Criterion, value: string | number) => {
    const updated = [...criteria];
    updated[index] = { ...updated[index], [field]: value };
    setCriteria(updated);
  };

  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (totalWeight !== 100) {
      toast({
        title: 'Invalid Weights',
        description: 'Criterion weights must total exactly 100%',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const weights = criteria.reduce((acc, criterion) => {
        acc[criterion.name] = criterion.weight;
        return acc;
      }, {} as Record<string, number>);

      const { error } = await supabase
        .from('nil_eval_templates')
        .insert([{
          name,
          sport,
          role,
          criteria: criteria.map(c => ({ name: c.name, description: c.description })),
          weights,
          scale,
        }]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Evaluation template created successfully',
      });
      
      // Reset form
      setName('');
      setSport('');
      setRole('');
      setScale(10);
      setCriteria([
        { name: 'Technical Skills', description: 'Fundamental technique and execution', weight: 25 },
        { name: 'Physical Attributes', description: 'Speed, strength, agility, and conditioning', weight: 25 },
        { name: 'Mental Game', description: 'Game IQ, decision making, and focus', weight: 25 },
        { name: 'Leadership', description: 'Communication and team leadership qualities', weight: 25 },
      ]);
      
      onSuccess();
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: 'Error',
        description: 'Failed to create evaluation template',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Evaluation Template</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Quarterback Evaluation"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="scale">Scale (1 to X)</Label>
              <Select value={scale.toString()} onValueChange={(value) => setScale(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">1-5</SelectItem>
                  <SelectItem value="10">1-10</SelectItem>
                  <SelectItem value="100">1-100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sport">Sport</Label>
              <Select value={sport} onValueChange={setSport} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select sport" />
                </SelectTrigger>
                <SelectContent>
                  {SPORTS.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role/Position</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Evaluation Criteria</CardTitle>
                <div className={`text-sm ${totalWeight === 100 ? 'text-green-600' : 'text-red-600'}`}>
                  Total: {totalWeight}%
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {criteria.map((criterion, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <GripVertical className="h-4 w-4 text-muted-foreground mt-2 cursor-move" />
                  
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        value={criterion.name}
                        onChange={(e) => updateCriterion(index, 'name', e.target.value)}
                        placeholder="Criterion name"
                        required
                      />
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={criterion.weight}
                          onChange={(e) => updateCriterion(index, 'weight', parseInt(e.target.value) || 0)}
                          placeholder="Weight"
                          min="0"
                          max="100"
                          className="w-20"
                          required
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    </div>
                    
                    <Textarea
                      value={criterion.description}
                      onChange={(e) => updateCriterion(index, 'description', e.target.value)}
                      placeholder="Describe what this criterion evaluates..."
                      rows={2}
                    />
                  </div>
                  
                  {criteria.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeCriterion(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={addCriterion}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Criterion
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || totalWeight !== 100}>
              {loading ? 'Creating...' : 'Create Template'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}