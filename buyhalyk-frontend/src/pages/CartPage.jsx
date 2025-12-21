import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const CartPage = () => {
  const { t, themeClasses, cart, updateQuantity, removeFromCart, totalCartPrice, setActiveSection } = useApp();

  if (cart.length === 0) {
    return (
      <section className="p-8">
        <div className="flex flex-col items-center justify-center h-96">
          <ShoppingCart className={`w-24 h-24 ${themeClasses.textSecondary} mb-4`} />
          <h3 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>{t.emptyCart}</h3>
          <button
            onClick={() => setActiveSection('home')}
            className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            {t.continueShopping}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className={`${themeClasses.card} rounded-2xl p-6 flex gap-6`}>
              <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-xl" />
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>{item.name}</h3>
                <p className="text-2xl font-bold text-purple-600 mb-4">{item.price.toLocaleString('ru-RU')} тг.</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className={`font-semibold ${themeClasses.text} w-8 text-center`}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500 hover:text-red-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`${themeClasses.card} rounded-2xl p-6 h-fit`}>
          <h3 className={`text-xl font-bold ${themeClasses.text} mb-6`}>{t.total}</h3>
          <div className="space-y-4 mb-6">
            <div className={`flex justify-between ${themeClasses.textSecondary}`}>
              <span>{t.items}</span>
              <span>{totalCartPrice.toLocaleString('ru-RU')} тг.</span>
            </div>
            <div className={`flex justify-between ${themeClasses.textSecondary}`}>
              <span>{t.delivery}</span>
              <span className="text-green-500 font-semibold">{t.free}</span>
            </div>
            <div className="border-t pt-4">
              <div className={`flex justify-between text-xl font-bold ${themeClasses.text}`}>
                <span>{t.total}</span>
                <span>{totalCartPrice.toLocaleString('ru-RU')} тг.</span>
              </div>
            </div>
          </div>
          <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all">
            {t.checkout}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
