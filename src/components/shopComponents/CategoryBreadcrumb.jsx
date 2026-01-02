import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

const CategoryBreadcrumb = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="relative bg-gradient-to-br from-emerald-100 via-emerald-50 to-teal-50 rounded-2xl overflow-hidden shadow-sm">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-10 text-6xl">🥬</div>
          <div className="absolute top-8 right-20 text-5xl">🍅</div>
          <div className="absolute bottom-4 left-1/4 text-6xl">🥕</div>
          <div className="absolute top-1/2 right-10 text-5xl">🍎</div>
          <div className="absolute bottom-6 right-1/3 text-5xl">🥦</div>
        </div>

        <div className="relative z-10 px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Left Section - Title & Breadcrumb */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-3">Snack</h1>
              
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm">
                <Home className="w-4 h-4 text-emerald-600" />
                <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Home
                </a>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <a href="#" className="text-gray-600 hover:text-emerald-600">
                  Shop
                </a>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-800 font-medium">Snack</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBreadcrumb;