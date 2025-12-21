import { LogIn, UserPlus, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import AuthModal from './AuthModal';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, t, themeClasses, activeSection } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  if (!isAuthenticated) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-96 p-8">
          <div className={`${themeClasses.card} rounded-2xl p-8 max-w-md text-center shadow-lg`}>
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h3 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>{t.loginToAccess}</h3>
            <p className={`${themeClasses.textSecondary} mb-6`}>
              {t.loginToView} {activeSection === 'favorites' ? t.favorites.toLowerCase() : activeSection === 'cart' ? t.cart.toLowerCase() : activeSection === 'messages' ? t.messages.toLowerCase() : activeSection === 'history' ? t.history.toLowerCase() : t.account.toLowerCase()}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => openAuthModal('login')}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                {t.login}
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="flex-1 border-2 border-purple-600 text-purple-600 font-bold py-3 rounded-xl hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                {t.register}
              </button>
            </div>
          </div>
        </div>

        {showAuthModal && (
          <AuthModal 
            authMode={authMode}
            setAuthMode={setAuthMode}
            onClose={() => setShowAuthModal(false)}
          />
        )}
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
