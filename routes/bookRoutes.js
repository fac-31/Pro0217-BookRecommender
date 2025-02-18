import express from 'express';
const router = express.Router();
import {getBooks,createBook , updateBook, deleteBook} from '../controllers/bookController.js';

router.get("/", getBooks);
router.post("/add", createBook);
router.post("/update/:id", updateBook);
router.post("/delete/:id", deleteBook);

export { router as bookRoutes };