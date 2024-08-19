import { generateContent } from '../services/geminiAIService.js';

export async function generateContentController(req, res) {
  try {
    const { prompt } = req.body;
    const generatedContent = await generateContent(prompt);
    res.status(200).json({ content: generatedContent });
  } catch (error) {
    console.error('Error generating content:', error.message);
    res.status(500).json({ error: 'Failed to generate content' });
  }
}
