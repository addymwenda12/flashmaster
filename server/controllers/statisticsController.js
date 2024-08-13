import statisticsService from '../services/statisticsService.js';

async function getStatistics(req, res) {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }
    const statistics = await statisticsService.getStatistics(userId);
    res.status(200).json(statistics);
  } catch (error) {
    console.error("Error getting statistics: ", error);
    res.status(500).json({ error: "Failed to get statistics" });
  }
}

export default {
  getStatistics,
};