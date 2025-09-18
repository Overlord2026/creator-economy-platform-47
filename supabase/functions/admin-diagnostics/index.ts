import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const results = {
      environment: {},
      stripe: {},
      database: {},
      timestamp: new Date().toISOString()
    }

    // Environment Variables Check
    results.environment = {
      STRIPE_SECRET_KEY: !!Deno.env.get('STRIPE_SECRET_KEY'),
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: !!Deno.env.get('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
      STRIPE_WEBHOOK_SECRET: !!Deno.env.get('STRIPE_WEBHOOK_SECRET'),
      NEXT_PUBLIC_SUPABASE_URL: !!Deno.env.get('NEXT_PUBLIC_SUPABASE_URL'),
      SUPABASE_ANON_KEY: !!Deno.env.get('SUPABASE_ANON_KEY'),
    }

    // Stripe API Check
    try {
      const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
      if (stripeSecretKey) {
        const response = await fetch('https://api.stripe.com/v1/products?limit=1', {
          headers: {
            'Authorization': `Bearer ${stripeSecretKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        results.stripe.apiConnection = response.ok
        results.stripe.statusCode = response.status
      } else {
        results.stripe.apiConnection = false
        results.stripe.error = 'No Stripe secret key found'
      }
    } catch (error) {
      results.stripe.apiConnection = false
      results.stripe.error = 'Stripe API connection failed'
    }

    // Database Schema Check
    try {
      // Check if profiles table has stripe_customer_id column
      const { data: profilesCheck, error: profilesError } = await supabaseClient
        .from('profiles')
        .select('stripe_customer_id')
        .limit(1)
      
      results.database.profilesStripeColumn = !profilesError

      // Check for subscriptions or advisor_subscriptions table
      const { data: subsCheck, error: subsError } = await supabaseClient
        .from('advisor_subscriptions')
        .select('id')
        .limit(1)
      
      results.database.subscriptionsTable = !subsError

    } catch (error) {
      results.database.error = 'Database schema check failed'
    }

    return new Response(
      JSON.stringify(results),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})