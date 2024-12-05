import React, { useState, useEffect } from 'react';
import styles from './Hrader.module.css';

const Thememode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <header className={`${styles.header} ${isDarkMode ? styles.dark : ''}`}>
      <div className={styles.container}>
        
        <div className={styles.actions}>
          <button 
            onClick={toggleTheme} 
            className={styles.themeToggle}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
        </div>
      </div>
    </header>
  );
};

export default Thememode;

