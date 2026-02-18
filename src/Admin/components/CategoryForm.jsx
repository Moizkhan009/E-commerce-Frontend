import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Tumhare actual import path
import { addCategory, updateCategory, fetchCategories } from "../../redux/products/category_action";

const CategoryForm = ({ setShowCategoryForm, selectedCategory, editingCategory }) => {
  const dispatch = useDispatch();
  
  // Status from Redux
  const status = useSelector((state) => state.category?.status);
  // const status = 'idle'; // Temporary
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });

  const [error, setError] = useState('');

  // Populate form if editing
  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name || '',
        description: editingCategory.description || '',
        image: editingCategory.image || ''
      });
    } else if (selectedCategory) {
      setFormData({
        name: selectedCategory,
        description: '',
        image: ''
      });
    }
  }, [editingCategory, selectedCategory]);

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

    // Validation
    if (!formData.name) {
      alert('Please enter category name');
      return;
    }

    // Category object
    const categoryData = {
      name: formData.name,
      description: formData.description || '',
      image: formData.image || '📁'
    };

    try {
      if (editingCategory) {
        // Update category
        await dispatch(updateCategory({ 
          id: editingCategory._id, 
          data: categoryData 
        })).unwrap();
        
        alert('✅ Category updated successfully!');
      } else {
        // Add new category
        await dispatch(addCategory(categoryData)).unwrap();
        
        alert('✅ Category added successfully!');
      }
      
      // Form reset
      setFormData({ 
        name: '', 
        description: '', 
        image: '' 
      });
      
      setShowCategoryForm(false);
      
      // Refresh categories
      dispatch(fetchCategories());
      
    } catch (error) {
      console.error('Failed to save category:', error);
      alert(`❌ Failed to save category: ${error.message}`);
      setError(error.message || 'Error saving category');
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setShowCategoryForm(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
          <button 
            className="close-btn" 
            onClick={() => setShowCategoryForm(false)}
          >
            ×
          </button>
        </div>
        
        <form className="product-form" onSubmit={handleSubmit}>
          {error && <div className="error-alert">{error}</div>}
          
          <div className="form-group">
            <label>Category Name *</label>
            <input 
              type="text" 
              name="name"
              placeholder="e.g., Electronics, Snacks, Fruits" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description"
              rows="3"
              placeholder="Enter category description (optional)" 
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Icon/Emoji</label>
            <input 
              type="text" 
              name="image"
              placeholder="📁 or 💻 or 🍎" 
              value={formData.image}
              onChange={handleChange}
            />
            <p className="form-hint">
              Enter an emoji to represent this category (e.g., 📱 for Electronics)
            </p>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => setShowCategoryForm(false)}
              disabled={status === 'loading'}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Saving...' : (editingCategory ? 'Update Category' : 'Add Category')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;