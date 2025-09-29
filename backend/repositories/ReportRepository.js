// backend/repositories/ReportRepository.js

class ReportRepository {
    constructor() {
        this.reports = [];
    }

    add(report) {
        this.reports.push(report);
        return report;
    }

    getAll() {
        return this.reports;
    }
}

export default new ReportRepository();
