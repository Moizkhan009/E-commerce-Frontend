// // import React, { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // // Tumhare actual import path
// // import { addCategory, updateCategory, fetchCategories } from "../../redux/products/category_action";

// // const CategoryForm = ({ setShowCategoryForm, selectedCategory, editingCategory }) => {
// //   const dispatch = useDispatch();
  
// //   // Status from Redux
// //   const status = useSelector((state) => state.category?.status);
// //   // const status = 'idle'; // Temporary
  
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     description: '',
// //     image: ''
// //   });

// //   const [error, setError] = useState('');

// //   // Populate form if editing
// //   useEffect(() => {
// //     if (editingCategory) {
// //       setFormData({
// //         name: editingCategory.name || '',
// //         description: editingCategory.description || '',
// //         image: editingCategory.image || ''
// //       });
// //     } else if (selectedCategory) {
// //       setFormData({
// //         name: selectedCategory,
// //         description: '',
// //         image: ''
// //       });
// //     }
// //   }, [editingCategory, selectedCategory]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');

// //     // Validation
// //     if (!formData.name) {
// //       alert('Please enter category name');
// //       return;
// //     }

// //     // Category object
// //     const categoryData = {
// //       name: formData.name,
// //       description: formData.description || '',
// //       image: formData.image || '📁'
// //     };

// //     try {
// //       if (editingCategory) {
// //         // Update category
// //         await dispatch(updateCategory({ 
// //           id: editingCategory._id, 
// //           data: categoryData 
// //         })).unwrap();
        
// //         alert('✅ Category updated successfully!');
// //       } else {
// //         // Add new category
// //         await dispatch(addCategory(categoryData)).unwrap();
        
// //         alert('✅ Category added successfully!');
// //       }
      
// //       // Form reset
// //       setFormData({ 
// //         name: '', 
// //         description: '', 
// //         image: '' 
// //       });
      
// //       setShowCategoryForm(false);
      
// //       // Refresh categories
// //       dispatch(fetchCategories());
      
// //     } catch (error) {
// //       console.error('Failed to save category:', error);
// //       alert(`❌ Failed to save category: ${error.message}`);
// //       setError(error.message || 'Error saving category');
// //     }
// //   };

// //   return (
// //     <div className="modal-overlay" onClick={() => setShowCategoryForm(false)}>
// //       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //         <div className="modal-header">
// //           <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
// //           <button 
// //             className="close-btn" 
// //             onClick={() => setShowCategoryForm(false)}
// //           >
// //             ×
// //           </button>
// //         </div>
        
// //         <form className="product-form" onSubmit={handleSubmit}>
// //           {error && <div className="error-alert">{error}</div>}
          
// //           <div className="form-group">
// //             <label>Category Name *</label>
// //             <input 
// //               type="text" 
// //               name="name"
// //               placeholder="e.g., Electronics, Snacks, Fruits" 
// //               value={formData.name}
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>

// //           <div className="form-group">
// //             <label>Description</label>
// //             <textarea 
// //               name="description"
// //               rows="3"
// //               placeholder="Enter category description (optional)" 
// //               value={formData.description}
// //               onChange={handleChange}
// //             />
// //           </div>

// //           <div className="form-group">
// //             <label>Icon/Emoji</label>
// //             <input 
// //               type="text" 
// //               name="image"
// //               placeholder="📁 or 💻 or 🍎" 
// //               value={formData.image}
// //               onChange={handleChange}
// //             />
// //             <p className="form-hint">
// //               Enter an emoji to represent this category (e.g., 📱 for Electronics)
// //             </p>
// //           </div>

// //           <div className="form-actions">
// //             <button 
// //               type="button" 
// //               className="btn-secondary" 
// //               onClick={() => setShowCategoryForm(false)}
// //               disabled={status === 'loading'}
// //             >
// //               Cancel
// //             </button>
// //             <button 
// //               type="submit" 
// //               className="btn-primary"
// //               disabled={status === 'loading'}
// //             >
// //               {status === 'loading' ? 'Saving...' : (editingCategory ? 'Update Category' : 'Add Category')}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CategoryForm;
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addCategory, updateCategory, fetchCategories } from "../../redux/products/category_action";

// const CategoryForm = ({ setShowCategoryForm, selectedCategory, editingCategory }) => {
//   const dispatch = useDispatch();
//   const status = useSelector((state) => state.category?.status);
  
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     image: ''
//   });
//   const [error, setError] = useState('');
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     // Trigger entrance animation
//     setTimeout(() => setIsVisible(true), 50);
//   }, []);

