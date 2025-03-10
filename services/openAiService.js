import openai from "../config/openai.js";
import { booksSchema } from "../models/schemas/bookSchema.js";
import { zodResponseFormat } from "openai/helpers/zod.mjs";

export async function generateAIBookRecommendations(userPrompt) {
	if (!userPrompt) {
		throw new Error("Missing userPrompt in body of request");
	}

	const response = await openai.chat.completions.create({
		model: "gpt-4o",
		messages: [
			{
				role: "system",
				content: `You are a book recommendation model. 
          Recommend exactly four books. 
          The reason should be no longer than 1-2 sentences.
          The reason should reference the user's prompt.`,
			},
			{ role: "user", content: userPrompt },
		],
		response_format: zodResponseFormat(booksSchema, "books"),
	});

	let recommendations = response.choices[0].message.content;
	if (typeof recommendations === "string") {
		recommendations = JSON.parse(recommendations);
	}

	return booksSchema.parse(recommendations);
}
