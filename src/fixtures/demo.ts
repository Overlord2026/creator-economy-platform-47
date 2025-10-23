export async function loadInvestorDemoFixtures() {
  const { supabase } = await import('@/integrations/supabase/client');

  // Families summary cards
  try {
    await supabase.from('meeting_notes').upsert([
      { 
        org_id: '00000000-0000-0000-0000-000000000001',
        title: 'Family Planning Meeting',
        content: 'Retirement income plan priorities: SS at 67, Roth conversion corridor, HSA funding.',
        meeting_date: new Date().toISOString(),
        attendees: ['family', 'advisor'],
        tags: ['retirement', 'planning']
      },
      {
        org_id: '00000000-0000-0000-0000-000000000001', 
        title: 'Portfolio Review',
        content: 'Client portfolio review scheduled: diversification analysis, risk tolerance adjustment.',
        meeting_date: new Date().toISOString(),
        attendees: ['advisor', 'client'],
        tags: ['portfolio', 'review']
      }
    ]);
  } catch (error) {
    console.log('Meeting notes table not available:', error);
  }

  // Insurance intake sample (if you use insurance_submissions)
  try {
    await supabase.from('insurance_submissions').upsert([
      { 
        id: 'demo-home',
        org_id: '00000000-0000-0000-0000-000000000001',
        risk_hash: 'demo-risk-hash-123',
        intake: { 
          type: 'home',
          applicant: { zip_code:'33139', name: 'Demo Family' }, 
          coverage_limits: { dwelling: 500000, personal_property: 250000 }, 
          deductibles: { all_other_perils: 2500 }
        }
      }
    ]);
  } catch (error) {
    console.log('Insurance submissions table not available:', error);
  }

  // Demo investment offerings for catalog
  try {
    await supabase.from('investment_offerings').upsert([
      {
        id: 'demo-growth-fund',
        org_id: '00000000-0000-0000-0000-000000000001',
        name: 'Growth Opportunities Fund',
        description: 'Diversified growth strategy focused on emerging markets and technology sectors.',
        firm: 'Demo Capital Partners',
        minimum_investment: '$50,000',
        performance: '12.5% annualized',
        category_id: 'private-equity',
        featured: true
      }
    ]);
  } catch (error) {
    console.log('Investment offerings table not available:', error);
  }

  console.log('Demo fixtures loaded successfully');
}