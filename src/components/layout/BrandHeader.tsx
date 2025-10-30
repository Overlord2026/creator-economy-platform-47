import React from 'react';
import { Link } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { TopNav } from '@/components/layout/TopNav';
import RunNILDemo from '@/components/demos/RunNILDemo';
import { ChevronLeft, ChevronRight, Home, VolumeX, Volume2, TestTube } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAudio } from '@/context/AudioContext';
import { RUNTIME_REPO, RUNTIME_BRANCH } from "@/config/runtime";

const Logo = () => (
  <Link to="/" className="flex items-center gap-3">
    <img
      src="/brand/bfo-logo-gold.svg"
      alt="Boutique Family Office"
      width={140}
      height={28}
      className="h-7 w-auto"
    />
  </Link>
);

const NavigationButtons = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    window.history.go(-1);
  };

  const handleForward = () => {
    window.history.go(1);
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center gap-1 ml-4">
      <button
        onClick={handleBack}
        className="p-1.5 text-bfo-gold hover:text-white transition-colors rounded"
        aria-label="Go back"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={handleForward}
        className="p-1.5 text-bfo-gold hover:text-white transition-colors rounded"
        aria-label="Go forward"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <button
        onClick={handleHome}
        className="p-1.5 text-bfo-gold hover:text-white transition-colors rounded"
        aria-label="Go home"
      >
        <Home className="w-4 h-4" />
      </button>
    </div>
  );
};

const MuteLindaToggle = () => {
  const { isMuted, setIsMuted } = useAudio();

  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
        isMuted 
          ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
          : 'text-bfo-gold hover:text-white'
      }`}
      aria-label={isMuted ? 'Unmute Linda' : 'Mute Linda'}
    >
      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      <span className="hidden sm:inline">
        {isMuted ? 'Linda Muted' : 'Mute Linda'}
      </span>
    </button>
  );
};

function BrandHeader() {
  const appName = import.meta.env.VITE_APP_NAME || 'Family Office Marketplace';
  const isProd = import.meta.env.MODE === 'production';
  
  return (
    <header className="sticky top-0 z-50 bfo-header bfo-no-blur">
      {/* Non-prod header badge */}
      {!isProd && (
        <div className="pointer-events-none fixed right-3 top-2 z-50 rounded border px-2 py-0.5 text-xs opacity-60 bg-background/70 backdrop-blur">
          {appName} • {RUNTIME_REPO}@{RUNTIME_BRANCH}
        </div>
      )}
      
      <div className="mx-auto flex h-[56px] items-center gap-3 px-4">
        <Logo />
        <NavigationButtons />

        <nav className="ml-auto hidden md:flex items-center gap-6">
          <TopNav />
          <div className="border-l border-bfo-gold/30 pl-6 ml-6 flex items-center gap-6">
            <RunNILDemo />
            <Link to="/marketplace" className="text-white hover:text-bfo-gold transition-colors">Marketplace</Link>
            <Link to="/admin/hq" className="text-bfo-gold hover:underline">HQ</Link>
            <a className="text-white hover:text-bfo-gold transition-colors" href="/book">Book Demo</Link>
            <a className="text-white hover:text-bfo-gold transition-colors" href="/login">Log In</Link>
            <MuteLindaToggle />
            {process.env.NODE_ENV !== 'production' && (
              <Link to="/dev/try">
                <Badge variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500/10 transition-colors">
                  <TestTube className="w-3 h-3 mr-1" />
                  Dev / Try
                </Badge>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default BrandHeader;
export { BrandHeader };