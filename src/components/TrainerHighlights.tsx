import React from 'react';
import { Award, Star, Clock, Users, ShieldCheck } from 'lucide-react';
import { Trainer } from '../types';

interface TrainerHighlightsProps {
  trainers: Trainer[];
}

export default function TrainerHighlights({ trainers }: TrainerHighlightsProps) {
  return (
    <section id="trainers" className="py-24 bg-transparent border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-gym-accent/10 border border-gym-accent/35 text-gym-accent px-3 py-1 text-xs font-mono font-black uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 animate-pulse" />
            Coaching Excellence
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tighter uppercase italic text-glow">
            MEET THE ELITE TITAN COACHING TEAM
          </h2>
          <p className="text-white/60 font-sans text-sm">
            Our trainers are not just instructors — they are certified specialists, former competitive powerlifters, and mobility experts dedicated to engineering your success.
          </p>
        </div>

        {/* Trainer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="glass-card shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group p-0"
            >
              {/* Image Container with Hover zoom */}
              <div className="relative aspect-[4/5] overflow-hidden bg-black/40">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Experience Badge */}
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white border border-white/10 px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gym-accent" />
                  {trainer.experience} EXP
                </div>

                {/* Star rating overlay */}
                <div className="absolute top-4 right-4 bg-gym-accent text-black px-2.5 py-1 text-xs font-black font-mono flex items-center gap-1 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-black text-black" />
                  {trainer.rating.toFixed(1)}
                </div>
              </div>

              {/* Text / Bio details */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[9px] font-mono tracking-[0.15em] text-gym-accent uppercase font-black">
                    {trainer.specialty}
                  </span>
                  <h3 className="font-display font-black text-lg text-white group-hover:text-gym-accent transition-colors uppercase italic">
                    {trainer.name}
                  </h3>
                  <p className="text-white/60 text-xs font-sans leading-relaxed italic">
                    "{trainer.bio}"
                  </p>
                </div>

                {/* Micro stats footer */}
                <div className="border-t border-white/10 pt-4 space-y-2 text-[10px] text-white/40 font-mono uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-white/30 shrink-0" />
                    <span>{trainer.assignedMembersCount} Direct Clients</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                    <span className="leading-normal">{trainer.schedule[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Free consultation call-out */}
        <div className="mt-16 bg-white/[0.01] border border-gym-accent/20 glass-card p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-left">
            <h3 className="font-display font-black text-xl text-white uppercase italic tracking-wider">Not sure which coach fits your style?</h3>
            <p className="text-white/60 text-sm">
              All plans include 1 complimentary physical assessment with the coach of your choice. We analyze barbell mechanics, metabolic conditioning, and postural mobility.
            </p>
          </div>
          <button
            onClick={() => {
              const element = document.getElementById('register');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gym-accent hover:bg-gym-accent-hover text-black px-6 py-3.5 font-black text-xs uppercase tracking-widest whitespace-nowrap cursor-pointer transition-all duration-200"
          >
            Claim Free Assessment
          </button>
        </div>

      </div>
    </section>
  );
}
