import { vertexClient } from '../lib/googleClient.js';

export async function generateContent(req, res) {
  try {
    const { prompt } = req.body;
    const projectId = process.env.GOOGLE_CLOUD_PROJECT;
    const location = 'us-central1';
    const endpointId = process.env.GOOGLE_CLOUD_ENDPOINT_ID;

    const request = {
      endpoint: `projects/${projectId}/locations/${location}/endpoints/${endpointId}`,
      instances: [{ content: prompt }],
    };

    const [response] = await vertexClient.predict(request);
    if (response.predictions && response.predictions.length > 0) {
      res.status(200).json({ content: response.predictions[0].content });
    } else {
      res.status(500).json({ error: 'No predictions returned from Vertex AI' });
    }
  } catch (error) {
    console.error('Error generating content:', error.message);
    res.status(500).json({ error: 'Failed to generate content' });
  }
}