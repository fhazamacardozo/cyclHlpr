import express from 'express';
import TrainingPlanController from '../controllers/TrainingPlanController.js';

const router = express.Router();

router.get('/api/training-plan/:userId', TrainingPlanController.getPlan);

export default router;
