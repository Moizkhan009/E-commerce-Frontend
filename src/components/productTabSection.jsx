import React from 'react';

const ProductTabsSection = () => {
  // Products data for each section
  const topSelling = [
    { id: 1, name: 'Haagen Caramel Cone Ice Cream Boxes', image: '🍦', rating: 4, price: 22.85, originalPrice: 24.85 },
    { id: 2, name: 'Seeds of Change Organic Red Rice', image: '🌾', rating: 4, price: 28.85, originalPrice: 32.85 },
    { id: 3, name: 'Blue Almonds Lightly Salted Vegetables', image: '🥛', rating: 4, price: 23.85, originalPrice: 25.85 }
  ];

  const trending = [
    { id: 4, name: 'Foster Farms Takeout Crispy Classic', image: '🥫', rating: 4, price: 17.85, originalPrice: 19.85 },
    { id: 5, name: 'Haagen Caramel Cone Ice Cream Boxes', image: '🍦', rating: 4, price: 22.85, originalPrice: 24.85 },
    { id: 6, name: 'Gorton\'s Beer Battered Fish Fillets', image: '☕', rating: 4, price: 23.85, originalPrice: 25.85 }
  ];

  const recently = [
    { id: 7, name: 'Organic Cage Grade A Large Eggs', image: '🥚', rating: 4, price: 21.00, originalPrice: 24.00 },
    { id: 8, name: 'Naturally Flavored Cinnamon Vanilla', image: '🌿', rating: 4, price: 51.00, originalPrice: 55.00 },
    { id: 9, name: 'Seeds of Change Organic Watermelon', image: '🍉', rating: 4, price: 61.50, originalPrice: 64.00 }
  ];

  const topRated = [
    { id: 10, name: 'Pre-portioned, low-fat ice cream yogurt', image: '🍨', rating: 5, price: 79.00, originalPrice: 85.00 },
    { id: 11, name: 'Angie\'s Sweet & Salty Kettle Corn', image: '🍿', rating: 5, price: 48.85, originalPrice: 52.85 },
    { id: 12, name: 'Seeds of Change Organic Watermelon', image: '🍉', rating: 5, price: 61.50, originalPrice: 66.00 }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-xs ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
        ))}
      </div>
    );
  };

  const ProductCard = ({ product }) => (
    <div className="flex gap-3 group cursor-pointer">
      <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-all">
        <span className="text-4xl group-hover:scale-110 transition-transform">{product.image}</span>
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">
          {product.name}
        </h4>
        <div className="mb-1">{renderStars(product.rating)}</div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-bold text-base">${product.price}</span>
          <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* All 4 Sections Side by Side in One Row */}
      <div className="grid grid-cols-4 gap-8">
        {/* Top Selling */}
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Top Selling</h3>
            <div className="w-12 h-1 bg-emerald-500"></div>
          </div>
          <div className="space-y-4">
            {topSelling.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>

        {/* Trending Products */}
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Trending Products</h3>
            <div className="w-12 h-1 bg-emerald-500"></div>
          </div>
          <div className="space-y-4">
            {trending.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>

        {/* Recently added */}
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Recently added</h3>
            <div className="w-12 h-1 bg-emerald-500"></div>
          </div>
          <div className="space-y-4">
            {recently.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>

        {/* Top Rated */}
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Top Rated</h3>
            <div className="w-12 h-1 bg-emerald-500"></div>
          </div>
          <div className="space-y-4">
            {topRated.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabsSection;