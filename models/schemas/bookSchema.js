import { z } from "zod";

export const bookSchema = z.object({
	id: z.string(),
	title: z.string(),
	author: z.string(),
	year: z.string(),
	cover: z.string(),
	reason_for_recommendation: z.string(),
});

export const booksSchema = z.object({ books: z.array(bookSchema) });
