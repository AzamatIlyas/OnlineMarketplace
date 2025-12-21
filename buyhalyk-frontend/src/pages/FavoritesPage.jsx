import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockProducts } from '../utils/mockData';
import ProductModal from '../components/ProductModal';

const FavoritesPage = () => {
  const { t, themeClasses, favorites, setActiveSection } = useApp();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <section className="p-8">
        <div className="flex flex-col items-center justify-center h-96">
          <Heart className={`w-24 h-24 ${themeClasses.textSecondary} mb-4`} />
          <h3 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>{t.noFavorites}</h3>
          <button
            onClick={() => setActiveSection('home')}
            className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            {t.startShopping}
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteProducts.map(product => (
            <div
              key={product.id}
              className={`${themeClasses.card} rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer`}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 h-48">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className={`font-semibold ${themeClasses.text} mb-2`}>{product.name}</h3>
                <p className="text-2xl font-bold text-purple-600">{product.price.toLocaleString('ru-RU')} тг.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  );
};

export default FavoritesPage;
