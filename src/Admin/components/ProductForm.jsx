import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct,fetchProduct, updateProduct} from '../../redux/products/products_action';
import { fetchCategories } from '../../redux/products/category_action';


const ProductForm = ({ setShowProductForm, editingProduct }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.product?.status);
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
    badgeColor: '',
    // ✅ NEW: Section toggles
    sections: {
      hotDeal: false,
      trending: false,
      topSelling: false,
      topRated: false,
      newArrival: false,
      featured: false
    }
  });

  const [error, setError] = useState('');

  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);

  // Populate form if editing
  useEffect(() => {
  if (editingProduct) {
    setFormData({
      name: editingProduct.name || '',
      category: editingProduct.category?._id || editingProduct.category || '',
      brand: editingProduct.brand || '',
      image: editingProduct.image || '',
      price: editingProduct.price || '',
      originalPrice: editingProduct.originalPrice || '',
      rating: editingProduct.rating || '',
      badge: editingProduct.badge || '',
      badgeColor: editingProduct.badgeColor || '',

      sections: {
        hotDeal: editingProduct.sections?.hotDeal || false,
        trending: editingProduct.sections?.trending || false,
        topSelling: editingProduct.sections?.topSelling || false,
        topRated: editingProduct.sections?.topRated || false,
        newArrival: editingProduct.sections?.newArrival || false,
        featured: editingProduct.sections?.featured || false
      }
    });
  }
}, [editingProduct]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Toggle section
  const toggleSection = (sectionKey) => {
    setFormData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: !prev.sections[sectionKey]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.category || !formData.brand || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    const productData = {
      name: formData.name,
      category: formData.category,
      brand: formData.brand,
      image: formData.image || '📦',
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : parseFloat(formData.price),
      rating: formData.rating ? parseFloat(formData.rating) : 0,
      badge: formData.badge || '',
      badgeColor: formData.badgeColor || '',
      sections: formData.sections // ✅ Include sections
    };

    try {
      if (editingProduct) {
        await dispatch(updateProduct({ 
          productId: editingProduct._id,
    productData: productData,
          // id: editingProduct._id, data: productData
        
        })).unwrap();
        alert('✅ Product updated!');
      } else {
        await dispatch(addProduct(productData)).unwrap();
        alert('✅ Product added!');
      }
      setShowProductForm(false);
      dispatch(fetchProduct());
    } catch (error) {
      alert(`❌ Failed: ${error.message}`);
      setError(error.message);
    }
  };

  // Section config with icons & colors
  const sectionConfig = {
    hotDeal: { 
      icon: '🔥', 
      label: 'Hot Deal', 
      desc: 'Shows in Hot Deals section',
      color: '#F74B81',
      bg: '#FCE4EC'
    },
    trending: { 
      icon: '📈', 
      label: 'Trending', 
      desc: 'Shows in Trending Products',
      color: '#FF9800',
      bg: '#FFF3E0'
    },
    topSelling: { 
      icon: '🏆', 
      label: 'Top Selling', 
      desc: 'Shows in Top Selling section',
      color: '#3BB77E',
      bg: '#DEF9EC'
    },
    topRated: { 
      icon: '⭐', 
      label: 'Top Rated', 
      desc: 'Shows in Top Rated section',
      color: '#9C27B0',
      bg: '#F3E5F5'
    },
    newArrival: { 
      icon: '✨', 
      label: 'New Arrival', 
      desc: 'Shows in Recently Added',
      color: '#2196F3',
      bg: '#E3F2FD'
    },
    featured: { 
      icon: '💎', 
      label: 'Featured', 
      desc: 'Shows in Featured section',
      color: '#FDC040',
      bg: '#FFF8E1'
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 20
    }} onClick={() => setShowProductForm(false)}>
      
      <div style={{
        background: 'white',
        borderRadius: 16,
        width: '100%',
        maxWidth: 700,
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{
          padding: '24px 32px',
          borderBottom: '1px solid #E5E5E5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#253D4E', margin: 0 }}>
              {editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}
            </h2>
            <p style={{ fontSize: 13, color: '#7E7E7E', marginTop: 4 }}>
              Manage product details & section visibility
            </p>
          </div>
          <button 
            onClick={() => setShowProductForm(false)}
            style={{
              width: 36, height: 36, borderRadius: 10, border: 'none',
              background: '#F7F8FA', color: '#7E7E7E', fontSize: 20,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px 32px' }}>
          {error && (
            <div style={{
              background: '#FFEBEE', color: '#F44336',
              padding: '12px 16px', borderRadius: 12,
              fontSize: 14, fontWeight: 500, marginBottom: 20
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* ========== BASIC INFO ========== */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#253D4E', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>
              📋 Basic Information
            </h3>
            
            {/* Name */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#253D4E', marginBottom: 6 }}>
                Product Name <span style={{ color: '#F74B81' }}>*</span>
              </label>
              <input
                type="text" name="name"
                placeholder="e.g., Organic Quinoa"
                value={formData.name} onChange={handleChange} required
                style={{
                  width: '100%', padding: '12px 16px',
                  border: '2px solid #E5E5E5', borderRadius: 12,
                  fontSize: 14, fontFamily: 'inherit', outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3BB77E'}
                onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
              />
            </div>

            {/* Category & Brand */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#253D4E', marginBottom: 6 }}>
                  Category <span style={{ color: '#F74B81' }}>*</span>
                </label>
                <select
                  name="category" value={formData.category} onChange={handleChange} required
                  disabled={categoriesLoading}
                  style={{
                    width: '100%', padding: '12px 16px',
                    border: '2px solid #E5E5E5', borderRadius: 12,
                    fontSize: 14, fontFamily: 'inherit', outline: 'none',
                    background: 'white', cursor: 'pointer'
                  }}
                >
                  <option value="">{categoriesLoading ? '⏳ Loading...' : 'Select category'}</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.image} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#253D4E', marginBottom: 6 }}>
                  Brand <span style={{ color: '#F74B81' }}>*</span>
                </label>
                <input
                  type="text" name="brand" placeholder="e.g., NestFood"
                  value={formData.brand} onChange={handleChange} required
                  style={{
                    width: '100%', padding: '12px 16px',
                    border: '2px solid #E5E5E5', borderRadius: 12,
                    fontSize: 14, fontFamily: 'inherit', outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Image */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#253D4E', marginBottom: 6 }}>
                Image (Emoji or URL)
              </label>
              <input
                type="text" name="image" placeholder="🌾 or https://..."
                value={formData.image} onChange={handleChange}
                style={{
                  width: '100%', padding: '12px 16px',
                  border: '2px solid #E5E5E5', borderRadius: 12,
                  fontSize: 14, fontFamily: 'inherit', outline: 'none'
                }}
              />
            </div>
          </div>

          {/* ========== PRICING ========== */}
          <div style={{ marginBottom: 24, paddingTop: 24, borderTop: '1px solid #E5E5E5' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#253D4E', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>
              💰 Pricing
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#253D4E', marginBottom: 6 }}>
                  Price ($) <span style={{ color: '#F74B81' }}>*</span>
                </label>
                <input
                  type="number" name="price" placeholder="28.85" step="0.01"
                  value={formData.price} onChange={handleChange} required
                  style={{
                    width: '100%', padding: '12px 16px',
                    border: '2px solid #E5E5E5', borderRadius: 12,
                    fontSize: 14, fontFamily: 'inherit', outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#253D4E', marginBottom: 6 }}>
                  Original Price ($)
                </label>
                <input
                  type="number" name="originalPrice" placeholder="32.85" step="0.01"
                  value={formData.originalPrice} onChange={handleChange}
                  style={{
                    width: '100%', padding: '12px 16px',
                    border: '2px solid #E5E5E5', borderRadius: 12,
                    fontSize: 14, fontFamily: 'inherit', outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>

          {/* ========== BADGE ========== */}
          <div style={{ marginBottom: 24, paddingTop: 24, borderTop: '1px solid #E5E5E5' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#253D4E', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>
              🏷️ Product Badge
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#253D4E', marginBottom: 6 }}>
                  Badge Text
                </label>
                <input
                  type="text" name="badge" placeholder="Sale, Hot, New..."
                  value={formData.badge} onChange={handleChange}
                  style={{
                    width: '100%', padding: '12px 16px',
                    border: '2px solid #E5E5E5', borderRadius: 12,
                    fontSize: 14, fontFamily: 'inherit', outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#253D4E', marginBottom: 6 }}>
                  Rating (0-5)
                </label>
                <input
                  type="number" name="rating" placeholder="4.5" step="0.5" min="0" max="5"
                  value={formData.rating} onChange={handleChange}
                  style={{
                    width: '100%', padding: '12px 16px',
                    border: '2px solid #E5E5E5', borderRadius: 12,
                    fontSize: 14, fontFamily: 'inherit', outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Badge Color */}
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#253D4E', marginBottom: 10 }}>
              Badge Color
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[
                { value: '', label: 'None', color: '#E5E5E5' },
                { value: 'bg-red-500', label: 'Hot', color: '#F74B81' },
                { value: 'bg-green-500', label: 'Sale', color: '#3BB77E' },
                { value: 'bg-blue-500', label: 'New', color: '#2196F3' },
                { value: 'bg-yellow-500', label: 'Best', color: '#FDC040' },
                { value: 'bg-purple-500', label: 'Top', color: '#9C27B0' }
              ].map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, badgeColor: c.value }))}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 14px', borderRadius: 20,
                    border: formData.badgeColor === c.value ? `2px solid ${c.color}` : '2px solid transparent',
                    background: formData.badgeColor === c.value ? `${c.color}15` : '#F7F8FA',
                    cursor: 'pointer', fontSize: 13, fontWeight: 500,
                    color: formData.badgeColor === c.value ? c.color : '#7E7E7E'
                  }}
                >
                  <span style={{ width: 14, height: 14, borderRadius: '50%', background: c.color }} />
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* ========== SECTION TOGGLES (NEW) ========== */}
          <div style={{ marginBottom: 24, paddingTop: 24, borderTop: '1px solid #E5E5E5' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#253D4E', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>
              🎯 Website Sections
            </h3>
            <p style={{ fontSize: 13, color: '#7E7E7E', marginBottom: 16 }}>
              Toggle ON to show this product in specific website sections
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {Object.entries(sectionConfig).map(([key, config]) => (
                <div
                  key={key}
                  onClick={() => toggleSection(key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 16px', borderRadius: 12,
                    border: `2px solid ${formData.sections[key] ? config.color : '#E5E5E5'}`,
                    background: formData.sections[key] ? config.bg : 'white',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}
                >
                  {/* Toggle Switch */}
                  <div style={{
                    width: 44, height: 24, borderRadius: 12,
                    background: formData.sections[key] ? config.color : '#E5E5E5',
                    position: 'relative', transition: 'all 0.2s',
                    flexShrink: 0
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: 'white',
                      position: 'absolute', top: 2,
                      left: formData.sections[key] ? 22 : 2,
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }} />
                  </div>

                  {/* Icon & Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 18 }}>{config.icon}</span>
                      <span style={{ 
                        fontSize: 14, fontWeight: 600,
                        color: formData.sections[key] ? config.color : '#253D4E'
                      }}>
                        {config.label}
                      </span>
                    </div>
                    <p style={{ fontSize: 11, color: '#7E7E7E', marginTop: 2 }}>
                      {config.desc}
                    </p>
                  </div>

                  {/* Checkmark */}
                  {formData.sections[key] && (
                    <span style={{ 
                      width: 22, height: 22, borderRadius: '50%',
                      background: config.color, color: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700
                    }}>
                      ✓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ========== ACTIONS ========== */}
          <div style={{
            display: 'flex', gap: 12, paddingTop: 24,
            borderTop: '1px solid #E5E5E5'
          }}>
            <button
              type="button" onClick={() => setShowProductForm(false)}
              disabled={status === 'loading'}
              style={{
                flex: 1, padding: '14px 24px', borderRadius: 12,
                border: '2px solid #E5E5E5', background: 'white',
                color: '#7E7E7E', fontSize: 15, fontWeight: 600,
                fontFamily: 'inherit', cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit" disabled={status === 'loading'}
              style={{
                flex: 1, padding: '14px 24px', borderRadius: 12,
                border: 'none', background: '#3BB77E', color: 'white',
                fontSize: 15, fontWeight: 600, fontFamily: 'inherit',
                cursor: 'pointer', boxShadow: '0 4px 12px rgba(59,183,126,0.3)'
              }}
            >
              {status === 'loading' ? '⏳ Saving...' : (editingProduct ? '💾 Update Product' : '➕ Add Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;


