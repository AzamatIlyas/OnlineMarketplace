import { useApp } from '../context/AppContext';

const SettingsPage = () => {
  const { t, themeClasses, darkMode, setDarkMode, language, setLanguage } = useApp();

  return (
    <section className="p-8 max-w-4xl space-y-6">
      <div className={`${themeClasses.card} rounded-2xl p-6`}>
        <h3 className={`text-lg font-bold ${themeClasses.text} mb-4`}>{t.generalSettings}</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-semibold ${themeClasses.text}`}>{t.darkTheme}</p>
              <p className={`text-sm ${themeClasses.textSecondary}`}>{t.changeColorScheme}</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-14 h-8 rounded-full transition-colors ${darkMode ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-7' : 'translate-x-1'}`}></div>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-semibold ${themeClasses.text}`}>{t.language}</p>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`px-4 py-2 ${themeClasses.input} rounded-xl border-0 cursor-pointer`}
            >
              <option value="ru">Русский</option>
              <option value="kk">Қазақша</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;
