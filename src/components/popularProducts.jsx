// import React, { useState } from 'react';
// import { ShoppingCart, Eye, Heart } from 'lucide-react';

// const PopularProducts = () => {
//   const [activeTab, setActiveTab] = useState('all');
//   const [hoveredProduct, setHoveredProduct] = useState(null);

//   // Tabs data - easily customizable
//   const tabs = [
//     { id: 'all', label: 'All' },
//     { id: 'baking', label: 'Baking material' },
//     { id: 'fruits', label: 'Fresh Fruits' },
//     { id: 'milk', label: 'Milks & Dairies' },
//     { id: 'meats', label: 'Meats' },
//     { id: 'vegetables', label: 'Vegetables' }
//   ];

//   // Products data - easily replaceable with API data
//   const productsData = [
//     {
//       id: 1,
//       name: 'Foster Farms Takeout Crispy Classic',
//       image: '🥫',
//       category: 'Snacks',
//       brand: 'Hambger Hel',
//       price: 17.85,
//       originalPrice: 19.8,
//       rating: 4,
//       badge: 'Sale',
//       badgeColor: 'bg-emerald-500',
//       bgColor: 'bg-emerald-50'
//     },
//     {
//       id: 2,
//       name: 'Organic Cage Grade A Large Eggs',
//       image: '🥚',
//       category: 'Dairy',
//       brand: 'Hambger Hel',
//       price: 9.00,
//       originalPrice: 12.00,
//       rating: 4,
//       badge: 'Best Sale',
//       badgeColor: 'bg-emerald-500',
//       bgColor: 'bg-yellow-50'
//     },
//     {
//       id: 3,
//       name: 'Haagen Caramel Cone Ice Cream Brand',
//       image: '🍦',
//       category: 'Frozen',
//       brand: 'Hambger Hel',
//       price: 22.85,
//       originalPrice: 24.85,
//       rating: 4,
//       badge: 'Sale',
//       badgeColor: 'bg-emerald-500',
//       bgColor: 'bg-yellow-100'
//     },
//     {
//       id: 4,
//       name: 'All Natural Style Chicken Meatballs',
//       image: '🥤',
//       category: 'Meat',
//       brand: 'Hambger Hel',
//       price: 23.00,
//       originalPrice: 32.00,
//       rating: 4,
//       badge: 'Hot',
//       badgeColor: 'bg-blue-500',
//       bgColor: 'bg-red-50'
//     },
//     {
//       id: 5,
//       name: 'Blue Almonds Lightly Salted Vegetables',
//       image: '🥛',
//       category: 'Dairy',
//       brand: 'Country Crock',
//       price: 23.85,
//       originalPrice: 25.85,
//       rating: 4,
//       badge: 'Sale',
//       badgeColor: 'bg-emerald-500',
//       bgColor: 'bg-blue-50'
//     },
//     {
//       id: 6,
//       name: 'Gordon\'s Beer Battered Fish Fillets',
//       image: '☕',
//       category: 'Seafood',
//       brand: 'Hambger Hel',
//       price: 23.85,
//       originalPrice: 25.85,
//       rating: 4,
//       badge: 'Sale',
//       badgeColor: 'bg-yellow-500',
//       bgColor: 'bg-green-100'
//     },
//     {
//       id: 7,
//       name: 'Seeds of Change Organic Red Rice',
//       image: '🌾',
//       category: 'Grains',
//       brand: 'Country Crock',
//       price: 28.85,
//       originalPrice: 32.85,
//       rating: 4,
//       badge: 'Best Sale',
//       badgeColor: 'bg-emerald-500',
//       bgColor: 'bg-red-50'
//     },
//     {
//       id: 8,
//       name: 'Canada Dry Ginger Ale - 2 L Bottle',
//       image: '🥜',
//       category: 'Beverages',
//       brand: 'Hambger Hel',
//       price: 32.85,
//       originalPrice: 33.85,
//       rating: 4,
//       badge: 'Sale',
//       badgeColor: 'bg-blue-500',
//       bgColor: 'bg-green-50'
//     },
//     {
//       id: 9,
//       name: 'Encore Seafoods Stuffed Alaskan',
//       image: '🌭',
//       category: 'Seafood',
//       brand: 'Hambger Hel',
//       price: 35.85,
//       originalPrice: 37.85,
//       rating: 4,
//       badge: 'Hot',
//       badgeColor: 'bg-emerald-500',
//       bgColor: 'bg-yellow-50'
//     },
//     {
//       id: 10,
//       name: 'Angel\'s Sweet & Salty Kettle Corn',
//       image: '🥗',
//       category: 'Snacks',
//       brand: 'Country Crock',
//       price: 48.85,
//       originalPrice: 52.85,
//       rating: 4,
//       badge: 'Hot',
//       badgeColor: 'bg-emerald-500',
//       bgColor: 'bg-orange-50'
//     }
//   ];

