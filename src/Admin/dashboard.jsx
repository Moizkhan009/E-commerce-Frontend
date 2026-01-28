
import React, { useState } from 'react';
import { ShoppingCart, Plus, Home, Package, Users, Settings, X, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';


export default function ProductDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Seeds of Change Organic Quinoa', 
      category: 'Snack',
      brand: 'NestFood',
      image: '🌾',
      price: 28.85,
      originalPrice: 32.85,
      rating: 4,
      badge: 'Hot',
      badgeColor: 'bg-red-500'
    },
    { 
      id: 2, 
      name: 'All Natural Italian-Style Chicken', 
      category: 'Meat',
      brand: 'Tyson',
      image: '🍗',
      price: 52.85,
      originalPrice: 55.85,
      rating: 3.5,
      badge: 'Sale',
      badgeColor: 'bg-green-500'
    },
    { 
      id: 3, 
      name: 'Angies Boomchickapop Sweet',
      category: 'Snack',
      brand: 'StarKist',
      image: '🍿',
      price: 48.85,
      originalPrice: 52.85,
      rating: 4.5,
      badge: 'New',
      badgeColor: 'bg-blue-500'
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    image: '',
    price: '',
    originalPrice: '',
    rating: '',
    badge: '',
    badgeColor: ''
  });
  console.log(formData)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.category || !formData.brand || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newProduct = {
      id: products.length + 1,
      name: formData.name,
      category: formData.category,
      brand: formData.brand,
      image: formData.image || '📦',
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : parseFloat(formData.price),
      rating: formData.rating ? parseFloat(formData.rating) : 0,
      badge: formData.badge || '',
      badgeColor: formData.badgeColor || 'bg-gray-500'
    };
    setProducts([...products, newProduct]);
    setFormData({ 
      name: '', 
      category: '', 
      brand: '', 
      image: '', 
      price: '', 
      originalPrice: '', 
      rating: '', 
      badge: '', 
      badgeColor: '' 
    });
    setShowAddForm(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="w-8 h-8" />
            Dashboard
          </h1>
        </div>
        
        <nav className="flex-1 p-4">
          <button
            onClick={() => setActiveTab('home')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
              activeTab === 'home' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>
          
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
              activeTab === 'products' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Package className="w-5 h-5" />
            <span>Products</span>
          </button>
          
          <button
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
              activeTab === 'customers' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Customers</span>
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
              activeTab === 'settings' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === 'products' && !showAddForm && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Products</h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <Plus className="w-5 h-5" />
                  Add Product
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                    {product.badge && (
                      <div className="relative">
                        <span className={`absolute top-4 left-4 ${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                          {product.badge}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-center h-48 bg-gray-50 text-7xl">
                      {product.image}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">By {product.brand}</p>
                      <div className="flex items-center gap-1 mb-3">
                        {renderStars(product.rating)}
                        <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-600">${product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'products' && showAddForm && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Add New Product</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </div>

              <div className="bg-white rounded-lg shadow p-8 max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="e.g., Seeds of Change Organic Quinoa"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand *
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="e.g., NestFood"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="">Select a category</option>
                      <option value="Snack">Snack</option>
                      <option value="Meat">Meat</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Fruits">Fruits</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Beverages">Beverages</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image (Emoji)
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="e.g., 🌾"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="28.85"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price
                    </label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="32.85"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating (0-5)
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      step="0.5"
                      min="0"
                      max="5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="4"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Badge
                    </label>
                    <input
                      type="text"
                      name="badge"
                      value={formData.badge}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="e.g., Hot, Sale, New"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Badge Color
                    </label>
                    <select
                      name="badgeColor"
                      value={formData.badgeColor}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="">Select badge color</option>
                      <option value="bg-red-500">Red (Hot)</option>
                      <option value="bg-green-500">Green (Sale)</option>
                      <option value="bg-blue-500">Blue (New)</option>
                      <option value="bg-yellow-500">Yellow</option>
                      <option value="bg-purple-500">Purple</option>
                      <option value="bg-orange-500">Orange</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Add Product
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'home' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Dashboard</h2>
              <p className="text-gray-600">Select a tab from the sidebar to get started.</p>
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Customers</h2>
              <p className="text-gray-600">Customer management coming soon.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Settings</h2>
              <p className="text-gray-600">Settings panel coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}