//   useEffect(() => {
//     if (editingCategory) {
//       setFormData({
//         name: editingCategory.name || '',
//         description: editingCategory.description || '',
//         image: editingCategory.image || ''
//       });
//     } else if (selectedCategory) {
//       setFormData({
//         name: selectedCategory,
//         description: '',
//         image: ''
//       });
//     }
//   }, [editingCategory, selectedCategory]);

//   const handleClose = () => {
//     setIsVisible(false);
//     setTimeout(() => setShowCategoryForm(false), 300);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (error) setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!formData.name.trim()) {
//       setError('Category name is required');
//       return;
//     }

//     const categoryData = {
//       name: formData.name.trim(),
//       description: formData.description.trim(),
//       image: formData.image.trim() || '📁'
//     };

//     try {
//       if (editingCategory) {
//         await dispatch(updateCategory({ 
//           id: editingCategory._id, 
//           data: categoryData 
//         })).unwrap();
//       } else {
//         await dispatch(addCategory(categoryData)).unwrap();
//       }
      
//       setFormData({ name: '', description: '', image: '' });
//       handleClose();
//       dispatch(fetchCategories());
      
//     } catch (error) {
//       console.error('Failed to save category:', error);
//       setError(error.message || 'Failed to save category. Please try again.');
//     }
//   };

//   // Predefined emoji options
//   const emojiOptions = ['📁', '💻', '🍎', '📱', '👕', '📚', '🏠', '🚗', '⚽', '💊', '🎨', '🎵'];

//   return (
//     <div className={`modal-overlay ${isVisible ? 'active' : ''}`} onClick={handleClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <div className="header-icon">
//             {editingCategory ? '✏️' : '➕'}
//           </div>
//           <div className="header-text">
//             <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
//             <p>{editingCategory ? 'Update category details below' : 'Create a new product category'}</p>
//           </div>
//           <button className="close-btn" onClick={handleClose} disabled={status === 'loading'}>
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <line x1="18" y1="6" x2="6" y2="18"></line>
//               <line x1="6" y1="6" x2="18" y2="18"></line>
//             </svg>
//           </button>
//         </div>

//         <form className="category-form" onSubmit={handleSubmit}>
//           {error && (
//             <div className="error-alert">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <circle cx="12" cy="12" r="10"></circle>
//                 <line x1="12" y1="8" x2="12" y2="12"></line>
//                 <line x1="12" y1="16" x2="12.01" y2="16"></line>
//               </svg>
//               <span>{error}</span>
//             </div>
//           )}

//           <div className="form-group">
//             <label>
//               Category Name <span className="required">*</span>
//             </label>
//             <input
//               type="text"
//               name="name"
//               placeholder="e.g., Electronics, Snacks, Fruits"
//               value={formData.name}
//               onChange={handleChange}
//               disabled={status === 'loading'}
//               autoFocus
//             />
//           </div>

//           <div className="form-group">
//             <label>Description</label>
//             <textarea
//               name="description"
//               rows="3"
//               placeholder="Brief description of this category..."
//               value={formData.description}
//               onChange={handleChange}
//               disabled={status === 'loading'}
//             />
//           </div>

//           <div className="form-group">
//             <label>Category Icon</label>
//             <div className="emoji-grid">
//               {emojiOptions.map((emoji) => (
//                 <button
//                   key={emoji}
//                   type="button"
//                   className={`emoji-btn ${formData.image === emoji ? 'selected' : ''}`}
//                   onClick={() => setFormData(prev => ({ ...prev, image: emoji }))}
//                   disabled={status === 'loading'}
//                 >
//                   {emoji}
//                 </button>
//               ))}
//               <input
//                 type="text"
//                 name="image"
//                 placeholder="Custom emoji..."
//                 value={formData.image}
//                 onChange={handleChange}
//                 className="emoji-input"
//                 disabled={status === 'loading'}
//               />
//             </div>
//             <p className="form-hint">Select an emoji or enter your own</p>
//           </div>

//           <div className="form-actions">
//             <button
//               type="button"
//               className="btn-secondary"
//               onClick={handleClose}
//               disabled={status === 'loading'}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="btn-primary"
//               disabled={status === 'loading'}
//             >
//               {status === 'loading' ? (
//                 <>
//                   <span className="spinner"></span>
//                   {editingCategory ? 'Updating...' : 'Adding...'}
//                 </>
//               ) : (
//                 editingCategory ? 'Update Category' : 'Add Category'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>

