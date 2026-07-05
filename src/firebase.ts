// This file configures and initializes our connection to Firebase Firestore (our cloud database).
// We use beginner-friendly comments so you can easily learn how it works!

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// 1. Initialize the Firebase app
const app = initializeApp(firebaseConfig);

// 2. Connect to the Firestore database with our custom database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

