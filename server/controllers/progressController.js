import progressService from '../services/progressService';

async function getStudyProgress(req, res) {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }
    const progress = await progressService.getStudyProgress(userId);
  } catch (error) {
    console.error("Error getting study progress: ", error);
    res.status(500).json({ error: "Failed to get study progress" });
  }
}

export default {
  getStudyProgress,
};