//   // Filter products based on active tab
//   const filteredProducts = activeTab === 'all' 
//     ? productsData 
//     : productsData.filter(product => {
//         const categoryMap = {
//           'baking': ['Snacks', 'Grains'],
//           'fruits': ['Dairy'],
//           'milk': ['Dairy', 'Frozen'],
//           'meats': ['Meat', 'Seafood'],
//           'vegetables': ['Snacks']
//         };
//         return categoryMap[activeTab]?.includes(product.category);
//       });

//   const renderStars = (rating) => {
//     return (
//       <div className="flex gap-1">
//         {[...Array(5)].map((_, i) => (
//           <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
//             ★
//           </span>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-8">
//       {/* Header with Tabs */}
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-3xl font-bold text-gray-800">Popular Products</h2>
        
//         <div className="flex gap-6">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`text-sm font-medium transition-colors ${
//                 activeTab === tab.id
//                   ? 'text-emerald-600'
//                   : 'text-gray-600 hover:text-emerald-600'
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//         {filteredProducts.map((product) => (
//           <div
//             key={product.id}
//             className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group relative"
//             onMouseEnter={() => setHoveredProduct(product.id)}
//             onMouseLeave={() => setHoveredProduct(null)}
//           >
//             {/* Product Badge */}
//             <div className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs px-3 py-1 rounded-full font-semibold z-10`}>
//               {product.badge}
//             </div>

//             {/* Hover Actions */}
//             {hoveredProduct === product.id && (
//               <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
//                 <button className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors">
//                   <Heart className="w-4 h-4" />
//                 </button>
//                 <button className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors">
//                   <Eye className="w-4 h-4" />
//                 </button>
//               </div>
//             )}

//             {/* Product Image */}
//             <div className={`${product.bgColor} p-8 flex items-center justify-center h-48`}>
//               <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
//                 {product.image}
//               </span>
//             </div>

//             {/* Product Info */}
//             <div className="p-4">
//               <p className="text-xs text-gray-500 mb-1">{product.category}</p>
//               <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
//                 {product.name}
//               </h3>
              
//               {/* Rating */}
//               <div className="flex items-center gap-2 mb-3">
//                 {renderStars(product.rating)}
//               </div>

//               {/* Brand */}
//               <p className="text-xs text-gray-500 mb-3">
//                 By <span className="text-emerald-600">{product.brand}</span>
//               </p>

//               {/* Price and Cart */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <span className="text-emerald-600 font-bold text-lg">
//                     ${product.price}
//                   </span>
//                   <span className="text-gray-400 line-through text-sm">
//                     ${product.originalPrice}
//                   </span>
//                 </div>
//                 <button className="bg-emerald-50 text-emerald-600 p-2 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors">
//                   <ShoppingCart className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PopularProducts;
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { fetchProduct } from '../redux/products/products_action';
import { addToCart } from '../redux/Cart//Cartslice';
import { toggleWishlist } from '../redux/Wishlist/wishlistSlice';