//       <style>{`
//         .modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(15, 23, 42, 0.6);
//           backdrop-filter: blur(4px);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 20px;
//           z-index: 1000;
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }

//         .modal-overlay.active {
//           opacity: 1;
//         }

//         .modal-content {
//           background: white;
//           border-radius: 16px;
//           width: 100%;
//           max-width: 480px;
//           max-height: 90vh;
//           overflow-y: auto;
//           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
//           transform: scale(0.95) translateY(20px);
//           transition: transform 0.3s ease;
//         }

//         .modal-overlay.active .modal-content {
//           transform: scale(1) translateY(0);
//         }

//         .modal-header {
//           display: flex;
//           align-items: flex-start;
//           gap: 16px;
//           padding: 24px 24px 0;
//           position: relative;
//         }

//         .header-icon {
//           width: 48px;
//           height: 48px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 24px;
//           flex-shrink: 0;
//         }

//         .header-text {
//           flex: 1;
//           min-width: 0;
//         }

//         .header-text h2 {
//           margin: 0;
//           font-size: 20px;
//           font-weight: 700;
//           color: #1e293b;
//           line-height: 1.3;
//         }

//         .header-text p {
//           margin: 4px 0 0;
//           font-size: 14px;
//           color: #64748b;
//         }

//         .close-btn {
//           position: absolute;
//           top: 20px;
//           right: 20px;
//           width: 32px;
//           height: 32px;
//           border: none;
//           background: #f1f5f9;
//           border-radius: 8px;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #64748b;
//           transition: all 0.2s;
//         }

//         .close-btn:hover:not(:disabled) {
//           background: #e2e8f0;
//           color: #475569;
//         }

//         .close-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .category-form {
//           padding: 24px;
//         }

//         .error-alert {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           background: #fef2f2;
//           border: 1px solid #fecaca;
//           color: #dc2626;
//           padding: 12px 16px;
//           border-radius: 10px;
//           font-size: 14px;
//           margin-bottom: 20px;
//         }

//         .form-group {
//           margin-bottom: 20px;
//         }

//         .form-group label {
//           display: block;
//           font-size: 14px;
//           font-weight: 600;
//           color: #374151;
//           margin-bottom: 6px;
//         }

//         .required {
//           color: #dc2626;
//         }

//         .form-group input,
//         .form-group textarea {
//           width: 100%;
//           padding: 10px 14px;
//           border: 2px solid #e5e7eb;
//           border-radius: 10px;
//           font-size: 15px;
//           color: #1f2937;
//           transition: all 0.2s;
//           background: #fafafa;
//         }

//         .form-group input:focus,
//         .form-group textarea:focus {
//           outline: none;
//           border-color: #667eea;
//           background: white;
//           box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//         }

//         .form-group input::placeholder,
//         .form-group textarea::placeholder {
//           color: #9ca3af;
//         }

//         .form-group textarea {
//           resize: vertical;
//           min-height: 80px;
//           font-family: inherit;
//         }

//         .emoji-grid {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 8px;
//           margin-bottom: 8px;
//         }

//         .emoji-btn {
//           width: 40px;
//           height: 40px;
//           border: 2px solid #e5e7eb;
//           border-radius: 10px;
//           background: white;
//           cursor: pointer;
//           font-size: 20px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: all 0.2s;
//         }

//         .emoji-btn:hover:not(:disabled) {
//           border-color: #667eea;
//           transform: scale(1.1);
//         }

//         .emoji-btn.selected {
//           border-color: #667eea;
//           background: #eef2ff;
//           box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
//         }

//         .emoji-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .emoji-input {
//           width: 120px !important;
//           text-align: center;
//         }

//         .form-hint {
//           margin: 6px 0 0;
//           font-size: 12px;
//           color: #6b7280;
//         }

//         .form-actions {
//           display: flex;
//           gap: 12px;
//           margin-top: 24px;
//           padding-top: 20px;
//           border-top: 1px solid #e5e7eb;
//         }

//         .btn-secondary,
//         .btn-primary {
//           flex: 1;
//           padding: 12px 20px;
//           border-radius: 10px;
//           font-size: 15px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.2s;
//           border: none;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 8px;
//         }

//         .btn-secondary {
//           background: #f3f4f6;
//           color: #374151;
//         }

//         .btn-secondary:hover:not(:disabled) {
//           background: #e5e7eb;
//         }

//         .btn-primary {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           box-shadow: 0 4px 6px -1px rgba(102, 126, 234, 0.3);
//         }

//         .btn-primary:hover:not(:disabled) {
//           transform: translateY(-1px);
//           box-shadow: 0 10px 15px -3px rgba(102, 126, 234, 0.4);
//         }

