import { useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import TrendingPage from './pages/TrendingPage';
import MessagesPage from './pages/MessagesPage';
import HistoryPage from './pages/HistoryPage';
import FavoritesPage from './pages/FavoritesPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const { activeSection, themeClasses, darkMode } = useApp();

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage />;
      case 'trending':
        return <TrendingPage />;
      case 'messages':
        return <ProtectedRoute><MessagesPage /></ProtectedRoute>;
      case 'history':
        return <ProtectedRoute><HistoryPage /></ProtectedRoute>;
      case 'favorites':
        return <ProtectedRoute><FavoritesPage /></ProtectedRoute>;
      case 'cart':
        return <ProtectedRoute><CartPage /></ProtectedRoute>;
      case 'account':
        return <ProtectedRoute><AccountPage /></ProtectedRoute>;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={`flex h-screen ${themeClasses.bg} ${darkMode ? 'dark' : ''}`}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Header />
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
