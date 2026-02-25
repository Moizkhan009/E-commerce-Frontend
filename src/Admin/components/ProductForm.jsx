import { addProduct, fetchProduct} from '../../redux/products/products_action';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { addProduct, fetchProduct } from '../redux/products/products_action';
import { fetchCategories } from '../../redux/products/category_action'; // Import category action

const ProductForm = ({ setShowProductForm, editingProduct }) => {
  const dispatch = useDispatch();
  
  // Status from Redux for loading state
  const status = useSelector((state) => state.product?.status);
  
  // Get categories from Redux store
  const { categories, categoriesLoading } = useSelector((state) => ({
    categories: state.category?.categories || [],
    categoriesLoading: state.category?.status === 'loading'
  }));
  
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

  const [error, setError] = useState('');

  // Fetch categories when component mounts
  useEffect(() => {
    console.log('Fetching categories for dropdown...');
    dispatch(fetchCategories());
  }, [dispatch]);

  // Debug: Log categories when they change
  useEffect(() => {
    console.log('Available categories:', categories);
  }, [categories]);

  // Populate form if editing
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        category: editingProduct.category || '',
        brand: editingProduct.brand || '',
        image: editingProduct.image || '',
        price: editingProduct.price || '',
        originalPrice: editingProduct.originalPrice || '',
        rating: editingProduct.rating || '',
        badge: editingProduct.badge || '',
        badgeColor: editingProduct.badgeColor || ''
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation - EXACTLY tumhare logic ke mutabiq
    if (!formData.name || !formData.category || !formData.brand || !formData.price) {
      alert('Please fill in all required fields (Name, Category, Brand, Price)');
      return;
    }
    
    // Product object banao - EXACTLY tumhare logic ke mutabiq
    const newProduct = {
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

    console.log('Submitting product:', newProduct);

    try {
      if (editingProduct) {
        // Update functionality
        alert('Update functionality coming soon! Backend PUT route add karo.');
        setShowProductForm(false);
      } else {
        // Redux action dispatch - Backend mein save hoga
        await dispatch(addProduct(newProduct)).unwrap();
        
        // Success message
        alert('✅ Product successfully added!');
        
        // Form reset
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
        
        setShowProductForm(false);
        
        // Products ko refresh karo
        dispatch(fetchProduct());
      }
    } catch (error) {
      console.error('Failed to add product:', error);
      alert(`❌ Failed to add product: ${error.message || 'Please check console for details.'}`);
      setError(error.message || 'Error saving product. Please try again.');
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setShowProductForm(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <button className="close-btn" onClick={() => setShowProductForm(false)}>×</button>
        </div>
        <form className="product-form" onSubmit={handleSubmit}>
          {error && <div className="error-alert">{error}</div>}
          
          <div className="form-group">
            <label>Product Name *</label>
            <input 
              type="text" 
              name="name"
              placeholder="e.g., Seeds of Change Organic Quinoa" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={categoriesLoading}
              >
                <option value="">
                  {categoriesLoading ? 'Loading categories...' : 'Select a category'}
                </option>
                
                {/* Dynamic categories from database */}
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat._id || cat.id} value={cat.name}>
                      {cat.image ? `${cat.image} ` : ''}{cat.name}
                    </option>
                  ))
                ) : (
                  !categoriesLoading && (
                    <option value="" disabled>No categories available - Add one first!</option>
                  )
                )}
              </select>
              
              {/* Show category count */}
              {categories.length > 0 && (
                <small style={{color: '#10b981', fontSize: '12px', marginTop: '4px', display: 'block'}}>
                  {categories.length} categories available
                </small>
              )}
            </div>
            
            <div className="form-group">
              <label>Brand *</label>
              <input 
                type="text" 
                name="brand"
                placeholder="e.g., NestFood" 
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Image (Emoji or URL) *</label>
            <input 
              type="text" 
              name="image"
              placeholder="🌾 or https://..." 
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price *</label>
              <input 
                type="number" 
                name="price"
                placeholder="28.85" 
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Original Price</label>
              <input 
                type="number" 
                name="originalPrice"
                placeholder="32.85" 
                step="0.01"
                value={formData.originalPrice}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rating (0-5)</label>
              <input 
                type="number" 
                name="rating"
                placeholder="4" 
                step="0.5"
                min="0"
                max="5"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Badge</label>
              <input 
                type="text" 
                name="badge"
                placeholder="Hot, Sale, New" 
                value={formData.badge}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Badge Color</label>
            <select
              name="badgeColor"
              value={formData.badgeColor}
              onChange={handleChange}
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

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => setShowProductForm(false)}
              disabled={status === 'loading'}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Adding...' : (editingProduct ? 'Update Product' : 'Add Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;