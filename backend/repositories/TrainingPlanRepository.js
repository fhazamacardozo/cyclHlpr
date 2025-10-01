// backend/repositories/TrainingPlanRepository.js

class TrainingPlanRepository {
    constructor() {
        this.trainingPlans = {
        1: {
            '2025-09-08': { sessionDescription: 'Endurance ride 2h', notes: 'Z2 focus' },
            '2025-09-09': { sessionDescription: 'Rest', notes: '' },
            '2025-09-10': { sessionDescription: 'Intervals 4x8min', notes: 'Z4, full recovery' }
        },
        2: {
            '2025-09-08': { sessionDescription: 'Tempo 1h', notes: '' },
            '2025-09-09': { sessionDescription: 'Endurance 90min', notes: 'Keep HR < 140' }
        }
        };
    }

    getByUserId(userId) {
        return this.trainingPlans[userId] || {};
    }
    }

export default new TrainingPlanRepository();
