import React from 'react';
import { Dumbbell, Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="bg-gym-accent text-black p-2 flex items-center justify-center">
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="font-display font-black tracking-tighter text-lg uppercase italic">
                TITAN<span className="text-gym-accent">GYM</span>
              </span>
            </div>
            <p className="text-white/60 text-xs leading-relaxed font-sans">
              Titan Gym is an elite strength, HIIT, and athletic recovery facility built for high performance. Stop guessing, start measuring, and dominate your physical potential.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a href="#instagram" className="text-white/40 hover:text-gym-accent transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="text-white/40 hover:text-gym-accent transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#youtube" className="text-white/40 hover:text-gym-accent transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Hours of Operation */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-xs text-white uppercase tracking-[0.2em] italic">
              Hours of Operation
            </h4>
            <ul className="space-y-2 text-xs text-white/50 font-mono">
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>Monday - Friday</span>
                <span className="text-gym-accent font-black">24 Hours Open</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>Saturday</span>
                <span>06:00 AM - 08:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>Sunday</span>
                <span>08:00 AM - 06:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Kids Zone Hours</span>
                <span>08:00 AM - 12:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-xs text-white uppercase tracking-[0.2em] italic">
              Club Location
            </h4>
            <ul className="space-y-3 text-xs text-white/60 font-sans">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gym-accent shrink-0 mt-0.5" />
                <span>
                  1500 Titanium Parkway, Suite 100<br />
                  Metro Center, NY 10018
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gym-accent shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gym-accent shrink-0" />
                <span>membership@titangym.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation links */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-xs text-white uppercase tracking-[0.2em] italic">
              Quick Portals
            </h4>
            <ul className="space-y-2 text-xs text-white/50 font-mono">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-gym-accent transition-colors text-left cursor-pointer uppercase tracking-wider">
                  &gt; Home Banner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('membership')} className="hover:text-gym-accent transition-colors text-left cursor-pointer uppercase tracking-wider">
                  &gt; Membership Tiers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-gym-accent transition-colors text-left cursor-pointer uppercase tracking-wider">
                  &gt; Sandbox Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trainers')} className="hover:text-gym-accent transition-colors text-left cursor-pointer uppercase tracking-wider">
                  &gt; Trainer Profiles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('register')} className="hover:text-gym-accent transition-colors text-left cursor-pointer uppercase tracking-wider">
                  &gt; New Member Form
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40 font-mono">
          <p>© {currentYear} Titan Gym Management System. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
