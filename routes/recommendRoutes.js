import express from 'express';
const router = express.Router();
import { createRecommendations , createRecommendationsByUserPreferences} from '../controllers/recommendController.js';

router.post('/', createRecommendations);
router.post('/byUserPreferences', createRecommendationsByUserPreferences);

// For the future
// router.post('/:userId', createRecommendation); adds to the users history?
// router.get('/:userId');  gets the users recommendation history?
// then maybe update/delete ?

export { router as recommendRoutes };
