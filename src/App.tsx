import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MembershipPlans from './components/MembershipPlans';
import DashboardPreview from './components/DashboardPreview';
import RegistrationForm from './components/RegistrationForm';
import TrainerHighlights from './components/TrainerHighlights';
import Footer from './components/Footer';

import { INITIAL_PLANS, INITIAL_TRAINERS, INITIAL_ANNOUNCEMENTS, INITIAL_MEMBERS } from './data';
import { MemberRecord, Announcement, Trainer } from './types';
import { saveMemberToDb, getMembersFromDb, updateMemberStatusInDb } from './dbService';

export default function App() {
  const [members, setMembers] = useState<MemberRecord[]>(INITIAL_MEMBERS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [trainers, setTrainers] = useState<Trainer[]>(INITIAL_TRAINERS);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-premium');
  const [activeSection, setActiveSection] = useState<string>('home');

  // Load members from Firebase Firestore on page load
  useEffect(() => {
    const loadMembersFromFirebase = async () => {
      try {
        const dbMembers = await getMembersFromDb();
        if (dbMembers && dbMembers.length > 0) {
          // Merge fetched database records with our local initial members
          // This keeps original members as demo placeholders but gives dynamic cloud registrations priority
          setMembers((prev) => {
            const dbIds = new Set(dbMembers.map((m) => m.id));
            const filteredLocal = prev.filter((m) => !dbIds.has(m.id));
            return [...dbMembers, ...filteredLocal];
          });
        }
      } catch (error) {
        console.error("Error connecting or fetching from Firestore database:", error);
      }
    };
    
    loadMembersFromFirebase();
  }, []);

  // Navigate & Smooth scroll to a section
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Callback when user selects a plan card
  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    handleNavigate('register');
  };

  // Add registered member into Firestore and state
  const handleRegisterMember = async (memberData: {
    name: string;
    email: string;
    phone: string;
    age: number;
    gender: string;
    planId: string;
    preferredTime: string;
    fitnessGoal: string;
  }): Promise<string> => {
    // Create new member payload
    const newMember: Omit<MemberRecord, 'id'> = {
      ...memberData,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Pending', // pending until approved by admin
    };

    try {
      // 1. Save directly into our cloud database
      const generatedId = await saveMemberToDb(newMember);

      const savedMember: MemberRecord = {
        ...newMember,
        id: generatedId,
      };

      // 2. Add to reactive React state so the dashboard updates live
      setMembers((prev) => [savedMember, ...prev]);

      return generatedId;
    } catch (error: any) {
      console.error('Error in handleRegisterMember:', error);
      throw new Error(error.message || 'Database registration failed. Please try again.');
    }
  };

  // Update member status (Approve, Suspend) both in memory and Firestore
  const handleUpdateMemberStatus = async (memberId: string, newStatus: 'Active' | 'Pending' | 'Suspended') => {
    // Optimistic UI update: update locally first for high performance
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, status: newStatus } : m))
    );

    try {
      // Persist update in Firestore database
      await updateMemberStatusInDb(memberId, newStatus);
    } catch (error) {
      console.error('Error persisting member status update to database:', error);
    }
  };

  // Add live announcement from Admin board
  const handleAddAnnouncement = (
    title: string,
    category: 'Event' | 'Maintenance' | 'Update' | 'Offer',
    content: string,
    audience: 'All' | 'Members' | 'Trainers' | 'Admin'
  ) => {
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title,
      category,
      content,
      audience,
      date: new Date().toISOString().split('T')[0],
    };

    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans antialiased text-white selection:bg-gym-accent selection:text-black">
      
      {/* Top Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onJoinClick={() => handleNavigate('register')}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        
        {/* 1. Hero banner with key stats */}
        <Hero
          onExplorePlans={() => handleNavigate('membership')}
          onExploreDemo={() => handleNavigate('dashboard')}
        />

        {/* 2. Membership Plans (Basic, Premium, Elite) */}
        <MembershipPlans
          plans={INITIAL_PLANS}
          onSelectPlan={handleSelectPlan}
        />

        {/* 3. Interactive Sandbox Dashboard Preview */}
        <DashboardPreview
          members={members}
          trainers={trainers}
          announcements={announcements}
          onAddAnnouncement={handleAddAnnouncement}
          onUpdateMemberStatus={handleUpdateMemberStatus}
        />

        {/* 4. Trainer highlights with individual cards */}
        <TrainerHighlights trainers={trainers} />

        {/* 5. Live Enrollment/Registration Form */}
        <RegistrationForm
          plans={INITIAL_PLANS}
          selectedPlanId={selectedPlanId}
          onRegisterMember={handleRegisterMember}
        />

      </main>

      {/* Footer detailing operational hours & brand */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
