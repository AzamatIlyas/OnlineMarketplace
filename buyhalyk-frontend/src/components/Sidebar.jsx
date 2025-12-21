import { Grid, TrendingUp, MessageCircle, Clock, Heart, ShoppingCart, User, Settings, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar = () => {
  const { 
    activeSection, 
    setActiveSection, 
    isAuthenticated, 
    logout, 
    t, 
    themeClasses,
    totalCartItems,
    favorites
  } = useApp();

  const sidebarItems = [
    { id: 'home', icon: Grid, label: t.home },
    { id: 'trending', icon: TrendingUp, label: t.trending },
    { id: 'messages', icon: MessageCircle, label: t.messages },
    { id: 'history', icon: Clock, label: t.history },
    { id: 'favorites', icon: Heart, label: t.favorites },
    { id: 'cart', icon: ShoppingCart, label: t.cart },
    { id: 'account', icon: User, label: t.account },
    { id: 'settings', icon: Settings, label: t.settings },
  ];

  return (
    <aside className={`w-20 ${themeClasses.card} shadow-lg flex flex-col items-center py-6 space-y-8`}>
      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
        <span className="text-white font-bold text-xl">B</span>
      </div>

      <nav className="flex-1 flex flex-col space-y-6">
        {sidebarItems.slice(0, 6).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all relative ${
                activeSection === item.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : `${themeClasses.textSecondary} hover:bg-gray-100 hover:text-purple-600`
              }`}
            >
              <Icon className="w-6 h-6" />
              {item.id === 'cart' && totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {totalCartItems}
                </span>
              )}
              {item.id === 'favorites' && favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {favorites.length}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="flex flex-col space-y-6">
        {sidebarItems.slice(6, 8).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                activeSection === item.id
                  ? 'bg-purple-600 text-white'
                  : `${themeClasses.textSecondary} hover:bg-gray-100 hover:text-purple-600`
              }`}
            >
              <Icon className="w-6 h-6" />
            </button>
          );
        })}
        {isAuthenticated && (
          <button
            onClick={logout}
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${themeClasses.textSecondary} hover:bg-gray-100 hover:text-red-500 transition-all`}
          >
            <LogOut className="w-6 h-6" />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
