// backend/services/ReportService.js
import ReportRepository from '../repositories/ReportRepository.js';
import { v4 as uuidv4 } from 'uuid';
import TrainingReport from '../models/TrainingReport.js';

class ReportService {
    createReport(data) {
        if (!data.date || !data.sessionDescription) {
            throw new Error('Missing required fields: date, sessionDescription');
        }
        const id = uuidv4();
        const report = new TrainingReport({ ...data, id });
        ReportRepository.add(report);
        return report;
    }

    getAllReports() {
        return ReportRepository.getAll();
    }

    formatReportText(report) {
        function section(title, content) {
            return content ? `\n\n## ${title}\n${content}` : '';
        }
        return (
            `Fecha: ${report.date}` +
            `\nDescripción de la sesión: ${report.sessionDescription}` +
            (report.sessionModified ? `\n¿Sesión modificada?: Sí` : `\n¿Sesión modificada?: No`) +
            (report.sessionModification ? `\nModificación: ${report.sessionModification}` : '') +
            section('Nutrición', report.nutrition) +
            section('Sensaciones físicas', report.physicalFeelings) +
            section('Respiración', report.breathing) +
            section('RPE', report.rpe) +
            section('Mental', [
                report.mentalFeelings ? `Sensaciones mentales: ${report.mentalFeelings}` : '',
                report.motivacion ? `Motivación: ${report.motivacion}` : '',
                report.enfoque ? `Enfoque: ${report.enfoque}` : ''
            ].filter(Boolean).join('\n')) +
            section('Recuperación y contexto', [
                report.sleep ? `Sueño: ${report.sleep}` : '',
                report.otherFactors ? `Otros factores: ${report.otherFactors}` : ''
            ].filter(Boolean).join('\n')) +
            section('Notas / Observaciones', report.notes)
        );
    }
}

export default new ReportService();
