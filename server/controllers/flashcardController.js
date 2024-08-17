import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';
import flashcardService from '../services/flashcardService.js';
import { getUserSubscriptionTier } from '../services/subscriptionService.js';

const sharedFlashcardsCollection = collection(db, 'sharedFlashcards');

async function getFlashcardSets(req, res) {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const subscriptionTier = await getUserSubscriptionTier(userId);
    if (subscriptionTier === 'free') {
      return res.status(403).json({ error: "Upgrade to Premium to access this feature" });
    }
    const flashcardSets = await flashcardService.getFlashcardsSets(userId);
    res.status(200).json(flashcardSets);
  } catch (error) {
    console.error("Error getting flashcards sets", error);
    res.status(500).json({ error: "Failed to get flashcards sets" });
  }
}

async function searchFlashcardSets(req, res) {
  try {
    const { userId, searchTerm, shared } = req.query;
    if (!userId || !searchTerm) {
      return res.status(400).json({ error: "Missing userId or searchTerm" });
    }

    const flashcardSets = await flashcardService.searchFlashcardSets(userId, searchTerm, shared === 'true');
    res.status(200).json(flashcardSets);
  } catch (error) {
    console.error("Error searching flashcards sets", error);
    res.status(500).json({ error: "Failed to search flashcards sets" });
  }
}

export async function shareFlashcardSet(req, res) {
  try {
    const { userId, setId, friendId } = req.body;
    if (!userId || !setId || !friendId) {
      return res.status(400).json({ error: 'Missing userId, setId, or friendId' });
    }

    const newShare = await addDoc(sharedFlashcardsCollection, { userId, setId, friendId });
    res.status(201).json({ id: newShare.id });
  } catch (error) {
    console.error('Error sharing flashcard set:', error);
    res.status(500).json({ error: 'Failed to share flashcard set' });
  }
}

export async function getSharedFlashcardSets(req, res) {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }

    const q = query(sharedFlashcardsCollection, where('friendId', '==', userId));
    const snapshot = await getDocs(q);
    const sharedSets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(sharedSets);
  } catch (error) {
    console.error('Error getting shared flashcard sets:', error);
    res.status(500).json({ error: 'Failed to get shared flashcard sets' });
  }
}

export default {
  getFlashcardSets,
  searchFlashcardSets,
  shareFlashcardSet,
  getSharedFlashcardSets,
};