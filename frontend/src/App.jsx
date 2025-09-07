

import { useState, useEffect } from 'react';
import DailyTrainingReportForm from './components/DailyTrainingReportForm';
import ThemeToggle from './components/ThemeToggle';


function App() {
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-green-100 to-blue-200 dark:from-black dark:to-gray-900 transition-colors">
      <div className="w-full max-w-2xl flex items-center justify-between py-6">
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-300">Cycling Training App</h1>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <DailyTrainingReportForm />
    </div>
  );
}

export default App;
