// backend/services/TrainingPlanService.js
import TrainingPlanRepository from '../repositories/TrainingPlanRepository.js';

class TrainingPlanService {
    getTrainingPlan(userId) {
        return TrainingPlanRepository.getByUserId(userId);
    }
    }

export default new TrainingPlanService();
