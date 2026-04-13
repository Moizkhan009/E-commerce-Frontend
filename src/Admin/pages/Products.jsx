import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Package, Trash2, Edit, Star, Search } from "lucide-react";
import { addProduct, fetchProduct, deleteProduct } from "../../redux/products/products_action";

const Products = ({ setShowProductForm, setEditingProduct }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const { products, status, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  console.log(products);

  const handleAddProduct = () => {
    console.log("Add Product clicked");
    if (setEditingProduct && typeof setEditingProduct === "function") {
      setEditingProduct(null);
    }
    if (setShowProductForm && typeof setShowProductForm === "function") {
      setShowProductForm(true);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
        alert("Product deleted successfully!");
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Error deleting product: " + err.message);
      }
    }
  };

  const handleEdit = (product) => {
    console.log("Edit clicked for product:", product);
    if (setEditingProduct && typeof setEditingProduct === "function") {
      setEditingProduct(product);
    }
    if (setShowProductForm && typeof setShowProductForm === "function") {
      setShowProductForm(true);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  console.log(products);

  const filteredProducts = (products || []).filter((p) =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading State
  if (status === "loading") {
    return (
      <div>
        <h1 className="page-title">Products Management</h1>
        <div className="flex items-center gap-3 text-gray-500 text-sm mt-4">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin" />
          Loading products...
        </div>
      </div>
    );
  }

  // Error State
  if (status === "failed") {
    return (
      <div>
        <h1 className="page-title">Products Management</h1>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm mt-4">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header — original */}
      <div className="page-header">
        <h1 className="page-title">Products Management</h1>
        <button className="add-btn" onClick={handleAddProduct}>
          <Package size={20} />
          Add Product
        </button>
      </div>

      {/* Full-width Search Bar */}
      <div className="relative w-full mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, brand or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100 text-gray-700 bg-white"
        />
      </div>

      {/* List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

        {status === "succeeded" && products.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-gray-300">
            <Package size={40} strokeWidth={1.5} />
            <p className="text-sm text-gray-400">No products found. Add your first product!</p>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_100px] px-4 py-2.5 bg-green-50 border-b border-green-100 text-xs font-semibold text-green-700 uppercase tracking-wide">
              <span>Product</span>
              <span>Category</span>
              <span>Badge</span>
              <span>Rating</span>
              <span>Price</span>
              <span className="text-right">Actions</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-16 text-gray-300">
                <Package size={40} strokeWidth={1.5} />
                <p className="text-sm text-gray-400">No products match your search.</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product._id || product.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_100px] items-center px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-green-50 transition-colors"
                >
                  {/* Image + Name + Brand */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-lg flex-shrink-0">
                      {product.image || "📦"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-400">By {product.brand}</p>
                    </div>
                  </div>

                  {/* Category */}
                  <span className="text-sm text-gray-500">{product.category.name}</span>

                  {/* Badge */}
                  <div>
                    {product.badge ? (
                      <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${product.badgeColor || "bg-green-100 text-green-700"}`}>
                        {product.badge}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-0.5">
                    {renderStars(product.rating)}
                    <span className="text-xs text-gray-400 ml-1">({product.rating})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-gray-300 line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 justify-end">
                    <button
                      onClick={() => handleEdit(product)}
                      title="Edit"
                      className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
                    >
                      <Edit size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id || product.id)}
                      title="Delete"
                      className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;