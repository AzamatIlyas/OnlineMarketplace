import { X, Star, MapPin, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProductModal = ({ product, onClose }) => {
  const { t, themeClasses, darkMode, addToCart, toggleFavorite, favorites, isAuthenticated } = useApp();

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className={`${themeClasses.card} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg z-10"
            >
              <X className="w-6 h-6 text-gray-900" />
            </button>
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 rounded-2xl p-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-xl"
                />
              </div>
              <div>
                <h2 className={`text-3xl font-bold ${themeClasses.text} mb-4`}>{product.name}</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className={`font-semibold ${themeClasses.text}`}>{product.rating}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${themeClasses.textSecondary}`}>
                    <MapPin className="w-5 h-5" />
                    <span>{product.location}</span>
                  </div>
                </div>
                <p className={`${themeClasses.textSecondary} mb-6`}>{product.description}</p>
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 mb-6`}>
                  <p className={`text-sm ${themeClasses.textSecondary} mb-2`}>{t.seller}</p>
                  <p className={`font-semibold ${themeClasses.text}`}>{product.seller}</p>
                </div>
                <div className="mb-6">
                  <p className="text-4xl font-bold text-purple-600">
                    {product.price.toLocaleString('ru-RU')} тг.
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      if (isAuthenticated) {
                        addToCart(product);
                        onClose();
                      }
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 rounded-xl transition-all"
                  >
                    {t.addToCart}
                  </button>
                  <button
                    onClick={() => {
                      if (isAuthenticated) {
                        toggleFavorite(product.id);
                      }
                    }}
                    className="w-14 h-14 border-2 border-purple-600 rounded-xl flex items-center justify-center hover:bg-purple-50 transition-all"
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        favorites.includes(product.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-purple-600'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
