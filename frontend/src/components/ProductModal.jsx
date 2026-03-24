import React from 'react';
import { X, Heart, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';

const ProductModal = ({ product, onClose }) => {
  const { language, toggleFavorite, isFavorite, addToCart } = useApp();
  const t = translations[language];

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold dark:text-white">{product.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {product.price.toLocaleString()} ₸
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 dark:text-white">{t.category}</h3>
                <p className="text-gray-600 dark:text-gray-400">{product.category}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 dark:text-white">{t.location}</h3>
                <p className="text-gray-600 dark:text-gray-400">{product.location}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 dark:text-white">{t.seller}</h3>
                <p className="text-gray-600 dark:text-gray-400">{product.seller}</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="flex-1 py-3 px-6 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Heart
                    size={20}
                    className={isFavorite(product.id) ? 'fill-blue-600' : ''}
                  />
                  {isFavorite(product.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>

                <button
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                  className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  {t.addToCart}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2 dark:text-white">Description</h3>
            <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
