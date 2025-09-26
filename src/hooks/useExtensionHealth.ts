// Stub for UI-only mode
interface ExtensionHealth {
  graphqlOk: boolean;
  vaultOk: boolean;
}

interface UseExtensionHealthResult {
  health: ExtensionHealth | null;
  isLoading: boolean;
  error: string | null;
  hasIssues: boolean;
}

export function useExtensionHealth(): UseExtensionHealthResult {
  return {
    health: { graphqlOk: true, vaultOk: true },
    isLoading: false,
    error: null,
    hasIssues: false
  };
}