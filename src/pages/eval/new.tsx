import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EvalTemplate {
  id: string;
  name: string;
  sport: string;
  role: string;
  criteria: Array<{ name: string; description: string }>;
  weights: Record<string, number>;
  scale: number;
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
    scale: 10
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
    scale: 10
  }
];

export default function NewEvaluation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [templates] = useState<EvalTemplate[]>(mockTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<EvalTemplate | null>(null);
  const [athleteId, setAthleteId] = useState(searchParams.get('athleteId') || '');
  const [athleteName, setAthleteName] = useState('');
  const [scores, setScores] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      // Initialize scores for all criteria
      const initialScores: Record<string, number> = {};
      template.criteria.forEach(criterion => {
        initialScores[criterion.name] = 0;
      });
      setScores(initialScores);
    }
  };

  const updateScore = (criterionName: string, score: number) => {
    setScores(prev => ({
      ...prev,
      [criterionName]: score
    }));
  };

  const calculateOverallScore = () => {
    if (!selectedTemplate) return 0;
    
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    selectedTemplate.criteria.forEach(criterion => {
      const score = scores[criterion.name] || 0;
      const weight = selectedTemplate.weights[criterion.name] || 0;
      totalWeightedScore += score * weight;
      totalWeight += weight;
    });
    
    return totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTemplate || !athleteId || !athleteName) {
      toast({
        title: 'Missing Information',
        description: 'Please select a template and provide athlete information',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call - in mock mode, just show success
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: 'Success',
        description: 'Evaluation saved successfully (mock mode)',
      });
      
      navigate('/eval');
    } catch (error) {
      console.error('Error saving evaluation:', error);
      toast({
        title: 'Error',
        description: 'Failed to save evaluation',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStarRating = (criterionName: string, maxRating: number) => {
    const currentScore = scores[criterionName] || 0;
    
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: maxRating }, (_, i) => i + 1).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => updateScore(criterionName, value)}
            className={`p-1 transition-colors ${
              value <= currentScore
                ? 'text-yellow-400 hover:text-yellow-500'
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            <Star
              className={`h-5 w-5 ${value <= currentScore ? 'fill-current' : ''}`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm font-medium">
          {currentScore}/{maxRating}
        </span>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/eval')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Evaluations
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Evaluation</h1>
          <p className="text-muted-foreground">Create a new athlete evaluation</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Athlete Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="athleteId">Athlete ID</Label>
                <Input
                  id="athleteId"
                  value={athleteId}
                  onChange={(e) => setAthleteId(e.target.value)}
                  placeholder="Enter athlete ID"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="athleteName">Athlete Name</Label>
                <Input
                  id="athleteName"
                  value={athleteName}
                  onChange={(e) => setAthleteName(e.target.value)}
                  placeholder="Enter athlete name"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evaluation Template</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template">Select Template</Label>
                <Select value={selectedTemplate?.id || ''} onValueChange={handleTemplateSelect} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an evaluation template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name} ({template.sport} - {template.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTemplate && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{selectedTemplate.sport}</Badge>
                    <Badge variant="secondary">{selectedTemplate.role}</Badge>
                    <span className="text-sm text-muted-foreground">
                      Scale: 1-{selectedTemplate.scale}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedTemplate.criteria.length} evaluation criteria
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {selectedTemplate && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Evaluation Criteria</CardTitle>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {calculateOverallScore().toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Overall Score
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedTemplate.criteria.map((criterion) => (
                <div key={criterion.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{criterion.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {criterion.description}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {selectedTemplate.weights[criterion.name]}%
                    </Badge>
                  </div>
                  
                  {selectedTemplate.scale <= 10 ? (
                    renderStarRating(criterion.name, selectedTemplate.scale)
                  ) : (
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min="0"
                        max={selectedTemplate.scale}
                        value={scores[criterion.name] || ''}
                        onChange={(e) => updateScore(criterion.name, parseInt(e.target.value) || 0)}
                        className="w-24"
                        placeholder="0"
                      />
                      <span className="text-sm text-muted-foreground">
                        / {selectedTemplate.scale}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional observations or comments..."
              rows={4}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={() => navigate('/eval')}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading || !selectedTemplate}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : 'Save Evaluation'}
          </Button>
        </div>
      </form>
    </div>
  );
}