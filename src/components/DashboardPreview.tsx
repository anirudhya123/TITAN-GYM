import React, { useState } from 'react';
import {
  Users,
  Activity,
  DollarSign,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  Volume2,
  PlusCircle,
  QrCode,
  Shield,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { MemberRecord, Trainer, Announcement, DashboardStats } from '../types';

interface DashboardPreviewProps {
  members: MemberRecord[];
  trainers: Trainer[];
  announcements: Announcement[];
  onAddAnnouncement: (title: string, category: 'Event' | 'Maintenance' | 'Update' | 'Offer', content: string, audience: 'All' | 'Members' | 'Trainers' | 'Admin') => void;
  onUpdateMemberStatus: (memberId: string, newStatus: 'Active' | 'Pending' | 'Suspended') => void;
}

type UserRole = 'admin' | 'trainer' | 'member';

export default function DashboardPreview({
  members,
  trainers,
  announcements,
  onAddAnnouncement,
  onUpdateMemberStatus
}: DashboardPreviewProps) {
  const [activeRole, setActiveRole] = useState<UserRole>('admin');
  
  // Admin view states
  const [memberSearch, setMemberSearch] = useState('');
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [newAnnCategory, setNewAnnCategory] = useState<'Event' | 'Maintenance' | 'Update' | 'Offer'>('Update');
  const [newAnnAudience, setNewAnnAudience] = useState<'All' | 'Members' | 'Trainers' | 'Admin'>('All');
  const [showAnnForm, setShowAnnForm] = useState(false);

  // Trainer view states
  const [selectedTrainerId, setSelectedTrainerId] = useState(trainers[0]?.id || '');
  const selectedTrainer = trainers.find(t => t.id === selectedTrainerId) || trainers[0];

  // Member view states
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id || '');
  const selectedMember = members.find(m => m.id === selectedMemberId) || members[0];

  // Calculate dynamic stats for Admin
  const totalRegisteredCount = members.length + 137; // base offset
  const activeCount = members.filter(m => m.status === 'Active').length + 125;
  const pendingCount = members.filter(m => m.status === 'Pending').length;
  
  // Calculate dynamic revenue: Basic=₹1,499, Premium=₹2,999, Elite=₹5,499
  const baseRevenue = 425000;
  const calculatedAdditions = members.reduce((acc, m) => {
    if (m.status !== 'Active') return acc;
    if (m.planId === 'plan-basic') return acc + 1499;
    if (m.planId === 'plan-premium') return acc + 2999;
    if (m.planId === 'plan-elite') return acc + 5499;
    return acc;
  }, 0);
  const formattedRevenue = `₹${(baseRevenue + calculatedAdditions).toLocaleString()}`;

  // Filtered members for admin list
  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
    m.email.toLowerCase().includes(memberSearch.toLowerCase()) ||
    m.fitnessGoal.toLowerCase().includes(memberSearch.toLowerCase())
  );

  const handleAnnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle || !newAnnContent) return;
    onAddAnnouncement(newAnnTitle, newAnnCategory, newAnnContent, newAnnAudience);
    setNewAnnTitle('');
    setNewAnnContent('');
    setShowAnnForm(false);
  };

  return (
    <section id="dashboard" className="py-24 bg-transparent text-white relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <span className="text-xs font-mono font-black text-gym-accent uppercase tracking-[0.2em] block">
              Day 2 Interactive Sandbox
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tighter text-white uppercase italic text-glow">
              PORTAL DASHBOARD PREVIEW
            </h2>
            <p className="text-white/60 text-sm max-w-xl">
              Demonstrating full portal capabilities. Switch roles to view different interfaces designed for Admins, Coaches, and Members.
            </p>
          </div>

          {/* Role Switcher Controls - High contrast flat blocks */}
          <div className="bg-black/80 p-1 border border-white/15 flex items-center gap-1 self-stretch md:self-auto">
            <button
              id="role-btn-admin"
              onClick={() => setActiveRole('admin')}
              className={`flex-1 md:flex-none px-5 py-2.5 text-xs font-black font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                activeRole === 'admin'
                  ? 'bg-gym-accent text-black font-bold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Admin View
            </button>
            <button
              id="role-btn-trainer"
              onClick={() => setActiveRole('trainer')}
              className={`flex-1 md:flex-none px-5 py-2.5 text-xs font-black font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                activeRole === 'trainer'
                  ? 'bg-gym-accent text-black font-bold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Trainer View
            </button>
            <button
              id="role-btn-member"
              onClick={() => setActiveRole('member')}
              className={`flex-1 md:flex-none px-5 py-2.5 text-xs font-black font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                activeRole === 'member'
                  ? 'bg-gym-accent text-black font-bold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Member View
            </button>
          </div>
        </div>

        {/* ========================================================== */}
        {/* 1. ADMIN ROLE VIEW                                         */}
        {/* ========================================================== */}
        {activeRole === 'admin' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Admin Stats Grid - High Contrast Heavy Displays */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="glass-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-gym-accent/10 border border-gym-accent/30 flex items-center justify-center text-gym-accent shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Total Members</p>
                  <p className="text-2xl sm:text-3xl font-display font-black uppercase italic text-white leading-tight">{totalRegisteredCount}</p>
                  <span className="text-[10px] text-gym-accent font-mono font-bold uppercase tracking-widest">+{members.length} SESSION</span>
                </div>
              </div>

              <div className="glass-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-gym-accent/10 border border-gym-accent/30 flex items-center justify-center text-gym-accent shrink-0">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Active Checkins</p>
                  <p className="text-2xl sm:text-3xl font-display font-black uppercase italic text-white leading-tight">{activeCount}</p>
                  <span className="text-[10px] text-white/50 font-mono font-bold uppercase tracking-widest">91% ACTIVE</span>
                </div>
              </div>

              <div className="glass-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-gym-accent/10 border border-gym-accent/30 flex items-center justify-center text-gym-accent shrink-0">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Monthly Revenue</p>
                  <p className="text-2xl sm:text-3xl font-display font-black uppercase italic text-white leading-tight">{formattedRevenue}</p>
                  <span className="text-[10px] text-gym-accent font-mono font-bold uppercase tracking-widest">LIVE SCALE</span>
                </div>
              </div>

              <div className="glass-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-gym-accent/10 border border-gym-accent/30 flex items-center justify-center text-gym-accent shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Peak Occupancy</p>
                  <p className="text-2xl sm:text-3xl font-display font-black uppercase italic text-white leading-tight">84%</p>
                  <span className="text-[10px] text-white/50 font-mono font-bold uppercase tracking-widest">6-8 PM PEAK</span>
                </div>
              </div>
            </div>

            {/* Main Admin Section: Member Records & Trainer Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Member table - 8 cols */}
              <div className="lg:col-span-8 glass-card p-6 flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-display font-black text-lg text-white uppercase italic tracking-wider">Live Member Records</h3>
                    <p className="text-white/50 text-xs">Manage registered users, update status, and track fitness goals</p>
                  </div>
                  {/* Search bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      placeholder="Search name/goal..."
                      value={memberSearch}
                      onChange={(e) => setMemberSearch(e.target.value)}
                      className="bg-black/60 border border-white/10 pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-gym-accent text-white w-full sm:w-48 transition-colors uppercase font-mono tracking-widest"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-white/40 font-mono uppercase text-[9px] tracking-widest">
                        <th className="py-3 px-2">Member</th>
                        <th className="py-3 px-2">Contact / Age</th>
                        <th className="py-3 px-2">Chosen Plan</th>
                        <th className="py-3 px-2">Fitness Goal</th>
                        <th className="py-3 px-2">Status</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-2">
                            <p className="font-black text-white text-sm uppercase tracking-wide">{member.name}</p>
                            <p className="text-[10px] text-white/40 font-mono">ID: {member.id}</p>
                          </td>
                          <td className="py-4 px-2 font-mono">
                            <p className="text-white/80">{member.email}</p>
                            <p className="text-white/40 text-[10px]">{member.phone} • AGE {member.age}</p>
                          </td>
                          <td className="py-4 px-2">
                            <span className={`px-2.5 py-1 font-mono font-black text-[10px] uppercase ${
                              member.planId === 'plan-elite' 
                                ? 'bg-white text-black' 
                                : member.planId === 'plan-premium' 
                                ? 'bg-gym-accent text-black' 
                                : 'bg-white/10 text-white/80'
                            }`}>
                              {member.planId.split('-')[1]}
                            </span>
                          </td>
                          <td className="py-4 px-2 text-white/75">
                            <p className="italic font-sans">"{member.fitnessGoal}"</p>
                            <p className="text-[9px] text-white/40 uppercase font-mono mt-1">Time: {member.preferredTime}</p>
                          </td>
                          <td className="py-4 px-2">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] font-black uppercase ${
                              member.status === 'Active'
                                ? 'bg-gym-accent/10 text-gym-accent'
                                : member.status === 'Pending'
                                ? 'bg-yellow-500/10 text-yellow-400'
                                : 'bg-red-500/10 text-red-400'
                            }`}>
                              <span className={`w-1.5 h-1.5 ${
                                member.status === 'Active' ? 'bg-gym-accent' : member.status === 'Pending' ? 'bg-yellow-400' : 'bg-red-400'
                              }`}></span>
                              {member.status}
                            </span>
                          </td>
                          <td className="py-4 px-2 text-right space-y-1">
                            {member.status !== 'Active' && (
                              <button
                                onClick={() => onUpdateMemberStatus(member.id, 'Active')}
                                className="block w-full text-[9px] bg-gym-accent hover:bg-gym-accent-hover text-black font-black uppercase tracking-widest px-2 py-1.5 transition-colors cursor-pointer"
                              >
                                Approve
                              </button>
                            )}
                            {member.status === 'Active' && (
                              <button
                                onClick={() => onUpdateMemberStatus(member.id, 'Suspended')}
                                className="block w-full text-[9px] bg-red-500/10 hover:bg-red-500/30 text-red-400 font-bold uppercase tracking-wider px-2 py-1.5 transition-colors cursor-pointer border border-red-500/20"
                              >
                                Suspend
                              </button>
                            )}
                            {member.status === 'Suspended' && (
                              <button
                                onClick={() => onUpdateMemberStatus(member.id, 'Active')}
                                className="block w-full text-[9px] bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider px-2 py-1.5 transition-colors cursor-pointer"
                              >
                                Reactivate
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                      {filteredMembers.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-white/30 font-mono uppercase tracking-widest text-xs">
                            No member records matched your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-white/40 font-mono uppercase tracking-widest">
                  <span>Showing {filteredMembers.length} records</span>
                  <span>* Session Memory Only</span>
                </div>
              </div>

              {/* Announcements Board & Quick Publisher - 4 cols */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Board */}
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-5 h-5 text-gym-accent" />
                      <h3 className="font-display font-black text-sm uppercase tracking-wider text-white">Club Notifications</h3>
                    </div>
                    <button
                      onClick={() => setShowAnnForm(!showAnnForm)}
                      className="text-xs text-gym-accent hover:text-white flex items-center gap-1 font-mono uppercase tracking-widest font-black cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      {showAnnForm ? 'Cancel' : 'Publish'}
                    </button>
                  </div>

                  {/* Add Announcement Form */}
                  {showAnnForm && (
                    <form onSubmit={handleAnnSubmit} className="bg-black/80 p-4 border border-white/10 mb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
                      <div>
                        <label className="block text-[10px] uppercase font-mono text-white/50 mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={newAnnTitle}
                          onChange={(e) => setNewAnnTitle(e.target.value)}
                          placeholder="e.g. Labor Day Class Schedule"
                          className="w-full bg-black/50 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-gym-accent font-mono uppercase tracking-wider"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] uppercase font-mono text-white/50 mb-1">Category</label>
                          <select
                            value={newAnnCategory}
                            onChange={(e) => setNewAnnCategory(e.target.value as any)}
                            className="w-full bg-black/50 border border-white/10 px-2 py-2 text-xs text-white focus:outline-none font-mono uppercase tracking-wider"
                          >
                            <option value="Update">Update</option>
                            <option value="Event">Event</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Offer">Offer</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-mono text-white/50 mb-1">Audience</label>
                          <select
                            value={newAnnAudience}
                            onChange={(e) => setNewAnnAudience(e.target.value as any)}
                            className="w-full bg-black/50 border border-white/10 px-2 py-2 text-xs text-white focus:outline-none font-mono uppercase tracking-wider"
                          >
                            <option value="All">All Roles</option>
                            <option value="Members">Members Only</option>
                            <option value="Trainers">Coaches Only</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-mono text-white/50 mb-1">Message Content</label>
                        <textarea
                          required
                          rows={2}
                          value={newAnnContent}
                          onChange={(e) => setNewAnnContent(e.target.value)}
                          placeholder="Type details for students..."
                          className="w-full bg-black/50 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-gym-accent font-sans"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gym-accent hover:bg-gym-accent-hover text-black font-black uppercase tracking-widest py-2.5 text-xs transition-colors cursor-pointer"
                      >
                        Publish Announcement
                      </button>
                    </form>
                  )}

                  {/* Bullet Feed */}
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                    {announcements.map((ann) => (
                      <div key={ann.id} className="bg-white/[0.01] border border-white/5 p-4 space-y-2 hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-0.5 text-[9px] font-mono font-black uppercase tracking-wider ${
                            ann.category === 'Update' ? 'bg-blue-500/10 text-blue-300' :
                            ann.category === 'Event' ? 'bg-purple-500/10 text-purple-300' :
                            ann.category === 'Maintenance' ? 'bg-red-500/10 text-red-300' : 'bg-gym-accent/10 text-gym-accent'
                          }`}>
                            {ann.category}
                          </span>
                          <span className="text-[10px] text-white/40 font-mono">{ann.date}</span>
                        </div>
                        <h4 className="font-bold text-sm text-white uppercase tracking-wide">{ann.title}</h4>
                        <p className="text-white/60 text-xs leading-relaxed">{ann.content}</p>
                        <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/40 border-t border-white/5 pt-2">
                          <span>Audience:</span>
                          <span className="text-gym-accent font-black uppercase tracking-widest">{ann.audience}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trainer Allocation Quick Glance */}
                <div className="glass-card p-6">
                  <h3 className="font-display font-black text-sm uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                    <Shield className="w-5 h-5 text-gym-accent" />
                    Trainer Roster Check
                  </h3>
                  <div className="space-y-3">
                    {trainers.map(t => (
                      <div key={t.id} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/10">
                        <div className="flex items-center gap-2.5">
                          <img src={t.image} alt={t.name} className="w-8 h-8 rounded-full object-cover border border-white/10" referrerPolicy="no-referrer" />
                          <div>
                            <p className="text-xs font-black uppercase text-white tracking-wider">{t.name.split(' ').slice(1).join(' ')}</p>
                            <p className="text-[9px] text-white/40 font-mono uppercase tracking-widest">{t.specialty.split('&')[0]}</p>
                          </div>
                        </div>
                        <div className="text-right font-mono text-[10px]">
                          <p className="text-gym-accent font-black uppercase tracking-wider">{t.assignedMembersCount} Active</p>
                          <p className="text-white/40 text-[9px] uppercase">★ {t.rating} rating</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* 2. TRAINER ROLE VIEW                                       */}
        {/* ========================================================== */}
        {activeRole === 'trainer' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Coach Picker */}
            <div className="glass-card p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gym-accent/10 text-gym-accent border border-gym-accent/20">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-sm uppercase tracking-wide text-white">Select Active Instructor Profile</h3>
                  <p className="text-xs text-white/50">Simulate dashboard for different certified specialists</p>
                </div>
              </div>
              
              <select
                id="trainer-select-dropdown"
                value={selectedTrainerId}
                onChange={(e) => setSelectedTrainerId(e.target.value)}
                className="bg-black border border-white/10 px-4 py-2 text-xs text-gym-accent font-mono font-black uppercase tracking-widest focus:outline-none focus:border-gym-accent"
              >
                {trainers.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* Coach stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="glass-card p-5">
                <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">Direct Clients</p>
                <p className="text-2xl font-display font-black uppercase italic text-white leading-none">{selectedTrainer.assignedMembersCount} Active</p>
                <div className="h-1.5 w-full bg-white/10 mt-3 overflow-hidden">
                  <div className="bg-gym-accent h-full animate-pulse" style={{ width: `${(selectedTrainer.assignedMembersCount / 20) * 100}%` }}></div>
                </div>
              </div>

              <div className="glass-card p-5">
                <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">Average Review Score</p>
                <p className="text-2xl font-display font-black uppercase italic text-white leading-none">★ {selectedTrainer.rating} / 5.0</p>
                <p className="text-[10px] text-gym-accent font-mono uppercase tracking-wider font-bold mt-3">Top 5% certified rank</p>
              </div>

              <div className="glass-card p-5">
                <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">Assigned Load</p>
                <p className="text-2xl font-display font-black uppercase italic text-white leading-none">Optimal</p>
                <p className="text-[10px] text-white/40 font-mono uppercase tracking-wider mt-3">Capacity limit: 22 clients</p>
              </div>

              <div className="glass-card p-5">
                <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">Next Workout Class</p>
                <p className="text-lg font-mono font-black uppercase tracking-wider text-gym-accent truncate leading-none">17:00 BARBELL FORM</p>
                <p className="text-[10px] text-white/40 font-mono uppercase tracking-wider mt-2">Today's schedule is active</p>
              </div>
            </div>

            {/* Main Trainer Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Assigned Members list */}
              <div className="lg:col-span-6 glass-card p-6">
                <h3 className="font-display font-black text-base uppercase tracking-wider text-white border-b border-white/10 pb-3 mb-2">My Client Roster ({selectedTrainer.assignedMembersCount})</h3>
                <p className="text-white/50 text-xs mb-4">Directly coached members currently on duty. (Showing active matching profiles)</p>
                
                <div className="space-y-3">
                  {/* Pull members whose goal matches specialty keywords or just general roster */}
                  {members.map((m, idx) => (
                    <div key={m.id} className="flex items-center justify-between p-3.5 bg-white/[0.01] border border-white/5 hover:border-white/25 transition-all">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-white uppercase tracking-wide">{m.name}</span>
                          <span className="text-[9px] bg-white/10 text-white/80 font-mono px-1.5 py-0.5 uppercase tracking-widest font-bold">ID: {m.id}</span>
                        </div>
                        <p className="text-xs text-white/60 mt-1 italic">"{m.fitnessGoal}"</p>
                        <div className="flex gap-4 mt-2 text-[10px] text-white/40 font-mono uppercase tracking-wider">
                          <span>Age: {m.age}</span>
                          <span>Time slot: {m.preferredTime}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-xs text-gym-accent font-mono font-black uppercase tracking-wider block">Assigned Coached</span>
                        <span className="text-[9px] text-white/40 uppercase font-mono tracking-widest">Status: {m.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coach Workouts & Shifts */}
              <div className="lg:col-span-6 glass-card p-6 space-y-6">
                <div>
                  <h3 className="font-display font-black text-base uppercase tracking-wider text-white border-b border-white/10 pb-3 mb-2">Contract Hours & Availability</h3>
                  <p className="text-white/50 text-xs mb-4">Official working blocks locked in system</p>
                  
                  <div className="space-y-2">
                    {selectedTrainer.schedule.map((slot, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/[0.01] p-3 border border-white/5 font-mono">
                        <Clock className="w-4 h-4 text-gym-accent animate-pulse" />
                        <span className="text-xs font-mono font-black uppercase tracking-widest text-white">{slot}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-black text-base uppercase tracking-wider text-white border-b border-white/10 pb-3 mb-2">Trainer Performance Metrics Checklist</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-2 text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-gym-accent shrink-0" />
                      <span>Complete biweekly member health assessments</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-gym-accent shrink-0" />
                      <span>Input workout block summaries after 1-on-1 programs</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-gym-accent shrink-0" />
                      <span>Validate digital check-ins for peak occupancy metrics</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* 3. MEMBER ROLE VIEW                                         */}
        {/* ========================================================== */}
        {activeRole === 'member' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Member Picker */}
            <div className="glass-card p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gym-accent/10 text-gym-accent border border-gym-accent/20">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-sm uppercase tracking-wide text-white">Select Active Member Profile</h3>
                  <p className="text-xs text-white/50">Simulate how registered members view their secure digital gatepass and workout agenda</p>
                </div>
              </div>
              
              <select
                id="member-select-dropdown"
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                className="bg-black border border-white/10 px-4 py-2 text-xs text-gym-accent font-mono font-black uppercase tracking-widest focus:outline-none focus:border-gym-accent"
              >
                {members.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.status})</option>
                ))}
              </select>
            </div>

            {/* Member Card View */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Virtual Gatepass Card with mock QR */}
              <div className="glass-card p-6 relative overflow-hidden flex flex-col items-center text-center">
                {/* Decorative glows */}
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-gym-accent/5 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-gym-accent/5 rounded-full blur-2xl"></div>

                <div className="w-full flex justify-between items-center mb-6 border-b border-white/10 pb-3">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase font-black">ACCESS KEY</span>
                  <span className={`px-2.5 py-1 font-mono text-[9px] font-black uppercase ${
                    selectedMember.status === 'Active' ? 'bg-gym-accent text-black' : 'bg-yellow-500/15 text-yellow-400'
                  }`}>
                    {selectedMember.status}
                  </span>
                </div>

                <div className="bg-white p-4 shadow-xl mb-6 border-4 border-gym-accent">
                  <QrCode className="w-32 h-32 text-black" />
                </div>

                <h3 className="font-display font-black text-lg tracking-wider text-white uppercase italic">{selectedMember.name}</h3>
                <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-6">MEMBER ID: {selectedMember.id}</p>

                <div className="w-full border-t border-white/10 pt-4 text-left grid grid-cols-2 gap-4 text-xs font-mono text-white/80">
                  <div>
                    <span className="text-white/40 text-[9px] uppercase tracking-widest block mb-0.5">Plan Tier</span>
                    <span className="font-black text-gym-accent uppercase tracking-wider">{selectedMember.planId.split('-')[1]}</span>
                  </div>
                  <div>
                    <span className="text-white/40 text-[9px] uppercase tracking-widest block mb-0.5">Join Date</span>
                    <span className="font-bold">{selectedMember.joinDate}</span>
                  </div>
                </div>

                <div className="mt-6 w-full bg-gym-accent/10 text-gym-accent p-3 border border-gym-accent/20 text-[10px] font-mono uppercase tracking-widest text-center">
                  Scan QR for 24/7 entry.
                </div>
              </div>

              {/* Training details & Assigned Coach */}
              <div className="glass-card p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-black text-base uppercase tracking-wider text-white border-b border-white/10 pb-3 mb-2">Active Fitness Routine</h3>
                  <p className="text-white/50 text-xs mb-6">Curated guidelines aligned with your declared goals</p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-white/[0.01] border border-white/5">
                      <span className="text-[9px] uppercase font-mono tracking-widest text-white/40 block mb-1">Current Focus Target</span>
                      <span className="text-sm font-semibold text-white italic">"{selectedMember.fitnessGoal}"</span>
                    </div>

                    <div className="p-4 bg-white/[0.01] border border-white/5">
                      <span className="text-[9px] uppercase font-mono tracking-widest text-white/40 block mb-1">Preferred Attendance Clock</span>
                      <span className="text-sm font-black font-mono text-gym-accent uppercase tracking-widest">{selectedMember.preferredTime}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 mt-6">
                  <h4 className="text-[9px] uppercase font-mono tracking-widest text-white/40 mb-3">Your Appointed Strength Coach</h4>
                  <div className="flex items-center gap-3 bg-white/[0.01] p-3 border border-white/5">
                    <img src={trainers[0].image} alt={trainers[0].name} className="w-10 h-10 rounded-full object-cover border border-white/10" referrerPolicy="no-referrer" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-white">{trainers[0].name}</p>
                      <p className="text-[9px] text-gym-accent font-mono uppercase tracking-wider font-bold">{trainers[0].specialty}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Perks & Benefits Checklist */}
              <div className="glass-card p-6">
                <h3 className="font-display font-black text-base uppercase tracking-wider text-white border-b border-white/10 pb-3 mb-2">Gatepass Benefits</h3>
                <p className="text-white/50 text-xs mb-6">Calculated based on your dynamic {selectedMember.planId.split('-')[1]} membership</p>

                <div className="space-y-4 text-xs text-white/80">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gym-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="font-black uppercase tracking-wider text-white block">Full Gym Floor Access</span>
                      <span className="text-[10px] text-white/40 uppercase tracking-wide">Enjoy Olympic platforms and cardio zones</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gym-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="font-black uppercase tracking-wider text-white block">Mobile Booking Allowed</span>
                      <span className="text-[10px] text-white/40 uppercase tracking-wide">Reserve slots up to 7 days in advance</span>
                    </div>
                  </div>

                  {selectedMember.planId !== 'plan-basic' ? (
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gym-accent shrink-0 mt-0.5" />
                      <div>
                        <span className="font-black uppercase tracking-wider text-white block">Group Fitness HIIT Classes</span>
                        <span className="text-[10px] text-white/40 uppercase tracking-wide">Unlimited class entries included</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 opacity-40">
                      <AlertCircle className="w-5 h-5 text-white/40 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-black uppercase tracking-wider text-white/60 block">Group HIIT Classes Excluded</span>
                        <span className="text-[10px] text-white/40 uppercase tracking-wide">Upgrade to Premium to unlock classes</span>
                      </div>
                    </div>
                  )}

                  {selectedMember.planId === 'plan-elite' ? (
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gym-accent shrink-0 mt-0.5" />
                      <div>
                        <span className="font-black uppercase tracking-wider text-white block">Complimentary Protein Shakes</span>
                        <span className="text-[10px] text-white/40 uppercase tracking-wide">Redeem at nutrition bar anytime</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 opacity-40">
                      <AlertCircle className="w-5 h-5 text-white/40 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-black uppercase tracking-wider text-white/60 block">Bar Perks Excluded</span>
                        <span className="text-[10px] text-white/40 uppercase tracking-wide">Upgrade to Elite to unlock protein shakes</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
