// // import React from 'react';

// // const ProductTabsSection = () => {
// //   // Products data for each section
// //   const topSelling = [
// //     { id: 1, name: 'Haagen Caramel Cone Ice Cream Boxes', image: '🍦', rating: 4, price: 22.85, originalPrice: 24.85 },
// //     { id: 2, name: 'Seeds of Change Organic Red Rice', image: '🌾', rating: 4, price: 28.85, originalPrice: 32.85 },
// //     { id: 3, name: 'Blue Almonds Lightly Salted Vegetables', image: '🥛', rating: 4, price: 23.85, originalPrice: 25.85 }
// //   ];

// //   const trending = [
// //     { id: 4, name: 'Foster Farms Takeout Crispy Classic', image: '🥫', rating: 4, price: 17.85, originalPrice: 19.85 },
// //     { id: 5, name: 'Haagen Caramel Cone Ice Cream Boxes', image: '🍦', rating: 4, price: 22.85, originalPrice: 24.85 },
// //     { id: 6, name: 'Gorton\'s Beer Battered Fish Fillets', image: '☕', rating: 4, price: 23.85, originalPrice: 25.85 }
// //   ];

// //   const recently = [
// //     { id: 7, name: 'Organic Cage Grade A Large Eggs', image: '🥚', rating: 4, price: 21.00, originalPrice: 24.00 },
// //     { id: 8, name: 'Naturally Flavored Cinnamon Vanilla', image: '🌿', rating: 4, price: 51.00, originalPrice: 55.00 },
// //     { id: 9, name: 'Seeds of Change Organic Watermelon', image: '🍉', rating: 4, price: 61.50, originalPrice: 64.00 }
// //   ];

// //   const topRated = [
// //     { id: 10, name: 'Pre-portioned, low-fat ice cream yogurt', image: '🍨', rating: 5, price: 79.00, originalPrice: 85.00 },
// //     { id: 11, name: 'Angie\'s Sweet & Salty Kettle Corn', image: '🍿', rating: 5, price: 48.85, originalPrice: 52.85 },
// //     { id: 12, name: 'Seeds of Change Organic Watermelon', image: '🍉', rating: 5, price: 61.50, originalPrice: 66.00 }
// //   ];

// //   const renderStars = (rating) => {
// //     return (
// //       <div className="flex gap-1">
// //         {[...Array(5)].map((_, i) => (
// //           <span key={i} className={`text-xs ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
// //         ))}
// //       </div>
// //     );
// //   };

// //   const ProductCard = ({ product }) => (
// //     <div className="flex gap-3 group cursor-pointer">
// //       <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-all">
// //         <span className="text-4xl group-hover:scale-110 transition-transform">{product.image}</span>
// //       </div>
// //       <div className="flex-1">
// //         <h4 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">
// //           {product.name}
// //         </h4>
// //         <div className="mb-1">{renderStars(product.rating)}</div>
// //         <div className="flex items-center gap-2">
// //           <span className="text-emerald-600 font-bold text-base">${product.price}</span>
// //           <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="w-full max-w-7xl mx-auto px-4 py-8">
// //       {/* All 4 Sections Side by Side in One Row */}
// //       <div className="grid grid-cols-4 gap-8">
// //         {/* Top Selling */}
// //         <div>
// //           <div className="mb-4">
// //             <h3 className="text-xl font-bold text-gray-800 mb-1">Top Selling</h3>
// //             <div className="w-12 h-1 bg-emerald-500"></div>
// //           </div>
// //           <div className="space-y-4">
// //             {topSelling.map((product) => <ProductCard key={product.id} product={product} />)}
// //           </div>
// //         </div>

// //         {/* Trending Products */}
// //         <div>
// //           <div className="mb-4">
// //             <h3 className="text-xl font-bold text-gray-800 mb-1">Trending Products</h3>
// //             <div className="w-12 h-1 bg-emerald-500"></div>
// //           </div>
// //           <div className="space-y-4">
// //             {trending.map((product) => <ProductCard key={product.id} product={product} />)}
// //           </div>
// //         </div>

// //         {/* Recently added */}
// //         <div>
// //           <div className="mb-4">
// //             <h3 className="text-xl font-bold text-gray-800 mb-1">Recently added</h3>
// //             <div className="w-12 h-1 bg-emerald-500"></div>
// //           </div>
// //           <div className="space-y-4">
// //             {recently.map((product) => <ProductCard key={product.id} product={product} />)}
// //           </div>
// //         </div>

