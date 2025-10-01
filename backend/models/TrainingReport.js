// backend/models/TrainingReport.js

class TrainingReport {
    constructor({
        id,
        date,
        sessionDescription,
        sessionModified,
        sessionModification,
        nutrition,
        physicalFeelings,
        breathing,
        rpe,
        mentalFeelings,
        motivacion,
        enfoque,
        sleep,
        otherFactors,
        notes
    }) {
        this.id = id;
        this.date = date;
        this.sessionDescription = sessionDescription;
        this.sessionModified = sessionModified;
        this.sessionModification = sessionModification;
        this.nutrition = nutrition;
        this.physicalFeelings = physicalFeelings;
        this.breathing = breathing;
        this.rpe = rpe;
        this.mentalFeelings = mentalFeelings;
        this.motivacion = motivacion;
        this.enfoque = enfoque;
        this.sleep = sleep;
        this.otherFactors = otherFactors;
        this.notes = notes;
    }
}

export default TrainingReport;
