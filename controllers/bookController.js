import { getBooksByIds } from '../models/Book.js';

export async function getBooks(req, res) {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: 'Invalid or missing book IDs' });
  }

  try {
    const books = await getBooksByIds(ids);
    res.json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching books', error: error.message });
  }
}

export async function createBook(req, res) {
  try {
    //....
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating book', error: error.message });
  }
}

export async function updateBook(req, res) {
  try {
    //...
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating book', error: error.message });
  }
}

export async function deleteBook(req, res) {
  try {
    //....
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting book', error: error.message });
  }
}
