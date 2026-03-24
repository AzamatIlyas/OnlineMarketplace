import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';

const SettingsPage = () => {
  const { language } = useApp();
  const t = translations[language];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold dark:text-white">SettingsPage</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="dark:text-gray-300">Content for SettingsPage</p>
      </div>
    </div>
  );
};

export default SettingsPage;
