import { db } from '../firebase.js';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

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

async function searchFlashcardSets(userId, searchTerm, shared = false) {
  if (!userId || !searchTerm) {
    throw new Error("Invalid input: userId and searchTerm are required");
  }

  try {
    const q = query(
      flashcardsCollection,
      where("userId", "==", userId),
      where("shared", "==", shared),
      where("name", ">=", searchTerm),
      where("name", "<=", searchTerm + '\uf8ff')
    );
    const snapshot = await getDocs(q);
    const sets = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return sets;
  } catch (error) {
    console.error("Error searching flashcards sets: ", error);
    throw error;
  }
}

async function getFlashcardSet(setId) {
  if (!setId) {
    throw new Error("Invalid input: setId is required");
  }

  try {
    const flashcardSetRef = doc(db, 'flashcards', setId);
    const flashcardSetSnap = await getDoc(flashcardSetRef);
    
    if (flashcardSetSnap.exists()) {
      return { id: flashcardSetSnap.id, ...flashcardSetSnap.data() };
    } else {
      throw new Error("Flashcard set not found");
    }
  } catch (error) {
    console.error("Error getting flashcard set: ", error);
    throw error;
  }
}

export default {
  getFlashcardsSets,
  searchFlashcardSets,
  getFlashcardSet,
};