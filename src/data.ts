import { MembershipPlan, Trainer, Announcement, MemberRecord, DashboardStats } from './types';

export const INITIAL_PLANS: MembershipPlan[] = [
  {
    id: 'plan-basic',
    name: 'Basic Strength',
    price: '₹1,499',
    period: 'month',
    tier: 'basic',
    colorClass: 'border-slate-200 hover:border-slate-300 bg-white text-slate-900',
    benefits: [
      'Access to gym floor & cardio machines',
      'Locker room & shower access',
      '1 complimentary fitness assessment',
      'Free high-speed Wi-Fi & parking',
      'Access during standard hours (8 AM - 8 PM)'
    ]
  },
  {
    id: 'plan-premium',
    name: 'Power Premium',
    price: '₹2,999',
    period: 'month',
    tier: 'premium',
    popular: true,
    colorClass: 'border-emerald-500 hover:border-emerald-600 bg-slate-900 text-white shadow-emerald-950/20 shadow-xl relative overflow-hidden',
    benefits: [
      '24/7 Unlimited Gym access',
      'All group fitness & HIIT classes included',
      '2 personal training sessions per month',
      'Customized nutrition guide',
      'Access to sauna & recovery zone',
      'Bring a guest for free (2x per month)'
    ]
  },
  {
    id: 'plan-elite',
    name: 'Titan Elite',
    price: '₹5,499',
    period: 'month',
    tier: 'elite',
    colorClass: 'border-amber-500 hover:border-amber-600 bg-gradient-to-br from-slate-950 to-slate-900 text-white shadow-lg',
    benefits: [
      'All Premium Tier benefits',
      'Unlimited 1-on-1 personal coaching',
      'Custom biweekly physical assessment',
      'Complimentary protein shakes & pre-workout at bar',
      'Dedicated locker with laundry service',
      'VIP lounge & private ice bath recovery access'
    ]
  }
];

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 'trainer-sarah',
    name: 'Coach Sarah Jenkins',
    specialty: 'Powerlifting & Strength Training',
    experience: '8+ Years',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=400',
    bio: 'Former competitive powerlifter specialized in barbell mechanics, functional strength, and injury prevention.',
    rating: 4.9,
    assignedMembersCount: 14,
    schedule: ['Mon/Wed/Fri 07:00 - 12:00', 'Tue/Thu 14:00 - 19:00']
  },
  {
    id: 'trainer-marcus',
    name: 'Coach Marcus Torres',
    specialty: 'HIIT, Cardio & Body Transformation',
    experience: '6 Years',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=400',
    bio: 'High-energy motivator focused on athletic conditioning, calorie-shredding HIIT, and lifestyle coaching.',
    rating: 4.8,
    assignedMembersCount: 19,
    schedule: ['Mon-Fri 06:00 - 10:00', 'Mon/Wed/Fri 17:00 - 20:00']
  },
  {
    id: 'trainer-elena',
    name: 'Coach Elena Rostova',
    specialty: 'Yoga, Pilates & Flexibility',
    experience: '10 Years',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=400',
    bio: 'Certified Vinyasa & Pilates trainer. Believes in building a resilient mind-body connection and deep posture corrections.',
    rating: 5.0,
    assignedMembersCount: 11,
    schedule: ['Tue/Thu/Sat 08:00 - 13:00', 'Wed 16:00 - 19:00']
  },
  {
    id: 'trainer-derrick',
    name: 'Coach Derrick Vance',
    specialty: 'Athletic Conditioning & Olympic Lifting',
    experience: '7 Years',
    image: 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?auto=format&fit=crop&q=80&w=400',
    bio: 'Explosive training expert helping athletes and weekend warriors reach peak power and acceleration.',
    rating: 4.9,
    assignedMembersCount: 15,
    schedule: ['Mon-Fri 12:00 - 16:00', 'Sat 09:00 - 14:00']
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Independence Day Modified Hours',
    date: '2026-07-03',
    audience: 'All',
    content: 'In observance of Independence Day, the gym will be open from 6:00 AM to 2:00 PM on July 4th. Kids Zone is closed. Regular hours resume July 5th.',
    category: 'Update'
  },
  {
    id: 'ann-2',
    title: 'Annual Summer Lifting Face-off!',
    date: '2026-07-01',
    audience: 'Members',
    content: 'Registration is now open for our Summer Powerlifting Challenge. Friendly competition with three main lifts. Great prizes and barbecue after the meet! See Coach Sarah to enter.',
    category: 'Event'
  },
  {
    id: 'ann-3',
    title: 'Sauna Recovery Room Maintenance',
    date: '2026-06-28',
    audience: 'All',
    content: 'The male locker room sauna will be down for scheduled element replacement on Tuesday, July 7th from 9 AM to 1 PM. Thank you for your patience.',
    category: 'Maintenance'
  },
  {
    id: 'ann-4',
    title: 'New Member Welcome Seminar',
    date: '2026-06-25',
    audience: 'Members',
    content: 'Are you new to barbell lifting or functional fitness? Join our free orientation session this Saturday at 11 AM to learn proper form guidelines and gym etiquette.',
    category: 'Offer'
  }
];

export const INITIAL_MEMBERS: MemberRecord[] = [
  {
    id: 'mem-101',
    name: 'Alex Rivera',
    email: 'alex.rivera@gmail.com',
    phone: '555-0192',
    age: 28,
    gender: 'Male',
    planId: 'plan-premium',
    preferredTime: '06:00 - 08:00',
    fitnessGoal: 'Hypertrophy & Fat Loss',
    joinDate: '2026-05-12',
    status: 'Active'
  },
  {
    id: 'mem-102',
    name: 'Jessica Chen',
    email: 'jess.chen@outlook.com',
    phone: '555-0143',
    age: 32,
    gender: 'Female',
    planId: 'plan-elite',
    preferredTime: '17:00 - 19:00',
    fitnessGoal: 'Postural Alignment & Endurance',
    joinDate: '2026-04-02',
    status: 'Active'
  },
  {
    id: 'mem-103',
    name: 'Michael Vance',
    email: 'mvance99@yahoo.com',
    phone: '555-0177',
    age: 24,
    gender: 'Male',
    planId: 'plan-basic',
    preferredTime: '12:00 - 14:00',
    fitnessGoal: 'Strength & Conditioning',
    joinDate: '2026-06-18',
    status: 'Active'
  },
  {
    id: 'mem-104',
    name: 'Sophia Martinez',
    email: 'sophia.m@gmail.com',
    phone: '555-0121',
    age: 29,
    gender: 'Female',
    planId: 'plan-premium',
    preferredTime: '08:00 - 10:00',
    fitnessGoal: 'HIIT conditioning & toning',
    joinDate: '2026-07-02',
    status: 'Pending'
  },
  {
    id: 'mem-105',
    name: 'James O’Connor',
    email: 'james.oc@domain.com',
    phone: '555-0155',
    age: 45,
    gender: 'Male',
    planId: 'plan-elite',
    preferredTime: '07:00 - 09:00',
    fitnessGoal: 'Functional Mobility & Strength',
    joinDate: '2026-02-15',
    status: 'Active'
  }
];

export const INITIAL_STATS: DashboardStats = {
  totalMembers: 142,
  activeMembers: 129,
  trainersCount: 4,
  monthlyRevenue: '₹4,25,000',
  occupancyRate: '78%'
};
