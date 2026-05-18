import React from 'react';
import { Heart, ShoppingCart, Trash2, ExternalLink } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '../../redux/Wishlist/wishlistSlice';
import { addToCart } from '../../redux/Cart/Cartslice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const WishlistSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistState = useSelector(s => s.wishlist);
  const items = wishlistState?.items || wishlistState?.data || [];

  const handleRemove = async (productId) => {
    await dispatch(toggleWishlist(productId));
    toast.success('Removed from wishlist 💔');
  };

  const handleAddToCart = async (productId) => {
    await dispatch(addToCart({ productId, quantity: 1 }));
    toast.success('Added to cart 🛒');
  };

  const getImage = item => {
    if (!item.image) return null;
    if (typeof item.image === 'string') return item.image;
    return item.image?.url || item.image?.secure_url || null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-800">My Wishlist</h2>
        <div className="flex items-center gap-2">
          <span className="bg-red-50 text-red-500 text-xs font-bold px-2.5 py-1 rounded-full border border-red-100">
            {items.length} items
          </span>
          {items.length > 0 && (
            <button onClick={() => navigate('/wishlist')}
              className="flex items-center gap-1 text-emerald-600 text-xs font-medium hover:text-emerald-700 transition-colors">
              View All <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <Heart className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm font-medium">Wishlist is empty</p>
          <p className="text-xs mt-1">Save products to your wishlist ❤️</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {items.slice(0, 4).map(item => (
              <div key={item.productId || item._id}
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100 overflow-hidden">
                  {getImage(item)
                    ? <img src={getImage(item)} alt={item.name} className="w-full h-full object-contain p-1"
                        onError={e => { e.target.onerror=null; e.target.src='https://t3.ftcdn.net/jpg/05/04/28/96/360_F_504289605_zehJiK0tCuZLP2MdfFBpcJdOVxKLnXg1.jpg'; }} />
                    : <span className="text-xl">🛒</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{item.name || 'Product'}</p>
                  <p className="text-emerald-600 font-bold text-sm">Rs. {item.price?.toLocaleString() || 0}</p>
                </div>
                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleAddToCart(item.productId || item._id)}
                    className="w-7 h-7 bg-emerald-500 text-white rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleRemove(item.productId || item._id)}
                    className="w-7 h-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {items.length > 4 && (
            <button onClick={() => navigate('/wishlist')}
              className="w-full mt-3 py-2.5 text-sm font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors">
              View All {items.length} items →
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default WishlistSection;