// backend/repositories/TrainingPlanRepository.js

class TrainingPlanRepository {
    constructor() {
        this.trainingPlans = {
        1: {
            '2025-09-08': { session: 'Endurance ride 2h', notes: 'Z2 focus' },
            '2025-09-09': { session: 'Rest', notes: '' },
            '2025-09-10': { session: 'Intervals 4x8min', notes: 'Z4, full recovery' }
        },
        2: {
            '2025-09-08': { session: 'Tempo 1h', notes: '' },
            '2025-09-09': { session: 'Endurance 90min', notes: 'Keep HR < 140' }
        }
        };
    }

    getByUserId(userId) {
        return this.trainingPlans[userId] || {};
    }
    }

export default new TrainingPlanRepository();
