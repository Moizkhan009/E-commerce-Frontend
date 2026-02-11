import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, fetchProduct } from "../../redux/products/products_action";

import Sidebar from "./Sidebar";
// import ProductsList from "./Products/ProductsLis";
import ProductsList from "./products/ProductsList";
// import AddProductForm from "./AddProduct/AddProductForm";
import AddProductForm from "../components/addProduct/AddProductForm";

const ProductDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [showAddForm, setShowAddForm] = useState(false);
  const dispatch = useDispatch();

  const { products, status, error } = useSelector((state) => ({
    products: state.product?.product?.products || [],
    status: state.product?.status,
    error: state.product?.error,
  }));

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {/* Products List */}
        {activeTab === "products" && !showAddForm && (
          <ProductsList
            products={products}
            status={status}
            error={error}
            onAddClick={() => setShowAddForm(true)}
          />
        )}

        {/* Add Product Form */}
        {activeTab === "products" && showAddForm && (
          <AddProductForm
            dispatch={dispatch}
            addProduct={addProduct}
            fetchProduct={fetchProduct}
            setShowAddForm={setShowAddForm}
            status={status}
          />
        )}

        {/* Home Tab */}
        {activeTab === "home" && (
          <div>
            <h2 className="text-3xl font-bold">Welcome to Dashboard</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDashboard;
