import generativeModel from "../lib/googleVertex";

export async function generateContent(req, res) {
  try {
    const { prompt } = req.body;

    const request = {
      instances : [{ content: prompt }],
    };

    const [response] = await generativeModel.predict(request);
    res.status(200).json({ content: response.predictions[0].content });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
}