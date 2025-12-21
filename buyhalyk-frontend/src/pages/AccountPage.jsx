import { User } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AccountPage = () => {
  const { t, themeClasses, currentUser } = useApp();

  return (
    <section className="p-8 max-w-4xl">
      <div className={`${themeClasses.card} rounded-2xl p-8 mb-6`}>
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>{currentUser?.name || 'User Name'}</h2>
            <p className={themeClasses.textSecondary}>{currentUser?.email || 'user@example.com'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${themeClasses.textSecondary} mb-2`}>{t.name}</label>
            <input type="text" value={currentUser?.name || ''} className={`w-full px-4 py-3 ${themeClasses.input} rounded-xl border-0`} readOnly />
          </div>
          <div>
            <label className={`block text-sm font-medium ${themeClasses.textSecondary} mb-2`}>{t.email}</label>
            <input type="email" value={currentUser?.email || ''} className={`w-full px-4 py-3 ${themeClasses.input} rounded-xl border-0`} readOnly />
          </div>
        </div>
      </div>

      <div className={`${themeClasses.card} rounded-2xl p-8`}>
        <h3 className={`text-xl font-bold ${themeClasses.text} mb-6`}>{t.myOrders}</h3>
        <div className="text-center py-12">
          <p className={themeClasses.textSecondary}>{t.noOrders}</p>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
