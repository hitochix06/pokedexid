import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => {
      switch (prev) {
        case 'en':
          return 'fr';
        case 'fr':
          return 'ja';
        default:
          return 'en';
      }
    });
  };

  const setSpecificLanguage = (lang) => {
    if (['en', 'fr', 'ja'].includes(lang)) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      toggleLanguage,
      setSpecificLanguage 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
} 