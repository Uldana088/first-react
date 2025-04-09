// 1 task 
import React, { useState, createContext, useContext } from "react";

const translations = {
  kk: {
    greeting: "Сәлем",
    selectLang: "Тіл танда",
  },
  ru: {
    greeting: "Привет",
    selectLang: "Выбери язык",
  },
  en: {
    greeting: "Hello",
    selectLang: "Select Language",
  },
};

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("kk");

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => useContext(LanguageContext);

const Main = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div style={{ padding: "20px" }}>
      <h2>{t.greeting}</h2>
      <label>
        {t.selectLang}: &nbsp;
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="kk">Қазақша</option>
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>
      </label>
    </div>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <Main />
    </LanguageProvider>
  );
};

export default App;
