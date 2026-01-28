import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, Phone, Menu, X, User, Home, Package, Info, FileText, Mail, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" />, path: '/home' },
    { id: 'deals', label: 'Hot Deals', icon: <span className="text-red-500">🔥</span>, path: '/deals' },
    { id: 'shop', label: 'Shop', icon: <Package className="w-5 h-5" />, path: '/shop' },
    { id: 'about', label: 'About', icon: <Info className="w-5 h-5" />, path: '/about' },
    { id: 'blog', label: 'Blog', icon: <FileText className="w-5 h-5" />, path: '/blog' },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-5 h-5" />, path: '/contact' },
  ];

  return (
    <div className="w-full sticky top-0 z-50 bg-white">
      {/* Top Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center gap-4 flex-1 lg:flex-none">
              <button
                className="lg:hidden text-gray-600"
                onClick={() => setIsDrawerOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <Link to="/" className="flex items-center gap-2">
                  <div>
                    <h1 className="text-emerald-600 text-2xl font-bold leading-none">Nest</h1>
                    <p className="text-xs text-gray-500">MART & GROCERY</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2.5 pr-12 border-2 border-emerald-500 rounded-md focus:outline-none focus:border-emerald-600"
                />
                <button className="absolute right-0 top-0 h-full px-6 bg-emerald-500 text-white rounded-r-md hover:bg-emerald-600 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Search Icon and Right Icons */}
            <div className="flex items-center gap-4">
              {/* Mobile Search Icon */}
              <button 
                className="lg:hidden text-gray-600 hover:text-emerald-600"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-6 h-6" />
              </button>

              {/* Mobile Search Bar - Toggleable */}
              {isSearchOpen && isMobile && (
                <div className="absolute top-full left-0 right-0 bg-white border-b shadow-lg p-4 z-40">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for products..."
                      className="w-full px-4 py-3 pr-12 border-2 border-emerald-500 rounded-md focus:outline-none focus:border-emerald-600"
                      autoFocus
                    />
                    <button className="absolute right-0 top-0 h-full px-6 bg-emerald-500 text-white rounded-r-md hover:bg-emerald-600 transition-colors">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Right Icons - Desktop Only */}
              <div className="hidden lg:flex items-center gap-6">
                {/* Wishlist */}
                <Link to="/wishlist" className="flex flex-col items-center text-gray-600 hover:text-emerald-600 transition-colors">
                  <div className="relative">
                    <Heart className="w-6 h-6" />
                    <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      0
                    </span>
                  </div>
                  <span className="text-xs mt-1">Wishlist</span>
                </Link>

                {/* Cart */}
                <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-emerald-600 transition-colors">
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6" />
                    <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      0
                    </span>
                  </div>
                  <span className="text-xs mt-1">Cart</span>
                </Link>

                {/* Account */}
                <Link to="/login" className="flex flex-col items-center text-gray-600 hover:text-emerald-600 transition-colors">
                  <LogIn className="w-6 h-6" />
                  <span className="text-xs mt-1">Login</span>
                </Link>
              </div>

              {/* Mobile Cart Icon */}
              {/* <Link to="/cart" className="lg:hidden relative">
                <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-emerald-600" />
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Desktop Only */}
      <div className="bg-white border-b shadow-sm hidden lg:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Browse Categories Button */}
            <button className="bg-emerald-500 text-white px-4 py-2 rounded-b-md flex items-center gap-2 hover:bg-emerald-600 transition-colors min-w-[220px]">
              <Menu className="w-5 h-5" />
              <span className="font-semibold">Browse All Categories</span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="flex items-center gap-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setActiveMenu(item.id)}
                  className={`flex items-center gap-2 py-4 font-medium transition-colors ${
                    activeMenu === item.id
                      ? 'text-emerald-600 border-b-2 border-emerald-600'
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Phone Number */}
            <div className="flex items-center gap-2 text-emerald-600 min-w-[200px] justify-end">
              <Phone className="w-5 h-5" />
              <span className="font-bold text-lg">+923242443881</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Tabs - Below Search Bar */}
      <div className="lg:hidden bg-white border-b shadow-sm overflow-x-auto">
        <div className="flex">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setActiveMenu(item.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeMenu === item.id
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-50 transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsDrawerOpen(false)}
        ></div>
        
        {/* Drawer Content */}
        <div className="absolute inset-y-0 left-0 w-80 bg-white shadow-xl overflow-y-auto">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
            <div className="flex items-center gap-2">
              <Link to="/" onClick={() => setIsDrawerOpen(false)}>
                <h1 className="text-emerald-600 text-2xl font-bold">Nest</h1>
              </Link>
              <span className="text-xs text-gray-500">MART</span>
            </div>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="text-gray-600 hover:text-emerald-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b">
            <Link to="/login" onClick={() => setIsDrawerOpen(false)}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium">Welcome!</p>
                  <p className="text-sm text-gray-600">Sign in or Register</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation in Drawer */}
          <div className="py-4">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => {
                  setActiveMenu(item.id);
                  setIsDrawerOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-6 py-3 font-medium text-left transition-colors ${
                  activeMenu === item.id
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Drawer Features */}
          <div className="border-t pt-4">
            {/* Wishlist */}
            <Link to="/wishlist" onClick={() => setIsDrawerOpen(false)}>
              <button className="flex items-center gap-3 w-full px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <div className="relative">
                  <Heart className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    0
                  </span>
                </div>
                <span>Wishlist</span>
              </button>
            </Link>

            {/* Cart */}
            <Link to="/cart" onClick={() => setIsDrawerOpen(false)}>
              <button className="flex items-center gap-3 w-full px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    0
                  </span>
                </div>
                <span>Shopping Cart</span>
              </button>
            </Link>

            {/* Login */}
            <Link to="/login" onClick={() => setIsDrawerOpen(false)}>
              <button className="flex items-center gap-3 w-full px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <LogIn className="w-6 h-6" />
                <span>Login / Register</span>
              </button>
            </Link>
          </div>

          {/* Phone Number in Drawer */}
          <div className="sticky bottom-0 left-0 right-0 p-4 border-t bg-gray-50 mt-4">
            <div className="flex items-center gap-2 text-emerald-600">
              <Phone className="w-5 h-5" />
              <span className="font-bold">+923242443881</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">24/7 Support Available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;