
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { apiPost } from '../utils/api';
import { TextField, Box, Divider } from '@mui/material';
import theme from '../styles/theme';
import RetroCard from './ui/RetroCard';
import SectionTitle from './ui/SectionTitle';
import RetroButton from './ui/RetroButton';


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
    const location = useLocation();
    const [form, setForm] = useState(initialState);
    // Prefill si viene del calendario
    useEffect(() => {
        if (location.state && location.state.prefill) {
            // Solo sobreescribe los campos que existan en prefill
            setForm(f => ({
                ...f,
                ...location.state.prefill,
                execution: { ...f.execution, ...(location.state.prefill.execution || {}) },
                physiology: { ...f.physiology, ...(location.state.prefill.physiology || {}) },
                mental: { ...f.mental, ...(location.state.prefill.mental || {}) },
                recovery: { ...f.recovery, ...(location.state.prefill.recovery || {}) },
                takeaways: { ...f.takeaways, ...(location.state.prefill.takeaways || {}) },
            }));
        }
    }, [location.state]);
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
            const data = await apiPost('/reports', form);
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
        <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 mb-8 p-4" 
            style={{ backgroundColor: theme.lightBackground, color: theme.textPrimary }}>
            {/* Columna Izquierda: Formulario */}
            <div className="w-full lg:w-2/3 space-y-8">
                <RetroCard style={{ backgroundColor: theme.cardBackground }}>
                    <SectionTitle color={theme.yellow} textColor={theme.black}>Reporte Diario</SectionTitle>
                    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
                        <RetroCard>
                            <SectionTitle as="h3" color={theme.blue} textColor={theme.white}>Datos de la Sesión</SectionTitle>
                            <div className="space-y-4">
                                <TextField
                                    label="Fecha"
                                    name="date"
                                    type="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    slotProps={{ inputLabel: { shrink: true } }}
                                    error={!!errors.date}
                                    helperText={errors.date || 'e.g. 2025-09-07'}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    sx={theme.inputStyle.sx}
                                />
                                <TextField
                                    label="Sesión Planificada"
                                    name="plannedSession"
                                    value={form.plannedSession}
                                    onChange={handleChange}
                                    error={!!errors.plannedSession}
                                    helperText={errors.plannedSession || 'e.g. Endurance ride, 2x20min @ sweet spot'}
                                    placeholder="Describe el entrenamiento planificado"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    sx={theme.inputStyle.sx}
                                />
                                <TextField
                                    label="Sesión Completada"
                                    name="completedSession"
                                    value={form.completedSession}
                                    onChange={handleChange}
                                    multiline
                                    minRows={3}
                                    helperText="e.g. Entrenamiento real completado, desviaciones, etc."
                                    placeholder="Describe lo que hiciste"
                                    fullWidth
                                    variant="outlined"
                                    sx={theme.inputStyle.sx}
                                />
                                <TextField
                                    label="Duración"
                                    name="duration"
                                    value={form.duration}
                                    onChange={handleChange}
                                    helperText="e.g. 1h 30m"
                                    placeholder="Tiempo total"
                                    fullWidth
                                    variant="outlined"
                                    sx={theme.inputStyle.sx}
                                />
                                <TextField
                                    label="TSS"
                                    name="tss"
                                    type="number"
                                    value={form.tss}
                                    onChange={handleChange}
                                    helperText="Training Stress Score (número)"
                                    placeholder="e.g. 85"
                                    slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
                                    fullWidth
                                    variant="outlined"
                                    sx={theme.inputStyle.sx}
                                />
                                <TextField
                                    label="IF"
                                    name="intensityFactor"
                                    type="number"
                                    value={form.intensityFactor}
                                    onChange={handleChange}
                                    helperText="Intensity Factor (número)"
                                    placeholder="e.g. 0.85"
                                    slotProps={{ input: { step: '0.01', inputMode: 'decimal' } }}
                                    fullWidth
                                    variant="outlined"
                                    sx={theme.inputStyle.sx}
                                />
                                <TextField
                                    label="Avg HR"
                                    name="avgHr"
                                    type="number"
                                    value={form.avgHr}
                                    onChange={handleChange}
                                    helperText="Average Heart Rate (bpm)"
                                    placeholder="e.g. 145"
                                    slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
                                    fullWidth
                                    variant="outlined"
                                    sx={theme.inputStyle.sx}
                                />
                                <TextField
                                    label="NP"
                                    name="np"
                                    type="number"
                                    value={form.np}
                                    onChange={handleChange}
                                    helperText="Normalized Power (watts)"
                                    placeholder="e.g. 210"
                                    slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
                                    fullWidth
                                    variant="outlined"
                                    sx={theme.inputStyle.sx}
                                />
                            </div>
                        </RetroCard>
                        <Divider className="!my-4" style={{ backgroundColor: theme.textPrimary }} />
                        <RetroCard>
                            <SectionTitle color={theme.green} textColor={theme.white}>Ejecución</SectionTitle>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <TextField 
                                    label="Intervalos" 
                                    value={form.execution.intervals} 
                                    onChange={e => handleChange(e, 'execution', 'intervals')} 
                                    multiline minRows={2} 
                                    helperText="e.g. 2x20min @ 90% FTP" 
                                    placeholder="Describe los intervalos" 
                                    fullWidth variant="outlined" 
                                    sx={theme.inputStyle.sx} />
                                <TextField 
                                    label="Metas Alcanzadas" 
                                    value={form.execution.hitTargets} 
                                    onChange={e => handleChange(e, 'execution', 'hitTargets')}
                                    helperText="¿Alcanzaste las metas planificadas? (sí/no/ajustado)" 
                                    placeholder="sí / no / ajustado" 
                                    fullWidth variant="outlined" 
                                    sx={theme.inputStyle.sx} />
                                <TextField  
                                    label="Cadencia" 
                                    value={form.execution.cadence} 
                                    onChange={e => handleChange(e, 'execution', 'cadence')} 
                                    helperText="e.g. 90 rpm" 
                                    placeholder="Cadencia promedio" 
                                    fullWidth variant="outlined" 
                                    sx={theme.inputStyle.sx} />
                            </Box>
                        </RetroCard>
                        <Divider className="!my-4" style={{ backgroundColor: theme.textPrimary }} />
                        <RetroCard>
                            <SectionTitle color={theme.yellow} textColor={theme.black}>Fisiología y Percepción</SectionTitle>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <TextField 
                                    label="Piernas" 
                                    value={form.physiology.legs} 
                                    onChange={e => handleChange(e, 'physiology', 'legs')} 
                                    multiline minRows={2} 
                                    helperText="e.g. Se sentían fuertes, pesadas, con calambres, etc." 
                                    placeholder="¿Cómo se sintieron tus piernas?" 
                                    fullWidth variant="outlined" 
                                    sx={theme.inputStyle.sx} />
                                <TextField 
                                    label="Respiración"    
                                    value={form.physiology.breathing} 
                                    onChange={e => handleChange(e, 'physiology', 'breathing')} 
                                    helperText="e.g. Fácil, laboriosa, normal" 
                                    placeholder="Notas sobre la respiración" 
                                    fullWidth variant="outlined"    
                                    sx={theme.inputStyle.sx} />
                                <TextField  
                                    label="RPE" 
                                    value={form.physiology.rpe} 
                                    onChange={e => handleChange(e, 'physiology', 'rpe')} 
                                    type="number" 
                                    helperText="Tasa de esfuerzo percibido (1-10)" 
                                    placeholder="e.g. 7" 
                                    slotProps={{ inputMode: 'numeric', min: 1, max: 10 }} 
                                    fullWidth variant="outlined" 
                                    sx={theme.inputStyle.sx} />
                                <TextField label="Nutrición" value={form.physiology.nutrition} onChange={e => handleChange(e, 'physiology', 'nutrition')} helperText="e.g. Geles, barras, hidratación, etc." placeholder="¿Qué comiste/bebiste?" fullWidth variant="outlined" sx={theme.inputStyle.sx} />
                            </Box>
                        </RetroCard>
                        <Divider className="!my-4" style={{ backgroundColor: theme.textPrimary }} />
                        <RetroCard>
                            <SectionTitle color={theme.red} textColor={theme.white}>Mental</SectionTitle>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <TextField 
                                    label="Motivación" 
                                    value={form.mental.motivation} 
                                    onChange={e => handleChange(e, 'mental', 'motivation')} 
                                    multiline minRows={2} 
                                    helperText="e.g. Alta, baja, distraído, enfocado" 
                                    placeholder="Describe tu motivación" 
                                    fullWidth variant="outlined" 
                                    sx={theme.inputStyle.sx} />
                                <TextField 
                                    label="Enfoque" 
                                    value={form.mental.focus} 
                                    onChange={e => handleChange(e, 'mental', 'focus')} 
                                    helperText="e.g. Bueno, malo, variable" 
                                    placeholder="¿Qué tan enfocado estuviste?" 
                                    fullWidth variant="outlined" 
                                    sx={theme.inputStyle.sx} />
                            </Box>
                        </RetroCard>
                        <Divider className="!my-4" style={{ backgroundColor: theme.textPrimary }} />
                        <RetroCard>
                            <SectionTitle color={theme.green} textColor={theme.white}>Recuperación y Contexto</SectionTitle>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <TextField 
                                    label="Horas de sueño" 
                                    value={form.recovery.sleepHours} 
                                    onChange={e => handleChange(e, 'recovery', 'sleepHours')} 
                                    type="number" helperText="e.g. 7.5" 
                                    placeholder="¿Cuántas horas dormiste?" 
                                    slotProps={{ inputMode: 'numeric', min: 0, step: '0.1' }} 
                                    fullWidth variant="outlined" 
                                    sx={theme.inputStyle.sx} />
                                <TextField 
                                    label="Calidad del sueño" 
                                    value={form.recovery.sleepQuality} 
                                    onChange={e => handleChange(e, 'recovery', 'sleepQuality')} 
                                    helperText="e.g. Reparador, interrumpido, pobre" 
                                    placeholder="Describe la calidad de tu sueño" 
                                    fullWidth variant="outlined" 
                                    sx={theme.inputStyle.sx} />
                                <TextField 
                                    label="Otros Factores" 
                                    value={form.recovery.otherFactors} 
                                    onChange={e => handleChange(e, 'recovery', 'otherFactors')} 
                                    multiline minRows={2} 
                                    helperText="e.g. Estrés, viajes, enfermedad, etc." 
                                    placeholder="¿Algo más que afecte la recuperación?" 
                                    fullWidth variant="outlined" 
                                    sx={theme.inputStyle.sx} />
                            </Box>
                        </RetroCard>
                        <Divider className="!my-4" style={{ backgroundColor: theme.textPrimary }} />
                        <RetroCard>
                            <SectionTitle color={theme.yellow} textColor={theme.black}>Lecciones Clave</SectionTitle>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <TextField 
                                    label="Más Fuerte" 
                                    value={form.takeaways.strongest} 
                                    onChange={e => handleChange(e, 'takeaways', 'strongest')} 
                                    multiline minRows={2} 
                                    helperText="e.g. El mejor aspecto de la sesión" 
                                    placeholder="¿Qué fue lo mejor?" 
                                    fullWidth variant="outlined" 
                                    sx={theme.inputStyle.sx} />
                                <TextField 
                                    label="Más Débil" 
                                    value={form.takeaways.weakest}
                                    onChange={e => handleChange(e, 'takeaways', 'weakest')} 
                                    multiline minRows={2} 
                                    helperText="e.g. Lo que necesita mejorar" 
                                    placeholder="¿Qué fue lo más débil?" 
                                    fullWidth variant="outlined" 
                                    sx={theme.inputStyle.sx} />
                                <TextField 
                                    label="Adaptación" 
                                    value={form.takeaways.adaptation} 
                                    onChange={e => handleChange(e, 'takeaways', 'adaptation')} 
                                    multiline minRows={2} 
                                    helperText="e.g. Lo que aprendiste o adaptaste" 
                                    placeholder="Lección clave o adaptación" 
                                    fullWidth variant="outlined" sx={theme.inputStyle.sx} />
                            </Box>
                        </RetroCard>
                        <Box className="flex justify-center mt-4">
                            <RetroButton type="submit" color={theme.green} textColor={theme.white}>Enviar</RetroButton>
                        </Box>
                    </form>
                </RetroCard>
            </div>

            {/* Columna Derecha: Visor de Texto */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
                <RetroCard>
                    <SectionTitle color={theme.blue} textColor={theme.white}>Prompt Generado</SectionTitle>
                    {loading && <div className="text-blue-500">Cargando...</div>}
                    {error && <div className="text-red-500">{error}</div>}
                    <div className="w-full h-96 overflow-y-auto">
                        {reportText ? (
                            <pre className="whitespace-pre-wrap text-sm">{reportText}</pre>
                        ) : (
                            <span >Llena el formulario y envíalo para generar un prompt.</span>
                        )}
                    </div>
                </RetroCard>
            </div>
        </div>
    );
}
