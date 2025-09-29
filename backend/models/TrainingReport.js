// backend/models/TrainingReport.js

class TrainingReport {
    constructor({
        date,
        plannedSession,
        completedSession,
        duration,
        tss,
        intensityFactor,
        avgHr,
        np,
        files,
        execution,
        physiology,
        mental,
        recovery,
        takeaways,
        id
    }) {
        this.id = id;
        this.date = date;
        this.plannedSession = plannedSession;
        this.completedSession = completedSession;
        this.duration = duration;
        this.tss = tss;
        this.intensityFactor = intensityFactor;
        this.avgHr = avgHr;
        this.np = np;
        this.files = files;
        this.execution = execution;
        this.physiology = physiology;
        this.mental = mental;
        this.recovery = recovery;
        this.takeaways = takeaways;
    }
}

export default TrainingReport;
