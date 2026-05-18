import React, { useState, useEffect } from 'react';
import { ShoppingCart, Eye, Heart, Grid, List } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux/products/products_action";
import { addToCart } from '../../redux/Cart/Cartslice';
import { toggleWishlist } from '../../redux/Wishlist/wishlistSlice';
import { HashLoader } from "react-spinners";
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductSkeleton from './ProductSkeleton';

const ProductsGridPage = () => {
  const [sortBy, setSortBy] = useState('featured');
  const [showCount, setShowCount] = useState(50);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Current page ka path — login ke baad wapis aane ke liye

  const wishlistState = useSelector((state) => state.wishlist);
  const wishlistItems = wishlistState?.items || [];

  // ✅ Token se login check
  const token = localStorage.getItem("userInfo");
  const isLoggedIn = !!token;

  // ✅ Wishlist mein product hai ya nahi
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.productId === productId || item._id === productId);
  };

  // ✅ Wishlist handler — login nahi toh login page par bhejo, wapis same page par
  const handleWishlist = async (product) => {
    if (!isLoggedIn) {
      toast.error("Login required to add items to your wishlist❤️");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    setLoadingId(product._id);
    try {
      await dispatch(toggleWishlist(product._id));
      toast.success(
        isInWishlist(product._id)
          ? "Removed From Wishlist💔"
          : "Added to Wishlist❤️"
      );
    } catch (error) {
      toast.error("Failed to update wishlist");
    } finally {
      setLoadingId(null);
    }
  };

  // ✅ Cart handler — login nahi toh login page par bhejo, wapis same page par
  const handleAddToCart = async (product) => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to cart 🛒");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    try {
      setLoadingId(product._id);
      await dispatch(
        addToCart({
          productId: product._id,
          quantity: 1,
        })
      );
      toast.success("Added to Cart🛒");
    } catch (error) {
      toast.error("Failed to add to Cart");
    } finally {
      setLoadingId(null);
    }
  };

  const { products, status, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {[...Array(10)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
    );
  }

  if (status === "failed") {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  const getProductsArray = () => {
    if (!products) return [];
    if (Array.isArray(products)) return products;
    if (products?.data && Array.isArray(products.data)) return products.data;
    if (products?.products && Array.isArray(products.products)) return products.products;
    return [];
  };

  const productsArray = getProductsArray();

  if (productsArray.length === 0) {
    return <div className="text-center py-20">Koi product nahi mila</div>;
  }

  const categories = [...new Set(productsArray
    .map(p => {
      if (p.category && typeof p.category === 'object') return p.category.name || p.category._id;
      return p.category;
    })
    .filter(Boolean))];

  const filteredProducts = selectedCategories.length === 0
    ? productsArray
    : productsArray.filter(product => {
        const productCategory = product.category && typeof product.category === 'object'
          ? (product.category.name || product.category._id)
          : product.category;
        return selectedCategories.includes(productCategory);
      });

  const getSortedProducts = () => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price-low': return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-high': return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'rating': return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'latest': return sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      default: return sorted;
    }
  };

  const sortedProducts = getSortedProducts();
  const displayedProducts = sortedProducts.slice(0, showCount);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const renderStars = (rating) => {
    const numRating = Math.floor(rating || 0);
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-sm ${i < numRating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
        ))}
      </div>
    );
  };

  const getProductId = (product) => product._id || product.id;
  const getProductName = (product) => product.name || product.productName || 'Unnamed Product';
  const getProductPrice = (product) => product.price || product.priceValue || 0;

  const getProductImage = (product) => {
    if (!product.image) return null;
    if (typeof product.image === 'string') return product.image;
    if (typeof product.image === 'object') return product.image.url || product.image.secure_url;
    return null;
  };

  const getCategoryName = (category) => {
    if (!category) return 'Uncategorized';
    if (typeof category === 'object') return category.name || 'Uncategorized';
    return category;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="text-gray-600">
          We found{" "}
          <span className="text-emerald-600 font-bold">{filteredProducts.length}</span>{" "}
          items for you!
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm flex items-center gap-1">
              <Grid className="w-4 h-4" /> Show:
            </span>
            <select
              value={showCount}
              onChange={(e) => setShowCount(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm flex items-center gap-1">
              <List className="w-4 h-4" /> Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="latest">Latest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      {categories.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          <span className="text-gray-600 font-medium">Categories:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategories.includes(category)
                  ? "bg-emerald-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
          {selectedCategories.length > 0 && (
            <button
              onClick={() => setSelectedCategories([])}
              className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200"
            >
              Clear All
            </button>
          )}
        </div>
      )}

      {/* Products Grid */}
      {displayedProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No products match your filters</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {displayedProducts.map((product) => {
            const inWishlist = isInWishlist(getProductId(product)); // ✅ Wishlist status per product

            return (
              <div
                key={getProductId(product) || Math.random()}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group relative"
              >
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-3 left-3 ${product.badgeColor || "bg-emerald-500"} text-white text-xs px-3 py-1 rounded-full font-semibold z-10`}>
                    {product.badge}
                  </div>
                )}

                {/* Hover Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  
                  {/* ✅ Wishlist Button — wishlist mein ho toh HAMESHA filled red heart */}
                  <button
                    onClick={() => handleWishlist(product)}
                    disabled={loadingId === product._id}
                    className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all duration-300
                      ${inWishlist
                        ? "bg-red-500 text-white scale-110"
                        : "bg-white text-gray-600 hover:bg-red-500 hover:text-white"
                      }`}
                  >
                    {loadingId === product._id ? (
                      <div className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Heart
                        className="w-4 h-4"
                        // ✅ Wishlist mein ho toh fill white (kyunki bg red hai), nahi toh empty
                        fill={inWishlist ? "white" : "none"}
                        stroke={inWishlist ? "white" : "currentColor"}
                      />
                    )}
                  </button>

                  {/* View Button */}
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* ✅ Wishlist mein ho toh card ke corner par bhi filled heart dikhao (hover ke baghair bhi) */}
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
                        e.target.src = "https://t3.ftcdn.net/jpg/05/04/28/96/360_F_504289605_zehJiK0tCuZLP2MdfFBpcJdOVxKLnXg1.jpg";
                      }}
                    />
                  ) : (
                    <span className="text-6xl md:text-7xl group-hover:scale-110 transition-transform duration-300">🛒</span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3 md:p-4">
                  <p className="text-xs text-gray-500 mb-1">{getCategoryName(product.category)}</p>
                  <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {getProductName(product)}
                  </h3>

                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(product.rating)}
                    <span className="text-xs text-gray-500">({product.rating || 0})</span>
                  </div>

                  {product.brand && (
                    <p className="text-xs text-gray-500 mb-3">
                      By <span className="text-emerald-600">{product.brand}</span>
                    </p>
                  )}

                  {/* Price + Cart */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold text-base md:text-lg">
                        ${getProductPrice(product)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-xs md:text-sm">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* ✅ Cart Button — login nahi toh login par redirect */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={loadingId === product._id}
                      className="bg-emerald-50 text-emerald-600 p-2 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors flex items-center justify-center"
                    >
                      {loadingId === product._id ? (
                        <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
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

      {/* Load More */}
      {displayedProducts.length < filteredProducts.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowCount((prev) => prev + 20)}
            className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-semibold"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsGridPage;