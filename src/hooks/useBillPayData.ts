'use client';
import { useMemo, useCallback, useEffect, useState } from "react";
import { useSubscriptionAccess } from "@/hooks/useSubscriptionAccess";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { safeQueryOptionalTable } from "@/lib/db/safeSupabase";

export interface Bill {
  id: string;
  user_id: string;
  vendor_id?: string | null;
  biller_name: string;
  category: 'utilities' | 'mortgage' | 'insurance' | 'tuition' | 'loans' | 'subscriptions' | 'transportation' | 'healthcare' | 'entertainment' | 'other';
  amount: number;
  due_date: string;
  frequency: 'one_time' | 'weekly' | 'monthly' | 'quarterly' | 'annual';
  status: 'unpaid' | 'paid' | 'overdue' | 'scheduled';
  payment_method?: string | null;
  is_auto_pay: boolean;
  notes?: string | null;
  reminder_days: number;
  created_at: string;
  updated_at: string;
}

export interface Vendor {
  id: string;
  name: string;
  type: string;
  contact_info: any;
  logo_url?: string;
  website_url?: string;
}

export interface BillTransaction {
  id: string;
  bill_id: string;
  user_id: string;
  amount: number;
  payment_date: string;
  payment_method?: string;
  transaction_status: 'completed' | 'pending' | 'failed';
  confirmation_number?: string;
  notes?: string;
  created_at: string;
}

export interface BillAnalytics {
  monthlyTotal: number;
  activeBills: number;
  automatedPayments: number;
  potentialSavings: number;
  paymentHistory: Array<{
    month: string;
    amount: number;
  }>;
}

