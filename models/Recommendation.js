import { generateAIBookRecommendations } from '../services/openAiService.js';
import { fetchBooks, completeBookWithCoverAndISBN } from '../services/googleBooksAPIWrapper.js';

export async function createRecommendations(userPrompt) {
  try {
    const recommendations = await generateAIBookRecommendations(userPrompt);
    if (!recommendations || !recommendations.books) {
      return null;
    }
    // Fetch book covers from Google Books API
    const titles = recommendations.books.map((book) => book.title);
    const booksInfoFromGoogleBooks = await fetchBooks(titles);
    completeBookWithCoverAndISBN(booksInfoFromGoogleBooks, recommendations);

    return recommendations;
  
  } catch (error) {
    console.error('Error in Recommendation model: ', error);
    throw new Error('Failed to create recommendations');
  }
}
