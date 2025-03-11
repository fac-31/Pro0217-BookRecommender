import { generateAIBookRecommendations } from "../services/openAiService.js";
import { fetchAPI } from "../models/api.js";
import { bookSchema } from "../models/schemas/bookSchema.js";

import { fetchBooks, completeBookWithCoverAndID } from "../services/googleBooksAPIWrapper.js";

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
		console.error("Error in Recommendation model: ", error);
		throw new Error("Failed to create recommendations");
	}
}

export async function createRecommendationsByUserPreferences(user) {
	try {
		//no history of likes.
		if (user.likes.length == 0 && user.dislikes.length == 0) return;

		let userPrompt = "";

		if (user.likes.length > 0) {
			const book_ids = user.likes.map((bookData) => bookData.id);
			const titles = await getLikedOrDislikedBooks(book_ids);
			userPrompt += "I like the following books: " + titles + ". ";
		}

		if (user.dislikes.length > 0) {
			const book_ids = user.dislikes.map((bookData) => bookData.id);
			const titles = await getLikedOrDislikedBooks(book_ids);
			userPrompt += "I dislike the following books: " + titles + ". ";
		}

		userPrompt += "Take care not to recommend any of the books mentioned above.";

		return await createRecommendations(userPrompt);
	} catch (error) {
		console.error("Error in Recommendation model: ", error);
		throw new Error("Failed to create recommendations by preferences");
	}
}

async function getLikedOrDislikedBooks(ids) {
	//TODO: generalise the hardcoded fix here.
	const req = {
		protocol: "http", // Explicitly set the protocol
		headers: {
			host: "localhost:3000", // Define the host
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: {}, // Empty because it's a GET request
		params: {}, // Empty if no route params
		query: {}, // Empty if no query params
	};

	let titles = [];
	const all = await fetchAPI(req, "books", "GET");
	for (let i = 0; i < all.length; i++) {
		let book = bookSchema.parse(all[i]);
		if (ids.includes(book.id)) titles.push(book.title);
	}

	titles.join(",");
	return titles;
}
