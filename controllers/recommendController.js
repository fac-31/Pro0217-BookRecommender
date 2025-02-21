import { createRecommendations as createRecommendationsModel } from '../models/Recommendation.js';

export async function createRecommendations(req, res) {
  try {
    const userPrompt = req.body.userPrompt;
    if (!userPrompt) {
      return res.status(400).json({ error: 'Missing prompt in request body.' });
    }

    // Call the Recommendation model
    const recommendations = await createRecommendationsModel(userPrompt);
    if (!recommendations) {
      return res.status(406).json({ message: 'No recommendations found' });
    }

    res.status(200).json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error fetching recommendations',
      error: error.message,
    });
  }
}
