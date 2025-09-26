import { supabase } from '@/integrations/supabase/client';

export class EdgeFunctionClient {
  static async invoke<T = any>(
    functionName: string, 
    options?: {
      body?: any;
      headers?: Record<string, string>;
    }
  ): Promise<{ data: T | null; error: any }> {
    try {
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: options?.body,
        headers: options?.headers,
      });

      if (error) {
        console.error(`Edge function ${functionName} error:`, error);
        return { data: null, error };
      }

      return { data: data as T, error: null };
    } catch (err) {
      console.error(`Edge function ${functionName} exception:`, err);
      return { data: null, error: err };
    }
  }

  static async invokeTransfer(transferData: any) {
    return this.invoke('transfer-handler', { body: transferData });
  }

  static async invokePayment(paymentData: any) {
    return this.invoke('payment-handler', { body: paymentData });
  }

  static async invokeNotification(notificationData: any) {
    return this.invoke('notification-handler', { body: notificationData });
  }
}

// Export interface and instance for compatibility
export interface EdgeFunctionResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    userMessage?: string;
    correlationId?: string;
  };
}

export const edgeFunctionClient = {
  invoke: async <T>(functionName: string, payload?: any): Promise<EdgeFunctionResponse<T>> => {
    const result = await EdgeFunctionClient.invoke<T>(functionName, { body: payload });
    return {
      success: !result.error,
      data: result.data || undefined,
      error: result.error ? { userMessage: 'Service unavailable' } : undefined
    };
  }
};

export default EdgeFunctionClient;