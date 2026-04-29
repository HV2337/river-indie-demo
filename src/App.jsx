import React from 'react';
import HeroSection from './components/HeroSection';
import DismantleSection from './components/DismantleSection';

function App() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-accent selection:text-white">
      <HeroSection />
      <DismantleSection />

      <footer className="pt-32 pb-12 flex flex-col items-center justify-center border-t border-white/5 bg-brand-bgSecondary relative z-20 px-6">
        <h2 className="text-3xl font-semibold tracking-tighter mb-2 text-brand-textMuted text-center">
          The SUV of Scooters.
        </h2>
        <p className="text-sm font-light text-brand-textMuted/50 mb-10">
          Reserve your River Indie today.
        </p>
        <button 
          onClick={() => alert("Thank you for your interest! Please note that this is a demo project created for fun, not a commercial website.")}
          className="bg-brand-text text-brand-bg hover:bg-brand-accent hover:text-white transition-colors duration-300 font-medium py-3 px-10 rounded-full mb-16 shadow-lg hover:shadow-brand-accent/30 tracking-wide text-sm"
        >
          Pre-order Now
        </button>
        <div className="w-full max-w-4xl border-t border-white/5 flex flex-col items-center pt-8 text-center space-y-4">
          <p className="text-[10px] sm:text-xs text-brand-textMuted/40 max-w-3xl leading-relaxed">
            <strong className="text-brand-textMuted/60">Credits & Disclaimer</strong>
            <br /><br />
            This is a non-commercial project created for educational and creative purposes. The official imagery of the River Indie was used as a reference for a generative pipeline involving Whisk and Google Veo 3. Videos were processed into frame-sequences via Ezgif. This platform was architected using Antigravity.
            <br /><br />
            Concept & Orchestration by Hareesh V.
          </p>
          <p className="text-[10px] sm:text-xs text-brand-textMuted/40">
            &copy; {new Date().getFullYear()} Hareesh V. All rights reserved. | Not affiliated with River Mobility Pvt. Ltd.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
