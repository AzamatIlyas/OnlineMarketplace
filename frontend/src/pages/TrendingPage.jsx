import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';

const TrendingPage = () => {
  const { language, products, loadProducts } = useApp();
  const t = translations[language];

  useEffect(() => {
    loadProducts({ sort: 'views' });
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold dark:text-white">{t.trending}</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="dark:text-gray-300">{t.popularProducts}</p>
      </div>
    </div>
  );
};

export default TrendingPage;
