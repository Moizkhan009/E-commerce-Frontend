import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Badge Skeleton */}
      <div className="absolute top-3 left-3 z-10">
        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      
      {/* Image Skeleton */}
      <div className="bg-gray-50 p-8 flex items-center justify-center h-48">
        <div className="h-24 w-24 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      
      {/* Content Skeleton */}
      <div className="p-4">
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-5 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-3"></div>
        
        {/* Price Skeletons */}
        <div className="flex gap-2 mb-3">
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Progress Bar Skeleton */}
        <div className="mb-3">
          <div className="flex justify-between mb-1">
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        
        {/* Button Skeleton */}
        <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;