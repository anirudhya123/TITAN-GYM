import React, { useState, useEffect } from 'react';
import { Dumbbell, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onJoinClick: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onJoinClick, onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Membership', id: 'membership' },
    { name: 'Dashboard Demo', id: 'dashboard' },
    { name: 'Trainers', id: 'trainers' },
    { name: 'Register Now', id: 'register' },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo - Bold Typography theme style */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleLinkClick('home')}>
            <div className="w-8 h-8 bg-gym-accent rounded-sm flex items-center justify-center shrink-0">
              <Dumbbell className="w-5 h-5 text-black rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black tracking-tighter text-xl uppercase italic text-white">
                TITAN<span className="text-gym-accent">GYM</span>
              </span>
              <span className="text-[9px] uppercase font-mono tracking-[0.2em] text-white/50 font-bold -mt-1.5">
                Forge Portal
              </span>
            </div>
          </div>

          {/* Desktop Navigation - Clean uppercase with accent focus */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-xs font-bold uppercase tracking-widest py-1 transition-all border-b-2 cursor-pointer ${
                    isActive
                      ? 'text-gym-accent border-gym-accent font-black'
                      : 'text-white/60 hover:text-white border-transparent hover:border-white/20'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* CTA Button - Bold high contrast, minimal block */}
          <div className="hidden md:block">
            <button
              id="nav-join-btn"
              onClick={onJoinClick}
              className="bg-white hover:bg-gym-accent text-black px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-all duration-300 transform active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              Join Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white/60 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 animate-in fade-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`block w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest border-l-4 ${
                    isActive
                      ? 'text-gym-accent bg-white/5 border-gym-accent font-black'
                      : 'text-white/60 hover:text-white border-transparent'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
            <div className="pt-4 px-4">
              <button
                id="mobile-nav-join-btn"
                onClick={() => {
                  setIsOpen(false);
                  onJoinClick();
                }}
                className="w-full bg-gym-accent text-black py-3.5 text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                Join Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

