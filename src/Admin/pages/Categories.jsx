import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Edit, Trash2, Package, Plus, ArrowLeft } from "lucide-react";
// Tumhare actual import path use karo
import {
  fetchCategories,
  deleteCategory,
  getProductsByCategory,
} from "../../redux/products/category_action";

const categories = ({
  setShowCategoryForm,
  setSelectedCategory,
  setEditingCategory,
}) => {
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState("categories"); // 'categories' ya 'products'
  const [currentCategory, setCurrentCategory] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);

 
  const { categoryProducts, status } = useSelector((state) => state.category);

useEffect(() => {
  if (currentCategory?._id) {
    dispatch(getProductsByCategory(currentCategory._id));
  } else {
    dispatch(clearCategoryProducts());
  }
}, [currentCategory?._id, dispatch]);

 
  // Add Category Handler
  const handleAddCategory = () => {
    if (setEditingCategory) setEditingCategory(null);
    if (setSelectedCategory) setSelectedCategory(null);
    if (setShowCategoryForm) setShowCategoryForm(true);
  };

  // Edit Category Handler
  const handleEditCategory = (category) => {
    if (setEditingCategory) setEditingCategory(category);
    if (setSelectedCategory) setSelectedCategory(category.name);
    if (setShowCategoryForm) setShowCategoryForm(true);
  };

  // Delete Category Handler
  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await dispatch(deleteCategory(id)).unwrap();
        alert("Category deleted successfully!");
      } catch (err) {
        console.error("Error deleting category:", err);
        alert("Error deleting category: " + err.message);
      }
    }
  };

  // Category Click - Show Products
  const handleCategoryClick = async (category) => {
    setCurrentCategory(category);
    setViewMode("products");

    // Fetch products for this category
    try {
      await dispatch(getProductsByCategory(category._id)).unwrap();
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Back to Categories
  const handleBackToCategories = () => {
    setViewMode("categories");
    setCurrentCategory(null);
  };
  useEffect(() => {
    getProductsByCategory();
  }, []);

  // Add Product to Current Category
  const handleAddProductToCategory = () => {
    // Open product form with category pre-selected
    setShowProductForm(true);
  };

  // Loading State
  if (status === "loading" && viewMode === "categories") {
    return (
      <div>
        <h1 className="page-title">Categories Management</h1>
        <div className="loading-message">Loading categories...</div>
      </div>
    );
  }

  // Error State
  if (status === "failed") {
    return (
      <div>
        <h1 className="page-title">Categories Management</h1>
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      {/* CATEGORIES VIEW */}
      {viewMode === "categories" && (
        <>
          <div className="page-header">
            <h1 className="page-title">Categories Management</h1>
            <button className="add-btn" onClick={handleAddCategory}>
              <Plus size={20} />
              Add Category
            </button>
          </div>

          <div className="content-card">
            {categories.length === 0 ? (
              <div className="empty-message">
                <Grid size={48} />
                <p>No categories found. Add your first category!</p>
              </div>
            ) : (
              <div className="categories-grid">
                {categories.map((category) => (
                  <div
                    key={category._id || category.id}
                    className="category-card-interactive"
                  >
                    <div
                      className="category-card-content"
                      onClick={() => handleCategoryClick(category)}
                    >
                      <div className="category-icon">
                        {category.image || "📁"}
                      </div>
                      <h3 className="category-name">{category.name}</h3>
                      {category.description && (
                        <p className="category-description">
                          {category.description}
                        </p>
                      )}
                    </div>
                    <div className="category-actions">
                      <button
                        className="edit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditCategory(category);
                        }}
                        title="Edit Category"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(category._id || category.id);
                        }}
                        title="Delete Category"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* PRODUCTS VIEW (Specific Category) */}
      {viewMode === "products" && currentCategory && (
        <>
          <div className="page-header">
            <div className="category-breadcrumb">
              <button className="back-btn" onClick={handleBackToCategories}>
                <ArrowLeft size={20} />
                Back to Categories
              </button>

              <h1 className="page-title">
                {currentCategory.image} {currentCategory.name} Products
              </h1>
            </div>

            <button className="add-btn" onClick={handleAddProductToCategory}>
              <Plus size={20} />
              Add Product to {currentCategory.name}
            </button>
          </div>

          <div className="content-card">
            {status === "loading" ? (
              <div className="loading-message">Loading products...</div>
            ) : categoryProducts.length === 0 ? (
              <div className="empty-message">
                <Package size={48} />
                <p>No products in {currentCategory.name} yet!</p>
                <p className="text-sm">
                  Click "Add Product" to add items to this category.
                </p>
              </div>
            ) : (
              <div className="products-grid">
                {categoryProducts.map((product) => (
                  <div key={product._id || product.id} className="product-card">
                    <div className="product-image-container">
                      <div className="product-image">{product.image}</div>
                    </div>

                    <div className="product-details">
                      {/* ✅ FIXED CATEGORY NAME */}
                      <p className="product-category">
                      {product.category?.name || "No Category"}
                      </p>

                      <h3 className="product-name">{product.name}</h3>

                      <p className="product-brand">By {product.brand}</p>

                      <div className="product-price-row">
                        <span className="product-price">${product.price}</span>

                        {product.originalPrice > product.price && (
                          <span className="product-original-price">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Product Form Modal for Adding to Category */}
      {showProductForm && (
        <div
          className="modal-overlay"
          onClick={() => setShowProductForm(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Product to {currentCategory.name}</h2>
              <button
                className="close-btn"
                onClick={() => setShowProductForm(false)}
              >
                ×
              </button>
            </div>
            <div className="product-form">
              <p className="info-message">
                Product will be added to category:{" "}
                <strong>{currentCategory.name}</strong>
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Use the main "Add Product" button in Products page, or integrate
                full form here.
              </p>
              <div className="form-actions" style={{ marginTop: "20px" }}>
                <button
                  className="btn-secondary"
                  onClick={() => setShowProductForm(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default categories;
