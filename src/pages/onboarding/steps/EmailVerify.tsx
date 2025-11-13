import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface EmailVerifyProps {
  onComplete: (data: { email: string; verified: boolean }) => void;
  persona: string;
  segment: string;
  initialData?: { email?: string; verified?: boolean };
}

export const EmailVerify: React.FC<EmailVerifyProps> = ({
  onComplete,
  persona,
  segment,
  initialData
}) => {
  const [email, setEmail] = useState(initialData?.email || '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      analytics.trackEvent('onboarding.step_started', {
        step: 'email_verify',
        persona,
        segment,
        email_domain: email.split('@')[1]
      });

      // Complete immediately - no fake waiting
      onComplete({ email, verified: true });

      analytics.trackEvent('onboarding.step_completed', {
        step: 'email_verify',
        persona,
        segment
      });
    } catch (err) {
      setError('Failed to save email. Please try again.');
    } finally {
      // Always reset loading state, even on success
      setIsVerifying(false);
    }
  };

  const handleSkip = () => {
    onComplete({ email, verified: false });
    analytics.trackEvent('onboarding.step_completed', {
      step: 'email_verify',
      persona,
      segment,
      skipped: true
    });
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl border-0">
      <CardHeader className="text-center pb-8 pt-12">
        <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#C4A027] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Mail className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold text-gray-900">Enter Your Email</CardTitle>
        <CardDescription className="text-base text-gray-600 mt-2">
          Provide your email to save your progress and receive updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pb-12 px-12">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isVerifying && email && handleContinue()}
            placeholder="your@email.com"
            disabled={isVerifying}
            autoFocus
            className="h-12 text-base border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
            aria-describedby={error ? "email-error" : undefined}
          />
          {error && (
            <Alert variant="destructive" id="email-error">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleContinue}
            disabled={isVerifying || !email}
            className="flex-1 h-12 text-base bg-[#D4AF37] hover:bg-[#C4A027] text-black font-semibold hover:scale-[1.02] transition-transform"
          >
            {isVerifying && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            Continue
          </Button>
          <Button variant="ghost" onClick={handleSkip} className="px-6 text-gray-600 hover:text-gray-900 h-12">
            Skip
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};