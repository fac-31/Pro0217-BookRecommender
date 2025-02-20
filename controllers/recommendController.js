import { fetchBookRecommendations } from '../services/openAiService.js';
import { fetchBooks, getCovers } from '../googleBooksAPIWrapper.js'

export async function getRecommendations(req, res) {
  try {
    const userPrompt = req.body.userPrompt;
    const recommendations = await fetchBookRecommendations(userPrompt);
    let recommendationsWithCovers = [];
    if (recommendations && recommendations.books)
    {
      const titles = recommendations.books.map(book => book.title)
      const booksInfoFromGoogleBooks = await fetchBooks(titles);
      const covers = getCovers(booksInfoFromGoogleBooks);
      
      for(let i=0;i<recommendations.books.length;i++)
      {
        let recommendationWithCover = {
          "recommendation" : recommendations.books[i],
          "cover": covers[i]
        };
        recommendationsWithCovers.push(recommendationWithCover);
      }
      res.status(200).json(recommendationsWithCovers);
    }
    else
    {
      res.status(406).json();
    }
    
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

