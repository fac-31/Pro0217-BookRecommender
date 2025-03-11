import { z } from "zod";

const bookID = z.string();
const friendID = z.number();

export const bookUserDataSchema = z.object({
	id: z.string(),
	reason: z.string(),
});

export const userSchema = z.object({
	username: z.string(),
	id: z.number().default(0),
	likes: z.array(bookUserDataSchema).default([]),
	dislikes: z.array(bookUserDataSchema).default([]),
	friends: z.array(friendID).default([]),
});

export const usersSchema = z.array(userSchema);
