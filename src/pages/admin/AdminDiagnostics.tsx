import React from 'react';
import { AdminPortalLayout } from '@/components/admin/AdminPortalLayout';
import { AdminDiagnosticsDashboard } from '@/components/admin/diagnostics/AdminDiagnosticsDashboard';
import { useRoleAccess } from '@/hooks/useRoleAccess';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

export function AdminDiagnostics() {
  const { isAdmin, userRole } = useRoleAccess();

  // Check for environment override
  const isDiagnosticsEnabled = import.meta.env.VITE_DIAG_ENABLED === 'true';

  // Security check: only admins or when DIAG_ENABLED=true can access
  if (!isAdmin() && !isDiagnosticsEnabled) {
    return (
      <AdminPortalLayout>
        <Alert className="m-6">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            You don't have permission to access the Admin Diagnostics. 
            Required role: Administrator or DIAG_ENABLED=true. Your role: {userRole || 'Unknown'}
          </AlertDescription>
        </Alert>
      </AdminPortalLayout>
    );
  }

  return (
    <AdminPortalLayout>
      <div className="container mx-auto p-6">
        <AdminDiagnosticsDashboard />
      </div>
    </AdminPortalLayout>
  );
}