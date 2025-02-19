//import { Recommendation } from '../models/Recommendation.js';
import {fetchBooks, getCovers} from '../googleBooksAPIWrapper.js'

export async function getRecommendations(req, res) {
  try {
    
    

  } catch (error) {
    res.status(500).json({ message: "Error fetching recommendations", error });
  }
};

export async function createRecommendation (req, res) {
  try {

  //prompt = some string we get from the form of the front end.
  //for example: "I love science fiction and fantasy books, especially before 1990" 
  
  //1. here we call the openAI
  //probably a good idea is to create a new file that implements the web API call 
  //to openAI.
  //A structured response from openAI in the form of book-recommendation json format 
  // will be returned.

  //2. here we call the Googlebooks API to get a book cover. 
  // also a good idea to do it in a separate file.

  //3. TODO: MODEL ACTIONS
  // 
  // more functions are needed to link books with users, 
  // and to keep them in the model (data).
  // keep the recommendations too.
  // the user will also be able to add books history -
  // let's figure it out together how to approach it.

  const titles = ["Harry Potter", "Pride and Prejudice", "Wuthering Heights"];
  const books = await fetchBooks(titles);
  const urlTitles = getCovers(books);

  //3. send back the list of books recommendations +book_covers to the front end (index.html)
  //res.json( books list...)

  } catch (error) {
    res.status(500).json({ message: "Error creating recommendations", error });
  }
};

export async function updateRecommendation(req, res) {
  try {
 
  } catch (error) {
    res.status(500).json({ message: "Error updating recommendations", error });
  }
};

export async function deleteRecommendation (req, res) {
  try {
   
  } catch (error) {
    res.status(500).json({ message: "Error deleting recommendations", error });
  }
};