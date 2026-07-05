import React from 'react';
import { Check, Flame, Trophy, Crown, Sparkles } from 'lucide-react';
import { MembershipPlan } from '../types';

interface MembershipPlansProps {
  plans: MembershipPlan[];
  onSelectPlan: (planId: string) => void;
}

export default function MembershipPlans({ plans, onSelectPlan }: MembershipPlansProps) {
  return (
    <section id="membership" className="py-24 bg-transparent border-t border-white/5 relative">
      <div className="absolute inset-0 bg-radial-gradient from-gym-accent/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-gym-accent/10 border border-gym-accent/30 text-gym-accent px-4 py-1 text-xs font-mono font-bold uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5" />
            Uncompromising Value
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tighter uppercase italic leading-[1.0]">
            INVEST IN YOUR PERFORMANCE
          </h2>
          <p className="text-white/60 font-sans text-sm sm:text-base max-w-xl mx-auto">
            Choose a level of access that coordinates with your personal fitness trajectory. No hidden fees, clear digital terms, and premium support all the way.
          </p>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isPremium = plan.tier === 'premium';
            const isElite = plan.tier === 'elite';

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col p-8 transition-all duration-300 transform hover:scale-[1.02] glass-card ${
                  isPremium 
                    ? 'border-gym-accent/40 bg-white/[0.04] shadow-xl shadow-gym-accent/5' 
                    : 'border-white/10'
                }`}
              >
                {/* Popular Ribbon / Elite Badge */}
                {isPremium && (
                  <div className="absolute -top-3 right-6 bg-gym-accent text-black text-[10px] font-mono font-black tracking-widest uppercase px-3 py-1 flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-black" />
                    Most Popular
                  </div>
                )}
                {isElite && (
                  <div className="absolute -top-3 right-6 bg-white text-black text-[10px] font-mono font-black tracking-widest uppercase px-3 py-1 flex items-center gap-1">
                    <Crown className="w-3 h-3 fill-black" />
                    Ultra Elite
                  </div>
                )}

                {/* Plan Tier Name & Icon */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs uppercase font-mono tracking-widest text-gym-accent font-black">
                      {plan.tier} Tier
                    </span>
                    {isElite && <Sparkles className="w-4 h-4 text-gym-accent" />}
                  </div>
                  <h3 className="font-display font-black text-2xl tracking-tight text-white uppercase italic">
                    {plan.name}
                  </h3>
                </div>

                {/* Pricing Block */}
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-display font-black tracking-tighter text-white">
                    {plan.price}
                  </span>
                  <span className="text-sm text-white/40">
                    / {plan.period}
                  </span>
                </div>

                {/* Divider */}
                <hr className="border-t mb-8 border-white/10" />

                {/* Key Benefits */}
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <div className="shrink-0 mt-0.5">
                        <Check
                          className={`w-4 h-4 ${
                            isPremium || isElite ? 'text-gym-accent' : 'text-white'
                          }`}
                        />
                      </div>
                      <span className="text-white/70">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Action Call - High contrast buttons */}
                <button
                  id={`select-plan-${plan.tier}`}
                  onClick={() => onSelectPlan(plan.id)}
                  className={`w-full py-3.5 text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    isPremium
                      ? 'bg-gym-accent text-black hover:bg-gym-accent-hover shadow-lg shadow-gym-accent/15'
                      : isElite
                      ? 'bg-white text-black hover:bg-white/90'
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  Select {plan.name}
                </button>
              </div>
            );
          })}
        </div>

        {/* Note on flexibility */}
        <div className="mt-12 text-center">
          <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest">
            * Memberships can be frozen for up to 60 days per calendar year. No binding contracts, cancel anytime.
          </p>
        </div>

      </div>
    </section>
  );
}

