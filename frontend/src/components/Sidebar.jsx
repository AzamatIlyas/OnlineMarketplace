import React from 'react';
import { Home, TrendingUp, Heart, ShoppingCart, User, Settings, MessageSquare, History, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';

const Sidebar = ({ isOpen, onClose }) => {
  const { language } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[language];

  const menuItems = [
    { icon: Home, label: t.home, path: '/' },
    { icon: TrendingUp, label: t.trending, path: '/trending' },
    { icon: Heart, label: t.favorites, path: '/favorites' },
    { icon: ShoppingCart, label: t.cart, path: '/cart' },
    { icon: User, label: t.account, path: '/account' },
    { icon: MessageSquare, label: t.messages, path: '/messages' },
    { icon: History, label: t.history, path: '/history' },
    { icon: Settings, label: t.settings, path: '/settings' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 z-40 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400"
        >
          <X size={24} />
        </button>

        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
