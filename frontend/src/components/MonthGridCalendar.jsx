import TrainingSessionCard from './ui/TrainingSessionCard';
import { useNavigate } from 'react-router-dom';

function getMonthMatrix(year, month) {
  // month: 0-based
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const matrix = [];
    let week = [];
    let dayOfWeek = firstDay.getDay();
    // Fill initial empty days
    for (let i = 0; i < dayOfWeek; i++) week.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) {
        week.push(new Date(year, month, d));
        if (week.length === 7) {
        matrix.push(week);
        week = [];
        }
    }
    if (week.length) {
        while (week.length < 7) week.push(null);
        matrix.push(week);
    }
    return matrix;
    }

export default function MonthGridCalendar({ sessions = [], year, month }) {
    // sessions: array of { date, ... }
    // year: 4-digit, month: 0-based
    const sessionMap = {};
    sessions.forEach(s => {
        if (s.date) {
            const key = s.date.slice(0, 10);
            sessionMap[key] = s;
        }
    });
    const matrix = getMonthMatrix(year, month);
    const monthName = new Date(year, month, 1).toLocaleString('default', { month: 'long' });
    const navigate = useNavigate();

    // Handler para click en tarjeta
    const handleCardClick = (session) => {
        navigate('/', { state: { prefill: session } });
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="text-2xl font-bold text-left mb-4 text-green-200 pl-2">
                {monthName} {year}
            </div>
            <div className="bg-gray-900/95 rounded-lg p-2 shadow">
                <div className="grid grid-cols-7">
                    {[
                        "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
                    ].map(d => (
                        <div key={d} 
                            className="text-center font-semibold text-blue-200 py-1 border-b border-gray-800 text-sm">
                            {d}
                        </div>
                    ))}
                </div>
                {matrix.map((week, wi) => (
                    <div key={wi} className="grid grid-cols-7 min-h-[100px]">
                        {week.map((date, di) => {
                            const key = date ? date.toISOString().slice(0,10) : `empty-${wi}-${di}`;
                            const session = date ? sessionMap[date.toISOString().slice(0,10)] : null;
                            return (
                                <div
                                    key={key}
                                    className="border border-gray-800 bg-gray-900/95 rounded-sm p-1 flex 
                                    flex-col items-stretch min-h-[100px] hover:z-10 hover:shadow-lg transition-shadow relative"
                                    style={{ minHeight: 120, cursor: session ? 'pointer' : 'default' }}
                                    onClick={session ? () => handleCardClick(session) : undefined}
                                >
                                    <div className="text-xs font-semiboldtext-gray-300 mb-1 text-right pr-1 select-none">
                                        {date ? date.getDate() : ''}
                                    </div>
                                    {session && (
                                        <TrainingSessionCard {...session} compact />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
        
