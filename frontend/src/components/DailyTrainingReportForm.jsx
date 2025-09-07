import { useState } from 'react';
import { TextField, Button, Paper, Typography, Grid, Box, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';

const Section = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    background: theme.palette.mode === 'dark' ? '#222' : '#f9f9f9',
    borderRadius: theme.shape.borderRadius,
    }));

    const initialState = {
    date: '',
    plannedSession: '',
    completedSession: '',
    duration: '',
    tss: '',
    intensityFactor: '',
    avgHr: '',
    np: '',
    execution: { intervals: '', hitTargets: '', cadence: '' },
    physiology: { legs: '', breathing: '', rpe: '', nutrition: '' },
    mental: { motivation: '', focus: '' },
    recovery: { sleepHours: '', sleepQuality: '', otherFactors: '' },
    takeaways: { strongest: '', weakest: '', adaptation: '' },
    };


    export default function DailyTrainingReportForm() {
        const [form, setForm] = useState(initialState);
        const [errors, setErrors] = useState({});
        const [loading, setLoading] = useState(false);
        const [reportText, setReportText] = useState('');
        const [error, setError] = useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            const newErrors = validate();
            setErrors(newErrors);
            if (Object.keys(newErrors).length > 0) return;
            setLoading(true);
            setError('');
            setReportText('');
            try {
                const res = await fetch('http://localhost:5000/api/reports', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Server error');
                setReportText(data.reportText);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

    const handleChange = (e, section, field) => {
        if (section) {
        setForm({
            ...form,
            [section]: { ...form[section], [field]: e.target.value },
        });
        } else {
        setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!form.date) newErrors.date = 'Required';
        if (!form.plannedSession) newErrors.plannedSession = 'Required';
        return newErrors;
    };

    return (
        <Paper elevation={3} className="w-full max-w-2xl p-6 mb-8 dark:bg-gray-800">
        <Typography variant="h5" className="mb-4 text-green-700 dark:text-green-300">Daily Training Report</Typography>
        
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                label="Date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={!!errors.date}
                helperText={errors.date}
                fullWidth
                required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                label="Planned Session"
                name="plannedSession"
                value={form.plannedSession}
                onChange={handleChange}
                error={!!errors.plannedSession}
                helperText={errors.plannedSession}
                fullWidth
                required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                label="Completed Session"
                name="completedSession"
                value={form.completedSession}
                onChange={handleChange}
                fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                label="Duration"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                label="TSS"
                name="tss"
                type="number"
                value={form.tss}
                onChange={handleChange}
                fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                label="IF"
                name="intensityFactor"
                type="number"
                value={form.intensityFactor}
                onChange={handleChange}
                fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                label="Avg HR"
                name="avgHr"
                type="number"
                value={form.avgHr}
                onChange={handleChange}
                fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                label="NP"
                name="np"
                type="number"
                value={form.np}
                onChange={handleChange}
                fullWidth
                />
            </Grid>
            </Grid>

            <Section>
            <Typography variant="subtitle1">Execution</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                <TextField label="Intervals" value={form.execution.intervals} onChange={e => handleChange(e, 'execution', 'intervals')} fullWidth />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField label="Hit Targets" value={form.execution.hitTargets} onChange={e => handleChange(e, 'execution', 'hitTargets')} fullWidth />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField label="Cadence" value={form.execution.cadence} onChange={e => handleChange(e, 'execution', 'cadence')} fullWidth />
                </Grid>
            </Grid>
            </Section>
            <Section>
            <Typography variant="subtitle1">Physiology & Perception</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                <TextField label="Legs" value={form.physiology.legs} onChange={e => handleChange(e, 'physiology', 'legs')} fullWidth />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField label="Breathing" value={form.physiology.breathing} onChange={e => handleChange(e, 'physiology', 'breathing')} fullWidth />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField label="RPE" value={form.physiology.rpe} onChange={e => handleChange(e, 'physiology', 'rpe')} fullWidth />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField label="Nutrition" value={form.physiology.nutrition} onChange={e => handleChange(e, 'physiology', 'nutrition')} fullWidth />
                </Grid>
            </Grid>
            </Section>
            <Section>
            <Typography variant="subtitle1">Mental</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField label="Motivation" value={form.mental.motivation} onChange={e => handleChange(e, 'mental', 'motivation')} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField label="Focus" value={form.mental.focus} onChange={e => handleChange(e, 'mental', 'focus')} fullWidth />
                </Grid>
            </Grid>
            </Section>
            <Section>
            <Typography variant="subtitle1">Recovery / Context</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                <TextField label="Sleep Hours" value={form.recovery.sleepHours} onChange={e => handleChange(e, 'recovery', 'sleepHours')} fullWidth />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField label="Sleep Quality" value={form.recovery.sleepQuality} onChange={e => handleChange(e, 'recovery', 'sleepQuality')} fullWidth />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField label="Other Factors" value={form.recovery.otherFactors} onChange={e => handleChange(e, 'recovery', 'otherFactors')} fullWidth />
                </Grid>
            </Grid>
            </Section>
            <Section>
            <Typography variant="subtitle1">Takeaways</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                <TextField label="Strongest" value={form.takeaways.strongest} onChange={e => handleChange(e, 'takeaways', 'strongest')} fullWidth />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField label="Weakest" value={form.takeaways.weakest} onChange={e => handleChange(e, 'takeaways', 'weakest')} fullWidth />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField label="Adaptation" value={form.takeaways.adaptation} onChange={e => handleChange(e, 'takeaways', 'adaptation')} fullWidth />
                </Grid>
            </Grid>
            </Section>
            <Box className="flex justify-end mt-4">
            <Button type="submit" variant="contained" color="success">
                Submit
            </Button>
            </Box>
        </form>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {reportText && (
            <pre className="bg-gray-100 p-2 mt-2 whitespace-pre-wrap">{reportText}</pre>
        )}
        
        </Paper>
    );
}
