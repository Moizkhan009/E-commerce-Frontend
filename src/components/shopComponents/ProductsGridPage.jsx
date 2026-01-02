import React, { useState } from 'react';
import { ShoppingCart, Eye, Heart, Grid, List } from 'lucide-react';

const ProductsGridPage = () => {
  const [sortBy, setSortBy] = useState('featured');
  const [showCount, setShowCount] = useState(50);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Dummy products data - easily replaceable with API
  const allProducts = [
    {
      id: 1,
      name: 'Seeds of Change Organic Quinoa',
      category: 'Snack',
      brand: 'NestFood',
      image: '🌾',
      price: 28.85,
      originalPrice: 32.85,
      rating: 4,
      badge: 'Hot',
      badgeColor: 'bg-red-500'
    },
    {
      id: 2,
      name: 'All Natural Italian-Style Chicken Meatballs',
      category: 'Hodo Foods',
      brand: 'Stouffer',
      image: '🥫',
      price: 52.85,
      originalPrice: 55.85,
      rating: 3.5,
      badge: 'Sale',
      badgeColor: 'bg-blue-500'
    },
    {
      id: 3,
      name: 'Angie\'s Boomchickapop Sweet & Salty',
      category: 'Snack',
      brand: 'StarKist',
      image: '🍿',
      price: 48.85,
      originalPrice: 52.85,
      rating: 4,
      badge: 'New',
      badgeColor: 'bg-emerald-500'
    },
    {
      id: 4,
      name: 'Foster Farms Takeout Crispy Classic',
      category: 'Vegetables',
      brand: 'NestFood',
      image: '🥬',
      price: 17.85,
      originalPrice: 19.85,
      rating: 4,
      badge: '',
      badgeColor: ''
    },
    {
      id: 5,
      name: 'Blue Diamond Almonds Lightly',
      category: 'Pet Foods',
      brand: 'NestFood',
      image: '🥛',
      price: 23.85,
      originalPrice: 25.85,
      rating: 5,
      badge: '-14%',
      badgeColor: 'bg-orange-500'
    },
    {
      id: 6,
      name: 'Chobani Complete Vanilla Greek',
      category: 'Hodo Foods',
      brand: 'NestFood',
      image: '🥤',
      price: 54.85,
      originalPrice: 55.85,
      rating: 4,
      badge: '',
      badgeColor: ''
    },
    {
      id: 7,
      name: 'Canada Dry Ginger Ale - 2 L Bottle',
      category: 'Meats',
      brand: 'NestFood',
      image: '🥜',
      price: 32.85,
      originalPrice: 33.85,
      rating: 4,
      badge: '',
      badgeColor: ''
    },
    {
      id: 8,
      name: 'Encore Seafoods Stuffed Alaskan',
      category: 'Snack',
      brand: 'NestFood',
      image: '🌭',
      price: 35.85,
      originalPrice: 37.85,
      rating: 4,
      badge: 'Sale',
      badgeColor: 'bg-blue-500'
    },
    {
      id: 9,
      name: 'Gorton\'s Beer Battered Fish Fillets',
      category: 'Coffee',
      brand: 'Old El Paso',
      image: '☕',
      price: 23.85,
      originalPrice: 25.85,
      rating: 4,
      badge: 'Hot',
      badgeColor: 'bg-pink-500'
    },
    {
      id: 10,
      name: 'Haagen-Dazs Caramel Cone Ice Cream',
      category: 'Cream',
      brand: 'Tyson',
      image: '🍦',
      price: 22.85,
      originalPrice: 24.85,
      rating: 5,
      badge: '',
      badgeColor: ''
    }
  ];

  // Filter categories
  const categories = ['Snack', 'Hodo Foods', 'Vegetables', 'Pet Foods', 'Meats', 'Coffee', 'Cream'];

  // Filter products based on selected categories
  const filteredProducts = selectedCategories.length === 0
    ? allProducts
    : allProducts.filter(product => selectedCategories.includes(product.category));

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return 0;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'latest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  // Limit products based on show count
  const displayedProducts = sortedProducts.slice(0, showCount);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Top Bar - Results Count, Show, Sort, View Mode */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        {/* Left - Results Count */}
        <div className="text-gray-600">
          We found <span className="text-emerald-600 font-bold">{filteredProducts.length}</span> items for you!
        </div>

        {/* Right - Controls */}
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
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="text-gray-600 font-medium">Categories:</span>
        {categories.map((category) => (
          <button
            key={category}
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

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group relative"
          >
            {/* Product Badge */}
            {product.badge && (
              <div className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs px-3 py-1 rounded-full font-semibold z-10`}>
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
              <span className="text-6xl md:text-7xl group-hover:scale-110 transition-transform duration-300">
                {product.image}
              </span>
            </div>

            {/* Product Info */}
            <div className="p-3 md:p-4">
              <p className="text-xs text-gray-500 mb-1">{product.category}</p>
              <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                {product.name}
              </h3>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                {renderStars(product.rating)}
                <span className="text-xs text-gray-500">({product.rating})</span>
              </div>

              {/* Brand */}
              <p className="text-xs text-gray-500 mb-3">
                By <span className="text-emerald-600">{product.brand}</span>
              </p>

              {/* Price and Cart */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold text-base md:text-lg">
                    ${product.price}
                  </span>
                  <span className="text-gray-400 line-through text-xs md:text-sm">
                    ${product.originalPrice}
                  </span>
                </div>
                <button className="bg-emerald-50 text-emerald-600 p-2 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {displayedProducts.length < filteredProducts.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowCount(showCount + 20)}
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