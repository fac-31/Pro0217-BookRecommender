import express from "express";
const router = express.Router();
import { fetchBooksByIDs, fetchBooksByKey } from "../controllers/bookController.js";

router.post("/fetchBooksByIDs", fetchBooksByIDs);
router.post("/fetchBooksByKey", fetchBooksByKey);

export { router as bookRoutes };
