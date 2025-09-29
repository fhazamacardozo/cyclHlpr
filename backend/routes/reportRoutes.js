import express from 'express';
import ReportController from '../controllers/ReportController.js';

const router = express.Router();

router.post('/api/reports', ReportController.create);
router.get('/api/reports', ReportController.getAll);

export default router;
