import React, { useState } from 'react';
import { Search, ShoppingCart, User, Phone, Menu } from 'lucide-react';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState('home');

  return (
    <div className="w-full">
      {/* Top Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              {/* <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">🛒</span>
              </div> */}
              <div>
                <h1 className="text-emerald-600 text-2xl font-bold leading-none">Nest</h1>
                <p className="text-xs text-gray-500">MART & GROCERY</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2.5 pr-12 border-2 border-emerald-500 rounded-md focus:outline-none focus:border-emerald-600"
                />
                <button className="absolute right-0 top-0 h-full px-6 bg-emerald-500 text-white rounded-r-md hover:bg-emerald-600 transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-6">
              {/* Wishlist */}
              <button className="flex flex-col items-center text-gray-600 hover:text-emerald-600 transition-colors">
                <div className="relative">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    0
                  </span>
                </div>
                <span className="text-xs mt-1">Wishlist</span>
              </button>

              {/* Cart */}
              <button className="flex flex-col items-center text-gray-600 hover:text-emerald-600 transition-colors">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    0
                  </span>
                </div>
                <span className="text-xs mt-1">Cart</span>
              </button>

              {/* Account */}
              <button className="flex flex-col items-center text-gray-600 hover:text-emerald-600 transition-colors">
                <User className="w-6 h-6" />
                <span className="text-xs mt-1">Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Browse Categories Button */}
            <button className="bg-emerald-500 text-white px-4 py-2 rounded-b-md flex items-center gap-2 hover:bg-emerald-600 transition-colors">
              <Menu className="w-5 h-5" />
              <span className="font-semibold">Browse All Categories</span>
            </button>

            {/* Navigation Links */}
            <nav className="flex items-center gap-8">
              <button
                onClick={() => setActiveMenu('deals')}
                className={`flex items-center gap-2 py-4 font-medium transition-colors ${
                  activeMenu === 'deals' ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                <span className="text-red-500">🔥</span>
                Hot Deals
              </button>

              <button
                onClick={() => setActiveMenu('home')}
                className={`py-4 font-medium transition-colors ${
                  activeMenu === 'home' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => setActiveMenu('about')}
                className={`py-4 font-medium transition-colors ${
                  activeMenu === 'about' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                About
              </button>

              <button
                onClick={() => setActiveMenu('shop')}
                className={`py-4 font-medium transition-colors ${
                  activeMenu === 'shop' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
                
              >
                Shop
              </button>

              <button
                onClick={() => setActiveMenu('blog')}
                className={`py-4 font-medium transition-colors ${
                  activeMenu === 'blog' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                Blog
              </button>

              <button
                onClick={() => setActiveMenu('contact')}
                className={`py-4 font-medium transition-colors ${
                  activeMenu === 'contact' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Phone Number */}
            <div className="flex items-center gap-2 text-emerald-600">
              <Phone className="w-5 h-5" />
              <span className="font-bold text-lg">+923242443881</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;