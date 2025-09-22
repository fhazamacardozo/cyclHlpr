import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function TrainingSessionCard({ date, plannedSession, duration, nutrition, compact }) {
    if (compact) {
        return (
        <div className="rounded bg-green-950 border border-green-700 px-2 py-1 mb-1 text-left shadow-sm">
            <div className="font-semibold text-green-300 text-xs truncate">{plannedSession || 'No planned session'}</div>
            <div className="text-[11px] text-blue-300">{duration ? `⏱️ ${duration}` : ''}</div>
            <div className="text-[11px] text-yellow-300 truncate">{nutrition ? `🍌 ${nutrition}` : ''}</div>
        </div>
        );
    }
    return (
        <Card className="mb-4 shadow-md border border-green-700bg-gray-900 transition-colors">
        <CardContent>
            <Box className="flex flex-col gap-2">
            <Typography variant="subtitle2" className="text-gray-400">
                {date ? new Date(date).toLocaleDateString() : 'No date'}
            </Typography>
            <Typography variant="h6" className="text-green-300 font-bold">
                {plannedSession || 'No planned session'}
            </Typography>
            <Typography variant="body2" className="text-blue-300">
                Duration: {duration || '—'}
            </Typography>
            <Typography variant="body2" className="text-yellow-300">
                Nutrition: {nutrition || '—'}
            </Typography>
            </Box>
        </CardContent>
        </Card>
    );
}
