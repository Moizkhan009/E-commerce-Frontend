// SectionTestPage.jsx - Updated version
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchProductsBySection } from '../redux/slices/products_action';
import { fetchProductsBySection } from '../redux/products/products_action';

const SectionTestPage = () => {
  const dispatch = useDispatch();
  const { sections = {}, status, error } = useSelector((state) => state.product || {});
  const [selectedSection, setSelectedSection] = useState('featured'); // Changed to 'featured'
  const [loading, setLoading] = useState(false);

  const sectionsList = [
    { id: 'featured', name: '⭐ Featured', color: 'bg-purple-100' },
    { id: 'trending', name: '📈 Trending', color: 'bg-blue-100' },
    { id: 'topSelling', name: '🏆 Top Selling', color: 'bg-green-100' },
    { id: 'topRated', name: '⭐ Top Rated', color: 'bg-yellow-100' },
    { id: 'newArrival', name: '🆕 New Arrival', color: 'bg-pink-100' },
    { id: 'hotDeal', name: '🔥 Hot Deal', color: 'bg-red-100' },
  ];

  const fetchSectionProducts = async (section) => {
    setLoading(true);
    try {
      const result = await dispatch(fetchProductsBySection(section)).unwrap();
      console.log(`✅ Fetched ${result.products?.length || 0} products for ${section}:`, result);
      return result;
    } catch (err) {
      console.error(`❌ Error fetching ${section}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionClick = (sectionId) => {
    setSelectedSection(sectionId);
    fetchSectionProducts(sectionId);
  };

  useEffect(() => {
    fetchSectionProducts(selectedSection);
  }, []);

  const currentProducts = sections?.[selectedSection] || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          📦 Section Products Test Page
        </h1>
        <p className="text-gray-600">
          Testing API: http://localhost:5000/api/product/section/{selectedSection}
        </p>
      </div>

      {/* Status */}
      <div className="mb-6">
        {(status === 'loading' || loading) && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
            ⏳ Loading products from {selectedSection} section...
          </div>
        )}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            ❌ Error: {error}
          </div>
        )}
        {!loading && status === 'succeeded' && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
            ✅ Loaded {currentProducts.length} products from {selectedSection} section
          </div>
        )}
      </div>

      {/* Section Buttons */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Section:</h2>
        <div className="flex flex-wrap gap-4">
          {sectionsList.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`${section.color} ${
                selectedSection === section.id
                  ? 'ring-2 ring-offset-2 ring-blue-500 scale-105'
                  : ''
              } px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg`}
            >
              {section.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">
          Products in {selectedSection} section:
          <span className="ml-2 text-sm text-gray-500">({currentProducts.length} items)</span>
        </h3>
        
        {currentProducts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">
              {loading ? 'Loading...' : 'No products found in this section'}
            </p>
            {!loading && (
              <button
                onClick={() => fetchSectionProducts(selectedSection)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                🔄 Retry
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                )}
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg text-gray-800">
                    {product.name}
                  </h4>
                  {product.badge && (
                    <span className={`${product.badgeColor} text-white text-xs px-2 py-1 rounded`}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  {product.brand && <span className="font-semibold">Brand:</span>} {product.brand}
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <div>
                    <span className="text-green-600 font-bold text-xl">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-gray-400 line-through ml-2 text-sm">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="bg-gray-200 px-2 py-1 rounded text-xs">
                    Stock: {product.countInStock || 0}
                  </span>
                </div>
                {product.rating > 0 && (
                  <div className="mt-2 text-yellow-500">
                    {'⭐'.repeat(Math.floor(product.rating))} ({product.rating})
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Debug Info */}
      <div className="mt-8 bg-gray-900 text-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3">🔍 Debug Info:</h3>
        <details>
          <summary className="cursor-pointer text-blue-400">Click to see Redux State</summary>
          <pre className="mt-2 bg-gray-800 p-3 rounded overflow-x-auto text-xs">
            {JSON.stringify({
              selectedSection,
              productsCount: currentProducts.length,
              sectionKeys: Object.keys(sections),
              firstProduct: currentProducts[0] ? {
                id: currentProducts[0]._id,
                name: currentProducts[0].name,
                price: currentProducts[0].price
              } : null,
              status,
              error
            }, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};

export default SectionTestPage;