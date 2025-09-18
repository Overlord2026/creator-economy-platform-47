import React, { useState, useEffect } from 'react';
import { AdminPortalLayout } from '@/components/admin/AdminPortalLayout';
import { InventoryScanner } from '@/components/admin/inventory/InventoryScanner';
import { useRoleAccess } from '@/hooks/useRoleAccess';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

export function AdminInventory() {
  const { isAdmin, userRole } = useRoleAccess();
  const [isGeneratingReports, setIsGeneratingReports] = useState(false);

  // Check for environment override
  const isDiagnosticsEnabled = import.meta.env.VITE_DIAG_ENABLED === 'true';

  // Security check: only admins or when DIAG_ENABLED=true can access
  if (!isAdmin() && !isDiagnosticsEnabled) {
    return (
      <AdminPortalLayout>
        <Alert className="m-6">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            You don't have permission to access the App Inventory. 
            Required role: Administrator or DIAG_ENABLED=true. Your role: {userRole || 'Unknown'}
          </AlertDescription>
        </Alert>
      </AdminPortalLayout>
    );
  }

  // Generate markdown and CSV reports on component mount
  useEffect(() => {
    generateInventoryReports();
  }, []);

  const generateInventoryReports = async () => {
    setIsGeneratingReports(true);
    try {
      // In a real implementation, this would scan the actual codebase
      // For now, we'll just simulate the generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Inventory reports generated successfully');
    } catch (error) {
      console.error('Failed to generate inventory reports:', error);
    } finally {
      setIsGeneratingReports(false);
    }
  };

  return (
    <AdminPortalLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">App Inventory</h1>
          <p className="text-muted-foreground">
            Comprehensive inventory of routes, APIs, integrations, and assets from the remix.
            {isGeneratingReports && ' Generating reports...'}
          </p>
        </div>
        
        <InventoryScanner />
      </div>
    </AdminPortalLayout>
  );
}