import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { safeQueryOptionalTable, tableExists, withFallback } from '@/lib/db/safeSupabase';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Trophy, 
  AlertTriangle, 
  Users, 
  Target,
  CheckCircle,
  Play,
  Shield
} from 'lucide-react';
import { format, parseISO, differenceInDays } from 'date-fns';

interface TrainingProgram {
  id: string;
  program_name: string;
  program_type: string;
  description: string;
  duration_minutes: number;
  required_for_roles: string[];
  passing_score: number;
}

interface TrainingSchedule {
  id: string;
  program_id: string;
  schedule_name: string;
  frequency: string;
  next_due_date: string;
  mandatory: boolean;
  program?: TrainingProgram;
}

interface TrainingCompletion {
  id: string;
  user_id: string;
  program_id: string;
  completed_at: string;
  passed: boolean;
  score?: number;
  certificate_issued: boolean;
  program?: TrainingProgram;
}

interface PhishingSimulation {
  id: string;
  campaign_name: string;
  campaign_type: string;
}

interface PhishingResult {
  id: string;
  user_id: string;
  simulation_id: string;
  email_opened: boolean;
  link_clicked: boolean;
  data_entered: boolean;
  reported_suspicious: boolean;
  created_at: string;
  simulation?: PhishingSimulation;
}