// //         {/* Top Rated */}
// //         <div>
// //           <div className="mb-4">
// //             <h3 className="text-xl font-bold text-gray-800 mb-1">Top Rated</h3>
// //             <div className="w-12 h-1 bg-emerald-500"></div>
// //           </div>
// //           <div className="space-y-4">
// //             {topRated.map((product) => <ProductCard key={product.id} product={product} />)}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductTabsSection;
// import React, { useEffect } from 'react';
// import { fetchProductsBySection } from '../redux/products/products_action';
// import { useDispatch, useSelector } from 'react-redux';


// const ProductTabsSection = () => {
//   const dispatch = useDispatch();


//   const section = useSelector((state)=>state.product?.sections || {});
//   const status = useSelector((state)=>state.product?.status);
//   const error =useSelector((status)=>status.product?.error);

//   const loading = status === 'loading';

//   const transformProduct =(product)=>({

//  id: product._id,
//     name: product.name,
//     image: product.image || getProductEmoji(product.category?.name),
//     rating: product.rating || 0,
//     price: product.price,
//     originalPrice: product.originalPrice || product.price,

//   });

//   // Products data for each section
//   // const topSelling = [
//   //   { id: 1, name: 'Haagen Caramel Cone Ice Cream Boxes', image: '🍦', rating: 4, price: 22.85, originalPrice: 24.85 },
//   //   { id: 2, name: 'Seeds of Change Organic Red Rice', image: '🌾', rating: 4, price: 28.85, originalPrice: 32.85 },
//   //   { id: 3, name: 'Blue Almonds Lightly Salted Vegetables', image: '🥛', rating: 4, price: 23.85, originalPrice: 25.85 }
//   // ];

//   // const trending = [
//   //   { id: 4, name: 'Foster Farms Takeout Crispy Classic', image: '🥫', rating: 4, price: 17.85, originalPrice: 19.85 },
//   //   { id: 5, name: 'Haagen Caramel Cone Ice Cream Boxes', image: '🍦', rating: 4, price: 22.85, originalPrice: 24.85 },
//   //   { id: 6, name: 'Gorton\'s Beer Battered Fish Fillets', image: '☕', rating: 4, price: 23.85, originalPrice: 25.85 }
//   // ];

//   // const recently = [
//   //   { id: 7, name: 'Organic Cage Grade A Large Eggs', image: '🥚', rating: 4, price: 21.00, originalPrice: 24.00 },
//   //   { id: 8, name: 'Naturally Flavored Cinnamon Vanilla', image: '🌿', rating: 4, price: 51.00, originalPrice: 55.00 },
//   //   { id: 9, name: 'Seeds of Change Organic Watermelon', image: '🍉', rating: 4, price: 61.50, originalPrice: 64.00 }
//   // ];

//   // const topRated = [
//   //   { id: 10, name: 'Pre-portioned, low-fat ice cream yogurt', image: '🍨', rating: 5, price: 79.00, originalPrice: 85.00 },
//   //   { id: 11, name: 'Angie\'s Sweet & Salty Kettle Corn', image: '🍿', rating: 5, price: 48.85, originalPrice: 52.85 },
//   //   { id: 12, name: 'Seeds of Change Organic Watermelon', image: '🍉', rating: 5, price: 61.50, originalPrice: 66.00 }
//   // ];
// const getProductEmoji = (category) => {
//     const emojis = {
//       'Sweets': '🍬',
//       'Snacks': '🍿',
//       'Drinks': '🥤',
//       'Beauty': '💄',
//       'Dairy': '🥛',
//       'Grains': '🌾',
//       'Fruits': '🍎',
//       'Vegetables': '🥬'
//     };
//     return emojis[category] || '📦';
//   };

//   const topSelling =(section['topSelling ']||[]).map(transformProduct);
//   const trending =(section['trending ']||[]).map(transformProduct) ;
//    const recently = (sections['recently'] || []).map(transformProduct);
//   const topRated = (sections['topRated'] || []).map(transformProduct);


//    useEffect(() => {
//     const sectionsToFetch = ['topSelling', 'trending', 'recently', 'topRated'];
    
//     sectionsToFetch.forEach((section) => {
//       // Agar products nahi hain tabhi fetch karo
//       if (!sections[section] || sections[section].length === 0) {
//         dispatch(fetchProductsBySection(section));
//       }
//     });
//   }, [dispatch, sections]);
  
