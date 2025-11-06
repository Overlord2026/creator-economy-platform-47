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
    <Card className="w-full max-w-xl mx-auto bg-slate-900/60 backdrop-blur-2xl border-slate-700/30 shadow-2xl ring-1 ring-slate-700/20">
      <CardHeader className="text-center pb-6 pt-10">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-2xl flex items-center justify-center mx-auto mb-6 ring-1 ring-amber-400/20 shadow-lg shadow-amber-500/10">
          <Mail className="h-10 w-10 text-amber-400" />
        </div>
        <CardTitle className="text-3xl font-bold text-slate-50 mb-3">Verify Your Email</CardTitle>
        <CardDescription className="text-slate-400 text-base leading-relaxed max-w-md mx-auto">
          We'll send you important updates about your onboarding progress
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 px-10 pb-10">
        {!verificationSent ? (
          <>
            <div className="space-y-4">
              <Label htmlFor="email" className="text-slate-300 text-sm font-semibold">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={isVerifying}
                autoFocus
                className="bg-slate-950/80 border-slate-700/50 text-slate-100 placeholder:text-slate-600 focus:border-amber-500/50 focus:ring-amber-500/20 h-14 text-base px-5 rounded-lg transition-all"
                aria-describedby={error ? "email-error" : undefined}
              />
              {error && (
                <Alert variant="destructive" id="email-error" className="bg-red-950/30 border-red-900/40 text-red-300 rounded-lg">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleSendVerification}
                disabled={isVerifying || !email}
                className="flex-1 h-14 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold shadow-lg shadow-amber-600/30 transition-all duration-200 hover:scale-[1.02] rounded-lg"
              >
                {isVerifying && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {isVerifying ? 'Sending...' : 'Send Verification'}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSkip}
                className="bg-transparent border-slate-600/50 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 hover:border-slate-500/50 h-14 px-8 rounded-lg transition-all"
              >
                Skip
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-6 py-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500/10 to-emerald-600/5 rounded-2xl flex items-center justify-center mx-auto ring-1 ring-green-500/20 shadow-lg shadow-green-500/10">
              <CheckCircle2 className="h-10 w-10 text-green-400" />
            </div>
            <Alert className="bg-green-950/20 border-green-900/30 text-green-200 rounded-lg">
              <AlertDescription className="text-center text-base leading-relaxed">
                Verification email sent to <strong className="text-green-300 font-semibold">{email}</strong>
                <br />
                <span className="text-sm text-green-400/70 mt-2 inline-block">Check your inbox and click the link</span>
              </AlertDescription>
            </Alert>
            <div className="flex items-center justify-center gap-3 text-sm text-slate-400">
              <div className="h-2.5 w-2.5 bg-amber-500 rounded-full animate-pulse" />
              <span>Waiting for verification...</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
