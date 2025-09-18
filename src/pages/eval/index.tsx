import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, Download, Calendar, User, Star, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration
const mockEvaluations = [
  {
    id: '1',
    athlete_id: 'ATH001',
    athlete_name: 'John Smith',
    template_snapshot: {
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
    scores: { 'Arm Strength': 8, 'Accuracy': 9, 'Decision Making': 7, 'Leadership': 8 },
    notes: 'Strong fundamentals with excellent accuracy. Needs work on reading complex defenses.',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    athlete_id: 'ATH002',
    athlete_name: 'Sarah Johnson',
    template_snapshot: {
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
    },
    scores: { 'Ball Handling': 9, 'Court Vision': 8, 'Speed': 7 },
    notes: 'Exceptional court awareness and passing ability.',
    created_at: '2024-01-14T14:30:00Z'
  }
];

export default function EvaluationDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const calculateOverallScore = (evaluation: typeof mockEvaluations[0]) => {
    const { scores, template_snapshot } = evaluation;
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    template_snapshot.criteria.forEach(criterion => {
      const score = scores[criterion.name] || 0;
      const weight = template_snapshot.weights[criterion.name] || 0;
      totalWeightedScore += score * weight;
      totalWeight += weight;
    });
    
    return totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
  };

  const exportToCSV = () => {
    const csvContent = 'Date,Athlete ID,Template,Sport,Role,Overall Score,Notes\n' +
      mockEvaluations.map(eval => {
        const overallScore = calculateOverallScore(eval);
        return [
          new Date(eval.created_at).toLocaleDateString(),
          eval.athlete_id,
          eval.template_snapshot.name,
          eval.template_snapshot.sport,
          eval.template_snapshot.role,
          overallScore.toFixed(1),
          `"${eval.notes.replace(/"/g, '""')}"`
        ].join(',');
      }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `evaluations-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'Success',
      description: 'Evaluations exported to CSV',
    });
  };

  const filteredEvaluations = mockEvaluations.filter(evaluation =>
    evaluation.athlete_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evaluation.athlete_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evaluation.template_snapshot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evaluation.template_snapshot.sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group evaluations by athlete
  const evaluationsByAthlete = filteredEvaluations.reduce((acc, evaluation) => {
    const athleteId = evaluation.athlete_id;
    if (!acc[athleteId]) {
      acc[athleteId] = [];
    }
    acc[athleteId].push(evaluation);
    return acc;
  }, {} as Record<string, typeof mockEvaluations>);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Evaluation Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage athlete evaluations across all sports and positions.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={() => navigate('/eval/templates')}>
            <FileText className="h-4 w-4 mr-2" />
            Templates
          </Button>
          <Button onClick={() => navigate('/eval/new')}>
            <Plus className="h-4 w-4 mr-2" />
            New Evaluation
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by athlete, template, sport..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(evaluationsByAthlete).map(([athleteId, athleteEvaluations]) => (
          <Card key={athleteId}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {athleteEvaluations[0].athlete_name} ({athleteId})
                <Badge variant="outline">{athleteEvaluations.length} evaluations</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {athleteEvaluations.map((evaluation) => {
                  const overallScore = calculateOverallScore(evaluation);
                  return (
                    <div key={evaluation.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{evaluation.template_snapshot.name}</h4>
                          <div className="flex gap-1 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {evaluation.template_snapshot.sport}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {evaluation.template_snapshot.role}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-bold">
                              {overallScore.toFixed(1)}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            /{evaluation.template_snapshot.scale}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {evaluation.template_snapshot.criteria.slice(0, 3).map((criterion) => (
                          <div key={criterion.name} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{criterion.name}</span>
                            <span>{evaluation.scores[criterion.name] || 0}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(evaluation.created_at).toLocaleDateString()}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/eval/new?athleteId=${athleteId}`)}
                        >
                          New Eval
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}