// import React from 'react';

// const SkeletonLoader = () => {
//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-8">
//       {/* Header Skeleton */}
//       <div className="flex items-center justify-between mb-8">
//         <div className="h-9 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
//         <div className="flex gap-6">
//           {[1, 2, 3, 4, 5, 6, 7].map((i) => (
//             <div key={i} className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
//           ))}
//         </div>
//       </div>

//       {/* Grid Skeleton */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//         {/* Banner Card Skeleton */}
//         <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl p-5 relative overflow-hidden">
//           <div className="space-y-4">
//             <div className="h-24 w-32 bg-gray-300 rounded-lg animate-pulse"></div>
//             <div className="h-10 w-28 bg-gray-300 rounded-md animate-pulse"></div>
//           </div>
//         </div>

//         {/* Product Cards Skeleton */}
//         {[1, 2, 3, 4].map((i) => (
//           <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//             {/* Badge Skeleton */}
//             <div className="absolute top-3 left-3 z-10">
//               <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
//             </div>
            
//             {/* Image Skeleton */}
//             <div className="bg-gray-50 p-8 flex items-center justify-center h-48">
//               <div className="h-24 w-24 bg-gray-200 rounded-full animate-pulse"></div>
//             </div>
            
//             {/* Content Skeleton */}
//             <div className="p-4 space-y-3">
//               <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
//               <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
//               <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
//               <div className="flex gap-2">
//                 <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
//                 <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
//                   <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
//                 </div>
//                 <div className="h-2 w-full bg-gray-200 rounded-full animate-pulse"></div>
//               </div>
//               <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // export default SkeletonLoader;
// import React from 'react';

// const ProductCardSkeleton = () => {
//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//       {/* Badge Skeleton */}
//       <div className="absolute top-3 left-3 z-10">
//         <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
//       </div>
      
//       {/* Image Skeleton */}
//       <div className="bg-gray-50 p-8 flex items-center justify-center h-48">
//         <div className="h-24 w-24 bg-gray-200 rounded-full animate-pulse"></div>
//       </div>
      
//       {/* Content Skeleton */}
//       <div className="p-4">
//         <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
//         <div className="h-5 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
//         <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-3"></div>
        
//         {/* Price Skeletons */}
//         <div className="flex gap-2 mb-3">
//           <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
//           <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
//         </div>
        
//         {/* Progress Bar Skeleton */}
//         <div className="mb-3">
//           <div className="flex justify-between mb-1">
//             <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
//             <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
//           </div>
//           <div className="h-2 w-full bg-gray-200 rounded-full animate-pulse"></div>
//         </div>
        
//         {/* Button Skeleton */}
//         <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
//       </div>
//     </div>
//   );
// };

// export default ProductCardSkeleton;
import React from 'react';
import ProductCardSkeleton from './ProductCardSkeleton';

const DailyBestSellsSkeleton = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-9 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="flex gap-6">
          {['Featured', 'Trending', 'Deals', 'Beauty', 'Bread', 'Drinks', 'Milks'].map((_, i) => (
            <div key={i} className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Banner Card Skeleton */}
        <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl p-5 relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="space-y-2">
              <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-8 w-28 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-8 w-24 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-28 bg-gray-300 rounded-md animate-pulse"></div>
          </div>
          <div className="absolute bottom-0 right-0 text-9xl opacity-30">🌿</div>
        </div>

        {/* Product Cards Skeletons */}
        {[1, 2, 3, 4].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default DailyBestSellsSkeleton;