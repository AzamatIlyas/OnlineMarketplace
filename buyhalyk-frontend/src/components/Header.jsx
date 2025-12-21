import { useState } from 'react';
import { Search, Bell, Moon, Sun, User, Camera } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AuthModal from './AuthModal';

const Header = () => {
  const { 
    darkMode, 
    setDarkMode, 
    isAuthenticated, 
    setActiveSection, 
    t, 
    themeClasses,
    activeSection
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const sidebarItems = [
    { id: 'home', label: t.home },
    { id: 'trending', label: t.trending },
    { id: 'messages', label: t.messages },
    { id: 'history', label: t.history },
    { id: 'favorites', label: t.favorites },
    { id: 'cart', label: t.cart },
    { id: 'account', label: t.account },
    { id: 'settings', label: t.settings },
  ];

  return (
    <>
      <header className={`${themeClasses.card} shadow-sm sticky top-0 z-10`}>
        <div className="px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className={`text-2xl font-semibold ${themeClasses.text}`}>
              {sidebarItems.find(item => item.id === activeSection)?.label || 'Home'}
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center hover:bg-gray-200 transition-colors`}
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              <button className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center hover:bg-gray-200 transition-colors relative`}>
                <Bell className={`w-5 h-5 ${themeClasses.textSecondary}`} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {isAuthenticated ? (
                <button 
                  onClick={() => setActiveSection('account')}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <User className="w-5 h-5 text-white" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm"
                  >
                    {t.login}
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all text-sm"
                  >
                    {t.register}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary} w-5 h-5`} />
            <input
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-12 py-3 ${themeClasses.input} border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
            />
            <button className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary} hover:text-purple-600 transition-colors`}>
              <Camera className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {showAuthModal && (
        <AuthModal 
          authMode={authMode}
          setAuthMode={setAuthMode}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
};

export default Header;
