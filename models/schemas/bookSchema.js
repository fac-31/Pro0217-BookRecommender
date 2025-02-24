import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
  year: z.string(),
  ID: z.string().optional(),
  cover: z.string().optional(),
  reason_for_recommendation: z.string(),
});

export const booksSchema = z.object({ books: z.array(bookSchema) });
