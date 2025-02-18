import express from 'express';
const router = express.Router();
import {getRecommendations,createRecommendation , updateRecommendation, deleteRecommendation} from '../controllers/recommendController.js';

router.get("/", getRecommendations);
router.post("/add", createRecommendation);
router.post("/update/", updateRecommendation); //How will it work? do we need it?
router.post("/delete/", deleteRecommendation);  //How will it work? do we need it?

export { router as recommendRoutes };