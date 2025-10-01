export const TRAINING_REPORT_INITIAL_STATE: TrainingReport = {
    date: new Date().toISOString().slice(0, 10),
    sessionDescription: '',
    sessionModified: false,
    sessionModification: '',
    nutrition: '',
    physicalFeelings: '',
    breathing: '',
    rpe: '',
    mentalFeelings: '',
    motivacion: '',
    enfoque: '',
    sleep: '',
    otherFactors: '',
    notes: '',
};
export interface TrainingReport {
  // Datos de la Sesión
    date: string; // ISO date e.g. "2025-08-26"
    sessionDescription: string;
    sessionModified: boolean;
    sessionModification: string;
    nutrition: string;

    // Sensaciones Físicas
    physicalFeelings: string;
    breathing: string;
    rpe: string;

    // Mental
    mentalFeelings: string;
    motivacion: string;
    enfoque: string;

    // Recuperación y Contexto
    sleep: string;
    otherFactors: string;

    // Notas / Observaciones
    notes: string;
}
