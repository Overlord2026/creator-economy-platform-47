// Local TenantContext stub for UI-only mode
import { createContext, useContext } from 'react';

const TenantContext = createContext(null);

export const useTenant = () => ({
  currentTenant: null,
  tenantSettings: null,
  loading: false,
  error: null
});

export default TenantContext;