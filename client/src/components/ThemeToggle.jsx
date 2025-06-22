import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (!('darkMode' in localStorage) && 
                   window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 
                  focus:ring-offset-2 dark:focus:ring-offset-gray-800 border-solid border-2 
                  dark:border-gray-800"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        <SunIcon className={`w-5 h-5 text-yellow-500 transition-all duration-300 ${darkMode ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
        
        <MoonIcon className={`absolute w-5 h-5 text-blue-400 transition-all duration-300 ${darkMode ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
      </div>
      
      <span className={`absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700 opacity-10 transition-all duration-300 ${darkMode ? 'scale-100' : 'scale-0'}`}></span>
    </button>
  );
};

export default ThemeToggle;