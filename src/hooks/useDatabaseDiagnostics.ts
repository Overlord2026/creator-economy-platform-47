// Stub for UI-only mode
export interface DatabaseTestResult {
  test_number: number;
  area_feature: string;
  test_case: string;
  expected_result: string;
  actual_result: string;
  pass_fail: 'PASS' | 'FAIL';
  notes: string;
}

export interface DatabaseDiagnosticsState {
  isLoading: boolean;
  isRunning: boolean;
  lastRun: number | null;
  results: DatabaseTestResult[];
  error: Error | null;
}

export const useDatabaseDiagnostics = () => ({
  isLoading: false,
  isRunning: false,
  lastRun: null,
  results: [],
  error: null,
  runDatabaseTests: async () => [],
  runTransferValidationTests: async () => [],
  runHsaComplianceTests: async () => [],
  runAuditLoggingTests: async () => []
});