import { z } from "zod";

const bookID = z.string();
const friendID = z.number();

export const userSchema = z.object({
  username: z.string(),
  id: z.number().default(0),
  likes: z.array(bookID).default([]),
  dislikes: z.array(bookID).default([]),
  friends: z.array(friendID).default([]),
});

export const usersSchema = z.array(userSchema);
