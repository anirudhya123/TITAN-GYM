// This file contains all database operations (fetch, save, update) to communicate with Firebase Firestore.
// We write clean, easy-to-read code with lots of helpful comments for beginners.

import { db } from './firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { MemberRecord } from './types';

// The Firestore collection name we're using as our "database list"
const MEMBERS_COLLECTION_NAME = 'Members';

/**
 * Save a new member to the Firebase Firestore database.
 * This is called when a user submits the registration form.
 */
export async function saveMemberToDb(member: Omit<MemberRecord, 'id'> & { id?: string }): Promise<string> {
  try {
    // Reference to the 'Members' collection in Firestore
    const membersCollection = collection(db, MEMBERS_COLLECTION_NAME);

    // Prepare the document data.
    // We store standard CamelCase fields for the existing React code,
    // as well as the exact beginner-friendly fields requested by the requirements:
    // - name
    // - phone number
    // - membership plan
    // - join date
    // - active status
    const dataToSave = {
      // Required fields for existing React code
      name: member.name,
      email: member.email,
      phone: member.phone,
      age: member.age,
      gender: member.gender,
      planId: member.planId,
      preferredTime: member.preferredTime,
      fitnessGoal: member.fitnessGoal,
      joinDate: member.joinDate,
      status: member.status,

      // Specific database schema fields requested in Day 3 guidelines
      'phone number': member.phone,
      'membership plan': member.planId,
      'join date': member.joinDate,
      'active status': member.status
    };

    // Add a new document to the collection
    const docRef = await addDoc(membersCollection, dataToSave);
    
    // Return the auto-generated unique ID of the document
    return docRef.id;
  } catch (error) {
    console.error('Error saving member to Firestore:', error);
    throw new Error('Could not register member. Please check your internet or Firebase rules.');
  }
}

/**
 * Fetch all saved members from the Firebase Firestore database.
 */
export async function getMembersFromDb(): Promise<MemberRecord[]> {
  try {
    const membersCollection = collection(db, MEMBERS_COLLECTION_NAME);
    
    // Optional: We can fetch the list of members
    const snapshot = await getDocs(membersCollection);
    
    const fetchedMembers: MemberRecord[] = [];
    
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      
      // Map the Firestore fields back to our standard MemberRecord interface
      fetchedMembers.push({
        id: docSnap.id,
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || data['phone number'] || '',
        age: Number(data.age) || 18,
        gender: data.gender || 'Male',
        planId: data.planId || data['membership plan'] || 'plan-premium',
        preferredTime: data.preferredTime || '06:00 - 08:00',
        fitnessGoal: data.fitnessGoal || '',
        joinDate: data.joinDate || data['join date'] || new Date().toISOString().split('T')[0],
        status: data.status || data['active status'] || 'Pending'
      });
    });

    return fetchedMembers;
  } catch (error) {
    console.error('Error fetching members from Firestore:', error);
    return [];
  }
}

/**
 * Update the active status of an existing member in the Firestore database.
 * Allows changes (e.g. from Pending to Active) to persist across browser reloads!
 */
export async function updateMemberStatusInDb(memberId: string, newStatus: 'Active' | 'Pending' | 'Suspended'): Promise<void> {
  try {
    const memberDocRef = doc(db, MEMBERS_COLLECTION_NAME, memberId);
    
    await updateDoc(memberDocRef, {
      status: newStatus,
      'active status': newStatus // update beginner-friendly field as well
    });
  } catch (error) {
    console.error('Error updating member status in Firestore:', error);
    throw new Error('Failed to update status in the database.');
  }
}
