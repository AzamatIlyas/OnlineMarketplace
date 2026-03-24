import React, { useState } from 'react';
import { Menu, ShoppingCart, Heart, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AuthModal from './AuthModal';
import { translations } from '../utils/translations';

const Header = ({ onMenuClick }) => {
  const { language, setLanguage, isAuthenticated, user, cart } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const t = translations[language];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button onClick={onMenuClick} className="lg:hidden">
              <Menu className="text-gray-700 dark:text-gray-300" />
            </button>
            <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>
              BuyHalyk
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="ru">RU</option>
              <option value="kk">KK</option>
              <option value="en">EN</option>
            </select>

            <button onClick={() => navigate('/favorites')} className="relative">
              <Heart className="text-gray-700 dark:text-gray-300" />
            </button>

            <button onClick={() => navigate('/cart')} className="relative">
              <ShoppingCart className="text-gray-700 dark:text-gray-300" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <button onClick={() => navigate('/account')} className="flex items-center gap-2">
                <User className="text-gray-700 dark:text-gray-300" />
                <span className="hidden md:inline dark:text-white">{user?.full_name}</span>
              </button>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {t.login}
              </button>
            )}
          </div>
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Header;