export const SecurityTrainingDashboard: React.FC = () => {
  const [trainingSchedules, setTrainingSchedules] = useState<TrainingSchedule[]>([]);
  const [completions, setCompletions] = useState<TrainingCompletion[]>([]);
  const [phishingResults, setPhishingResults] = useState<PhishingResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTrainingData();
  }, []);

  const fetchTrainingData = async () => {
    try {
      // Use safe queries for training data with fallbacks
      const schedules = await withFallback(
        'security_training_schedules',
        async () => {
          const result = await safeQueryOptionalTable('security_training_schedules', '*', {
            order: { column: 'next_due_date', ascending: true }
          });
          return result;
        },
        async () => []
      );

      const userCompletions = await withFallback(
        'security_training_completions',
        async () => {
          const user = await supabase.auth.getUser();
          if (!user.data.user) return { ok: true, data: [] };
          
          const result = await safeQueryOptionalTable('security_training_completions', '*', {
            order: { column: 'completed_at', ascending: false }
          });
          
          // Filter by user_id on client side since we can't use eq with safe pattern
          if (result.ok && result.data) {
            const filteredData = result.data.filter((completion: any) => 
              completion.user_id === user.data.user.id
            );
            return { ok: true, data: filteredData };
          }
          return result;
        },
        async () => []
      );

      const phishing = await withFallback(
        'phishing_simulation_results',
        async () => {
          const user = await supabase.auth.getUser();
          if (!user.data.user) return { ok: true, data: [] };
          
          const result = await safeQueryOptionalTable('phishing_simulation_results', '*', {
            order: { column: 'created_at', ascending: false }
          });
          
          // Filter by user_id on client side
          if (result.ok && result.data) {
            const filteredData = result.data.filter((result: any) => 
              result.user_id === user.data.user.id
            );
            return { ok: true, data: filteredData };
          }
          return result;
        },
        async () => []
      );

      setTrainingSchedules(schedules || []);
      setCompletions(userCompletions || []);
      setPhishingResults(phishing || []);
    } catch (error) {
      console.error('Error fetching training data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load training data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const startTraining = async (programId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const hasTable = await tableExists('security_training_completions');
      if (!hasTable) {
        throw new Error('Training tracking is not available');
      }

      // Use type assertion to bypass TypeScript validation for optional table
      const { error } = await (supabase as any)
        .from('security_training_completions')
        .insert([{
          user_id: user.id,
          program_id: programId,
          started_at: new Date().toISOString(),
          attempts: 1
        }]);

      if (error) throw error;

      toast({
        title: 'Training Started',
        description: 'Your training session has been initiated.',
      });

      fetchTrainingData();
    } catch (error) {
      console.error('Error starting training:', error);
      toast({
        title: 'Error',
        description: 'Failed to start training.',
        variant: 'destructive',
      });
    }
  };

  const getTrainingStatus = (schedule: TrainingSchedule) => {
    const completion = completions.find(c => c.program_id === schedule.program_id);
    const daysUntilDue = differenceInDays(parseISO(schedule.next_due_date), new Date());
    
    if (completion?.passed) {
      return { status: 'completed', color: 'green', icon: CheckCircle };
    } else if (daysUntilDue < 0) {
      return { status: 'overdue', color: 'red', icon: AlertTriangle };
    } else if (daysUntilDue <= 7) {
      return { status: 'due_soon', color: 'yellow', icon: Clock };
    } else {
      return { status: 'pending', color: 'blue', icon: BookOpen };
    }
  };

  const getComplianceScore = () => {
    if (trainingSchedules.length === 0) return 100;
    
    const completedCount = trainingSchedules.filter(schedule => {
      const completion = completions.find(c => c.program_id === schedule.program_id);
      return completion?.passed;
    }).length;
    
    return Math.round((completedCount / trainingSchedules.length) * 100);
  };

  const getPhishingScore = () => {
    if (phishingResults.length === 0) return 100;
    
    const safeResults = phishingResults.filter(result => 
      !result.link_clicked && !result.data_entered && result.reported_suspicious
    ).length;
    
    return Math.round((safeResults / phishingResults.length) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Training Compliance</p>
                <p className="text-2xl font-bold">{getComplianceScore()}%</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <Progress value={getComplianceScore()} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Trainings</p>
                <p className="text-2xl font-bold">{completions.filter(c => c.passed).length}</p>
              </div>
              <Trophy className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phishing Score</p>
                <p className="text-2xl font-bold">{getPhishingScore()}%</p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
            <Progress value={getPhishingScore()} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Programs</p>
                <p className="text-2xl font-bold">{trainingSchedules.length}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedules">Training Schedule</TabsTrigger>
          <TabsTrigger value="completions">My Completions</TabsTrigger>
          <TabsTrigger value="phishing">Phishing Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="schedules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Training Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              {trainingSchedules.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No training schedules available. Training system may not be configured yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {trainingSchedules.map((schedule) => {
                    const status = getTrainingStatus(schedule);
                    const StatusIcon = status.icon;
                    
                    return (
                      <div 
                        key={schedule.id} 
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <StatusIcon className={`h-5 w-5 text-${status.color}-600`} />
                          <div>
                            <h4 className="font-medium">{schedule.schedule_name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Due: {format(parseISO(schedule.next_due_date), 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {schedule.mandatory && (
                            <Badge variant="destructive">Required</Badge>
                          )}
                          <Badge variant="outline" className={`text-${status.color}-600`}>
                            {status.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Button
                            size="sm"
                            onClick={() => startTraining(schedule.program_id)}
                            className="ml-2"
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Start
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Training Completions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {completions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No training completions yet. Complete your first training to see progress here.
                </p>
              ) : (
                <div className="space-y-4">
                  {completions.map((completion) => (
                    <div 
                      key={completion.id} 
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <h4 className="font-medium">Program ID: {completion.program_id}</h4>
                          <p className="text-sm text-muted-foreground">
                            Completed: {format(parseISO(completion.completed_at), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {completion.passed ? (
                          <Badge className="bg-green-100 text-green-800">Passed</Badge>
                        ) : (
                          <Badge variant="destructive">Failed</Badge>
                        )}
                        {completion.score && (
                          <Badge variant="outline">Score: {completion.score}%</Badge>
                        )}
                        {completion.certificate_issued && (
                          <Badge className="bg-blue-100 text-blue-800">Certified</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phishing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Phishing Simulation Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {phishingResults.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No phishing simulation results yet. Simulations help test and improve security awareness.
                </p>
              ) : (
                <div className="space-y-4">
                  {phishingResults.map((result) => {
                    const safe = !result.link_clicked && !result.data_entered && result.reported_suspicious;
                    
                    return (
                      <div 
                        key={result.id} 
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          {safe ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          )}
                          <div>
                            <h4 className="font-medium">Simulation ID: {result.simulation_id}</h4>
                            <p className="text-sm text-muted-foreground">
                              Date: {format(parseISO(result.created_at), 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {result.email_opened && (
                            <Badge variant="outline">Email Opened</Badge>
                          )}
                          {result.link_clicked && (
                            <Badge variant="destructive">Link Clicked</Badge>
                          )}
                          {result.data_entered && (
                            <Badge variant="destructive">Data Entered</Badge>
                          )}
                          {result.reported_suspicious && (
                            <Badge className="bg-green-100 text-green-800">Reported</Badge>
                          )}
                          <Badge className={safe ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {safe ? 'Safe' : 'Vulnerable'}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};