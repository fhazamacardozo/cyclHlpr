import ReportService from '../services/ReportService.js';

class ReportController {
    create(req, res) {
        try {
        const report = ReportService.createReport(req.body);
        const reportText = ReportService.formatReportText(report);
        res.json({ success: true, reportText });
        } catch (err) {
        res.status(400).json({ success: false, error: err.message });
        }
    }

    getAll(req, res) {
        const reports = ReportService.getAllReports();
        res.json(reports);
    }
}

export default new ReportController();
