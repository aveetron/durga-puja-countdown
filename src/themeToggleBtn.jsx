import React from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={24} className="text-yellow-400" />
      ) : (
        <Moon size={24} className="text-blue-600" />
      )}
    </button>
  );
};

export default ThemeToggle;