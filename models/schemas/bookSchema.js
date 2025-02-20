import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
  year: z.string(),
  // genre: z.array(z.string()),
  reason_for_recommendation: z.string(),
});

export const booksSchema = z.object({ books: z.array(bookSchema) });
