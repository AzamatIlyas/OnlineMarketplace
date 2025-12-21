import { useApp } from '../context/AppContext';
import { mockHistory } from '../utils/mockData';

const HistoryPage = () => {
  const { t, themeClasses, darkMode } = useApp();
  const history = mockHistory(t);

  return (
    <section className="p-8">
      <div className={`${themeClasses.card} rounded-2xl overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${themeClasses.text}`}>
                  <input type="checkbox" className="rounded" />
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${themeClasses.text}`}>
                  {t.username}
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${themeClasses.text}`}>
                  {t.item}
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${themeClasses.text}`}>
                  {t.price}
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${themeClasses.text}`}>
                  {t.date}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {history.map(order => (
                <tr key={order.id} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={order.avatar} alt={order.fullName} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className={`font-semibold ${themeClasses.text}`}>{order.username}</p>
                        <p className={`text-sm ${themeClasses.textSecondary}`}>{order.fullName}</p>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 ${themeClasses.text}`}>
                    {order.item}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-purple-600">
                      {order.price.toLocaleString('ru-RU')} ₸
                    </span>
                  </td>
                  <td className={`px-6 py-4 ${themeClasses.textSecondary}`}>
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default HistoryPage;
