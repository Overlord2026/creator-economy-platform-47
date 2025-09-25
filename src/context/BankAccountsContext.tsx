'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { safeQueryOptionalTable } from '@/lib/db/safeSupabase';

export interface BankAccount {
  id: string;
  user_id: string;
  account_name: string;
  name: string; // Add name property for display
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
  saving: boolean;
  refresh: () => Promise<void>;
  addAccount: (accountData: {
    name: string;
    account_type: string;
    balance: number;
  }) => Promise<boolean>;
}

const BankAccountsContext = createContext<BankAccountsContextType | undefined>(undefined);

export function BankAccountsProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setAccounts([]); return; }
      const res = await safeQueryOptionalTable<any>('bank_accounts', '*', { user_id: user.id });
      const mappedAccounts = res.ok ? (res.data || []).map((acc: any) => ({
        ...acc,
        name: acc.account_name || acc.name || 'Unnamed Account'
      })) : [];
      setAccounts(mappedAccounts);
    } catch (e) {
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  const addAccount = async (accountData: {
    name: string;
    account_type: string;
    balance: number;
  }): Promise<boolean> => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data, error } = await supabase
        .from('bank_accounts')
        .insert([{
          user_id: user.id,
          account_name: accountData.name,
          account_type: accountData.account_type,
          balance: accountData.balance,
          bank_name: 'Manual Entry',
          currency: 'USD',
          status: 'active'
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding account:', error);
        return false;
      }

      // Add name property for consistency
      const newAccount = { ...data, name: data.account_name };
      setAccounts(prev => [...prev, newAccount]);
      return true;
    } catch (error) {
      console.error('Error adding account:', error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => { fetchAccounts(); }, []);

  return (
    <BankAccountsContext.Provider value={{ accounts, loading, saving, refresh: fetchAccounts, addAccount }}>
      {children}
    </BankAccountsContext.Provider>
  );
}

export function useBankAccounts() {
  const ctx = useContext(BankAccountsContext);
  if (!ctx) throw new Error('useBankAccounts must be used within a BankAccountsProvider');
  return ctx;
}
