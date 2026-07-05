import React, { useState, useEffect } from 'react';
import { UserPlus, Sparkles, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { MembershipPlan } from '../types';

interface RegistrationFormProps {
  plans: MembershipPlan[];
  selectedPlanId: string;
  onRegisterMember: (memberData: {
    name: string;
    email: string;
    phone: string;
    age: number;
    gender: string;
    planId: string;
    preferredTime: string;
    fitnessGoal: string;
  }) => Promise<string>; // returns Promise of generated memberId
}

export default function RegistrationForm({ plans, selectedPlanId, onRegisterMember }: RegistrationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [planId, setPlanId] = useState(selectedPlanId);
  const [preferredTime, setPreferredTime] = useState('06:00 - 08:00');
  const [fitnessGoal, setFitnessGoal] = useState('');
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ id: string; name: string } | null>(null);

  // Sync with prop if user selects from plan cards
  useEffect(() => {
    if (selectedPlanId) {
      setPlanId(selectedPlanId);
    }
  }, [selectedPlanId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError('');
    setSuccessInfo(null);

    // simple validations
    if (!name.trim()) return setError('Please enter your full name');
    if (!email.trim() || !email.includes('@')) return setError('Please enter a valid email address');
    if (!phone.trim()) return setError('Please enter your telephone number');
    
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 14 || ageNum > 90) {
      return setError('Members must be between 14 and 90 years old.');
    }

    if (!fitnessGoal.trim()) return setError('Please describe your main fitness goal');

    setIsSubmitting(true);

    try {
      // Callback to save state and Firestore
      const generatedId = await onRegisterMember({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        age: ageNum,
        gender,
        planId,
        preferredTime,
        fitnessGoal: fitnessGoal.trim(),
      });

      setSuccessInfo({ id: generatedId, name: name.trim() });

      // reset fields
      setName('');
      setEmail('');
      setPhone('');
      setAge('');
      setFitnessGoal('');
    } catch (err: any) {
      setError(err.message || 'Saving failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="py-24 bg-transparent relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-gym-accent/10 border border-gym-accent/35 text-gym-accent px-3 py-1 text-xs font-mono font-black uppercase tracking-widest">
            <UserPlus className="w-3.5 h-3.5 animate-pulse" />
            Instant Digital Gatepass
          </div>
          <h2 className="font-display font-black text-3xl sm:text-6xl text-white tracking-tighter uppercase italic text-glow">
            START YOUR REVOLUTION TODAY
          </h2>
          <p className="text-white/60 font-sans text-sm max-w-xl mx-auto leading-relaxed">
            Fill out the official registration sheet. Submission is live and immediately allocates your training schedule on our digital records system.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-card p-6 sm:p-10 relative overflow-hidden">
          
          {/* Decorative backdrop accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gym-accent/5 rounded-full blur-2xl"></div>

          {/* SUCCESS BANNER */}
          {successInfo ? (
            <div className="space-y-6 text-center py-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-gym-accent/10 border border-gym-accent/45 text-gym-accent flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-black text-2xl tracking-tight text-white uppercase italic">ENROLLMENT CONFIRMED</h3>
                <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed">
                  Congratulations, <strong className="text-white font-bold">{successInfo.name}</strong>! You have been successfully allocated to our live gym system database.
                </p>
              </div>

              {/* Digital Card Mock */}
              <div className="glass-card text-white p-6 max-w-sm mx-auto border-gym-accent/30">
                <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                  <span className="text-[9px] font-mono tracking-widest text-white/40 font-black uppercase">MEMBER ACCESS CARD</span>
                  <span className="text-[9px] bg-gym-accent text-black px-2 py-0.5 font-mono font-black uppercase">ACTIVE</span>
                </div>
                <div className="text-left space-y-2">
                  <p className="text-xs text-gym-accent font-mono">ID: {successInfo.id}</p>
                  <p className="font-display font-black text-lg text-white uppercase tracking-wider">{successInfo.name}</p>
                  <div className="flex justify-between items-center pt-2 border-t border-white/5 mt-2">
                    <span className="text-[10px] uppercase font-mono text-white/40 tracking-wider">Tier Selected</span>
                    <span className="text-xs font-mono font-black text-white">{plans.find(p => p.id === planId)?.name || 'Premium'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <p className="text-xs text-white/40 font-mono uppercase tracking-widest">
                  * Check the <strong>Dashboard Demo</strong> above to inspect your live registration and digital QR Gatepass.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      setSuccessInfo(null);
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest px-6 py-3.5 text-xs transition-colors cursor-pointer border border-white/15"
                  >
                    Enroll Another Member
                  </button>
                  <button
                    onClick={() => {
                      const element = document.getElementById('dashboard');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="bg-gym-accent hover:bg-gym-accent-hover text-black font-black uppercase tracking-widest px-6 py-3.5 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    View in Dashboard Demo
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Error feedback banner */}
              {error && (
                <div className="bg-red-500/10 text-red-400 p-4 border border-red-500/20 flex items-center gap-2 text-xs font-mono uppercase tracking-wider animate-in shake duration-150">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono font-black uppercase tracking-widest text-white/60 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-black/50 border border-white/10 px-4 py-3.5 text-xs text-white font-mono uppercase tracking-wider focus:outline-none focus:border-gym-accent transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono font-black uppercase tracking-widest text-white/60 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. john@example.com"
                    className="w-full bg-black/50 border border-white/10 px-4 py-3.5 text-xs text-white font-mono uppercase tracking-wider focus:outline-none focus:border-gym-accent transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-mono font-black uppercase tracking-widest text-white/60 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 555-0199"
                    className="w-full bg-black/50 border border-white/10 px-4 py-3.5 text-xs text-white font-mono uppercase tracking-wider focus:outline-none focus:border-gym-accent transition-colors"
                  />
                </div>

                {/* Age & Gender Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-black uppercase tracking-widest text-white/60 mb-2">
                      Age (14+)
                    </label>
                    <input
                      type="number"
                      required
                      min={14}
                      max={90}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g. 26"
                      className="w-full bg-black/50 border border-white/10 px-4 py-3.5 text-xs text-white font-mono uppercase tracking-wider focus:outline-none focus:border-gym-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-black uppercase tracking-widest text-white/60 mb-2">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 px-4 py-3.5 text-xs text-white font-mono uppercase tracking-wider focus:outline-none focus:border-gym-accent transition-colors"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-Binary">Non-Binary</option>
                    </select>
                  </div>
                </div>

                {/* Membership Plan Tier Dropdown */}
                <div>
                  <label className="block text-xs font-mono font-black uppercase tracking-widest text-gym-accent mb-2">
                    Selected Membership Path
                  </label>
                  <select
                    value={planId}
                    onChange={(e) => setPlanId(e.target.value)}
                    className="w-full bg-black border border-gym-accent/40 px-4 py-3.5 text-xs text-gym-accent font-mono font-black uppercase tracking-wider focus:outline-none focus:border-gym-accent transition-colors"
                  >
                    {plans.map((plan) => (
                      <option key={plan.id} value={plan.id} className="text-white bg-black">
                        {plan.name.toUpperCase()} — {plan.price}/{plan.period.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Workout Time Block */}
                <div>
                  <label className="block text-xs font-mono font-black uppercase tracking-widest text-white/60 mb-2">
                    Preferred Attendance Block
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 px-4 py-3.5 text-xs text-white font-mono uppercase tracking-wider focus:outline-none focus:border-gym-accent transition-colors"
                  >
                    <option value="06:00 - 08:00">Early Dawn (06:00 - 08:00)</option>
                    <option value="08:00 - 10:00">Morning Shift (08:00 - 10:00)</option>
                    <option value="12:00 - 14:00">Noon Warrior (12:00 - 14:00)</option>
                    <option value="15:00 - 17:00">Midday Hustle (15:00 - 17:00)</option>
                    <option value="17:00 - 19:00">Sunset Crunch (17:00 - 19:00)</option>
                    <option value="19:00 - 21:00">Night Owls (19:00 - 21:00)</option>
                  </select>
                </div>

              </div>

              {/* Fitness Goal TextArea */}
              <div>
                <label className="block text-xs font-mono font-black uppercase tracking-widest text-white/60 mb-2">
                  What is your main Fitness Goal / Specialty target?
                </label>
                <textarea
                  required
                  rows={3}
                  value={fitnessGoal}
                  onChange={(e) => setFitnessGoal(e.target.value)}
                  placeholder="e.g. I want to build strength for squatting, reduce body fat under Coach Sarah, and learn barbell mechanics safely..."
                  className="w-full bg-black/50 border border-white/10 px-4 py-3.5 text-xs text-white font-sans focus:outline-none focus:border-gym-accent transition-colors"
                />
              </div>

              {/* Submit button */}
              <button
                id="submit-registration-btn"
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-black uppercase tracking-[0.2em] py-4.5 text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  isSubmitting 
                    ? 'bg-gym-accent/30 text-white/50 cursor-not-allowed border border-white/5' 
                    : 'bg-gym-accent hover:bg-gym-accent-hover text-black'
                }`}
              >
                {isSubmitting ? (
                  <>
                    SAVING TO DATABASE...
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </>
                ) : (
                  <>
                    Activate Membership & Gatepass
                    <Sparkles className="w-5 h-5 fill-black text-black" />
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
