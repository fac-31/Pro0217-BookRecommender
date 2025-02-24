import { generateAIBookRecommendations } from '../services/openAiService.js';
import { fetchBooks, fetchBooksByIDs, completeBookWithCoverAndID } from '../services/googleBooksAPIWrapper.js';
import { getUser } from './User.js';

export async function createRecommendations(userPrompt) {
  try {
    const recommendations = await generateAIBookRecommendations(userPrompt);
    if (!recommendations || !recommendations.books) {
      return null;
    }
    // Fetch book covers from Google Books API
    const titles = recommendations.books.map((book) => book.title);
    const booksInfoFromGoogleBooks = await fetchBooks(titles);
    completeBookWithCoverAndID(booksInfoFromGoogleBooks, recommendations);

    return recommendations;
  
  } catch (error) {
    console.error('Error in Recommendation model: ', error);
    throw new Error('Failed to create recommendations');
  }
}


export async function updateRecommendationsBasedOnUserLikesAndDislikes(username) {
  try {

    //get the user from the model.
    const user = await getUser(username);

    //no history of likes.
    if (user.likes.length == 0) return;

    const booksInfoFromGoogleBooks = await fetchBooksByIDs(user.likes);
    const titles = booksInfoFromGoogleBooks.map(book =>book.items?.[0]?.volumeInfo?.title);
    titles.join(",");

    const userPrompt = "I like the following books: " + titles;

    return await createRecommendations(userPrompt);

  } catch (error) {
    console.error('Error in Recommendation model: ', error);
    throw new Error('Failed to create recommendations');
  }
}