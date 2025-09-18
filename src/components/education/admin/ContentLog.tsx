import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Search, Calendar, User, FileText, PlayCircle, BookOpen, Eye, Download, AlertTriangle, Copy, Archive } from 'lucide-react';
import { format } from 'date-fns';

interface ContentLogEntry {
  id: string;
  content_id: string;
  action_type: 'upload' | 'edit' | 'delete' | 'view';
  performed_at: string;
  performed_by: string;
  details?: any;
  education_content?: {
    title: string;
    content_type: string;
  };
}

interface DuplicateIssue {
  type: 'duplicate' | 'missing_backup' | 'version_conflict';
  message: string;
  content_ids: string[];
}

export function ContentLog() {
  const [logs, setLogs] = useState<ContentLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [usingFallback, setUsingFallback] = useState(false);
  const [duplicateIssues, setDuplicateIssues] = useState<DuplicateIssue[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      
      // Use audit_receipts since education tables don't exist
      const { data: auditLogs, error: auditError } = await supabase
        .from('audit_receipts')
        .select('*')
        .eq('entity', 'education_content')
        .order('created_at', { ascending: false })
        .limit(50);

      if (auditError) throw auditError;

      const fallbackLogs: ContentLogEntry[] = (auditLogs || []).map(log => ({
        id: log.id,
        content_id: log.entity_id,
        action_type: 'upload' as const,
        performed_at: log.created_at,
        performed_by: log.actor_id,
        details: log.canonical,
        education_content: {
          title: typeof log.canonical === 'object' && log.canonical && 'title' in log.canonical 
            ? String(log.canonical.title) : 'Unknown',
          content_type: typeof log.canonical === 'object' && log.canonical && 'content_type' in log.canonical 
            ? String(log.canonical.content_type) : 'unknown'
        }
      }));

      setLogs(fallbackLogs);
      setUsingFallback(true);
    } catch (error) {
      console.error('Error fetching content logs:', error);
      toast.error('Failed to load content logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    if (showAnalysis) {
      analyzeContent();
    }
  }, [selectedAction, showAnalysis]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchLogs();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const exportToCSV = () => {
    const headers = [
      'Title',
      'Content Type', 
      'Action',
      'Performed By',
      'Timestamp',
      'Notes'
    ];

    const csvContent = [
      headers.join(','),
      ...logs.map(log => [
        `"${log.education_content?.title || 'Unknown'}"`,
        log.education_content?.content_type || '',
        log.action_type,
        log.performed_by || '',
        log.performed_at,
        `"${log.details ? JSON.stringify(log.details) : ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content-log-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast.success('Content log exported successfully');
  };

  const analyzeContent = async () => {
    if (usingFallback) {
      setDuplicateIssues([{
        type: 'missing_backup',
        message: 'Analysis unavailable: Education schema not found',
        content_ids: []
      }]);
      return;
    }

    try {
      // Since we're using fallback, we can't do full analysis
      const issues: DuplicateIssue[] = [{
        type: 'missing_backup',
        message: 'Content analysis requires education schema to be available',
        content_ids: []
      }];

      setDuplicateIssues(issues);
    } catch (error) {
      console.error('Error analyzing content:', error);
      toast.error('Failed to analyze content');
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'upload':
      case 'created':
        return <Badge className="bg-green-500 text-white">Created</Badge>;
      case 'edit':
      case 'updated':
        return <Badge className="bg-blue-500 text-white">Updated</Badge>;
      case 'delete':
      case 'deleted':
        return <Badge className="bg-red-500 text-white">Deleted</Badge>;
      case 'view':
        return <Badge className="bg-gray-500 text-white">Viewed</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'guide':
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      case 'course':
      case 'video':
        return <PlayCircle className="h-4 w-4" />;
      case 'book':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.education_content?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.performed_by?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = selectedAction === 'all' || log.action_type === selectedAction;
    
    return matchesSearch && matchesAction;
  });

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {usingFallback && (
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-sm text-yellow-600 dark:text-yellow-400">
            Education tables not found. Showing audit receipts instead.
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by title or user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedAction} onValueChange={setSelectedAction}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="upload">Upload</SelectItem>
            <SelectItem value="edit">Edit</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
            <SelectItem value="view">View</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={fetchLogs} variant="outline">
          Refresh
        </Button>
        
        <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
        
        <Button 
          onClick={() => setShowAnalysis(!showAnalysis)} 
          variant={showAnalysis ? "default" : "outline"}
          className="flex items-center gap-2"
        >
          <AlertTriangle className="h-4 w-4" />
          Analysis
        </Button>
      </div>

      {/* Content Analysis */}
      {showAnalysis && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <h3 className="font-semibold">Content Analysis & Quality Check</h3>
              </div>
              
              {duplicateIssues.length === 0 ? (
                <Alert>
                  <AlertDescription>
                    ✅ No issues found. All content appears properly organized with version control enabled.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-3">
                  {duplicateIssues.map((issue, index) => (
                    <Alert key={index} variant="default">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="flex items-center justify-between">
                        <span>{issue.message}</span>
                        <Badge variant="secondary" className="text-xs">
                          <Archive className="h-3 w-3 mr-1" />
                          Schema Missing
                        </Badge>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Log Entries */}
      <div className="space-y-4">
        {filteredLogs.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No content logs found matching your criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredLogs.map((log) => (
            <Card key={log.id} className="transition-all duration-200 hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex items-center gap-2 mt-1">
                      {getContentTypeIcon(log.education_content?.content_type || '')}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium truncate">
                          {log.education_content?.title || 'Unknown Content'}
                        </h4>
                        {getActionBadge(log.action_type)}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {log.performed_by || 'Unknown User'}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(log.performed_at), 'MMM d, yyyy h:mm a')}
                        </div>
                      </div>
                      
                      {log.details && typeof log.details === 'object' && (
                        <div className="mt-2 p-2 bg-muted rounded-sm">
                          <p className="text-xs text-muted-foreground">
                            {log.details.note || JSON.stringify(log.details, null, 2)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      toast.info('Detailed view coming soon');
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}