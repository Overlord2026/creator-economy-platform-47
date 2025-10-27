
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { tableExists, safeQueryOptionalTable, safeInsertOptionalTable, safeUpdate } from '@/lib/db/safeSupabase';

const affiliationsSchema = z.object({
  stockExchangeOrFinra: z.boolean().optional(),
  publicCompany: z.boolean().optional(),
  usPoliticallyExposed: z.boolean().optional(),
  awmEmployee: z.boolean().optional(),
  custodian: z.boolean().optional(),
  brokerDealer: z.boolean().optional(),
  familyBrokerDealer: z.boolean().optional(),
});

export function AffiliationsFormNew({ onSave }: { onSave: () => void }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [existingRecordId, setExistingRecordId] = React.useState<string | null>(null);
  
  const form = useForm<z.infer<typeof affiliationsSchema>>({
    resolver: zodResolver(affiliationsSchema),
    defaultValues: {
      stockExchangeOrFinra: false,
      publicCompany: false,
      usPoliticallyExposed: false,
      awmEmployee: false,
      custodian: false,
      brokerDealer: false,
      familyBrokerDealer: false,
    },
  });

  React.useEffect(() => {
    const loadExistingData = async () => {
      if (!user) {
        console.log('No user found, skipping data load');
        return;
      }
      
      console.log('Loading affiliations data for user:', user.id);
      
      try {
        const hasAff = await tableExists('user_affiliations');
        let affiliations: any[] = [];
        if (hasAff) {
          const affiliationRows = await safeQueryOptionalTable('user_affiliations', '*', {
            // Mock query - would filter by user if table existed
            limit: 10
          });
          affiliations = affiliationRows.ok ? affiliationRows.data || [] : [];
        }
        
        if (affiliations.length > 0) {
          console.log('Loaded affiliations data:', affiliations);
          
          // If we have multiple records, we'll use the most recent one
          const mostRecentRecord = affiliations[0];
          setExistingRecordId(mostRecentRecord.id || '1');
          
          // Update form with the most recent data
          form.reset({
            stockExchangeOrFinra: mostRecentRecord.stock_exchange_or_finra || false,
            publicCompany: mostRecentRecord.public_company || false,
            usPoliticallyExposed: mostRecentRecord.us_politically_exposed || false,
            awmEmployee: mostRecentRecord.awm_employee || false,
            custodian: mostRecentRecord.custodian || false,
            brokerDealer: mostRecentRecord.broker_dealer || false,
            familyBrokerDealer: mostRecentRecord.family_broker_dealer || false,
          });
        } else {
          console.log('No existing affiliations found, using default form state');
        }
      } catch (error) {
        console.error('Error in loadExistingData:', error);
      }
    };
    
    loadExistingData();
  }, [user, form]);

  async function onSubmit(values: z.infer<typeof affiliationsSchema>) {
    if (!user) {
      toast.error("You must be logged in to save affiliations");
      return;
    }
    
    setIsLoading(true);
    console.log('Saving affiliations data:', values);
    
    try {
      const affiliationData = {
        user_id: user.id,
        stock_exchange_or_finra: values.stockExchangeOrFinra,
        public_company: values.publicCompany,
        us_politically_exposed: values.usPoliticallyExposed,
        awm_employee: values.awmEmployee,
        custodian: values.custodian,
        broker_dealer: values.brokerDealer,
        family_broker_dealer: values.familyBrokerDealer,
        updated_at: new Date().toISOString(),
      };
      
      console.log('Submitting affiliations data:', affiliationData);
      
      if (await tableExists('user_affiliations')) {
        if (existingRecordId) {
          // Update existing record
          await safeUpdate('user_affiliations', affiliationData, { id: existingRecordId });
        } else {
          // Insert new record
          await safeInsertOptionalTable('user_affiliations', affiliationData);
        }
        
        console.log('Successfully saved affiliations');
        toast.success("Affiliations saved successfully");
        onSave();
      } else {
        console.log('User affiliations table not found - demo mode');
        toast.success("Affiliations saved in demo mode");
        onSave();
      }
    } catch (error) {
      console.error('Unexpected error saving affiliations:', error);
      toast.error("An unexpected error occurred while saving affiliations");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-2">Affiliations</h2>
        <p className="text-sm text-muted-foreground">Please indicate any relevant affiliations or relationships.</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="stockExchangeOrFinra"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-border"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-foreground">
                      Stock Exchange or FINRA Member
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Are you associated with a stock exchange or FINRA member organization?
                    </p>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="publicCompany"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-border"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-foreground">
                      Public Company Affiliation
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Are you affiliated with a publicly traded company?
                    </p>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="usPoliticallyExposed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-border"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-foreground">
                      Politically Exposed Person (US)
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Are you a politically exposed person in the United States?
                    </p>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="awmEmployee"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-border"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-foreground">
                      Asset/Wealth Management Employee
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Are you an employee of an asset or wealth management company?
                    </p>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="custodian"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-border"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-foreground">
                      Custodian Affiliation
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Are you affiliated with a custodial institution?
                    </p>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="brokerDealer"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-border"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-foreground">
                      Broker-Dealer Affiliation
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Are you affiliated with a broker-dealer?
                    </p>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="familyBrokerDealer"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-border"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-foreground">
                      Family Member Broker-Dealer
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Is any family member affiliated with a broker-dealer?
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {isLoading ? "Saving..." : "Save Affiliations"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
