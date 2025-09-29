// backend/controllers/TrainingPlanController.js
import TrainingPlanService from '../services/TrainingPlanService.js';

class TrainingPlanController {
    getPlan(req, res) {
        const userId = req.params.userId;
        const plan = TrainingPlanService.getTrainingPlan(userId);
        res.json(plan);
    }
}

export default new TrainingPlanController();
