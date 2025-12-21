import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockCategories, mockProducts } from '../utils/mockData';
import ProductModal from '../components/ProductModal';

const HomePage = () => {
  const { t, themeClasses, toggleFavorite, favorites, isAuthenticated } = useApp();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setCategories(mockCategories);
    setProducts(mockProducts);
  }, []);

  return (
    <>
      <section className="p-8 space-y-8">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${themeClasses.text}`}>{t.categories}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                className={`${themeClasses.card} rounded-2xl p-6 hover:shadow-lg transition-all group`}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <p className={`font-semibold ${themeClasses.text} text-sm`}>{category.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${themeClasses.text}`}>{t.popularProducts}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div
                key={product.id}
                className={`${themeClasses.card} rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group`}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isAuthenticated) {
                        toggleFavorite(product.id);
                      }
                    }}
                    className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(product.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className={`font-semibold ${themeClasses.text} mb-2 line-clamp-2`}>
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-purple-600">
                      {product.price.toLocaleString('ru-RU')} тг.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default HomePage;
