
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/client-dashboard');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
              display_name: `${firstName} ${lastName}`,
            }
          }
        });

        if (error) {
          if (error.message.includes('User already registered')) {
            toast.error('An account with this email already exists. Please sign in instead.');
          } else {
            toast.error(error.message);
          }
        } else if (data.user) {
          toast.success('Account created successfully! You are now logged in.');
          navigate('/client-dashboard');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password. Please check your credentials.');
          } else {
            toast.error(error.message);
          }
        } else if (data.user) {
          toast.success('Logged in successfully!');
          navigate('/client-dashboard');
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/client-dashboard`
        }
      });

      if (error) {
        toast.error('Failed to sign in with Google. Please try again.');
        console.error('Google auth error:', error);
      }
    } catch (error) {
      toast.error('An unexpected error occurred with Google sign-in.');
      console.error('Google auth error:', error);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full flex justify-center items-center py-4 border-b border-gray-200 bg-[#1B1B32] sticky top-0 z-50">
        <div className="flex justify-center items-center">
          <img 
            src="/lovable-uploads/3346c76f-f91c-4791-b77d-adb2f34a06af.png" 
            alt="Boutique Family Office Logo" 
            className="h-16 w-auto"
          />
        </div>
      </header>
      
      <div className="flex-1 flex justify-center items-center p-4 bg-white">
        <Card className="p-8 w-full max-w-md bg-[#1B1B32] border border-gray-200 shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white">
              {isSignUp ? "Create Account" : "Sign In"}
            </h1>
            <p className="text-gray-300 mt-2">
              {isSignUp 
                ? "Join our family office platform" 
                : "Access your personalized financial dashboard"}
            </p>
          </div>

          {/* Google Sign In Button */}
          <div className="mb-6">
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white text-[#1B1B32] border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2"
              onClick={handleGoogleAuth}
              disabled={googleLoading}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {googleLoading ? "Signing in..." : `Continue with Google`}
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#1B1B32] px-2 text-gray-400">Or continue with email</span>
            </div>
          </div>
          
          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">First Name</Label>
                  <Input 
                    id="firstName" 
                    type="text" 
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-white focus:ring-white"
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">Last Name</Label>
                  <Input 
                    id="lastName" 
                    type="text" 
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-white focus:ring-white"
                    required 
                  />
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-white focus:ring-white"
                autoComplete="email" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-white focus:ring-white"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required 
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-white text-[#1B1B32] hover:bg-gray-100 font-medium"
              disabled={loading}
            >
              {loading ? "Loading..." : (isSignUp ? "Create Account" : "Sign In")}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-300">
            <p>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-white hover:underline font-medium"
              >
                {isSignUp ? "Sign in" : "Create account"}
              </button>
            </p>
          </div>
        </Card>
      </div>
      
      <footer className="py-6 px-4 bg-[#1B1B32] text-white text-center">
        <p>&copy; {new Date().getFullYear()} Boutique Family Office. All rights reserved.</p>
      </footer>
    </div>
  );
}
