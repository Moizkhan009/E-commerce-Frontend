// // import Skeleton from 'react-loading-skeleton';
// // import Skele\
// import Skeleton from "react-loading-skeleton";

// const ProductSkeleton = () => {
//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//       {/* Image area */}
//       <div className="p-6 h-48">
//         <Skeleton height={140} />
//       </div>
//       {/* Info area */}
//       <div className="p-4">
//         <Skeleton width={80} height={12} className="mb-1" />
//         <Skeleton height={14} count={2} className="mb-2" />
//         <Skeleton width={100} height={12} className="mb-2" />
//         <div className="flex justify-between items-center mt-3">
//           <Skeleton width={60} height={20} />
//           <Skeleton width={36} height={36} borderRadius={8} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductSkeleton;
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
      {/* 1. Image Area - Using an Aspect Ratio box for consistency */}
      <div className="aspect-square w-full bg-gray-50 p-4 flex items-center justify-center">
         <Skeleton 
           height="100%" 
           containerClassName="w-full h-full" 
           borderRadius="1rem" 
         />
      </div>

      {/* 2. Content Area */}
      <div className="p-5 space-y-3">
        <div>
          {/* Brand/Category Label */}
          <Skeleton width="30%" height={12} className="mb-2" />
          
          {/* Title - Multi-line to simulate realistic text wrapping */}
          <Skeleton height={18} width="90%" />
          <Skeleton height={18} width="60%" />
        </div>

        {/* Rating/Meta Stars */}
        <div className="flex gap-1">
          <Skeleton width={16} height={16} circle />
          <Skeleton width={60} height={14} />
        </div>

        {/* 3. Footer Area: Price and Action */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="space-y-1">
            <Skeleton width={80} height={24} />
            <Skeleton width={40} height={12} />
          </div>
          
          {/* Circular Button */}
          <Skeleton 
            width={44} 
            height={44} 
            circle 
            containerClassName="leading-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;