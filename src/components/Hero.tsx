import React from 'react';
import { Play, ShieldCheck, ArrowRight, Zap, Award, Calendar } from 'lucide-react';

interface HeroProps {
  onExplorePlans: () => void;
  onExploreDemo: () => void;
}

export default function Hero({ onExplorePlans, onExploreDemo }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-transparent text-white"
    >
      {/* Visual Background with high contrast dark overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200"
          alt="Premium Gym Interior"
          className="w-full h-full object-cover opacity-15 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main motivational copy - Extreme bold uppercase italic display */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-gym-accent/10 border border-gym-accent/30 text-gym-accent px-4 py-1.5 text-xs font-mono uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5 fill-gym-accent" />
              Day 2 Live Demo: Forge & Dominate
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl tracking-tighter leading-[0.95] text-white uppercase italic">
              TRAIN LIKE A TITAN. <br />
              <span className="text-gym-accent text-glow">
                EXCEED EVERY LIMIT.
              </span>
            </h1>

            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-sans leading-relaxed tracking-wide">
              Welcome to the Titan Gym Portal. Elevate your training with premium facilities, elite strength coaches, and a fully transparent digital management system. Watch your progress compound in real time.
            </p>

            {/* CTAs - Zero border radius block style */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                id="hero-explore-plans-btn"
                onClick={onExplorePlans}
                className="w-full sm:w-auto bg-gym-accent hover:bg-gym-accent-hover text-black px-8 py-4 text-xs font-black uppercase tracking-widest transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gym-accent/20"
              >
                Choose Membership
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-dashboard-btn"
                onClick={onExploreDemo}
                className="w-full sm:w-auto bg-transparent hover:bg-white/5 text-white border-2 border-white px-8 py-4 text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                Explore Demo Dashboard
                <Play className="w-4 h-4 fill-white text-white" />
              </button>
            </div>

            {/* Quick trust highlights with high-contrast indicator */}
            <div className="grid grid-cols-3 gap-4 pt-4 max-w-md mx-auto lg:mx-0 font-mono text-xs uppercase tracking-widest">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-gym-accent shrink-0" />
                <span className="text-white/50 font-bold">No Signup Fees</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Award className="w-4 h-4 text-gym-accent shrink-0" />
                <span className="text-white/50 font-bold">Elite Coaches</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Calendar className="w-4 h-4 text-gym-accent shrink-0" />
                <span className="text-white/50 font-bold">Flexible Hours</span>
              </div>
            </div>
          </div>

          {/* Graphical element: Portal Quick Features preview styled like high-contrast glass panel */}
          <div className="lg:col-span-5 relative mt-10 lg:mt-0">
            <div className="relative glass-card border border-white/15 p-6 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gym-accent/5 rounded-full blur-2xl"></div>
              
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gym-accent"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                </div>
                <span className="text-[10px] font-mono text-gym-accent uppercase tracking-widest font-black">Live Sandbox Actions</span>
              </div>

              <div className="space-y-4">
                {/* Visual mock card 1 */}
                <div className="bg-white/[0.02] p-4 border border-white/10 flex items-center justify-between hover:border-gym-accent/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gym-accent/10 border border-gym-accent/30 flex items-center justify-center text-gym-accent font-mono font-black text-xs">01</div>
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-widest text-white">Select Your Tier</h4>
                      <p className="text-xs text-white/50 font-sans mt-0.5">Choose Basic, Premium, or Elite</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gym-accent font-mono uppercase tracking-widest font-bold">Free Trial</span>
                </div>

                {/* Visual mock card 2 */}
                <div className="bg-white/[0.02] p-4 border border-white/10 flex items-center justify-between hover:border-gym-accent/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gym-accent/10 border border-gym-accent/30 flex items-center justify-center text-gym-accent font-mono font-black text-xs">02</div>
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-widest text-white">Enroll via Custom Form</h4>
                      <p className="text-xs text-white/50 font-sans mt-0.5">Fill details & set ideal schedule</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gym-accent font-mono uppercase tracking-widest font-bold">No Card</span>
                </div>

                {/* Visual mock card 3 */}
                <div className="bg-white/[0.02] p-4 border border-white/10 flex items-center justify-between hover:border-gym-accent/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gym-accent/10 border border-gym-accent/30 flex items-center justify-center text-gym-accent font-mono font-black text-xs">03</div>
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-widest text-white">Check Live Dashboard</h4>
                      <p className="text-xs text-white/50 font-sans mt-0.5">Watch your registration appear live</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gym-accent font-mono uppercase tracking-widest font-bold">Reactive</span>
                </div>
              </div>

              {/* Decorative active indicator */}
              <div className="mt-6 flex items-center justify-center gap-2 bg-black/60 p-3 border border-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gym-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gym-accent"></span>
                </span>
                <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest font-bold">Class Sandbox Active & Live</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