//   // Loading skeleton
//   if (loading && Object.keys(sections).length === 0) {
//     return (
//       <div className="w-full max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-4 gap-8">
//           {[1,2,3,4].map((i) => (
//             <div key={i}>
//               <div className="mb-4">
//                 <div className="h-7 w-32 bg-gray-200 rounded animate-pulse"></div>
//                 <div className="w-12 h-1 bg-gray-200 mt-1"></div>
//               </div>
//               <div className="space-y-4">
//                 {[1,2,3].map((j) => (
//                   <div key={j} className="flex gap-3">
//                     <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
//                     <div className="flex-1 space-y-2">
//                       <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
//                       <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
//                       <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
  
//   // Error handling
//   if (error && Object.keys(sections).length === 0) {
//     return (
//       <div className="w-full max-w-7xl mx-auto px-4 py-8 text-center">
//         <p className="text-red-500 mb-2">Error: {error}</p>
//         <button 
//           onClick={() => {
//             ['topSelling', 'trending', 'recently', 'topRated'].forEach(section => {
//               dispatch(fetchProductsBySection(section));
//             });
//           }}
//           className="text-emerald-500 hover:underline"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }
//   const renderStars = (rating) => {
//     return (
//       <div className="flex gap-1">
//         {[...Array(5)].map((_, i) => (
//           <span key={i} className={`text-xs ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
//         ))}
//       </div>
//     );
//   };

//   const ProductCard = ({ product }) => (
//     <div className="flex gap-3 group cursor-pointer">
//       <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-all">
//         <span className="text-4xl group-hover:scale-110 transition-transform">{product.image}</span>
//       </div>
//       <div className="flex-1">
//         <h4 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">
//           {product.name}
//         </h4>
//         <div className="mb-1">{renderStars(product.rating)}</div>
//         <div className="flex items-center gap-2">
//           <span className="text-emerald-600 font-bold text-base">${product.price}</span>
//           <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-8">
//       {/* All 4 Sections Side by Side in One Row */}
//       <div className="grid grid-cols-4 gap-8">
//         {/* Top Selling */}
//         <div>
//           <div className="mb-4">
//             <h3 className="text-xl font-bold text-gray-800 mb-1">Top Selling</h3>
//             <div className="w-12 h-1 bg-emerald-500"></div>
//           </div>
//           <div className="space-y-4">
//             {topSelling.map((product) => <ProductCard key={product.id} product={product} />)}
//           </div>
//         </div>

//         {/* Trending Products */}
//         <div>
//           <div className="mb-4">
//             <h3 className="text-xl font-bold text-gray-800 mb-1">Trending Products</h3>
//             <div className="w-12 h-1 bg-emerald-500"></div>
//           </div>
//           <div className="space-y-4">
//             {trending.map((product) => <ProductCard key={product.id} product={product} />)}
//           </div>
//         </div>

//         {/* Recently added */}
//         <div>
//           <div className="mb-4">
//             <h3 className="text-xl font-bold text-gray-800 mb-1">Recently added</h3>
//             <div className="w-12 h-1 bg-emerald-500"></div>
//           </div>
//           <div className="space-y-4">
//             {recently.map((product) => <ProductCard key={product.id} product={product} />)}
//           </div>
//         </div>

//         {/* Top Rated */}
//         <div>
//           <div className="mb-4">
//             <h3 className="text-xl font-bold text-gray-800 mb-1">Top Rated</h3>
//             <div className="w-12 h-1 bg-emerald-500"></div>
//           </div>
//           <div className="space-y-4">
//             {topRated.map((product) => <ProductCard key={product.id} product={product} />)}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductTabsSection;
// import React, { useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProductsBySection } from '../redux/products/products_action';

// const ProductTabsSection = () => {
//   const dispatch = useDispatch();
//   const hasFetched = useRef(false); // 👈 Track if already fetched
  
//   const sections = useSelector((state) => state.product?.sections || {});
//   const status = useSelector((state) => state.product?.status);
//   const error = useSelector((state) => state.product?.error);
  
//   const loading = status === 'loading';

//   // Helper: Product transformation (UI ke liye)
//   const transformProduct = (product) => ({
//     id: product._id,
//     name: product.name,
//     image: product.image || getProductEmoji(product.category?.name),
//     rating: product.rating || 0,
//     price: product.price,
//     originalPrice: product.originalPrice || product.price,
//   });

