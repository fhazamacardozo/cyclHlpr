import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DailyTrainingReportForm from './components/DailyTrainingReportForm';
import CalendarContainer from './components/CalendarContainer';
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
          <Route path="/calendar" element={<CalendarContainer />} />
        </Routes>
            </main>
          </div>
    </Router>
  );
}

export default App;
