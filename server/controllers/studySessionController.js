import spacedRepetitionService from '../services/spacedRepetitionService.js';

async function submitAssessment(req, res) {
  try {
    const { flashcardId, assessment } = req.body;
    if (!flashcardId || !assessment) {
      return res.status(400).json({ error: 'Missing flashcardId or assessment' });
    }

    const result = await spacedRepetitionService.updateFlashcardReview(flashcardId, assessment);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error submitting assessment:', error);
    res.status(500).json({ error: 'Failed to submit assessment' });
  }
}

export default {
  submitAssessment,
};