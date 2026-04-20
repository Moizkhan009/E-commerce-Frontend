import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Edit, Trash2, Package, Plus, ArrowLeft, Search } from "lucide-react";
import {
  fetchCategories,
  deleteCategory,
  getProductsByCategory,
} from "../../redux/products/category_action";
import { clearCategoryProducts } from "../../redux/products/category_slice.jsx";

const Categories = ({
  setShowCategoryForm,
  setSelectedCategory,
  setEditingCategory,
}) => {
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState("categories");
  const [currentCategory, setCurrentCategory] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { categories, categoryProducts, status, error } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await dispatch(fetchCategories()).unwrap();
        console.log("Categories loaded:", result);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    loadCategories();
  }, [dispatch]);

  useEffect(() => {
    if (currentCategory?._id) {
      dispatch(getProductsByCategory(currentCategory._id));
    } else {
      dispatch(clearCategoryProducts());
    }
  }, [currentCategory?._id, dispatch]);

  const handleAddCategory = () => {
    if (setEditingCategory) setEditingCategory(null);
    if (setSelectedCategory) setSelectedCategory(null);
    if (setShowCategoryForm) setShowCategoryForm(true);
  };

  const handleEditCategory = (category) => {
    if (setEditingCategory) setEditingCategory(category);
    if (setSelectedCategory) setSelectedCategory(category.name);
    if (setShowCategoryForm) setShowCategoryForm(true);
  };

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

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    setViewMode("products");
  };

  const handleBackToCategories = () => {
    setViewMode("categories");
    setCurrentCategory(null);
  };

  const filteredCategories = (categories || []).filter((cat) =>
    cat.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === "loading" && categories.length === 0) {
    return (
      <div className="p-6">
        <h1 className="page-title">Categories Management</h1>
        <div className="flex items-center gap-3 text-gray-500 text-sm mt-4">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin" />
          Loading categories...
        </div>
      </div>
    );
  }

  if (status === "failed" && categories.length === 0) {
    return (
      <div className="p-6">
        <h1 className="page-title">Categories Management</h1>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm mt-4">
          <p>{error}</p>
          <button
            onClick={() => dispatch(fetchCategories())}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ───── CATEGORIES VIEW ───── */}
      {viewMode === "categories" && (
        <>
          {/* Header — original */}
          <div className="page-header">
            <h1 className="page-title">Categories Management</h1>
            <button className="add-btn" onClick={handleAddCategory}>
              <Plus size={20} />
              Add Category
            </button>
          </div>

          {/* Full-width Search Bar */}
          <div className="relative w-full mb-4">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100 text-gray-700 bg-white"
            />
          </div>

          {/* List Table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

            {/* Table Header */}
            {filteredCategories.length > 0 && (
              <div className="grid grid-cols-[2fr_2fr_80px] px-4 py-2.5 bg-green-50 border-b border-green-100 text-xs font-semibold text-green-700 uppercase tracking-wide">
                <span>Category</span>
                <span>Description</span>
                <span className="text-right">Actions</span>
              </div>
            )}

            {/* Empty State */}
            {filteredCategories.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-16 text-gray-300">
                <Grid size={40} strokeWidth={1.5} />
                <p className="text-sm text-gray-400">No categories found. Add your first category!</p>
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div
                  key={category._id || category.id}
                  onClick={() => handleCategoryClick(category)}
                  className="grid grid-cols-[2fr_2fr_80px] items-center px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-green-50 cursor-pointer transition-colors"
                >
                  {/* Icon + Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center text-base flex-shrink-0">
                      {category.image || "📁"}
                    </div>
                    <span className="text-sm font-medium text-gray-800">{category.name}</span>
                  </div>

                  {/* Description */}
                  <span className="text-sm text-gray-400 truncate pr-3">
                    {category.description || "—"}
                  </span>

                  {/* Actions */}
                  <div
                    className="flex items-center gap-1.5 justify-end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleEditCategory(category)}
                      title="Edit Category"
                      className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
                    >
                      <Edit size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category._id || category.id)}
                      title="Delete Category"
                      className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* ───── PRODUCTS VIEW ───── */}
      {viewMode === "products" && currentCategory && (
        <>
          {/* Header — original */}
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
            <button className="add-btn" onClick={() => setShowProductForm(true)}>
              <Plus size={20} />
              Add Product to {currentCategory.name}
            </button>
          </div>

          {/* Products List */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {status === "loading" ? (
              <div className="flex items-center gap-3 p-8 text-gray-400 text-sm">
                <div className="w-5 h-5 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin" />
                Loading products...
              </div>
            ) : !categoryProducts || categoryProducts.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-16 text-gray-300">
                <Package size={40} strokeWidth={1.5} />
                <p className="text-sm text-gray-400">No products in {currentCategory.name} yet!</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-[2fr_1fr_1fr] px-4 py-2.5 bg-green-50 border-b border-green-100 text-xs font-semibold text-green-700 uppercase tracking-wide">
                  <span>Product</span>
                  <span>Brand</span>
                  <span>Price</span>
                </div>
                {categoryProducts.map((product) => (
                  <div
                    key={product._id || product.id}
                    className="grid grid-cols-[2fr_1fr_1fr] items-center px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-green-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center text-base flex-shrink-0">
                        {product.image || "📦"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-400">
                          {product.category?.name || currentCategory.name}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{product.brand}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800">${product.price}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs text-gray-300 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}

      {/* ───── Product Form Modal ───── */}
      {showProductForm && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowProductForm(false)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-800">
                Add Product to {currentCategory.name}
              </h2>
              <button
                onClick={() => setShowProductForm(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="p-5 text-sm text-gray-500">
              <p>
                Product will be added to category:{" "}
                <strong className="text-gray-700">{currentCategory.name}</strong>
              </p>
              <div className="flex justify-end mt-5">
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

export default Categories;