//   const getProductEmoji = (category) => {
//     const emojis = {
//       'Sweets': '🍬',
//       'Snacks': '🍿',
//       'Drinks': '🥤',
//       'Beauty': '💄',
//       'Dairy': '🥛',
//       'Grains': '🌾',
//     };
//     return emojis[category] || '📦';
//   };

//   // Get products from Redux
//   const topSelling = (sections['topSelling'] || []).map(transformProduct);
//   const trending = (sections['trending'] || []).map(transformProduct);
//   const recently = (sections['recently'] || []).map(transformProduct);
//   const topRated = (sections['topRated'] || []).map(transformProduct);

//   // ✅ FIXED: Sirf EK BAAR fetch karega - Empty dependency array
//   useEffect(() => {
//     const sectionsToFetch = ['topSelling', 'trending', 'recently', 'topRated'];
    
//     sectionsToFetch.forEach((section) => {
//       // Sirf wohi fetch karo jo already nahi hai
//       if (!sections[section] || sections[section].length === 0) {
//         dispatch(fetchProductsBySection(section));
//       }
//     });
//   }, []); // 👈 EMPTY - Sirf component mount hone pe ek baar

//   // Loading skeleton (optional)
//   if (loading && Object.keys(sections).length === 0) {
//     return (
//       <div className="w-full max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-4 gap-8">
//           {[1,2,3,4].map((i) => (
//             <div key={i}>
//               <div className="mb-4">
//                 <div className="h-7 w-32 bg-gray-200 rounded animate-pulse"></div>
//                 <div className="w-12 h-1 bg-gray-200 mt-1"></div>
//               </div>
//               <div className="space-y-4">
//                 {[1,2,3].map((j) => (
//                   <div key={j} className="flex gap-3">
//                     <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
//                     <div className="flex-1 space-y-2">
//                       <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
//                       <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
//                       <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // Rest of your UI remains SAME...
//   const renderStars = (rating) => {
//     return (
//       <div className="flex gap-1">
//         {[...Array(5)].map((_, i) => (
//           <span key={i} className={`text-xs ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
//         ))}
//       </div>
//     );
//   };

//   const ProductCard = ({ product }) => (
//     <div className="flex gap-3 group cursor-pointer">
//       <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-all">
//         {product.image?.startsWith('http') ? (
//           <img src={product.image} alt={product.name} className="w-16 h-16 object-contain group-hover:scale-110 transition-transform" />
//         ) : (
//           <span className="text-4xl group-hover:scale-110 transition-transform">{product.image}</span>
//         )}
//       </div>
//       <div className="flex-1">
//         <h4 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">
//           {product.name}
//         </h4>
//         <div className="mb-1">{renderStars(product.rating)}</div>
//         <div className="flex items-center gap-2">
//           <span className="text-emerald-600 font-bold text-base">${product.price}</span>
//           {product.originalPrice > product.price && (
//             <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-8">
//       <div className="grid grid-cols-4 gap-8">
//         {/* Top Selling */}
//         <div>
//           <div className="mb-4">
//             <h3 className="text-xl font-bold text-gray-800 mb-1">Top Selling</h3>
//             <div className="w-12 h-1 bg-emerald-500"></div>
//           </div>
//           <div className="space-y-4">
//             {topSelling.slice(0, 3).map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>

//         {/* Trending Products */}
//         <div>
//           <div className="mb-4">
//             <h3 className="text-xl font-bold text-gray-800 mb-1">Trending Products</h3>
//             <div className="w-12 h-1 bg-emerald-500"></div>
//           </div>
//           <div className="space-y-4">
//             {trending.slice(0, 3).map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>

//         {/* Recently added */}
//         <div>
//           <div className="mb-4">
//             <h3 className="text-xl font-bold text-gray-800 mb-1">Recently added</h3>
//             <div className="w-12 h-1 bg-emerald-500"></div>
//           </div>
//           <div className="space-y-4">
//             {recently.slice(0, 3).map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>

//         {/* Top Rated */}
//         <div>
//           <div className="mb-4">
//             <h3 className="text-xl font-bold text-gray-800 mb-1">Top Rated</h3>
//             <div className="w-12 h-1 bg-emerald-500"></div>
//           </div>
//           <div className="space-y-4">
//             {topRated.slice(0, 3).map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductTabsSection;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { fetchProduct } from '../redux/products/products_action';
import { addToCart } from '../redux/Cart/Cartslice';
import { toggleWishlist } from '../redux/Wishlist/wishlistSlice';

const ProductTabsSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token      = localStorage.getItem('userInfo');
  const isLoggedIn = !!token;

  const { products, status } = useSelector((state) => state.product);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  const isInWishlist = (id) =>
    wishlistItems.some((item) => item.productId === id || item._id === id);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // Normalize products array
  const getProductsArray = () => {
    if (!products) return [];
    if (Array.isArray(products)) return products;
    if (products?.data     && Array.isArray(products.data))     return products.data;
    if (products?.products && Array.isArray(products.products)) return products.products;
    return [];
  };

  const all = getProductsArray();

  // 4 sections — top 3 each
  const topSelling    = [...all].sort((a, b) => (b.sold || b.sales || 0)   - (a.sold || a.sales || 0)).slice(0, 3);
  const trending      = [...all].sort((a, b) => (b.views || b.clicks || 0) - (a.views || a.clicks || 0)).slice(0, 3);
  const recentlyAdded = [...all].sort((a, b) => new Date(b.createdAt || 0)  - new Date(a.createdAt || 0)).slice(0, 3);
  const topRated      = [...all].sort((a, b) => (b.rating || 0)            - (a.rating || 0)).slice(0, 3);

  // Helpers
  const getName  = (p) => p.name || p.productName || 'Unnamed Product';
  const getPrice = (p) => p.price || p.priceValue || 0;

  const getImage = (p) => {
    if (!p.image) return null;
    if (typeof p.image === 'string') return p.image;
    if (typeof p.image === 'object') return p.image.url || p.image.secure_url;
    return null;
  };

  const handleCart = async (e, product) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      toast.error('Please login to add items to cart 🛒');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    try {
      await dispatch(addToCart({ productId: product._id, quantity: 1 }));
      toast.success('Added to Cart 🛒');
    } catch {
      toast.error('Failed to add to Cart');
    }
  };

  const handleWish = async (e, product) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      toast.error('Login required ❤️');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    try {
      await dispatch(toggleWishlist(product._id));
      toast.success(isInWishlist(product._id) ? 'Removed 💔' : 'Added to Wishlist ❤️');
    } catch {
      toast.error('Failed to update wishlist');
    }
  };

  const renderStars = (rating) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-xs ${i < Math.floor(rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
      ))}
    </div>
  );

  // ── Original ProductCard UI — unchanged ──────────────────────
  const ProductCard = ({ product }) => {
    const img = getImage(product);
    return (
      <div
        className="flex gap-3 group cursor-pointer"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-all overflow-hidden">
          {img ? (
            <img
              src={img}
              alt={getName(product)}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform p-1"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://t3.ftcdn.net/jpg/05/04/28/96/360_F_504289605_zehJiK0tCuZLP2MdfFBpcJdOVxKLnXg1.jpg';
              }}
            />
          ) : (
            <span className="text-4xl group-hover:scale-110 transition-transform">🛒</span>
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">
            {getName(product)}
          </h4>
          <div className="mb-1">{renderStars(product.rating)}</div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold text-base">
              Rs {getPrice(product).toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                Rs {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (status === 'loading') {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-8">
          {[...Array(4)].map((_, col) => (
            <div key={col} className="space-y-4">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
              {[...Array(3)].map((_, row) => (
                <div key={row} className="flex gap-3">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg animate-pulse flex-shrink-0" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-3 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (all.length === 0) return null;

  // ── Original layout — unchanged ──────────────────────────────
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-4 gap-8">

        {/* Top Selling */}
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Top Selling</h3>
            <div className="w-12 h-1 bg-emerald-500"></div>
          </div>
          <div className="space-y-4">
            {topSelling.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>

        {/* Trending Products */}
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Trending Products</h3>
            <div className="w-12 h-1 bg-emerald-500"></div>
          </div>
          <div className="space-y-4">
            {trending.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>

        {/* Recently Added */}
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Recently added</h3>
            <div className="w-12 h-1 bg-emerald-500"></div>
          </div>
          <div className="space-y-4">
            {recentlyAdded.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>

        {/* Top Rated */}
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Top Rated</h3>
            <div className="w-12 h-1 bg-emerald-500"></div>
          </div>
          <div className="space-y-4">
            {topRated.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductTabsSection;