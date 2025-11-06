import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, CheckCircle2 } from 'lucide-react';
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
  const [verificationSent, setVerificationSent] = useState(false);
  const [error, setError] = useState('');

  const handleSendVerification = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // Simulate verification email send
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setVerificationSent(true);
      
      analytics.trackEvent('onboarding.step_started', {
        step: 'email_verify',
        persona,
        segment,
        email_domain: email.split('@')[1]
      });

      // Auto-complete for demo (in real app, wait for email click)
      setTimeout(() => {
        onComplete({ email, verified: true });
        analytics.trackEvent('onboarding.step_completed', {
          step: 'email_verify',
          persona,
          segment
        });
      }, 2000);
      
    } catch (err) {
      setError('Failed to send verification email. Please try again.');
    } finally {
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
    <Card className="w-full max-w-md mx-auto bg-slate-800/40 backdrop-blur-xl border-slate-700/50 shadow-2xl">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 ring-2 ring-blue-500/30">
          <Mail className="h-8 w-8 text-blue-400" />
        </div>
        <CardTitle className="text-2xl text-slate-100">Verify Your Email</CardTitle>
        <CardDescription className="text-slate-300 text-base">
          We'll send you important updates about your onboarding progress
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 pt-2">
        {!verificationSent ? (
          <>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-slate-200 text-sm font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={isVerifying}
                autoFocus
                className="bg-slate-900/50 border-slate-600/50 text-slate-100 placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/30 h-12 text-base"
                aria-describedby={error ? "email-error" : undefined}
              />
              {error && (
                <Alert variant="destructive" id="email-error" className="bg-red-950/50 border-red-900/50 text-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleSendVerification}
                disabled={isVerifying || !email}
                className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-600/30 transition-all duration-200"
              >
                {isVerifying && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {isVerifying ? 'Sending...' : 'Send Verification'}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSkip}
                className="bg-slate-700/30 border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-slate-100 h-12 px-6"
              >
                Skip
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-full flex items-center justify-center mx-auto ring-2 ring-green-500/30">
              <CheckCircle2 className="h-8 w-8 text-green-400" />
            </div>
            <Alert className="bg-green-950/30 border-green-900/50 text-green-200">
              <AlertDescription className="text-center text-base">
                Verification email sent to <strong className="text-green-300">{email}</strong>
                <br />
                <span className="text-sm text-green-300/80">Check your inbox and click the link</span>
              </AlertDescription>
            </Alert>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
              <span>Waiting for verification...</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