export const useBillPayData = () => {
  const { checkFeatureAccess } = useSubscriptionAccess();
  const { toast } = useToast();
  const [bills, setBills] = useState<Bill[]>([]);
  const [transactions, setTransactions] = useState<BillTransaction[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBills = useCallback(async () => {
    try {
      const res = await safeQueryOptionalTable<any>('bills', '*');
      const rows = res.ok ? (res.data || []) : [];
      const mapped: Bill[] = rows.map((r: any) => ({
        id: r.id,
        user_id: r.user_id || '',
        vendor_id: r.vendor_id ?? null,
        biller_name: r.biller_name || r.name || 'Unknown',
        category: (['utilities', 'mortgage', 'insurance', 'tuition', 'loans', 'subscriptions', 'transportation', 'healthcare', 'entertainment', 'other'].includes(r.category) ? r.category : 'other') as Bill['category'],
        amount: Number(r.amount) || 0,
        due_date: r.due_date || new Date().toISOString(),
        frequency: (['one_time', 'weekly', 'monthly', 'quarterly', 'annual'].includes(r.frequency) ? r.frequency : 'monthly') as Bill['frequency'],
        status: (['unpaid', 'paid', 'overdue', 'scheduled'].includes(r.status) ? r.status : 'unpaid') as Bill['status'],
        payment_method: r.payment_method ?? null,
        is_auto_pay: Boolean(r.is_auto_pay),
        notes: r.notes ?? null,
        reminder_days: Number(r.reminder_days ?? 3),
        created_at: r.created_at || new Date().toISOString(),
        updated_at: r.updated_at || new Date().toISOString(),
      }));
      setBills(mapped);
    } catch (err) {
      console.error('Error fetching bills:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch bills');
      setBills([]);
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    try {
      const res = await safeQueryOptionalTable<any>('bill_transactions', '*');
      const rows = res.ok ? (res.data || []) : [];
      const mapped: BillTransaction[] = rows.map((t: any) => ({
        id: t.id,
        bill_id: t.bill_id || '',
        user_id: t.user_id || '',
        amount: Number(t.amount) || 0,
        payment_date: t.payment_date || new Date().toISOString(),
        payment_method: t.payment_method,
        transaction_status: (['completed', 'pending', 'failed'].includes(t.transaction_status) ? t.transaction_status : 'pending') as BillTransaction['transaction_status'],
        confirmation_number: t.reference_number,
        notes: t.notes,
        created_at: t.created_at || new Date().toISOString(),
      }));
      setTransactions(mapped);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setTransactions([]);
    }
  }, []);

  const fetchVendors = useCallback(async () => {
    try {
      const res = await safeQueryOptionalTable<any>('vendors', '*');
      const rows = res.ok ? (res.data || []) : [];
      const mapped: Vendor[] = rows.map((v: any) => ({
        id: v.id,
        name: v.name,
        type: v.category || 'other',
        contact_info: { email: v.contact_email, phone: v.contact_phone, address: v.address },
        logo_url: v.logo_url,
        website_url: v.website_url,
      }));
      setVendors(mapped);
    } catch (err) {
      console.error('Error fetching vendors:', err);
      setVendors([]);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchBills(), fetchTransactions(), fetchVendors()]);
      setIsLoading(false);
    };

    loadData();
  }, [fetchBills, fetchTransactions, fetchVendors]);

  const analytics = useMemo((): BillAnalytics => {
    const monthlyTotal = bills.reduce((sum, bill) => sum + Number(bill.amount), 0);
    const activeBills = bills.filter(bill => bill.status !== 'paid').length;
    const automatedPayments = bills.filter(bill => bill.is_auto_pay).length;
    const potentialSavings = bills
      .filter(bill => !bill.is_auto_pay)
      .reduce((sum, bill) => sum + (Number(bill.amount) * 0.02), 0);

    const paymentHistory = Array.from({ length: 12 }, (_, i) => {
      const month = new Date(new Date().getFullYear(), i);
      const monthTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.payment_date);
        return transactionDate.getMonth() === month.getMonth() && 
               transactionDate.getFullYear() === month.getFullYear();
      });
      return {
        month: month.toLocaleDateString('en-US', { month: 'short' }),
        amount: monthTransactions.reduce((sum, t) => sum + Number(t.amount), 0)
      };
    });

    return {
      monthlyTotal,
      activeBills,
      automatedPayments,
      potentialSavings,
      paymentHistory
    };
  }, [bills, transactions]);

  const upcomingBills = useMemo(() => {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return bills
      .filter(bill => {
        const dueDate = new Date(bill.due_date);
        return dueDate <= nextWeek && bill.status !== 'paid';
      })
      .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
  }, [bills]);

  const overdueBills = useMemo(() => {
    const now = new Date();
    return bills.filter(bill => {
      const dueDate = new Date(bill.due_date);
      return dueDate < now && bill.status !== 'paid';
    });
  }, [bills]);

  const addBill = async (newBill: Omit<Bill, 'id' | 'user_id'>) => {
    if (!checkFeatureAccess('premium')) {
      toast({
        title: "Upgrade to Premium",
        description: "Bill Management is a premium feature. Upgrade to access.",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const { data, error } = await supabase
        .from('bills')
        .insert([{ 
          ...newBill, 
          user_id: user.id,
          frequency: newBill.frequency || 'monthly',
          is_auto_pay: newBill.is_auto_pay || false,
          reminder_days: newBill.reminder_days || 3
        }])
        .select()
        .single();

      if (error) throw error;

      const mappedBill: Bill = {
        ...data,
        frequency: (data.frequency as Bill['frequency']) || 'monthly',
        is_auto_pay: data.is_auto_pay || false,
        reminder_days: data.reminder_days || 3,
        category: (['utilities', 'mortgage', 'insurance', 'tuition', 'loans', 'subscriptions', 'transportation', 'healthcare', 'entertainment', 'other'].includes(data.category) ? data.category : 'other') as Bill['category'],
        status: (['unpaid', 'paid', 'overdue', 'scheduled'].includes(data.status) ? data.status : 'unpaid') as Bill['status']
      };

      setBills(prevBills => [...prevBills, mappedBill]);
      toast({
        title: "Bill Added",
        description: "Your bill has been successfully added.",
      });
    } catch (err) {
      console.error("Error adding bill:", err);
      toast({
        title: "Error",
        description: "Failed to add bill. Please try again.",
      });
    }
  };

  const updateBill = async (billId: string, updatedBill: Partial<Bill>) => {
    try {
      const { data, error } = await supabase
        .from('bills')
        .update(updatedBill)
        .eq('id', billId)
        .select()
        .single();

      if (error) throw error;

      const mappedBill: Bill = {
        ...data,
        frequency: (data.frequency as Bill['frequency']) || 'monthly',
        is_auto_pay: data.is_auto_pay !== undefined ? data.is_auto_pay : false,
        reminder_days: data.reminder_days !== undefined ? data.reminder_days : 3,
        category: (['utilities', 'mortgage', 'insurance', 'tuition', 'loans', 'subscriptions', 'transportation', 'healthcare', 'entertainment', 'other'].includes(data.category) ? data.category : 'other') as Bill['category'],
        status: (['unpaid', 'paid', 'overdue', 'scheduled'].includes(data.status) ? data.status : 'unpaid') as Bill['status']
      };

      setBills(prevBills =>
        prevBills.map(bill => (bill.id === billId ? mappedBill : bill))
      );
      toast({
        title: "Bill Updated",
        description: "Your bill has been successfully updated.",
      });
    } catch (err) {
      console.error("Error updating bill:", err);
      toast({
        title: "Error",
        description: "Failed to update bill. Please try again.",
      });
    }
  };

  const deleteBill = async (billId: string) => {
    try {
      const { error } = await supabase
        .from('bills')
        .delete()
        .eq('id', billId);

      if (error) throw error;

      setBills(prevBills => prevBills.filter(bill => bill.id !== billId));
      toast({
        title: "Bill Deleted",
        description: "Your bill has been successfully deleted.",
      });
    } catch (err) {
      console.error("Error deleting bill:", err);
      toast({
        title: "Error",
        description: "Failed to delete bill. Please try again.",
      });
    }
  };

  const payBill = async (billId: string, paymentDetails: Omit<BillTransaction, 'id' | 'user_id' | 'bill_id'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const { data, error } = await supabase
        .from('bill_transactions')
        .insert([{ ...paymentDetails, bill_id: billId, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      const mappedTransaction: BillTransaction = {
        ...data,
        transaction_status: (['completed', 'pending', 'failed'].includes(data.transaction_status) ? data.transaction_status : 'completed') as BillTransaction['transaction_status']
      };

      setTransactions(prevTransactions => [...prevTransactions, mappedTransaction]);
      setBills(prevBills =>
        prevBills.map(bill => (bill.id === billId ? { ...bill, status: 'paid' as Bill['status'] } : bill))
      );
      toast({
        title: "Bill Paid",
        description: "Your bill has been successfully marked as paid.",
      });
    } catch (err) {
      console.error("Error paying bill:", err);
      toast({
        title: "Error",
        description: "Failed to pay bill. Please try again.",
      });
    }
  };

  const scheduleAutoPay = async (billId: string) => {
    try {
      const { error } = await supabase
        .from('bills')
        .update({ is_auto_pay: true })
        .eq('id', billId);

      if (error) throw error;

      setBills(prevBills =>
        prevBills.map(bill => (bill.id === billId ? { ...bill, is_auto_pay: true } : bill))
      );
      toast({
        title: "Auto-Pay Scheduled",
        description: "Auto-pay has been successfully scheduled for this bill.",
      });
    } catch (err) {
      console.error("Error scheduling auto-pay:", err);
      toast({
        title: "Error",
        description: "Failed to schedule auto-pay. Please try again.",
      });
    }
  };

  // Add missing properties with safe defaults
  const hasAutomatedPayments = bills.some(bill => bill.is_auto_pay);
  const hasAdvancedAnalytics = true; // Always available for now

  return { 
    bills, 
    transactions, 
    vendors, 
    isLoading, 
    error, 
    analytics, 
    upcomingBills, 
    overdueBills, 
    hasAutomatedPayments,
    hasAdvancedAnalytics,
    addBill, 
    updateBill, 
    deleteBill, 
    payBill, 
    scheduleAutoPay 
  };
};