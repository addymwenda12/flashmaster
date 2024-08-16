import { db } from '../firebase.js';
import { collection, getDocs, query, where } from 'firebase/firestore';

const flashcardsCollection = collection(db, 'flashcards');

async function getFlashcardsSets(userId) {
  if (!userId) {
    throw new Error("Invalid input: userId is required");
  }

  try {
    const q = query(flashcardsCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const sets = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return sets;
  } catch (error) {
    console.error("Error getting flashcards sets: ", error);
    throw error;
  }
}

export default {
  getFlashcardsSets,
};