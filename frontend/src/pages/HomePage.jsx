import React, { useEffect, useState } from 'react';
import { Heart, ShoppingCart, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';
import ProductModal from '../components/ProductModal';

const HomePage = () => {
  const {
    language,
    products,
    categories,
    loadProducts,
    loadCategories,
    toggleFavorite,
    isFavorite,
    addToCart,
    loading
  } = useApp();

  const t = translations[language];
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const handleSearch = async () => {
    const filters = {};
    if (searchQuery) filters.search = searchQuery;
    if (selectedCategory) filters.category_id = selectedCategory;
    await loadProducts(filters);
  };

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    await loadProducts({ category_id: categoryId === selectedCategory ? null : categoryId });
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Search size={20} />
            {t.search}
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 dark:text-white">{t.categories}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`p-4 rounded-lg border-2 transition-all ${selectedCategory === category.id
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
                }`}
            >
              <div className="text-3xl mb-2">{category.icon || '📦'}</div>
              <div className="text-sm font-medium dark:text-white">{category.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          {t.ads}
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative">
                  <img
                    src={product.image_url || 'https://via.placeholder.com/300x200'}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow hover:scale-110 transition-transform"
                  >
                    <Heart
                      size={20}
                      className={isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}
                    />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 dark:text-white truncate">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {product.price.toLocaleString()} ₸
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <div>{new Date(product.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
