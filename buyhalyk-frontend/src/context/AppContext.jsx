import { createContext, useContext, useState } from 'react';
import { translations } from '../utils/translations';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('ru');
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const t = translations[language];

  const themeClasses = {
    bg: darkMode ? 'bg-gray-900' : 'bg-gray-50',
    card: darkMode ? 'bg-gray-800' : 'bg-white',
    text: darkMode ? 'text-white' : 'text-gray-900',
    textSecondary: darkMode ? 'text-gray-400' : 'text-gray-600',
    input: darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const login = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveSection('home');
  };

  const value = {
    darkMode,
    setDarkMode,
    language,
    setLanguage,
    activeSection,
    setActiveSection,
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    favorites,
    toggleFavorite,
    isAuthenticated,
    currentUser,
    login,
    logout,
    t,
    themeClasses,
    totalCartPrice,
    totalCartItems
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
