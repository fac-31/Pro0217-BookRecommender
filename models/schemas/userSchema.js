import { z } from 'zod';

const bookID = z.string();

const User = z.object({
    username: z.string(),
    id: z.number(),
    likes: z.array(bookID),
    dislikes: z.array(bookID)
  });