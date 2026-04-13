import React, { useState, useEffect } from 'react';
import { ShoppingCart, Eye, Heart, Grid, List } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux/products/products_action";
import { HashLoader } from "react-spinners";

const ProductsGridPage = () => {
  const [sortBy, setSortBy] = useState('featured');
  const [showCount, setShowCount] = useState(50);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();
  

 
  const { products, status, error } = useSelector((state) => state.product);
  console.log(products);

     useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  


  // Loading state
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader color="#059669" />
      </div>
    );
  }
  
  // Error state
  if (status === "failed") {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }
  
  // Get products array from response
  const getProductsArray = () => {
    if (!products) return [];
    
    // If product is directly an array
    // if (Array.isArray(product)) return product;
    
    // If product has data property that is array
    // if (product.data && Array.isArray(product.data)) return product.data;
    
    // If product has products property that is array
    if (products && Array.isArray(products)) return products;
    
    return [];
  };
  
  const productsArray = getProductsArray();
  
  if (productsArray.length === 0) {
    return <div className="text-center py-20">No products found</div>;
  }

  // Extract unique categories
  const categories = [...new Set(productsArray
    .map(p => p.category)
    .filter(Boolean))];

  // Filter products by categories
  const filteredProducts = selectedCategories.length === 0
    ? productsArray
    : productsArray.filter(product => selectedCategories.includes(product.category));

  // Sort products
  const getSortedProducts = () => {
    const sorted = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-high':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'latest':
        return sorted.sort((a, b) => (b.id || b._id || 0) - (a.id || a._id || 0));
      default:
        return sorted;
    }
  };
  
  const sortedProducts = getSortedProducts();
  const displayedProducts = sortedProducts.slice(0, showCount);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const renderStars = (rating) => {
    const numRating = Math.floor(rating || 0);
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-sm ${i < numRating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
        ))}
      </div>
    );
  };

  const getProductId = (product) => product._id || product.id;
  const getProductName = (product) => product.name || product.productName || 'Unnamed Product';
  const getProductPrice = (product) => product.price || product.priceValue || 0;
  const getProductImage = (product) => {
    if (!product.image) return null;
    return typeof product.image === 'string' ? product.image : null;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="text-gray-600">
          We found <span className="text-emerald-600 font-bold">{filteredProducts.length}</span> items for you!
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Show Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm flex items-center gap-1">
              <Grid className="w-4 h-4" />
              Show:
            </span>
            <select
              value={showCount}
              onChange={(e) => setShowCount(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm flex items-center gap-1">
              <List className="w-4 h-4" />
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="latest">Latest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      {categories.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          <span className="text-gray-600 font-medium">Categories:</span>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => toggleCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategories.includes(category)
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
          {selectedCategories.length > 0 && (
            <button
              onClick={() => setSelectedCategories([])}
              className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200"
            >
              Clear All
            </button>
          )}
        </div>
      )}

      {/* Products Grid */}
      {displayedProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No products match your filters</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {displayedProducts.map((product) => (
            <div
              key={getProductId(product) || Math.random()}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group relative"
            >
              {/* Product Badge */}
              {product.badge && (
                <div className={`absolute top-3 left-3 ${product.badgeColor || 'bg-emerald-500'} text-white text-xs px-3 py-1 rounded-full font-semibold z-10`}>
                  {product.badge}
                </div>
              )}

              {/* Hover Actions */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Product Image */}
              <div className="bg-gray-50 p-6 md:p-8 flex items-center justify-center h-40 md:h-48">
                {getProductImage(product) ? (
                  <img 
                    src={getProductImage(product)} 
                    alt={getProductName(product)}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <span className="text-6xl md:text-7xl group-hover:scale-110 transition-transform duration-300">
                    🛒
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3 md:p-4">
                <p className="text-xs text-gray-500 mb-1">{product.category.name || 'Uncategorized'}</p>
                <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                  {getProductName(product)}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  {renderStars(product.rating)}
                  <span className="text-xs text-gray-500">({product.rating || 0})</span>
                </div>

                {/* Brand */}
                {product.brand && (
                  <p className="text-xs text-gray-500 mb-3">
                    By <span className="text-emerald-600">{product.brand}</span>
                  </p>
                )}

                {/* Price and Cart */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold text-base md:text-lg">
                      ${getProductPrice(product)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-xs md:text-sm">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button className="bg-emerald-50 text-emerald-600 p-2 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {displayedProducts.length < filteredProducts.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowCount(prev => prev + 20)}
            className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-semibold"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsGridPage;