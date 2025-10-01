
import { useState, useEffect } from 'react';
import { TRAINING_REPORT_INITIAL_STATE } from '../types';
import { useLocation } from 'react-router-dom';
import { apiPost } from '../utils/api';
import { TextField, Box, Divider } from '@mui/material';
import theme from '../styles/theme';
import RetroCard from './ui/RetroCard';
import SectionTitle from './ui/SectionTitle';
import RetroButton from './ui/RetroButton';

export default function DailyTrainingReportForm() {
    const location = useLocation();
    const [form, setForm] = useState(TRAINING_REPORT_INITIAL_STATE);
    // Prefill si viene del calendario
    useEffect(() => {
        if (location.state && location.state.prefill) {
            // Solo sobreescribe los campos que existan en TRAINING_REPORT_INITIAL_STATE
            setForm(f => {
                const validKeys = Object.keys(TRAINING_REPORT_INITIAL_STATE);
                const filteredPrefill = Object.fromEntries(
                    Object.entries(location.state.prefill).filter(([k]) => validKeys.includes(k))
                );
                return {
                    ...f,
                    ...filteredPrefill
                };
            });
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.date) newErrors.date = 'Requerido';
        if (!form.sessionDescription) newErrors.sessionDescription = 'Requerido';
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
                                    label="Descripción de la sesión"
                                    name="sessionDescription"
                                    value={form.sessionDescription}
                                    onChange={handleChange}
                                    multiline
                                    minRows={3}
                                    error={!!errors.sessionDescription}
                                    helperText={errors.sessionDescription || 'Plan, ejecución, duración, datos relevantes'}
                                    placeholder="Describe el entrenamiento y lo realizado"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    sx={theme.inputStyle.sx}
                                />
                                <div className="flex items-center gap-2 mt-2">
                                    <input
                                        type="checkbox"
                                        id="sessionModified"
                                        name="sessionModified"
                                        checked={form.sessionModified}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="sessionModified" className="font-medium">¿La sesión fue modificada durante el entreno?</label>
                                </div>
                                {form.sessionModified && (
                                    <TextField
                                        label="Modificación de la sesión"
                                        name="sessionModification"
                                        value={form.sessionModification}
                                        onChange={handleChange}
                                        multiline
                                        minRows={2}
                                        helperText="Describe los cambios realizados respecto al plan original."
                                        placeholder="¿Qué cambió y por qué?"
                                        fullWidth
                                        variant="outlined"
                                        sx={theme.inputStyle.sx}
                                    />
                                )}
                                <TextField
                                    label="Nutrición"
                                    name="nutrition"
                                    value={form.nutrition}
                                    onChange={handleChange}
                                    helperText="Ejemplo: 140g CHO, hidratación, geles, etc."
                                    placeholder="¿Qué consumiste durante la sesión?"
                                    fullWidth
                                    variant="outlined"
                                    sx={theme.inputStyle.sx}
                                />
                            </div>
                        </RetroCard>
                        <Divider className="!my-4" style={{ backgroundColor: theme.textPrimary }} />
                        <RetroCard>
                            <SectionTitle color={theme.green} textColor={theme.white}>Sensaciones Físicas</SectionTitle>
                            <TextField
                                label="Piernas / Sensaciones físicas"
                                name="physicalFeelings"
                                value={form.physicalFeelings}
                                onChange={handleChange}
                                multiline
                                minRows={2}
                                helperText="Ejemplo: pesadas, frescas, doloridas, etc."
                                placeholder="¿Cómo se sintieron tus piernas?"
                                fullWidth
                                variant="outlined"
                                sx={theme.inputStyle.sx}
                            />
                            <TextField
                                label="Respiración"
                                name="breathing"
                                value={form.breathing}
                                onChange={handleChange}
                                helperText="Ejemplo: controlada, agitada, normal, etc."
                                placeholder="¿Cómo fue tu respiración?"
                                fullWidth
                                variant="outlined"
                                sx={theme.inputStyle.sx}
                            />
                            <TextField
                                label="RPE (Esfuerzo percibido)"
                                name="rpe"
                                value={form.rpe}
                                onChange={handleChange}
                                helperText="Tasa de esfuerzo percibido (1-10)"
                                placeholder="e.g. 7"
                                type="number"
                                inputProps={{ min: 1, max: 10 }}
                                fullWidth
                                variant="outlined"
                                sx={theme.inputStyle.sx}
                            />
                            {/* Nutrición movido a Datos de la Sesión */}
                        </RetroCard>
                        <Divider className="!my-4" style={{ backgroundColor: theme.textPrimary }} />
                        <RetroCard>
                            <SectionTitle color={theme.red} textColor={theme.white}>Mental</SectionTitle>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <TextField
                                    label="Sensaciones mentales"
                                    name="mentalFeelings"
                                    value={form.mentalFeelings}
                                    onChange={handleChange}
                                    multiline
                                    minRows={2}
                                    helperText="Ánimo general, pensamientos, etc."
                                    placeholder="¿Cómo te sentiste mentalmente?"
                                    fullWidth
                                    variant="outlined"
                                    sx={theme.inputStyle.sx}
                                />
                                <TextField
                                    label="Motivación"
                                    name="motivacion"
                                    value={form.motivacion}
                                    onChange={handleChange}
                                    helperText="Ejemplo: alta, baja, distraído, enfocado"
                                    placeholder="Describe tu motivación"
                                    fullWidth
                                    variant="outlined"
                                    sx={theme.inputStyle.sx}
                                />
                                <TextField
                                    label="Enfoque"
                                    name="enfoque"
                                    value={form.enfoque}
                                    onChange={handleChange}
                                    helperText="Ejemplo: bueno, malo, variable"
                                    placeholder="¿Qué tan enfocado estuviste?"
                                    fullWidth
                                    variant="outlined"
                                    sx={theme.inputStyle.sx}
                                />
                            </Box>
                        </RetroCard>
                        <Divider className="!my-4" style={{ backgroundColor: theme.textPrimary }} />
                        <RetroCard>
                            <SectionTitle color={theme.green} textColor={theme.white}>Recuperación y Contexto</SectionTitle>
                            <TextField
                                label="Sueño (horas y calidad)"
                                name="sleep"
                                value={form.sleep}
                                onChange={handleChange}
                                helperText="e.g. 7h, reparador, interrumpido, etc."
                                placeholder="¿Cómo dormiste?"
                                fullWidth
                                variant="outlined"
                                sx={theme.inputStyle.sx}
                            />
                            <TextField
                                label="Otros factores"
                                name="otherFactors"
                                value={form.otherFactors}
                                onChange={handleChange}
                                multiline
                                minRows={2}
                                helperText="Estrés, viajes, enfermedad, contexto, etc."
                                placeholder="¿Algo más relevante?"
                                fullWidth
                                variant="outlined"
                                sx={theme.inputStyle.sx}
                            />
                        </RetroCard>
                        <Divider className="!my-4" style={{ backgroundColor: theme.textPrimary }} />
                        <RetroCard>
                            <SectionTitle color={theme.yellow} textColor={theme.black}>Notas / Observaciones</SectionTitle>
                            <TextField
                                label="Notas, lecciones, observaciones"
                                name="notes"
                                value={form.notes}
                                onChange={handleChange}
                                multiline
                                minRows={2}
                                helperText="Lo más relevante, aprendizajes, cosas a mejorar, etc."
                                placeholder="¿Qué aprendiste hoy?"
                                fullWidth
                                variant="outlined"
                                sx={theme.inputStyle.sx}
                            />
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
