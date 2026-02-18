import React, { useState } from 'react';

// Component Imports
import Sidebar from './components/Sidebar';
import ProductForm from './components/productForm';
import CategoryForm from './components/CategoryForm';

// Page Imports
import Home from './pages/Home';
import Products from './pages/Products';
import Categories from './pages/Categories';

const AdminPanel = () => {
  // State Management
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('home');
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [refreshProducts, setRefreshProducts] = useState(0);

  // Function to refresh products after add/edit
  const handleProductAdded = () => {
    setRefreshProducts(prev => prev + 1);
  };

  // Render Active Page
  const renderPage = () => {
    switch(activeItem) {
      case 'home':
        return <Home />;
      case 'products':
        return <Products 
          setShowProductForm={setShowProductForm} 
          setEditingProduct={setEditingProduct}
          key={refreshProducts}
        />;
      case 'categories':
        return <Categories 
          setShowCategoryForm={setShowCategoryForm} 
          setSelectedCategory={setSelectedCategory} 
        />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="admin-panel">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Outfit', sans-serif;
          background: linear-gradient(135deg, #064e3b 0%, #022c22 100%);
          color: #ffffff;
          overflow-x: hidden;
        }

        .admin-panel {
          display: flex;
          min-height: 100vh;
          position: relative;
        }

        /* Sidebar Styles */
        .sidebar {
          background: linear-gradient(180deg, #065f46 0%, #064e3b 100%);
          border-right: 1px solid rgba(5, 150, 105, 0.2);
          width: ${isSidebarOpen ? '280px' : '80px'};
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          z-index: 1000;
          overflow: hidden;
          backdrop-filter: blur(20px);
          box-shadow: ${isSidebarOpen ? '4px 0 24px rgba(0, 0, 0, 0.3)' : '2px 0 12px rgba(0, 0, 0, 0.2)'};
        }

        .sidebar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 200px;
          background: radial-gradient(circle at 50% 0%, rgba(5, 150, 105, 0.25), transparent 70%);
          pointer-events: none;
        }

        .sidebar-header {
          padding: ${isSidebarOpen ? '32px 24px' : '32px 20px'};
          border-bottom: 1px solid rgba(5, 150, 105, 0.2);
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
        }

        .logo {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 20px;
          color: white;
          box-shadow: 0 8px 16px rgba(5, 150, 105, 0.4);
          flex-shrink: 0;
        }

        .brand-name {
          font-size: 22px;
          font-weight: 700;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: ${isSidebarOpen ? '1' : '0'};
          transition: opacity 0.3s;
          white-space: nowrap;
        }

        .toggle-btn {
          position: absolute;
          right: -16px;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.5);
          transition: all 0.3s;
          z-index: 10;
        }

        .toggle-btn:hover {
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 20px rgba(5, 150, 105, 0.7);
        }

        .menu {
          padding: 24px 12px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px ${isSidebarOpen ? '20px' : '16px'};
          margin-bottom: 8px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
          color: #94a3b8;
          font-weight: 500;
          justify-content: ${isSidebarOpen ? 'flex-start' : 'center'};
        }

        .menu-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          transform: scaleY(0);
          transition: transform 0.3s;
        }

        .menu-item:hover {
          background: rgba(5, 150, 105, 0.15);
          color: #ffffff;
          transform: translateX(4px);
        }

        .menu-item.active {
          background: linear-gradient(135deg, rgba(5, 150, 105, 0.25) 0%, rgba(4, 120, 87, 0.25) 100%);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
        }

        .menu-item.active::before {
          transform: scaleY(1);
        }

        .menu-icon {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }

        .menu-label {
          opacity: ${isSidebarOpen ? '1' : '0'};
          transition: opacity 0.3s;
          white-space: nowrap;
          font-size: 15px;
        }

        /* Main Content Styles */
        .main-content {
          flex: 1;
          margin-left: ${isSidebarOpen ? '280px' : '80px'};
          transition: margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 40px;
          min-height: 100vh;
          position: relative;
        }

        .page-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 32px;
          background: linear-gradient(135deg, #ffffff 0%, #d1fae5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }

        /* Page Header */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .page-header .page-title {
          margin-bottom: 0;
        }

        .add-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
        }

        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(5, 150, 105, 0.5);
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: linear-gradient(135deg, rgba(6, 95, 70, 0.4) 0%, rgba(6, 78, 59, 0.4) 100%);
          border: 1px solid rgba(5, 150, 105, 0.3);
          border-radius: 16px;
          padding: 28px;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #059669 0%, #047857 100%);
          transform: scaleX(0);
          transition: transform 0.3s;
        }

        .stat-card:hover::before {
          transform: scaleX(1);
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(5, 150, 105, 0.3);
          border-color: rgba(5, 150, 105, 0.5);
        }

        .stat-number {
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
          font-family: 'JetBrains Mono', monospace;
        }

        .stat-label {
          font-size: 14px;
          color: #d1fae5;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        /* Content Card */
        .content-card {
          background: linear-gradient(135deg, rgba(6, 95, 70, 0.4) 0%, rgba(6, 78, 59, 0.4) 100%);
          border: 1px solid rgba(5, 150, 105, 0.3);
          border-radius: 16px;
          padding: 32px;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        /* Table Styles */
        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          text-align: left;
          padding: 16px;
          font-weight: 600;
          color: #d1fae5;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.05em;
          border-bottom: 2px solid rgba(5, 150, 105, 0.3);
        }

        .data-table td {
          padding: 20px 16px;
          border-bottom: 1px solid rgba(5, 150, 105, 0.15);
          color: #ffffff;
          font-size: 15px;
        }

        .data-table tbody tr {
          transition: all 0.2s;
        }

        .data-table tbody tr:hover {
          background: rgba(5, 150, 105, 0.1);
          transform: scale(1.01);
        }

        /* Categories Grid */
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .category-card {
          background: linear-gradient(135deg, rgba(6, 95, 70, 0.4) 0%, rgba(6, 78, 59, 0.4) 100%);
          border: 1px solid rgba(5, 150, 105, 0.3);
          border-radius: 16px;
          padding: 32px;
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .category-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(5, 150, 105, 0.2) 0%, rgba(4, 120, 87, 0.2) 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .category-card:hover::before {
          opacity: 1;
        }

        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 32px rgba(5, 150, 105, 0.4);
          border-color: rgba(5, 150, 105, 0.6);
        }

        .category-card h3 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #ffffff;
          position: relative;
          z-index: 1;
        }

        .category-card p {
          color: #d1fae5;
          font-size: 14px;
          position: relative;
          z-index: 1;
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stat-card, .content-card, .category-card {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .stat-card:nth-child(1) { animation-delay: 0.1s; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; }
        .stat-card:nth-child(4) { animation-delay: 0.4s; }

        /* Product Table Styles */
        .product-image {
          font-size: 32px;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(5, 150, 105, 0.1);
          border-radius: 8px;
        }

        .category-badge {
          background: rgba(5, 150, 105, 0.2);
          color: #10b981;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
        }

        .price-cell {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .current-price {
          font-weight: 700;
          color: #10b981;
          font-size: 16px;
        }

        .original-price {
          text-decoration: line-through;
          color: #94a3b8;
          font-size: 14px;
        }

        .rating {
          color: #fbbf24;
          font-weight: 600;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .edit-btn, .delete-btn {
          padding: 8px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .edit-btn {
          background: rgba(5, 150, 105, 0.2);
          color: #10b981;
        }

        .edit-btn:hover {
          background: rgba(5, 150, 105, 0.3);
          transform: scale(1.1);
        }

        .delete-btn {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .delete-btn:hover {
          background: rgba(239, 68, 68, 0.3);
          transform: scale(1.1);
        }

        .loading-message, .error-message, .empty-message {
          text-align: center;
          padding: 40px;
          color: #d1fae5;
          font-size: 16px;
        }

        .empty-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          color: #94a3b8;
        }

        .empty-message svg {
          color: #059669;
          opacity: 0.5;
        }

        .error-alert {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #fca5a5;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 14px;
        }

        /* Products Grid Layout */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .product-card {
          background: linear-gradient(135deg, rgba(6, 95, 70, 0.4) 0%, rgba(6, 78, 59, 0.4) 100%);
          border: 1px solid rgba(5, 150, 105, 0.3);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s;
          position: relative;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 32px rgba(5, 150, 105, 0.4);
          border-color: rgba(5, 150, 105, 0.6);
        }

        .product-badge-container {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 10;
        }

        .product-badge {
          color: white;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .product-badge.bg-red-500 { background: #ef4444; }
        .product-badge.bg-green-500 { background: #10b981; }
        .product-badge.bg-blue-500 { background: #3b82f6; }
        .product-badge.bg-yellow-500 { background: #eab308; }
        .product-badge.bg-purple-500 { background: #a855f7; }
        .product-badge.bg-orange-500 { background: #f97316; }
        .product-badge.bg-gray-500 { background: #6b7280; }

        .product-image-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          background: rgba(6, 78, 59, 0.3);
          font-size: 80px;
        }

        .product-details {
          padding: 20px;
        }

        .product-category {
          font-size: 12px;
          color: #10b981;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .product-name {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-brand {
          font-size: 14px;
          color: #d1fae5;
          margin-bottom: 12px;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 12px;
        }

        .rating-value {
          font-size: 14px;
          color: #d1fae5;
          margin-left: 4px;
        }

        .product-price-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .product-price {
          font-size: 20px;
          font-weight: 700;
          color: #10b981;
          font-family: 'JetBrains Mono', monospace;
        }

        .product-original-price {
          font-size: 14px;
          color: #94a3b8;
          text-decoration: line-through;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.3s ease-out;
        }

        .modal-content {
          background: linear-gradient(135deg, rgba(6, 95, 70, 0.95) 0%, rgba(6, 78, 59, 0.95) 100%);
          border: 1px solid rgba(5, 150, 105, 0.4);
          border-radius: 20px;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.4s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 32px;
          border-bottom: 1px solid rgba(5, 150, 105, 0.3);
        }

        .modal-header h2 {
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 32px;
          color: #d1fae5;
          cursor: pointer;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: all 0.3s;
        }

        .close-btn:hover {
          background: rgba(5, 150, 105, 0.2);
          color: #ffffff;
        }

        .product-form {
          padding: 32px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #d1fae5;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 14px 16px;
          background: rgba(6, 78, 59, 0.5);
          border: 1px solid rgba(5, 150, 105, 0.3);
          border-radius: 12px;
          color: #ffffff;
          font-size: 15px;
          font-family: 'Outfit', sans-serif;
          transition: all 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.2);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(209, 250, 229, 0.5);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 32px;
        }

        .btn-primary,
        .btn-secondary {
          padding: 12px 28px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }

        .btn-primary {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(5, 150, 105, 0.6);
        }

        .btn-secondary {
          background: rgba(6, 78, 59, 0.5);
          color: #d1fae5;
          border: 1px solid rgba(5, 150, 105, 0.3);
        }

        .btn-secondary:hover {
          background: rgba(5, 150, 105, 0.2);
          border-color: rgba(5, 150, 105, 0.5);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .main-content {
            padding: 20px;
          }

          .page-title {
            font-size: 28px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .categories-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Sidebar Component */}
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* Main Content Area */}
      <div className="main-content">
        {renderPage()}
      </div>

      {/* Modal Components */}
      {showProductForm && (
        <ProductForm 
          setShowProductForm={setShowProductForm} 
          editingProduct={editingProduct}
          onProductAdded={handleProductAdded}
        />
      )}
      {showCategoryForm && <CategoryForm setShowCategoryForm={setShowCategoryForm} selectedCategory={selectedCategory} />}
    </div>
  );
};

export default AdminPanel;