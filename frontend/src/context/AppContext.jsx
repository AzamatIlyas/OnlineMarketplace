import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI, adsAPI, categoriesAPI, favouritesAPI } from '../services/api';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru');
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await authAPI.getCurrentUser();
        setUser(res);
        setIsAuthenticated(true);
        await loadUserData();
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    fetchMe();
  }, []);

  // Load user data (favorites, etc)
  const loadUserData = async () => {
    try {
      const favData = await favouritesAPI.getFavourites();
      // Backend returns array directly
      setFavorites(Array.isArray(favData) ? favData : []);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  // Load products
  const loadProducts = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await adsAPI.getAds(filters);
      // Backend returns array directly
      setProducts(Array.isArray(data) ? data : []);
      return data;
    } catch (error) {
      console.error('Error loading products:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Load categories
  const loadCategories = async () => {
    try {
      const data = await categoriesAPI.getCategories();
      // Backend returns array directly
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  // Auth functions
  const login = async (email, password) => {
    try {
      await authAPI.login(email, password);

      const me = await authAPI.getCurrentUser();
      setUser(me);
      setIsAuthenticated(true);

      await loadUserData();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Login failed',
      };
    }
  };


  const register = async (email, password, fullName) => {
    try {
      await authAPI.register(email, password, fullName);
      // Auto login after registration
      return await login(email, password);
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.response?.data?.detail || 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setFavorites([]);
      setCart([]);
    }
  };

  // Favorites functions
  const toggleFavorite = async (productId) => {
    if (!isAuthenticated) {
      alert('Please login to add favorites');
      return;
    }

    const isFavorite = favorites.some(fav => fav.id === productId);

    try {
      if (isFavorite) {
        await favouritesAPI.removeFavourite(productId);
        setFavorites(favorites.filter(fav => fav.id !== productId));
      } else {
        await favouritesAPI.addFavourite(productId);
        const product = products.find(p => p.id === productId);
        if (product) {
          setFavorites([...favorites, product]);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const isFavorite = (productId) => {
    return favorites.some(fav => fav.id === productId);
  };

  // Cart functions
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

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const value = {
    language,
    setLanguage,
    darkMode,
    setDarkMode,
    user,
    isAuthenticated,
    products,
    categories,
    favorites,
    cart,
    loading,
    login,
    register,
    logout,
    loadProducts,
    loadCategories,
    toggleFavorite,
    isFavorite,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
