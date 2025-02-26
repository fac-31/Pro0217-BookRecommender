import { fetchBooksByIDs } from '../services/googleBooksAPIWrapper.js';

export async function getBooksByIds(ids) {
  try {
    const books = await fetchBooksByIDs(ids);
    return books;
  } catch (error) {
    throw new Error('Error fetching books: ' + error.message);
  }
}