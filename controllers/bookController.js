//import { Book } from '../models/Book.js';


export async function getBooks(req, res) {
  try {
   ///....
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

export async function createBook(req, res) {
  try {
    //....
  } catch (error) {
    res.status(500).json({ message: "Error creating book", error });
  }
};

export async function updateBook (req, res) {
  try {
  //...
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};

export async function deleteBook (req, res) {
  try {
   ///....
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};