// backend/server.js
const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory storage for reports
const reports = [];

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// POST /api/reports
app.post('/api/reports', (req, res) => {
    const report = req.body;
    // Validate required fields
    if (!report.date || !report.plannedSession) {
        return res.status(400).json({ success: false, error: 'Missing required fields: date, plannedSession' });
    }

    // Format training prompt (same headings as frontend preview)
    function section(title, content) {
        return content ? `\n\n## ${title}\n${content}` : '';
    }
    const reportText =
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
        );

    const id = uuidv4();
    const stored = { ...report, id };
    reports.push(stored);
    res.json({ success: true, reportText });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
