import express from "express";
const router = express.Router();
import {
	fetchBooksByIDs,
	fetchBooksByKey,
	createBook,
	updateBook,
	deleteBook,
} from "../controllers/bookController.js";

router.post("/fetchBooksByIDs", fetchBooksByIDs);
router.post("/fetchBooksByKey", fetchBooksByKey);

router.post("/add", createBook);
router.post("/update/:id", updateBook);
router.post("/delete/:id", deleteBook);

export { router as bookRoutes };
