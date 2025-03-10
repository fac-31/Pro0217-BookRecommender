import { bookSchema } from "../models/schemas/bookSchema.js";
import { fetchAPI } from "../models/api.js";

export async function fetchBooksByIDs(req, res) {
	const { ids } = req.body;
	if (!Array.isArray(ids) || ids.length === 0) {
		return res.status(400).json({ message: "Invalid or missing book IDs" });
	}

	try {
		const all = await fetchAPI(req, "books", "GET");

		let books = [];
		for (let i = 0; i < all.length; i++) {
			let book = bookSchema.parse(all[i]);
			if (ids.includes(book.id)) books.push(book);
		}

		res.json(books);
	} catch (error) {
		res.status(500).json({ message: "Error fetching books", error: error.message });
	}
}

export async function fetchBooksByKey(req, res) {
	const { key } = req.body;
	if (key == undefined) {
		return res.status(400).json({ message: "Invalid or missing key value" });
	}

	try {
		const users = await fetchAPI(req, "users", "GET");

		let bookIds = {}; // Track list of books with key counts

		users.forEach((user) => {
			user[key].forEach((id) => {
				if (bookIds[id] === undefined) bookIds[id] = 0;

				bookIds[id]++;
			});
		});

		const allBooks = await fetchAPI(req, "books", "GET");

		let books = [];
		allBooks.forEach((book) => {
			if (bookIds[book.id] !== undefined) books.push({ ...book, count: bookIds[book.id] }); // Add count key alongside with book info
		});

		// Sort books by amount of appearence in keys
		books.sort((book1, book2) => {
			return book2.count - book1.count;
		});

		res.json(books);
	} catch (error) {
		res.status(500).json({ message: "Error fetching books", error: error.message });
	}
}

export async function createBook(req, res) {
	try {
		//....
	} catch (error) {
		res.status(500).json({ message: "Error creating book", error: error.message });
	}
}

export async function updateBook(req, res) {
	try {
		//...
	} catch (error) {
		res.status(500).json({ message: "Error updating book", error: error.message });
	}
}

export async function deleteBook(req, res) {
	try {
		//....
	} catch (error) {
		res.status(500).json({ message: "Error deleting book", error: error.message });
	}
}
