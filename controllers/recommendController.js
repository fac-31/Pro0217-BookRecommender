import { fetchBookRecommendations } from '../services/openAiService.js';

export async function getRecommendations(req, res) {
  try {
    const userPrompt = req.body.userPrompt;
    const recommendations = await fetchBookRecommendations(userPrompt);

    //getCovers() goes here maybe? and enhances the recommendations object?

    res.status(200).json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error fetching recommendations',
      error: error.message,
    });
  }
}

// Rich's thoughts: 
// I think we do this when we have a users system
// So the user can change stuff in there history maybe?
// Or this is possibly not relevant. We can discuss in person :)

// export async function updateRecommendations(req, res) {
//   try {
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating recommendations', error });
//   }
// }

// export async function deleteRecommendations(req, res) {
//   try {
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting recommendations', error });
//   }
// }
 
// ------------------------------------------------------------------------

// Sefi's thoughts: 
//   // more functions are needed to link books with users, 
//   // and to keep them in the model (data).
//   // keep the recommendations too.
//   // the user will also be able to add books history -
//   // let's figure it out together how to approach it.

