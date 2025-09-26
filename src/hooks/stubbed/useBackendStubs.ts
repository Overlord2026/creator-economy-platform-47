// Stub hooks for UI-only mode to prevent build errors
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

export const useExtensionHealth = () => ({
  health: { graphqlOk: true, vaultOk: true },
  isLoading: false,
  error: null,
  hasIssues: false
});

export const useEventTracking = () => ({
  trackEvent: () => {},
  trackUserAction: () => {},
  trackPageView: () => {}
});

export const useFamilyVault = () => ({
  vaults: [],
  members: [],
  items: [],
  accessLogs: [],
  loading: false,
  error: null,
  createVault: async () => {},
  addMember: async () => {},
  addItem: async () => {},
  removeItem: async () => {}
});

export const useFamilyWealthData = () => ({
  totalBalance: '$0.00',
  loading: false,
  error: null
});

export const useFirmManagement = () => ({
  firms: [],
  users: [],
  loading: false,
  error: null,
  createFirm: async () => {},
  updateFirm: async () => {},
  deleteFirm: async () => {}
});

export const useEnhancedErrorHandling = () => ({
  logError: () => {},
  handleError: () => {},
  clearErrors: () => {},
  errors: []
});