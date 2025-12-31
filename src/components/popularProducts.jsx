import React, { useState } from 'react';
import { ShoppingCart, Eye, Heart } from 'lucide-react';

const PopularProducts = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Tabs data - easily customizable
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'baking', label: 'Baking material' },
    { id: 'fruits', label: 'Fresh Fruits' },
    { id: 'milk', label: 'Milks & Dairies' },
    { id: 'meats', label: 'Meats' },
    { id: 'vegetables', label: 'Vegetables' }
  ];

  // Products data - easily replaceable with API data
  const productsData = [
    {
      id: 1,
      name: 'Foster Farms Takeout Crispy Classic',
      image: '🥫',
      category: 'Snacks',
      brand: 'Hambger Hel',
      price: 17.85,
      originalPrice: 19.8,
      rating: 4,
      badge: 'Sale',
      badgeColor: 'bg-emerald-500',
      bgColor: 'bg-emerald-50'
    },
    {
      id: 2,
      name: 'Organic Cage Grade A Large Eggs',
      image: '🥚',
      category: 'Dairy',
      brand: 'Hambger Hel',
      price: 9.00,
      originalPrice: 12.00,
      rating: 4,
      badge: 'Best Sale',
      badgeColor: 'bg-emerald-500',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 3,
      name: 'Haagen Caramel Cone Ice Cream Brand',
      image: '🍦',
      category: 'Frozen',
      brand: 'Hambger Hel',
      price: 22.85,
      originalPrice: 24.85,
      rating: 4,
      badge: 'Sale',
      badgeColor: 'bg-emerald-500',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 4,
      name: 'All Natural Style Chicken Meatballs',
      image: '🥤',
      category: 'Meat',
      brand: 'Hambger Hel',
      price: 23.00,
      originalPrice: 32.00,
      rating: 4,
      badge: 'Hot',
      badgeColor: 'bg-blue-500',
      bgColor: 'bg-red-50'
    },
    {
      id: 5,
      name: 'Blue Almonds Lightly Salted Vegetables',
      image: '🥛',
      category: 'Dairy',
      brand: 'Country Crock',
      price: 23.85,
      originalPrice: 25.85,
      rating: 4,
      badge: 'Sale',
      badgeColor: 'bg-emerald-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 6,
      name: 'Gordon\'s Beer Battered Fish Fillets',
      image: '☕',
      category: 'Seafood',
      brand: 'Hambger Hel',
      price: 23.85,
      originalPrice: 25.85,
      rating: 4,
      badge: 'Sale',
      badgeColor: 'bg-yellow-500',
      bgColor: 'bg-green-100'
    },
    {
      id: 7,
      name: 'Seeds of Change Organic Red Rice',
      image: '🌾',
      category: 'Grains',
      brand: 'Country Crock',
      price: 28.85,
      originalPrice: 32.85,
      rating: 4,
      badge: 'Best Sale',
      badgeColor: 'bg-emerald-500',
      bgColor: 'bg-red-50'
    },
    {
      id: 8,
      name: 'Canada Dry Ginger Ale - 2 L Bottle',
      image: '🥜',
      category: 'Beverages',
      brand: 'Hambger Hel',
      price: 32.85,
      originalPrice: 33.85,
      rating: 4,
      badge: 'Sale',
      badgeColor: 'bg-blue-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 9,
      name: 'Encore Seafoods Stuffed Alaskan',
      image: '🌭',
      category: 'Seafood',
      brand: 'Hambger Hel',
      price: 35.85,
      originalPrice: 37.85,
      rating: 4,
      badge: 'Hot',
      badgeColor: 'bg-emerald-500',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 10,
      name: 'Angel\'s Sweet & Salty Kettle Corn',
      image: '🥗',
      category: 'Snacks',
      brand: 'Country Crock',
      price: 48.85,
      originalPrice: 52.85,
      rating: 4,
      badge: 'Hot',
      badgeColor: 'bg-emerald-500',
      bgColor: 'bg-orange-50'
    }
  ];

  // Filter products based on active tab
  const filteredProducts = activeTab === 'all' 
    ? productsData 
    : productsData.filter(product => {
        const categoryMap = {
          'baking': ['Snacks', 'Grains'],
          'fruits': ['Dairy'],
          'milk': ['Dairy', 'Frozen'],
          'meats': ['Meat', 'Seafood'],
          'vegetables': ['Snacks']
        };
        return categoryMap[activeTab]?.includes(product.category);
      });

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Popular Products</h2>
        
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-emerald-600'
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group relative"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Product Badge */}
            <div className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs px-3 py-1 rounded-full font-semibold z-10`}>
              {product.badge}
            </div>

            {/* Hover Actions */}
            {hoveredProduct === product.id && (
              <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                <button className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Product Image */}
            <div className={`${product.bgColor} p-8 flex items-center justify-center h-48`}>
              <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                {product.image}
              </span>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-1">{product.category}</p>
              <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                {product.name}
              </h3>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                {renderStars(product.rating)}
              </div>

              {/* Brand */}
              <p className="text-xs text-gray-500 mb-3">
                By <span className="text-emerald-600">{product.brand}</span>
              </p>

              {/* Price and Cart */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold text-lg">
                    ${product.price}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
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
    </div>
  );
};

export default PopularProducts;