const PopularProducts = () => {
  const [activeTab, setActiveTab]       = useState('all');
  const [loadingId, setLoadingId]       = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // ── Auth ────────────────────────────────────────────────────
  const token      = localStorage.getItem('userInfo');
  const isLoggedIn = !!token;

  // ── Redux state ─────────────────────────────────────────────
  const { products, status } = useSelector((state) => state.product);

  const wishlistState = useSelector((state) => state.wishlist);
  const wishlistItems = wishlistState?.items || [];

  const isInWishlist = (productId) =>
    wishlistItems.some(
      (item) => item.productId === productId || item._id === productId
    );

  // ── Fetch products on mount ─────────────────────────────────
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // ── Normalize products array ────────────────────────────────
  const getProductsArray = () => {
    if (!products) return [];
    if (Array.isArray(products)) return products;
    if (products?.data  && Array.isArray(products.data))     return products.data;
    if (products?.products && Array.isArray(products.products)) return products.products;
    return [];
  };

  const allProducts = getProductsArray();

  // ── Keep only "popular" products (top-rated / most reviewed) ─
  // Popular = rating >= 4  OR  in top 10 by rating
  const popularProducts = [...allProducts]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 10);

  // ── Build category tabs from actual products ────────────────
  const categoryNames = [
    ...new Set(
      popularProducts.map((p) => {
        if (p.category && typeof p.category === 'object')
          return p.category.name || '';
        return p.category || '';
      }).filter(Boolean)
    ),
  ];

  const tabs = [
    { id: 'all', label: 'All' },
    ...categoryNames.map((name) => ({ id: name, label: name })),
  ];

  // ── Filter by active tab ────────────────────────────────────
  const filteredProducts =
    activeTab === 'all'
      ? popularProducts
      : popularProducts.filter((p) => {
          const cat =
            p.category && typeof p.category === 'object'
              ? p.category.name
              : p.category;
          return cat === activeTab;
        });

  // ── Helpers ─────────────────────────────────────────────────
  const getProductName  = (p) => p.name || p.productName || 'Unnamed Product';
  const getProductPrice = (p) => p.price || p.priceValue || 0;

  const getProductImage = (p) => {
    if (!p.image) return null;
    if (typeof p.image === 'string') return p.image;
    if (typeof p.image === 'object') return p.image.url || p.image.secure_url;
    return null;
  };

  const getCategoryName = (p) => {
    const cat = p.category;
    if (!cat) return 'Uncategorized';
    if (typeof cat === 'object') return cat.name || 'Uncategorized';
    return cat;
  };

  const getBrand = (p) => {
    if (!p.brand && !p.seller) return null;
    return p.brand || (typeof p.seller === 'object' ? p.seller?.name : p.seller);
  };

  const renderStars = (rating) => {
    const num = Math.floor(rating || 0);
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-sm ${i < num ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // ── Cart handler ────────────────────────────────────────────
  const handleAddToCart = async (e, product) => {
    e.stopPropagation(); // card click se alag
    if (!isLoggedIn) {
      toast.error('Please login to add items to cart 🛒');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    try {
      setLoadingId(product._id + '_cart');
      await dispatch(addToCart({ productId: product._id, quantity: 1 }));
      toast.success('Added to Cart 🛒');
    } catch {
      toast.error('Failed to add to Cart');
    } finally {
      setLoadingId(null);
    }
  };

  // ── Wishlist handler ────────────────────────────────────────
  const handleWishlist = async (e, product) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      toast.error('Login required to add items to your wishlist ❤️');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    try {
      setLoadingId(product._id + '_wish');
      await dispatch(toggleWishlist(product._id));
      toast.success(
        isInWishlist(product._id) ? 'Removed From Wishlist 💔' : 'Added to Wishlist ❤️'
      );
    } catch {
      toast.error('Failed to update wishlist');
    } finally {
      setLoadingId(null);
    }
  };

  // ── Navigate to product detail ──────────────────────────────
  const goToDetail = (productId) => navigate(`/product/${productId}`);

  // ── Loading skeleton ────────────────────────────────────────
  if (status === 'loading') {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-100 h-48 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (status === 'failed' || popularProducts.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8 text-center text-gray-500 py-20">
        {status === 'failed' ? 'Products load nahi ho sake.' : 'Koi popular product nahi mila.'}
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">

      {/* ── Header + Tabs ─────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Popular Products</h2>

        <div className="flex flex-wrap gap-2 md:gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm font-medium transition-colors pb-1 ${
                activeTab === tab.id
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-emerald-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Products Grid ─────────────────────────────────────── */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          Is category mein koi product nahi.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredProducts.map((product) => {
            const inWishlist    = isInWishlist(product._id);
            const cartLoading   = loadingId === product._id + '_cart';
            const wishLoading   = loadingId === product._id + '_wish';

            return (
              <div
                key={product._id}
                onClick={() => goToDetail(product._id)}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group relative cursor-pointer"
              >
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-3 left-3 ${product.badgeColor || 'bg-emerald-500'} text-white text-xs px-3 py-1 rounded-full font-semibold z-10`}>
                    {product.badge}
                  </div>
                )}

                {/* Hover action buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  {/* Wishlist */}
                  <button
                    onClick={(e) => handleWishlist(e, product)}
                    disabled={wishLoading}
                    className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all duration-300
                      ${inWishlist
                        ? 'bg-red-500 text-white scale-110'
                        : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
                      }`}
                  >
                    {wishLoading ? (
                      <div className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Heart
                        className="w-4 h-4"
                        fill={inWishlist ? 'white' : 'none'}
                        stroke={inWishlist ? 'white' : 'currentColor'}
                      />
                    )}
                  </button>

                  {/* Eye — view detail */}
                  <button
                    onClick={(e) => { e.stopPropagation(); goToDetail(product._id); }}
                    className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Persistent wishlist heart (without hover) */}
                {inWishlist && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="w-8 h-8 bg-red-500 rounded-full shadow-md flex items-center justify-center group-hover:opacity-0 transition-opacity">
                      <Heart className="w-4 h-4" fill="white" stroke="white" />
                    </div>
                  </div>
                )}

                {/* Product Image */}
                <div className="bg-gray-50 p-6 md:p-8 flex items-center justify-center h-40 md:h-48">
                  {getProductImage(product) ? (
                    <img
                      src={getProductImage(product)}
                      alt={getProductName(product)}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'https://t3.ftcdn.net/jpg/05/04/28/96/360_F_504289605_zehJiK0tCuZLP2MdfFBpcJdOVxKLnXg1.jpg';
                      }}
                    />
                  ) : (
                    <span className="text-6xl md:text-7xl group-hover:scale-110 transition-transform duration-300">🛒</span>
                  )}
                </div>

                {/* Info */}
                <div className="p-3 md:p-4">
                  <p className="text-xs text-gray-500 mb-1">{getCategoryName(product)}</p>

                  <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {getProductName(product)}
                  </h3>

                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(product.rating)}
                    <span className="text-xs text-gray-500">({product.rating || 0})</span>
                  </div>

                  {getBrand(product) && (
                    <p className="text-xs text-gray-500 mb-3">
                      By <span className="text-emerald-600">{getBrand(product)}</span>
                    </p>
                  )}

                  {/* Price + Cart */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold text-base md:text-lg">
                        $ {getProductPrice(product).toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-xs md:text-sm">
                        $ {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={cartLoading}
                      className="bg-emerald-50 text-emerald-600 p-2 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors flex items-center justify-center"
                    >
                      {cartLoading ? (
                        <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ShoppingCart className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PopularProducts;