//         .btn-primary:active:not(:disabled) {
//           transform: translateY(0);
//         }

//         .btn-secondary:disabled,
//         .btn-primary:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//           transform: none !important;
//         }

//         .spinner {
//           width: 16px;
//           height: 16px;
//           border: 2px solid rgba(255, 255, 255, 0.3);
//           border-top-color: white;
//           border-radius: 50%;
//           animation: spin 0.8s linear infinite;
//         }

//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }

//         /* Scrollbar styling */
//         .modal-content::-webkit-scrollbar {
//           width: 6px;
//         }

//         .modal-content::-webkit-scrollbar-track {
//           background: transparent;
//         }

//         .modal-content::-webkit-scrollbar-thumb {
//           background: #d1d5db;
//           border-radius: 3px;
//         }

//         /* Responsive */
//         @media (max-width: 640px) {
//           .modal-overlay {
//             padding: 16px;
//             align-items: flex-end;
//           }

//           .modal-content {
//             max-height: 85vh;
//             border-radius: 20px 20px 16px 16px;
//           }

//           .modal-header {
//             padding: 20px 20px 0;
//           }

//           .category-form {
//             padding: 20px;
//           }

//           .form-actions {
//             flex-direction: column-reverse;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CategoryForm;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, updateCategory, fetchCategories } from "../../redux/products/category_action";

