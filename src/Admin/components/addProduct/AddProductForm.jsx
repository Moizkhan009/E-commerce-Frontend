import React, { useState } from "react";
import { X } from "lucide-react";

export default function AddProductForm({
  dispatch,
  addProduct,
  fetchProduct,
  setShowAddForm,
  status,
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    image: "",
    price: "",
    originalPrice: "",
    rating: "",
    badge: "",
    badgeColor: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.category || !formData.brand || !formData.price) {
      alert("Please fill in all required fields (Name, Category, Brand, Price)");
      return;
    }

    const newProduct = {
      name: formData.name,
      category: formData.category,
      brand: formData.brand,
      image: formData.image || "📦",
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice
        ? parseFloat(formData.originalPrice)
        : parseFloat(formData.price),
      rating: formData.rating ? parseFloat(formData.rating) : 0,
      badge: formData.badge || "",
      badgeColor: formData.badgeColor || "bg-gray-500",
    };

    try {
      await dispatch(addProduct(newProduct)).unwrap();

      alert("✅ Product successfully added!");

      setFormData({
        name: "",
        category: "",
        brand: "",
        image: "",
        price: "",
        originalPrice: "",
        rating: "",
        badge: "",
        badgeColor: "",
      });

      setShowAddForm(false);
      dispatch(fetchProduct());
    } catch (error) {
      console.error("Failed to add product:", error);
      alert(`❌ Failed to add product: ${error.message || "Check console"}`);
    }
  };

  return (
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
              Image (Emoji or URL)
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g., 🌾 or image URL"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
            disabled={status === "loading"}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Adding..." : "Add Product"}
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
  );
}
