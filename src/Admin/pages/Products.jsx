import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Package, Trash2, Edit, Star } from 'lucide-react';
import { addProduct, fetchProduct } from '../../redux/products/products_action';

const Products = ({ setShowProductForm, setEditingProduct }) => {
  const dispatch = useDispatch();
  
  // Redux state se products fetch karo - EXACTLY tumhare logic ke mutabiq
  const { states , products, status, error  } = useSelector((state) => ({
    
    states : state,
    products: state.products,
    status: state.product?.status,
    error: state.product?.error
  }));

console.log(states);

  

  // Component mount hone par products fetch karo
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // Add Product Handler
  const handleAddProduct = () => {
    console.log('Add Product clicked');
    if (setEditingProduct && typeof setEditingProduct === 'function') {
      setEditingProduct(null);
    }
    if (setShowProductForm && typeof setShowProductForm === 'function') {
      setShowProductForm(true);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
        alert('Product deleted successfully!');
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('Error deleting product: ' + err.message);
      }
    }
  };

  const handleEdit = (product) => {
    console.log('Edit clicked for product:', product);
    if (setEditingProduct && typeof setEditingProduct === 'function') {
      setEditingProduct(product);
    }
    if (setShowProductForm && typeof setShowProductForm === 'function') {
      setShowProductForm(true);
    }
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


  console.log(products);
  

  // Loading State
  if (status === 'loading') {
    return (
      <div>
        <h1 className="page-title">Products Management</h1>
        <div className="loading-message">Loading products...</div>
      </div>
    );
  }

  // Error State
  if (status === 'failed') {
    return (
      <div>
        <h1 className="page-title">Products Management</h1>
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Products Management</h1>
        <button className="add-btn" onClick={handleAddProduct}>
          <Package size={20} />
          Add Product
        </button>
      </div>
      <div className="content-card">
        {status === 'succeeded' && products.length === 0 ? (
          <div className="empty-message">
            <Package size={48} />
            <p>No products found. Add your first product!</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id || product.id} className="product-card">
                {product.badge && (
                  <div className="product-badge-container">
                    <span className={`product-badge ${product.badgeColor}`}>
                      {product.badge}
                    </span>
                  </div>
                )}
                <div className="product-image-container">
                  <div className="product-image">{product.image}</div>
                </div>
                <div className="product-details">
                  <p className="product-category">{product.category}</p>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-brand">By {product.brand}</p>
                  <div className="product-rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                  <div className="product-price-row">
                    <span className="product-price">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="product-original-price">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="action-buttons">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(product)}
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(product._id || product.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;