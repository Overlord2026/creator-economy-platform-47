import { supabase } from '@/integrations/supabase/client';

export type EdgeFunctionResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: { userMessage?: string; correlationId?: string };
};

export class EdgeFunctionClient {
  private s = supabase;

  async invoke<T = unknown>(name: string, payload?: any): Promise<EdgeFunctionResponse<T>> {
    const { data, error } = await this.s.functions.invoke(name, { body: payload ?? {} });
    if (error) {
      // Keep this shape minimal; callers should not assume .message exists
      return { success: false, error: { userMessage: (error as any)?.message } };
    }
    return { success: true, data: data as T };
  }
}

export const edgeFunctionClient = new EdgeFunctionClient();