const CategoryForm = ({ setShowCategoryForm, selectedCategory, editingCategory }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.category?.status);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });
  const [error, setError] = useState('');

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
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Category name is required');
      return;
    }

    const categoryData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      image: formData.image.trim() || '📁'
    };

    try {
      if (editingCategory) {
        await dispatch(updateCategory({ 
          categoryId: editingCategory._id, 
          data: categoryData 
        })).unwrap();
      } else {
        await dispatch(addCategory(categoryData)).unwrap();
      }
      
      setFormData({ name: '', description: '', image: '' });
      setShowCategoryForm(false);
      dispatch(fetchCategories());
      
    } catch (error) {
      console.error('Failed to save category:', error);
      setError(error.message || 'Failed to save category. Please try again.');
    }
  };

  const theme = {
    primary: '#3BB77E',
    primaryDark: '#2D8A5E',
    primaryLight: '#DEF9EC',
    secondary: '#F74B81',
    warning: '#FDC040',
    dark: '#253D4E',
    gray: '#7E7E7E',
    bg: '#F7F8FA',
    border: '#E5E5E5',
    white: '#ffffff',
    shadow: '0 2px 20px rgba(0,0,0,0.06)',
    shadowHover: '0 8px 30px rgba(0,0,0,0.12)',
    radius: 12
  };

  const emojiOptions = ['📁', '🥬', '🍎', '🥩', '🥛', '🍞', '🧃', '🍫', '🧴', '🏠', '⚽', '💊'];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(37, 61, 78, 0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 20,
      animation: 'fadeIn 0.3s ease'
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: scale(0.95) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Modal Card */}
      <div style={{
        background: theme.white,
        borderRadius: theme.radius,
        width: '100%',
        maxWidth: 520,
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: theme.shadowHover,
        animation: 'slideUp 0.3s ease'
      }}>

        {/* ========== HEADER ========== */}
        <div style={{
          padding: '24px 28px',
          borderBottom: `1px solid ${theme.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: 16
        }}>
          {/* Icon */}
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: theme.primaryLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            flexShrink: 0
          }}>
            {editingCategory ? '✏️' : '➕'}
          </div>

          {/* Title */}
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontSize: 20,
              fontWeight: 700,
              color: theme.dark,
              margin: 0
            }}>
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>
            <p style={{
              fontSize: 13,
              color: theme.gray,
              margin: '4px 0 0'
            }}>
              {editingCategory ? 'Update category details' : 'Create a new product category'}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setShowCategoryForm(false)}
            disabled={status === 'loading'}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: 'none',
              background: theme.bg,
              color: theme.gray,
              fontSize: 18,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#FFEBEE';
              e.target.style.color = theme.secondary;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = theme.bg;
              e.target.style.color = theme.gray;
            }}
          >
            ✕
          </button>
        </div>

        {/* ========== FORM ========== */}
        <form onSubmit={handleSubmit} style={{ padding: '24px 28px' }}>

          {/* Error Alert */}
          {error && (
            <div style={{
              background: '#FFEBEE',
              border: '1px solid #FECACA',
              color: '#DC2626',
              padding: '12px 16px',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span>⚠️</span>
              {error}
            </div>
          )}

          {/* Category Name */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: theme.dark,
              marginBottom: 8
            }}>
              Category Name <span style={{ color: theme.secondary }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g., Fresh Fruits, Dairy, Snacks"
              value={formData.name}
              onChange={handleChange}
              disabled={status === 'loading'}
              autoFocus
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid ${theme.border}`,
                borderRadius: 10,
                fontSize: 15,
                fontFamily: 'inherit',
                color: theme.dark,
                outline: 'none',
                transition: 'all 0.2s',
                background: theme.bg
              }}
              onFocus={(e) => {
                e.target.style.borderColor = theme.primary;
                e.target.style.background = theme.white;
                e.target.style.boxShadow = `0 0 0 3px ${theme.primaryLight}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = theme.border;
                e.target.style.background = theme.bg;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: theme.dark,
              marginBottom: 8
            }}>
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              placeholder="Brief description of this category..."
              value={formData.description}
              onChange={handleChange}
              disabled={status === 'loading'}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid ${theme.border}`,
                borderRadius: 10,
                fontSize: 15,
                fontFamily: 'inherit',
                color: theme.dark,
                outline: 'none',
                resize: 'vertical',
                minHeight: 80,
                transition: 'all 0.2s',
                background: theme.bg
              }}
              onFocus={(e) => {
                e.target.style.borderColor = theme.primary;
                e.target.style.background = theme.white;
                e.target.style.boxShadow = `0 0 0 3px ${theme.primaryLight}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = theme.border;
                e.target.style.background = theme.bg;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Category Icon */}
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: theme.dark,
              marginBottom: 12
            }}>
              Category Icon
            </label>

            {/* Emoji Grid */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              marginBottom: 12
            }}>
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: emoji }))}
                  disabled={status === 'loading'}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    border: formData.image === emoji 
                      ? `2px solid ${theme.primary}` 
                      : `2px solid ${theme.border}`,
                    background: formData.image === emoji ? theme.primaryLight : theme.white,
                    cursor: 'pointer',
                    fontSize: 22,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    transform: formData.image === emoji ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Custom Emoji Input */}
            <input
              type="text"
              name="image"
              placeholder="Or enter custom emoji..."
              value={formData.image}
              onChange={handleChange}
              disabled={status === 'loading'}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: `2px solid ${theme.border}`,
                borderRadius: 10,
                fontSize: 14,
                fontFamily: 'inherit',
                textAlign: 'center',
                outline: 'none',
                transition: 'all 0.2s',
                background: theme.bg
              }}
              onFocus={(e) => {
                e.target.style.borderColor = theme.primary;
                e.target.style.background = theme.white;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = theme.border;
                e.target.style.background = theme.bg;
              }}
            />
            <p style={{
              fontSize: 12,
              color: theme.gray,
              marginTop: 6
            }}>
              Select an emoji or enter your own
            </p>
          </div>

          {/* ========== ACTIONS ========== */}
          <div style={{
            display: 'flex',
            gap: 12,
            paddingTop: 20,
            borderTop: `1px solid ${theme.border}`
          }}>
            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => setShowCategoryForm(false)}
              disabled={status === 'loading'}
              style={{
                flex: 1,
                padding: '14px 24px',
                borderRadius: 10,
                border: `2px solid ${theme.border}`,
                background: theme.white,
                color: theme.gray,
                fontSize: 15,
                fontWeight: 600,
                fontFamily: 'inherit',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = theme.primary;
                e.target.style.color = theme.primary;
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = theme.border;
                e.target.style.color = theme.gray;
              }}
            >
              Cancel
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                flex: 1,
                padding: '14px 24px',
                borderRadius: 10,
                border: 'none',
                background: status === 'loading' ? theme.primaryLight : theme.primary,
                color: 'white',
                fontSize: 15,
                fontWeight: 600,
                fontFamily: 'inherit',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(59, 183, 126, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
              onMouseEnter={(e) => {
                if (status !== 'loading') {
                  e.target.style.background = theme.primaryDark;
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(59, 183, 126, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (status !== 'loading') {
                  e.target.style.background = theme.primary;
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(59, 183, 126, 0.3)';
                }
              }}
            >
              {status === 'loading' ? (
                <>
                  <span style={{
                    width: 16,
                    height: 16,
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                    display: 'inline-block'
                  }} />
                  {editingCategory ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                <>
                  {editingCategory ? '💾' : '➕'}
                  {editingCategory ? 'Update Category' : 'Add Category'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;