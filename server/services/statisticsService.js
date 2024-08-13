import { db } from '../firebase.js';
import { collection, getDocs, query, where } from 'firebase/firestore';

const studySessionsCollection = collection(db, 'studySessions');

async function getStatistics(userId) {
  if (!userId) {
    throw new Error('Invalid input: User ID is required');
  }

  try {
    const q = query(studySessionsCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const sessions = snapshot.docs.map((doc) => doc.data());

    // Calculate total flashcards, total sets, and other statistics
    let totalFlashcards = 0;
    let totalSets = 0;
    const flashcardSets = new Set();

    sessions.forEach((session) => {
      if (session.flashcardSetId) {
        flashcardSets.add(session.flashcardSetId);
        totalFlashcards += session.flashcardsStudied || 0;
      }
    });

    totalSets = flashcardSets.size;

    return {
      totalFlashcards,
      totalSets,
    };
  } catch (error) {
    console.error("Error getting statistics:", error)
    throw error;
  }
}