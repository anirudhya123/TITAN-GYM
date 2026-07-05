export interface MembershipPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  tier: 'basic' | 'premium' | 'elite';
  benefits: string[];
  popular?: boolean;
  colorClass: string;
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  image: string;
  bio: string;
  rating: number;
  assignedMembersCount: number;
  schedule: string[];
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  audience: 'All' | 'Admin' | 'Trainers' | 'Members';
  content: string;
  category: 'Event' | 'Maintenance' | 'Update' | 'Offer';
}

export interface MemberRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  planId: string;
  preferredTime: string;
  fitnessGoal: string;
  joinDate: string;
  status: 'Active' | 'Pending' | 'Suspended';
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  trainersCount: number;
  monthlyRevenue: string;
  occupancyRate: string;
}
