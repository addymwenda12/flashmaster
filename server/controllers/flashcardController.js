import flashcardService from '../services/flashcardService.js';
import { getUserSubscriptionTier } from '../services/subscriptionService.js';

async function getFlashcardSets(req, res) {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const subscriptionTier = await getUserSubscriptionTier(userId);
    if (subbscriptionTier === 'free') {
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

export default {
  getFlashcardSets,
  searchFlashcardSets,
};