'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { safeQueryOptionalTable } from '@/lib/db/safeSupabase';

export interface BankAccount {
  id: string;
  user_id: string;
  account_name: string;
  account_type: string;
  account_number?: string | null;
  routing_number?: string | null;
  bank_name: string;
  balance: number;
  currency: string;
  status: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

interface BankAccountsContextType {
  accounts: BankAccount[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const BankAccountsContext = createContext<BankAccountsContextType | undefined>(undefined);

export function BankAccountsProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setAccounts([]); return; }
      const res = await safeQueryOptionalTable<BankAccount>('bank_accounts', '*', { user_id: user.id });
      setAccounts(res.ok ? (res.data || []) : []);
    } catch (e) {
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAccounts(); }, []);

  return (
    <BankAccountsContext.Provider value={{ accounts, loading, refresh: fetchAccounts }}>
      {children}
    </BankAccountsContext.Provider>
  );
}

export function useBankAccounts() {
  const ctx = useContext(BankAccountsContext);
  if (!ctx) throw new Error('useBankAccounts must be used within a BankAccountsProvider');
  return ctx;
}
