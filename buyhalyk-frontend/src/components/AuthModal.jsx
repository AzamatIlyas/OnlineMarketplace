import { useState } from 'react';
import { X, User, Mail, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AuthModal = ({ authMode, setAuthMode, onClose }) => {
  const { t, themeClasses, login } = useApp();
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    login({
      id: 1,
      name: authForm.fullName || 'User',
      email: authForm.email
    });
    onClose();
    setAuthForm({ email: '', password: '', confirmPassword: '', fullName: '' });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (authForm.password !== authForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    login({
      id: 1,
      name: authForm.fullName,
      email: authForm.email
    });
    onClose();
    setAuthForm({ email: '', password: '', confirmPassword: '', fullName: '' });
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className={`${themeClasses.card} rounded-2xl max-w-md w-full p-8 shadow-2xl`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-bold ${themeClasses.text}`}>
              {authMode === 'login' ? t.loginTitle : t.registerTitle}
            </h2>
            <button
              onClick={onClose}
              className={`${themeClasses.textSecondary} hover:text-red-500`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="space-y-4">
            {authMode === 'register' && (
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                  {t.fullName}
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary} w-5 h-5`} />
                  <input
                    type="text"
                    value={authForm.fullName}
                    onChange={(e) => setAuthForm({ ...authForm, fullName: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 ${themeClasses.input} rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                {t.email}
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary} w-5 h-5`} />
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 ${themeClasses.input} rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                {t.password}
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary} w-5 h-5`} />
                <input
                  type="password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 ${themeClasses.input} rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  required
                />
              </div>
            </div>

            {authMode === 'register' && (
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                  {t.confirmPassword}
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary} w-5 h-5`} />
                  <input
                    type="password"
                    value={authForm.confirmPassword}
                    onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 ${themeClasses.input} rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-xl transition-all mt-6"
            >
              {authMode === 'login' ? t.loginButton : t.registerButton}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className={`text-sm ${themeClasses.textSecondary}`}>
              {authMode === 'login' ? t.noAccount : t.haveAccount}{' '}
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-purple-600 font-semibold hover:underline"
              >
                {authMode === 'login' ? t.registerNow : t.loginNow}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;
