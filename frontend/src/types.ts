// src/types.ts
export interface TrainingReport {
  date: string; // ISO date e.g. "2025-08-26"
    plannedSession: string;
    completedSession?: string;
    duration?: string;
    tss?: number;
    intensityFactor?: number;
    avgHr?: number;
    np?: number;
    files?: string[];     // file names or URLs
    execution?: {
        intervals?: string;
        hitTargets?: boolean | "adjusted";
        cadence?: string;
    };
    physiology?: {
        legs?: string;
        breathing?: string;
        rpe?: number;
        nutrition?: string;
    };
    mental?: {
        motivation?: string;
        focus?: string;
    };
    recovery?: {
        sleepHours?: number;
        sleepQuality?: string;
        otherFactors?: string;
    };
    takeaways?: {
        strongest?: string;
        weakest?: string;
        adaptation?: string;
    };
}
