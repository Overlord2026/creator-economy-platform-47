import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function EdgeFunctionActivityDashboard() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>🚧 Edge Function Activity</CardTitle>
          <CardDescription>
            This dashboard will show edge function execution logs and metrics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Bootstrap mode - edge function monitoring not yet configured.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
