import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DailyTrainingReportForm from './components/DailyTrainingReportForm';
import MonthGridCalendar from './components/MonthGridCalendar';
import colors from './styles/theme';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col transition-colors" 
      style={{ backgroundColor: colors.lightBackground }}>
      <Navbar />
      <main className="w-full flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<DailyTrainingReportForm />} />
          <Route path="/weekly" element={<div className="w-full max-w-2xl p-6 mb-8 bg-gray-100 border-2 border-blue-200 rounded-lg text-center text-lg text-blue-700">Weekly Check-In form coming soon...</div>} />
          <Route path="/calendar" element={
            <MonthGridCalendar
              year={2025}
              month={8} // September (0-based)
              sessions={[
                      { date: '2025-09-07', plannedSession: 'Endurance ride', duration: '1h 30m', nutrition: '2 gels, 1 bottle' },
                      { date: '2025-09-10', plannedSession: 'Intervals', duration: '1h', nutrition: '1 bar' },
                      { date: '2025-09-15', plannedSession: 'Recovery spin', duration: '1h', nutrition: '' },
                      { date: '2025-09-21', plannedSession: 'Long ride', duration: '3h', nutrition: '3 gels, 2 bottles' },
                    ]}
                  />
                } />
              </Routes>
            </main>
          </div>
    </Router>
  );
}

export default App;
