import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturedCategories = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Categories data - easily replaceable with API data
  const categories = [
    { id: 1, name: 'Cake & Milk', items: 11, icon: '🍔', color: 'bg-green-50' },
    { id: 2, name: 'Oganic Kiwi', items: 6, icon: '🥝', color: 'bg-green-100' },
    { id: 3, name: 'Peach', items: 6, icon: '🍑', color: 'bg-orange-50' },
    { id: 4, name: 'Read Apple', items: 10, icon: '🍎', color: 'bg-pink-50' },
    { id: 5, name: 'Snacks', items: 11, icon: '🍿', color: 'bg-yellow-50' },
    { id: 6, name: 'Vegetables', items: 6, icon: '🥬', color: 'bg-green-50' },
    { id: 7, name: 'Strawberry', items: 10, icon: '🍓', color: 'bg-red-50' },
    { id: 9, name: 'Custard apple', items: 10, icon: '🍏', color: 'bg-green-50' },
    { id: 10, name: 'Coffe & Tea', items: 11, icon: '☕', color: 'bg-amber-50' }
  ];

  // Filter buttons - easily customizable
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'cake', label: 'Cake & Milk' },
    { id: 'coffee', label: 'Coffes & Teas' },
    { id: 'pet', label: 'Pet Foods' },
    { id: 'vegetables', label: 'Vegetables' }
  ];

  // Banner data - easily replaceable with API data
  const banners = [
    {
      id: 1,
      title: 'Everyday Fresh & Clean with Our Products',
      buttonText: 'Shop Now',
      image: '🧅',
      bgColor: 'bg-amber-50'
    },
    {
      id: 2,
      title: 'Make your Breakfast Healthy and Easy',
      buttonText: 'Shop Now',
      image: '🍓',
      bgColor: 'bg-pink-50'
    },
    {
      id: 3,
      title: 'The best Organic Products Online',
      buttonText: 'Shop Now',
      image: '🥗',
      bgColor: 'bg-blue-50'
    }
  ];

  const scrollCategories = (direction) => {
    const container = document.getElementById('categories-scroll');
    const scrollAmount = 200;
    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">
          <h2 className="text-3xl font-bold text-gray-800">Featured Categories</h2>
          
          {/* Filter Buttons */}
          {/* <div className="flex gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? 'text-emerald-600'
                    : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div> */}
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => scrollCategories('left')}
            className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-emerald-500 hover:text-emerald-500 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollCategories('right')}
            className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-emerald-500 hover:text-emerald-500 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div
        id="categories-scroll"
        className="flex gap-4 overflow-x-auto scrollbar-hide mb-8 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex-shrink-0 w-32 cursor-pointer group"
          >
            <div
              className={`${category.color} rounded-xl p-6 flex flex-col items-center justify-center h-32 transition-all group-hover:shadow-lg group-hover:-translate-y-1`}
            >
              <span className="text-5xl mb-2">{category.icon}</span>
            </div>
            <div className="text-center mt-3">
              <h3 className="font-semibold text-gray-800 text-sm group-hover:text-emerald-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-500 text-xs mt-1">{category.items} Items</p>
            </div>
          </div>
        ))}
      </div>

      {/* Banner Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`${banner.bgColor} rounded-2xl p-8 flex flex-col justify-between h-64 overflow-hidden relative group cursor-pointer transition-all hover:shadow-lg`}
          >
            <div className="z-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
                {banner.title}
              </h3>
              <button className="bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-emerald-600 transition-colors font-semibold text-sm flex items-center gap-2 group-hover:gap-3">
                {banner.buttonText}
                <span>→</span>
              </button>
            </div>
            
            {/* Banner Image/Icon */}
            <div className="absolute right-4 bottom-4 text-8xl opacity-50 group-hover:opacity-70 transition-opacity">
              {banner.image}
            </div>
          </div>
        ))}
      </div>

    
    </div>
  );
};

export default FeaturedCategories;