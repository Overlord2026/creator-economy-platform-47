
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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { tableExists, safeQueryOptionalTable, safeInsertOptionalTable, safeUpdate } from '@/lib/db/safeSupabase';
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const contactSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  address1: z.string().min(1, { message: "Address is required." }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(1, { message: "State is required." }),
  zipCode: z.string().min(5, { message: "Zip code must be at least 5 digits." }),
});

export function ContactInfoForm({ onSave }: { onSave: () => void }) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  React.useEffect(() => {
    const loadExistingData = async () => {
      if (!user) return;
      
      const hasContactInfo = await tableExists('user_contact_info');
      let data: any = null;
      let error = null;
      
      if (hasContactInfo) {
        const result = await safeQueryOptionalTable('user_contact_info', '*');
        if (result.ok && result.data) {
          data = result.data.find((c: any) => c.user_id === user.id);
        } else {
          error = result.error;
        }
      }
        
      if (data && !error) {
        form.reset({
          email: data.email || "",
          phone: data.phone || "",
          address1: data.address1 || "",
          address2: data.address2 || "",
          city: data.city || "",
          state: data.state || "",
          zipCode: data.zip_code || "",
        });
      }
    };
    
    loadExistingData();
  }, [user, form]);

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    if (!user) {
      toast.error("User not authenticated");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // First, check if a record exists
      const hasContactInfo = await tableExists('user_contact_info');
      let existingData: any = null;
      
      if (hasContactInfo) {
        const result = await safeQueryOptionalTable('user_contact_info', '*');
        if (result.ok && result.data) {
          existingData = result.data.find((c: any) => c.user_id === user.id);
        }
      }

      const contactData = {
        user_id: user.id,
        email: values.email,
        phone: values.phone,
        address1: values.address1,
        address2: values.address2,
        city: values.city,
        state: values.state,
        zip_code: values.zipCode,
        updated_at: new Date().toISOString(),
      };

      let error;

      if (existingData) {
        // Update existing record
        const result = await safeUpdate('user_contact_info', contactData, { user_id: user.id });
        if (!result.ok) {
          error = new Error(result.error);
        }
      } else {
        // Insert new record
        const result = await safeInsertOptionalTable('user_contact_info', contactData);
        if (!result.ok) {
          error = new Error(result.error);
        }
      }

      if (error) {
        console.error("Database operation error:", error);
        toast.error("Failed to save contact information");
      } else {
        toast.success("Contact information saved successfully");
        onSave();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">Contact Information</h2>
        <p className="text-sm text-gray-400">Update your contact details below.</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Email address" 
                      {...field} 
                      className="bg-transparent border-gray-700 text-white focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Phone</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Phone number" 
                      {...field} 
                      className="bg-transparent border-gray-700 text-white focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Address Line 1</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Street address" 
                      {...field} 
                      className="bg-transparent border-gray-700 text-white focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Address Line 2 (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Apt, suite, unit, etc." 
                      {...field} 
                      className="bg-transparent border-gray-700 text-white focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">City</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="City" 
                      {...field} 
                      className="bg-transparent border-gray-700 text-white focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">State</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-transparent border-gray-700 text-white">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#0F0F2D] border-gray-700 text-white">
                      <SelectItem value="AL">Alabama</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Zip Code</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Zip code" 
                      {...field} 
                      className="bg-transparent border-gray-700 text-white focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {isSubmitting ? "Saving..." : "Save Contact Information"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
