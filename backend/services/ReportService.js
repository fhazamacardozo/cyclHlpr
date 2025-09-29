// backend/services/ReportService.js
import ReportRepository from '../repositories/ReportRepository.js';
import { v4 as uuidv4 } from 'uuid';
import TrainingReport from '../models/TrainingReport.js';

class ReportService {
    createReport(data) {
        if (!data.date || !data.plannedSession) {
        throw new Error('Missing required fields: date, plannedSession');
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
        `Date: ${report.date}` +
        `\nPlanned Session: ${report.plannedSession}` +
        (report.completedSession ? `\nCompleted Session: ${report.completedSession}` : '') +
        (report.duration ? `\nDuration: ${report.duration}` : '') +
        (report.tss ? `\nTSS: ${report.tss}` : '') +
        (report.intensityFactor ? `\nIF: ${report.intensityFactor}` : '') +
        (report.avgHr ? `\nAvg HR: ${report.avgHr}` : '') +
        (report.np ? `\nNP: ${report.np}` : '') +
        section('Execution',
            report.execution ?
            [
                report.execution.intervals ? `Intervals: ${report.execution.intervals}` : '',
                report.execution.hitTargets !== undefined ? `Hit Targets: ${report.execution.hitTargets}` : '',
                report.execution.cadence ? `Cadence: ${report.execution.cadence}` : ''
            ].filter(Boolean).join('\n') : ''
        ) +
        section('Physiology',
            report.physiology ?
            [
                report.physiology.legs ? `Legs: ${report.physiology.legs}` : '',
                report.physiology.breathing ? `Breathing: ${report.physiology.breathing}` : '',
                report.physiology.rpe !== undefined ? `RPE: ${report.physiology.rpe}` : '',
                report.physiology.nutrition ? `Nutrition: ${report.physiology.nutrition}` : ''
            ].filter(Boolean).join('\n') : ''
        ) +
        section('Mental',
            report.mental ?
            [
                report.mental.motivation ? `Motivation: ${report.mental.motivation}` : '',
                report.mental.focus ? `Focus: ${report.mental.focus}` : ''
            ].filter(Boolean).join('\n') : ''
        ) +
        section('Recovery',
            report.recovery ?
            [
                report.recovery.sleepHours !== undefined ? `Sleep Hours: ${report.recovery.sleepHours}` : '',
                report.recovery.sleepQuality ? `Sleep Quality: ${report.recovery.sleepQuality}` : '',
                report.recovery.otherFactors ? `Other Factors: ${report.recovery.otherFactors}` : ''
            ].filter(Boolean).join('\n') : ''
        ) +
        section('Takeaways',
            report.takeaways ?
            [
                report.takeaways.strongest ? `Strongest: ${report.takeaways.strongest}` : '',
                report.takeaways.weakest ? `Weakest: ${report.takeaways.weakest}` : '',
                report.takeaways.adaptation ? `Adaptation: ${report.takeaways.adaptation}` : ''
            ].filter(Boolean).join('\n') : ''
        )
        );
    }
}

export default new ReportService();
