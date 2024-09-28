import React, { useState, useEffect } from 'react';
import './index.css'; 
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

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        দিন: Math.floor(difference / (1000 * 60 * 60 * 24)),
        ঘণ্টা: Math.floor((difference / (1000 * 60 * 60)) % 24),
        মিনিট: Math.floor((difference / 1000 / 60) % 60),
        সেকেন্ড: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const convertToBengaliNumeral = (number) => {
    const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number.toString().split('').map(digit => bengaliNumerals[parseInt(digit)]).join('');
  };

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span className="mx-1" key={interval}>
        {convertToBengaliNumeral(timeLeft[interval])} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
      {timerComponents.length ? timerComponents : <span>আপনার ও আপনার পরিবারের শান্তি কামনা করছি।</span>}
    </div>
  );
};

const App = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-gray-800 dark:to-gray-900 p-4 transition-colors duration-200">
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      <div className="max-w-sm w-full rounded-lg overflow-hidden">
        <a href="#">
          <img className="rounded-t-lg w-full" src="/durga.jpg" alt="" />
        </a>
        <div className="p-5 bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm text-center">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">শারদীয় শুভেচ্ছা</h5>
          </a>
          <div className="flex flex-col items-center">
            <CountdownTimer targetDate="2024-10-10T00:00:00" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;