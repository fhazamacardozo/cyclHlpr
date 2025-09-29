import { useEffect, useState } from 'react';
import { apiGet } from '../utils/api';
import MonthGridCalendar from './MonthGridCalendar';



function CalendarContainer() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth()); // 0-based


    useEffect(() => {
        setLoading(true);
        apiGet('/training-plan/2')
            .then(plan => {
                // Transforma el objeto recibido en array de sesiones
                const sessionsArr = Object.entries(plan).map(([date, s]) => ({
                    date,
                    plannedSession: s.session,
                    notes: s.notes,
                }));
                setSessions(sessionsArr);
            })
            .catch(() => setSessions([]))
            .finally(() => setLoading(false));
    }, [year, month]);

    // Funciones para cambiar mes y año
    const handlePrevMonth = () => {
        setMonth(prev => {
            if (prev === 0) {
                setYear(y => y - 1);
                return 11;
            }
            return prev - 1;
        });
    };
    const handleNextMonth = () => {
        setMonth(prev => {
            if (prev === 11) {
                setYear(y => y + 1);
                return 0;
            }
            return prev + 1;
        });
    };


    if (loading) return <div className="text-blue-400 p-4">Cargando calendario...</div>;

    // Nombre del mes
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return (
        <div className="w-full max-w-6xl mx-auto mb-4">
            <div className="flex items-center justify-between mb-2">
                <button onClick={handlePrevMonth} className="px-2 py-1 bg-blue-900 text-white rounded hover:bg-blue-700">◀</button>
                <span className="font-bold text-lg text-blue-200">{monthNames[month]} {year}</span>
                <button onClick={handleNextMonth} className="px-2 py-1 bg-blue-900 text-white rounded hover:bg-blue-700">▶</button>
            </div>
            <MonthGridCalendar
                year={year}
                month={month}
                sessions={sessions}
            />
        </div>
    );
}

export default CalendarContainer;