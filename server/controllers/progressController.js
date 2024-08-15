import progressService from '../services/progressService.js';

async function getStudyProgress(req, res) {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }
    const progress = await progressService.getStudyProgress(userId);
    res.status(200).json(progress);
  } catch (error) {
    console.error("Error getting study progress: ", error);
    res.status(500).json({ error: "Failed to get study progress" });
  }
}

async function getDailyStudyStreak(req, res) {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }
    const streaks = await progressService.getDailyStudyStreak(userId);
    res.status(200).json(streaks);
  } catch (error) {
    console.error("Error getting daily study streaks: ", error);
    res.status(500).json({ error: "Failed to get daily study streaks" });
  }
}

export default {
  getStudyProgress,
  getDailyStudyStreak,
};