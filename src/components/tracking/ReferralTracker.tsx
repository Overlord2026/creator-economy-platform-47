import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { tableExists, safeQueryOptionalTable, safeUpdate } from '@/lib/db/safeSupabase';

const ReferralTracker: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleReferralTracking = async () => {
      const referralCode = searchParams.get('ref');
      
      if (referralCode) {
        try {
          // Check if referrals table exists
          const hasReferrals = await tableExists('referrals');
          if (!hasReferrals) {
            console.log('Referrals table not found - demo mode');
            // Still clean up URL
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.delete('ref');
            const newUrl = `${window.location.pathname}${newSearchParams.toString() ? '?' + newSearchParams.toString() : ''}`;
            navigate(newUrl, { replace: true });
            return;
          }

          // Store referral code for later processing
          localStorage.setItem('pending_referral_code', referralCode);
          
          // Remove the referral parameter from URL
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.delete('ref');
          const newUrl = `${window.location.pathname}${newSearchParams.toString() ? '?' + newSearchParams.toString() : ''}`;
          navigate(newUrl, { replace: true });
          
        } catch (error) {
          console.error('Error processing referral:', error);
        }
      }
    };

    handleReferralTracking();
  }, [searchParams, navigate]);

  // Check for pending referral after login
  useEffect(() => {
    const processPendingReferral = async () => {
      const pendingReferralCode = localStorage.getItem('pending_referral_code');
      
      if (pendingReferralCode) {
        try {
          const hasReferrals = await tableExists('referrals');
          if (!hasReferrals) {
            localStorage.removeItem('pending_referral_code');
            return;
          }

          // Would update referral status if table existed
          const updateResult = await safeUpdate('referrals', 
            { 
              status: 'activated',
              activated_at: new Date().toISOString()
            },
            { referral_code: pendingReferralCode }
          );
          
          if (updateResult.ok) {
            console.log('Referral activated successfully');
          }
          
          // Clean up
          localStorage.removeItem('pending_referral_code');
        } catch (error) {
          console.error('Error processing pending referral:', error);
        }
      }
    };

    // Process pending referrals on auth state change
    processPendingReferral();
  }, []);

  return null; // This component doesn't render anything
};

export default ReferralTracker;