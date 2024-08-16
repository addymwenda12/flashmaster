import { languageClient } from '../lib/googleClient.js';

export async function analyzeText(req, res) {
  try {
    const { text } = req.body;

    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    const [result] = await languageClient.analyzeSentiment({ document });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error analyzing text:', error.message);
    res.status(500).json({ error: 'Failed to analyze text' });
  }
}