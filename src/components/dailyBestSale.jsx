import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

const DailyBestSells = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Tabs data
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'deals', label: 'Deals Of The Day' },
    { id: 'beauty', label: 'Beauty' },
    { id: 'bread', label: 'Bread & Juice' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'milks', label: 'Milks' }
  ];

  // Products data
  const productsData = [
    {
      id: 1,
      name: 'Seeds of Change Organic Red Rice',
      image: '🥫',
      category: 'Grains',
      type: 'deals',
      price: 28.85,
      originalPrice: 32.85,
      rating: 4,
      sold: 90,
      badge: 'Sale',
      badgeColor: 'bg-emerald-500',
      progress: 90
    },
    {
      id: 2,
      name: 'Angie\'s Sweet & Salty Kettle Corn',
      image: '🍿',
      category: 'Snacks',
      type: 'deals',
      price: 48.85,
      originalPrice: 52.85,
      rating: 4,
      sold: 52,
      badge: 'Hot',
      badgeColor: 'bg-red-500',
      progress: 52
    },
    {
      id: 3,
      name: 'Foster Farms Takeout Crispy Classic',
      image: '🥫',
      category: 'Meat',
      type: 'bread',
      price: 17.85,
      originalPrice: 19.85,
      rating: 4,
      sold: 90,
      badge: 'New',
      badgeColor: 'bg-emerald-500',
      progress: 90
    },
    {
      id: 4,
      name: 'Blue Almonds Lightly Salted Vegetables',
      image: '🥛',
      category: 'Dairy',
      type: 'milks',
      price: 23.85,
      originalPrice: 25.85,
      rating: 4,
      sold: 70,
      badge: 'Best Sale',
      badgeColor: 'bg-emerald-500',
      progress: 70
    },
    {
      id: 5,
      name: 'Organic Beauty Face Cream',
      image: '💄',
      category: 'Beauty',
      type: 'beauty',
      price: 35.00,
      originalPrice: 40.00,
      rating: 5,
      sold: 85,
      badge: 'New',
      badgeColor: 'bg-pink-500',
      progress: 85
    },
    {
      id: 6,
      name: 'Fresh Orange Juice 1L',
      image: '🍊',
      category: 'Beverages',
      type: 'drinks',
      price: 12.50,
      originalPrice: 15.00,
      rating: 4,
      sold: 75,
      badge: 'Sale',
      badgeColor: 'bg-orange-500',
      progress: 75
    }
  ];

  // Filter products based on active tab
  const filteredProducts = activeTab === 'all' 
    ? productsData 
    : productsData.filter(product => product.type === activeTab);

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-xs ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
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
        <h2 className="text-3xl font-bold text-gray-800">Daily Best Sells</h2>
        
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

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left Banner Card */}
        <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
              Bring nature<br />into your<br />home
            </h3>
            <button className="bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-emerald-600 transition-colors font-semibold text-sm flex items-center gap-2">
              Shop Now
              <span>→</span>
            </button>
          </div>
          
          {/* Decorative Leaf Image */}
          <div className="absolute bottom-0 right-0 text-9xl opacity-30">
            🌿
          </div>
        </div>

        {/* Product Cards */}
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
          >
            {/* Product Badge */}
            <div className="relative">
              <div className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs px-3 py-1 rounded-full font-semibold z-10`}>
                {product.badge}
              </div>

              {/* Product Image */}
              <div className="bg-gray-50 p-8 flex items-center justify-center h-48">
                <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </span>
              </div>
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

              {/* Price */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-emerald-600 font-bold text-lg">
                  ${product.price}
                </span>
                <span className="text-gray-400 line-through text-sm">
                  ${product.originalPrice}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Sold: {product.sold}/83</span>
                  <span>{product.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${product.progress}%` }}
                  />
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-emerald-50 text-emerald-600 py-2.5 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors font-semibold text-sm flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyBestSells;