import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockProducts } from '../utils/mockData';
import ProductModal from '../components/ProductModal';

const TrendingPage = () => {
  const { t, themeClasses } = useApp();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  return (
    <>
      <section className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div
              key={product.id}
              className={`${themeClasses.card} rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer`}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 h-64">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {t.trending}
                </div>
              </div>
              <div className="p-4">
                <h3 className={`font-semibold ${themeClasses.text} mb-2`}>{product.name}</h3>
                <p className="text-2xl font-bold text-purple-600 mb-3">{product.price.toLocaleString('ru-RU')} тг.</p>
                <div className={`flex items-center gap-2 text-sm ${themeClasses.textSecondary}`}>
                  <span>{product.views} {t.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  );
};

export default TrendingPage;
