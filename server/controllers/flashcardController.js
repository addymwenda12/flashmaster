import flashcardService from '../services/flashcardService.js';

async function getFlashcardSets(req, res) {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }
    const flashcardSets = await flashcardService.getFlashcardsSets(userId);
  } catch (error) {
    console.error("Error getting flashcards sets", error);
    res.status(500).json({ error: "Failed to get flashcards sets" });
  }
}

export default {
  getFlashcardSets,
};