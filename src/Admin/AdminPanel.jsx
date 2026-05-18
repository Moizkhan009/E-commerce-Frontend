// // import React, { useState } from 'react';

// // // Component Imports
// // import Sidebar from './components/Sidebar';
// // import ProductForm from './components/productForm';
// // import CategoryForm from './components/CategoryForm';

// // // Page Imports
// // import Home from './pages/Home';
// // import Products from './pages/Products';
// // import Categories from './pages/Categories';

// // const AdminPanel = ({ setIsAuth }) => {
// //   // State Management
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// //   const [activeItem, setActiveItem] = useState('home');
// //   const [showProductForm, setShowProductForm] = useState(false);
// //   const [showCategoryForm, setShowCategoryForm] = useState(false);
// //   const [selectedCategory, setSelectedCategory] = useState(null);
// //   const [editingProduct, setEditingProduct] = useState(null);
// //   const [refreshProducts, setRefreshProducts] = useState(0);

// //   // Function to refresh products after add/edit
// //   const handleProductAdded = () => {
// //     setRefreshProducts(prev => prev + 1);
// //   };

// //   // Render Active Page
// //   const renderPage = () => {
// //     switch(activeItem) {
// //       case 'home':
// //         return <Home />;
// //       case 'products':
// //         return <Products 
// //           setShowProductForm={setShowProductForm} 
// //           setEditingProduct={setEditingProduct}
// //           key={refreshProducts}
// //         />;
// //       case 'categories':
// //         return <Categories 
// //           setShowCategoryForm={setShowCategoryForm} 
// //           setSelectedCategory={setSelectedCategory} 
// //         />;
// //       default:
// //         return <Home />;
// //     }
// //   };

// //   return (
// //     <div className="admin-panel">
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

// //         * {
// //           margin: 0;
// //           padding: 0;
// //           box-sizing: border-box;
// //         }

// //         body {
// //           font-family: 'Outfit', sans-serif;
// //           background: linear-gradient(135deg, #064e3b 0%, #022c22 100%);
// //           color: #ffffff;
// //           overflow-x: hidden;
// //         }

// //         .admin-panel {
// //           display: flex;
// //           min-height: 100vh;
// //           position: relative;
// //         }

// //         /* Sidebar Styles */
// //         .sidebar {
// //           background: linear-gradient(180deg, #065f46 0%, #064e3b 100%);
// //           border-right: 1px solid rgba(5, 150, 105, 0.2);
// //           width: ${isSidebarOpen ? '280px' : '80px'};
// //           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
// //           position: fixed;
// //           left: 0;
// //           top: 0;
// //           height: 100vh;
// //           z-index: 1000;
// //           overflow: hidden;
// //           backdrop-filter: blur(20px);
// //           box-shadow: ${isSidebarOpen ? '4px 0 24px rgba(0, 0, 0, 0.3)' : '2px 0 12px rgba(0, 0, 0, 0.2)'};
// //         }

// //         .sidebar::before {
// //           content: '';
// //           position: absolute;
// //           top: 0;
// //           left: 0;
// //           right: 0;
// //           height: 200px;
// //           background: radial-gradient(circle at 50% 0%, rgba(5, 150, 105, 0.25), transparent 70%);
// //           pointer-events: none;
// //         }

// //         .sidebar-header {
// //           padding: ${isSidebarOpen ? '32px 24px' : '32px 20px'};
// //           border-bottom: 1px solid rgba(5, 150, 105, 0.2);
// //           display: flex;
// //           align-items: center;
// //           gap: 16px;
// //           position: relative;
// //         }

// //         .logo {
// //           width: 40px;
// //           height: 40px;
// //           background: linear-gradient(135deg, #059669 0%, #047857 100%);
// //           border-radius: 12px;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           font-weight: 700;
// //           font-size: 20px;
// //           color: white;
// //           box-shadow: 0 8px 16px rgba(5, 150, 105, 0.4);
// //           flex-shrink: 0;
// //         }

// //         .brand-name {
// //           font-size: 22px;
// //           font-weight: 700;
// //           background: linear-gradient(135deg, #10b981 0%, #059669 100%);
// //           -webkit-background-clip: text;
// //           -webkit-text-fill-color: transparent;
// //           opacity: ${isSidebarOpen ? '1' : '0'};
// //           transition: opacity 0.3s;
// //           white-space: nowrap;
// //         }

// //         .toggle-btn {
// //           position: absolute;
// //           right: -16px;
// //           top: 50%;
// //           transform: translateY(-50%);
// //           width: 32px;
// //           height: 32px;
// //           background: linear-gradient(135deg, #059669 0%, #047857 100%);
// //           border: none;
// //           border-radius: 50%;
// //           color: white;
// //           cursor: pointer;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           box-shadow: 0 4px 12px rgba(5, 150, 105, 0.5);
// //           transition: all 0.3s;
// //           z-index: 10;
// //         }

// //         .toggle-btn:hover {
// //           transform: translateY(-50%) scale(1.1);
// //           box-shadow: 0 6px 20px rgba(5, 150, 105, 0.7);
// //         }

// //         .menu {
// //           padding: 24px 12px;
// //         }

// //         .menu-item {
// //           display: flex;
// //           align-items: center;
// //           gap: 16px;
// //           padding: 16px ${isSidebarOpen ? '20px' : '16px'};
// //           margin-bottom: 8px;
// //           border-radius: 12px;
// //           cursor: pointer;
// //           transition: all 0.3s;
// //           position: relative;
// //           overflow: hidden;
// //           color: #94a3b8;
// //           font-weight: 500;
// //           justify-content: ${isSidebarOpen ? 'flex-start' : 'center'};
// //         }

// //         .menu-item::before {
// //           content: '';
// //           position: absolute;
// //           left: 0;
// //           top: 0;
// //           width: 4px;
// //           height: 100%;
// //           background: linear-gradient(135deg, #dcfce7 0%, #047857 100%);
// //           transform: scaleY(0);
// //           transition: transform 0.3s;
// //         }

// //         .menu-item:hover {
// //           background: rgba(5, 150, 105, 0.15);
// //           color: #ffffff;
// //           transform: translateX(4px);
// //         }

// //         .menu-item.active {
// //           background: linear-gradient(135deg, rgba(5, 150, 105, 0.25) 0%, rgba(4, 120, 87, 0.25) 100%);
// //           color: #ffffff;
// //           box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
// //         }

// //         .menu-item.active::before {
// //           transform: scaleY(1);
// //         }

// //         .menu-icon {
// //           width: 24px;
// //           height: 24px;
// //           flex-shrink: 0;
// //         }

// //         .menu-label {
// //           opacity: ${isSidebarOpen ? '1' : '0'};
// //           transition: opacity 0.3s;
// //           white-space: nowrap;
// //           font-size: 15px;
// //         }

// //         /* Main Content Styles */
// //         .main-content {
// //           flex: 1;
// //           margin-left: ${isSidebarOpen ? '280px' : '80px'};
// //           transition: margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
// //           padding: 40px;
// //           min-height: 100vh;
// //           position: relative;
// //         }

// //         .page-title {
// //           font-size: 36px;
// //           font-weight: 700;
// //           margin-bottom: 32px;
// //           background: linear-gradient(135deg, #ffffff 0%, #d1fae5 100%);
// //           -webkit-background-clip: text;
// //           -webkit-text-fill-color: transparent;
// //           letter-spacing: -0.02em;
// //         }

// //         /* Page Header */
// //         .page-header {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           margin-bottom: 32px;
// //         }

// //         .page-header .page-title {
// //           margin-bottom: 0;
// //         }

// //         .add-btn {
// //           display: flex;
// //           align-items: center;
// //           gap: 8px;
// //           padding: 12px 24px;
// //           background: linear-gradient(135deg, #059669 0%, #047857 100%);
// //           color: white;
// //           border: none;
// //           border-radius: 12px;
// //           font-size: 15px;
// //           font-weight: 600;
// //           cursor: pointer;
// //           transition: all 0.3s;
// //           box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
// //         }

// //         .add-btn:hover {
// //           transform: translateY(-2px);
// //           box-shadow: 0 8px 20px rgba(5, 150, 105, 0.5);
// //         }

// //         /* Stats Grid */
// //         .stats-grid {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
// //           gap: 24px;
// //           margin-bottom: 40px;
// //         }

// //         .stat-card {
// //           background: linear-gradient(135deg, rgba(6, 95, 70, 0.4) 0%, rgba(6, 78, 59, 0.4) 100%);
// //           border: 1px solid rgba(5, 150, 105, 0.3);
// //           border-radius: 16px;
// //           padding: 28px;
// //           transition: all 0.3s;
// //           position: relative;
// //           overflow: hidden;
// //           backdrop-filter: blur(10px);
// //         }

// //         .stat-card::before {
// //           content: '';
// //           position: absolute;
// //           top: 0;
// //           left: 0;
// //           right: 0;
// //           height: 4px;
// //           background: linear-gradient(90deg, #059669 0%, #047857 100%);
// //           transform: scaleX(0);
// //           transition: transform 0.3s;
// //         }

// //         .stat-card:hover::before {
// //           transform: scaleX(1);
// //         }

// //         .stat-card:hover {
// //           transform: translateY(-4px);
// //           box-shadow: 0 12px 24px rgba(5, 150, 105, 0.3);
// //           border-color: rgba(5, 150, 105, 0.5);
// //         }

// //         .stat-number {
// //           font-size: 32px;
// //           font-weight: 700;
// //           color: #ffffff;
// //           margin-bottom: 8px;
// //           font-family: 'JetBrains Mono', monospace;
// //         }

// //         .stat-label {
// //           font-size: 14px;
// //           color: #d1fae5;
// //           text-transform: uppercase;
// //           letter-spacing: 0.05em;
// //           font-weight: 500;
// //         }

// //         /* Content Card */
// //         .content-card {
// //           background: linear-gradient(135deg, rgba(6, 95, 70, 0.4) 0%, rgba(6, 78, 59, 0.4) 100%);
// //           border: 1px solid rgba(5, 150, 105, 0.3);
// //           border-radius: 16px;
// //           padding: 32px;
// //           backdrop-filter: blur(10px);
// //           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
// //         }

// //         /* Table Styles */
// //         .data-table {
// //           width: 100%;
// //           border-collapse: collapse;
// //         }

// //         .data-table th {
// //           text-align: left;
// //           padding: 16px;
// //           font-weight: 600;
// //           color: #d1fae5;
// //           text-transform: uppercase;
// //           font-size: 12px;
// //           letter-spacing: 0.05em;
// //           border-bottom: 2px solid rgba(5, 150, 105, 0.3);
// //         }

// //         .data-table td {
// //           padding: 20px 16px;
// //           border-bottom: 1px solid rgba(5, 150, 105, 0.15);
// //           color: #ffffff;
// //           font-size: 15px;
// //         }

// //         .data-table tbody tr {
// //           transition: all 0.2s;
// //         }

// //         .data-table tbody tr:hover {
// //           background: rgba(5, 150, 105, 0.1);
// //           transform: scale(1.01);
// //         }

// //         /* Categories Grid */
// //         .categories-grid {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
// //           gap: 24px;
// //         }

// //         .category-card {
// //           background: linear-gradient(135deg, rgba(6, 95, 70, 0.4) 0%, rgba(6, 78, 59, 0.4) 100%);
// //           border: 1px solid rgba(5, 150, 105, 0.3);
// //           border-radius: 16px;
// //           padding: 32px;
// //           transition: all 0.3s;
// //           cursor: pointer;
// //           position: relative;
// //           overflow: hidden;
// //         }

// //         .category-card::before {
// //           content: '';
// //           position: absolute;
// //           top: 0;
// //           left: 0;
// //           width: 100%;
// //           height: 100%;
// //           background: linear-gradient(135deg, rgba(5, 150, 105, 0.2) 0%, rgba(4, 120, 87, 0.2) 100%);
// //           opacity: 0;
// //           transition: opacity 0.3s;
// //         }

// //         .category-card:hover::before {
// //           opacity: 1;
// //         }

// //         .category-card:hover {
// //           transform: translateY(-8px);
// //           box-shadow: 0 16px 32px rgba(5, 150, 105, 0.4);
// //           border-color: rgba(5, 150, 105, 0.6);
// //         }

// //         .category-card h3 {
// //           font-size: 24px;
// //           font-weight: 700;
// //           margin-bottom: 8px;
// //           color: #ffffff;
// //           position: relative;
// //           z-index: 1;
// //         }

// //         .category-card p {
// //           color: #d1fae5;
// //           font-size: 14px;
// //           position: relative;
// //           z-index: 1;
// //         }

// //         /* Animations */
// //         @keyframes fadeIn {
// //           from {
// //             opacity: 0;
// //             transform: translateY(20px);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateY(0);
// //           }
// //         }

// //         .stat-card, .content-card, .category-card {
// //           animation: fadeIn 0.6s ease-out forwards;
// //         }

// //         .stat-card:nth-child(1) { animation-delay: 0.1s; }
// //         .stat-card:nth-child(2) { animation-delay: 0.2s; }
// //         .stat-card:nth-child(3) { animation-delay: 0.3s; }
// //         .stat-card:nth-child(4) { animation-delay: 0.4s; }

// //         /* Product Table Styles */
// //         .product-image {
// //           font-size: 32px;
// //           width: 50px;
// //           height: 50px;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           background: rgba(5, 150, 105, 0.1);
// //           border-radius: 8px;
// //         }

// //         .category-badge {
// //           background: rgba(5, 150, 105, 0.2);
// //           color: #10b981;
// //           padding: 4px 12px;
// //           border-radius: 6px;
// //           font-size: 13px;
// //           font-weight: 600;
// //         }

// //         .price-cell {
// //           display: flex;
// //           align-items: center;
// //           gap: 8px;
// //         }

// //         .current-price {
// //           font-weight: 700;
// //           color: #10b981;
// //           font-size: 16px;
// //         }

// //         .original-price {
// //           text-decoration: line-through;
// //           color: #94a3b8;
// //           font-size: 14px;
// //         }

// //         .rating {
// //           color: #fbbf24;
// //           font-weight: 600;
// //         }

// //         .action-buttons {
// //           display: flex;
// //           gap: 8px;
// //         }

// //         .edit-btn, .delete-btn {
// //           padding: 8px;
// //           border: none;
// //           border-radius: 6px;
// //           cursor: pointer;
// //           transition: all 0.3s;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //         }

// //         .edit-btn {
// //           background: rgba(5, 150, 105, 0.2);
// //           color: #10b981;
// //         }

// //         .edit-btn:hover {
// //           background: rgba(5, 150, 105, 0.3);
// //           transform: scale(1.1);
// //         }

// //         .delete-btn {
// //           background: rgba(239, 68, 68, 0.2);
// //           color: #ef4444;
// //         }

// //         .delete-btn:hover {
// //           background: rgba(239, 68, 68, 0.3);
// //           transform: scale(1.1);
// //         }

// //         .loading-message, .error-message, .empty-message {
// //           text-align: center;
// //           padding: 40px;
// //           color: #d1fae5;
// //           font-size: 16px;
// //         }

// //         .empty-message {
// //           display: flex;
// //           flex-direction: column;
// //           align-items: center;
// //           gap: 16px;
// //           color: #94a3b8;
// //         }

// //         .empty-message svg {
// //           color: #059669;
// //           opacity: 0.5;
// //         }

// //         .error-alert {
// //           background: rgba(239, 68, 68, 0.2);
// //           border: 1px solid rgba(239, 68, 68, 0.4);
// //           color: #fca5a5;
// //           padding: 12px 16px;
// //           border-radius: 8px;
// //           margin-bottom: 16px;
// //           font-size: 14px;
// //         }

// //         /* Products Grid Layout */
// //         .products-grid {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
// //           gap: 24px;
// //         }

// //         .product-card {
// //           background: linear-gradient(135deg, rgba(6, 95, 70, 0.4) 0%, rgba(6, 78, 59, 0.4) 100%);
// //           border: 1px solid rgba(5, 150, 105, 0.3);
// //           border-radius: 16px;
// //           overflow: hidden;
// //           transition: all 0.3s;
// //           position: relative;
// //         }

// //         .product-card:hover {
// //           transform: translateY(-8px);
// //           box-shadow: 0 16px 32px rgba(5, 150, 105, 0.4);
// //           border-color: rgba(5, 150, 105, 0.6);
// //         }

// //         .product-badge-container {
// //           position: absolute;
// //           top: 16px;
// //           left: 16px;
// //           z-index: 10;
// //         }

// //         .product-badge {
// //           color: white;
// //           font-size: 12px;
// //           font-weight: 700;
// //           padding: 6px 12px;
// //           border-radius: 20px;
// //           text-transform: uppercase;
// //         }

// //         .product-badge.bg-red-500 { background: #ef4444; }
// //         .product-badge.bg-green-500 { background: #10b981; }
// //         .product-badge.bg-blue-500 { background: #3b82f6; }
// //         .product-badge.bg-yellow-500 { background: #eab308; }
// //         .product-badge.bg-purple-500 { background: #a855f7; }
// //         .product-badge.bg-orange-500 { background: #f97316; }
// //         .product-badge.bg-gray-500 { background: #6b7280; }

// //         .product-image-container {
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           height: 200px;
// //           background: rgba(6, 78, 59, 0.3);
// //           font-size: 80px;
// //         }

// //         .product-details {
// //           padding: 20px;
// //         }

// //         .product-category {
// //           font-size: 12px;
// //           color: #10b981;
// //           text-transform: uppercase;
// //           letter-spacing: 0.05em;
// //           margin-bottom: 8px;
// //           font-weight: 600;
// //         }

// //         .product-name {
// //           font-size: 18px;
// //           font-weight: 700;
// //           color: #ffffff;
// //           margin-bottom: 8px;
// //           line-height: 1.4;
// //           display: -webkit-box;
// //           -webkit-line-clamp: 2;
// //           -webkit-box-orient: vertical;
// //           overflow: hidden;
// //         }

// //         .product-brand {
// //           font-size: 14px;
// //           color: #d1fae5;
// //           margin-bottom: 12px;
// //         }

// //         .product-rating {
// //           display: flex;
// //           align-items: center;
// //           gap: 4px;
// //           margin-bottom: 12px;
// //         }

// //         .rating-value {
// //           font-size: 14px;
// //           color: #d1fae5;
// //           margin-left: 4px;
// //         }

// //         .product-price-row {
// //           display: flex;
// //           align-items: center;
// //           gap: 8px;
// //           margin-bottom: 16px;
// //         }

// //         .product-price {
// //           font-size: 20px;
// //           font-weight: 700;
// //           color: #10b981;
// //           font-family: 'JetBrains Mono', monospace;
// //         }

// //         .product-original-price {
// //           font-size: 14px;
// //           color: #94a3b8;
// //           text-decoration: line-through;
// //         }

// //         /* Modal Styles */
// //         .modal-overlay {
// //           position: fixed;
// //           top: 0;
// //           left: 0;
// //           right: 0;
// //           bottom: 0;
// //           background: rgba(0, 0, 0, 0.7);
// //           backdrop-filter: blur(5px);
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           z-index: 2000;
// //           animation: fadeIn 0.3s ease-out;
// //         }

// //         .modal-content {
// //           background: linear-gradient(135deg, rgba(6, 95, 70, 0.95) 0%, rgba(6, 78, 59, 0.95) 100%);
// //           border: 1px solid rgba(5, 150, 105, 0.4);
// //           border-radius: 20px;
// //           width: 90%;
// //           max-width: 600px;
// //           max-height: 90vh;
// //           overflow-y: auto;
// //           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
// //           animation: slideUp 0.4s ease-out;
// //         }

// //         @keyframes slideUp {
// //           from {
// //             opacity: 0;
// //             transform: translateY(50px);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateY(0);
// //           }
// //         }

// //         .modal-header {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           padding: 28px 32px;
// //           border-bottom: 1px solid rgba(5, 150, 105, 0.3);
// //         }

// //         .modal-header h2 {
// //           font-size: 24px;
// //           font-weight: 700;
// //           color: #ffffff;
// //           margin: 0;
// //         }

// //         .close-btn {
// //           background: none;
// //           border: none;
// //           font-size: 32px;
// //           color: #d1fae5;
// //           cursor: pointer;
// //           width: 36px;
// //           height: 36px;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           border-radius: 8px;
// //           transition: all 0.3s;
// //         }

// //         .close-btn:hover {
// //           background: rgba(5, 150, 105, 0.2);
// //           color: #ffffff;
// //         }

// //         .product-form {
// //           padding: 32px;
// //         }

// //         .form-group {
// //           margin-bottom: 24px;
// //         }

// //         .form-group label {
// //           display: block;
// //           margin-bottom: 8px;
// //           font-weight: 600;
// //           color: #d1fae5;
// //           font-size: 14px;
// //           text-transform: uppercase;
// //           letter-spacing: 0.05em;
// //         }

// //         .form-group input,
// //         .form-group select,
// //         .form-group textarea {
// //           width: 100%;
// //           padding: 14px 16px;
// //           background: rgba(6, 78, 59, 0.5);
// //           border: 1px solid rgba(5, 150, 105, 0.3);
// //           border-radius: 12px;
// //           color: #ffffff;
// //           font-size: 15px;
// //           font-family: 'Outfit', sans-serif;
// //           transition: all 0.3s;
// //         }

// //         .form-group input:focus,
// //         .form-group select:focus,
// //         .form-group textarea:focus {
// //           outline: none;
// //           border-color: #059669;
// //           box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.2);
// //         }

// //         .form-group input::placeholder,
// //         .form-group textarea::placeholder {
// //           color: rgba(209, 250, 229, 0.5);
// //         }

// //         .form-row {
// //           display: grid;
// //           grid-template-columns: 1fr 1fr;
// //           gap: 16px;
// //         }

// //         .form-actions {
// //           display: flex;
// //           gap: 12px;
// //           justify-content: flex-end;
// //           margin-top: 32px;
// //         }

// //         .btn-primary,
// //         .btn-secondary {
// //           padding: 12px 28px;
// //           border-radius: 12px;
// //           font-size: 15px;
// //           font-weight: 600;
// //           cursor: pointer;
// //           transition: all 0.3s;
// //           border: none;
// //         }

// //         .btn-primary {
// //           background: linear-gradient(135deg, #059669 0%, #047857 100%);
// //           color: white;
// //           box-shadow: 0 4px 12px rgba(5, 150, 105, 0.4);
// //         }

// //         .btn-primary:hover {
// //           transform: translateY(-2px);
// //           box-shadow: 0 8px 20px rgba(5, 150, 105, 0.6);
// //         }

// //         .btn-secondary {
// //           background: rgba(6, 78, 59, 0.5);
// //           color: #d1fae5;
// //           border: 1px solid rgba(5, 150, 105, 0.3);
// //         }

// //         .btn-secondary:hover {
// //           background: rgba(5, 150, 105, 0.2);
// //           border-color: rgba(5, 150, 105, 0.5);
// //         }

// //         /* Responsive */
// //         @media (max-width: 768px) {
// //           .main-content {
// //             padding: 20px;
// //           }

// //           .page-title {
// //             font-size: 28px;
// //           }

// //           .stats-grid {
// //             grid-template-columns: 1fr;
// //           }

// //           .categories-grid {
// //             grid-template-columns: 1fr;
// //           }
// //         }





// // /* ============================================
// //    SHOPZY SAAS ADMIN DASHBOARD - EXACT MATCH
// //    ============================================ */
// // /* ============================================
// //    CSS VARIABLES & RESET
// //    ============================================ */
// // :root {
// //   --primary: #6366f1;
// //   --primary-light: #818cf8;
// //   --primary-dark: #4f46e5;
// //   --secondary: #ec4899;
// //   --success: #10b981;
// //   --warning: #f59e0b;
// //   --danger: #ef4444;
// //   --info: #3b82f6;
  
// //   --bg-primary: #f8fafc;
// //   --bg-secondary: #ffffff;
// //   --bg-sidebar: #ffffff;
// //   --bg-card: #ffffff;
  
// //   --text-primary: #1e293b;
// //   --text-secondary: #64748b;
// //   --text-muted: #94a3b8;
  
// //   --border-color: #e2e8f0;
// //   --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
// //   --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
// //   --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
// //   --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  
// //   --sidebar-width: 260px;
// //   --sidebar-collapsed: 72px;
// //   --border-radius: 16px;
// //   --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
// // }

// // * {
// //   margin: 0;
// //   padding: 0;
// //   box-sizing: border-box;
// // }

// // body {
// //   font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
// //   background: var(--bg-primary);
// //   color: var(--text-primary);
// //   line-height: 1.6;
// // }

// // /* ============================================
// //    LAYOUT
// //    ============================================ */
// // .app-container {
// //   display: flex;
// //   min-height: 100vh;
// // }

// // .main-content {
// //   flex: 1;
// //   margin-left: var(--sidebar-width);
// //   transition: var(--transition);
// //   padding: 24px;
// // }

// // .main-content.sidebar-collapsed {
// //   margin-left: var(--sidebar-collapsed);
// // }

// // /* ============================================
// //    SIDEBAR
// //    ============================================ */
// // .sidebar {
// //   position: fixed;
// //   left: 0;
// //   top: 0;
// //   height: 100vh;
// //   width: var(--sidebar-width);
// //   background: var(--bg-sidebar);
// //   border-right: 1px solid var(--border-color);
// //   display: flex;
// //   flex-direction: column;
// //   transition: var(--transition);
// //   z-index: 100;
// //   box-shadow: var(--shadow-lg);
// // }

// // .sidebar.collapsed {
// //   width: var(--sidebar-collapsed);
// // }

// // .sidebar-header {
// //   padding: 20px;
// //   display: flex;
// //   align-items: center;
// //   justify-content: space-between;
// //   border-bottom: 1px solid var(--border-color);
// // }

// // .logo-container {
// //   display: flex;
// //   align-items: center;
// //   gap: 12px;
// // }

// // .logo {
// //   width: 40px;
// //   height: 40px;
// //   background: linear-gradient(135deg, var(--primary), var(--primary-dark));
// //   color: white;
// //   border-radius: 12px;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   font-weight: 700;
// //   font-size: 18px;
// //   box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
// // }

// // .brand-name {
// //   font-size: 20px;
// //   font-weight: 700;
// //   background: linear-gradient(135deg, var(--primary), var(--secondary));
// //   -webkit-background-clip: text;
// //   -webkit-text-fill-color: transparent;
// //   background-clip: text;
// // }

// // .toggle-btn {
// //   width: 32px;
// //   height: 32px;
// //   border: none;
// //   background: var(--bg-primary);
// //   border-radius: 8px;
// //   cursor: pointer;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   color: var(--text-secondary);
// //   transition: var(--transition);
// // }

// // .toggle-btn:hover {
// //   background: var(--primary);
// //   color: white;
// // }

// // .sidebar-search {
// //   margin: 16px 20px;
// //   padding: 10px 14px;
// //   background: var(--bg-primary);
// //   border-radius: 12px;
// //   display: flex;
// //   align-items: center;
// //   gap: 10px;
// //   color: var(--text-muted);
// //   transition: var(--transition);
// // }

// // .sidebar-search input {
// //   border: none;
// //   background: none;
// //   outline: none;
// //   font-size: 14px;
// //   color: var(--text-primary);
// //   width: 100%;
// // }

// // .sidebar-search input::placeholder {
// //   color: var(--text-muted);
// // }

// // .menu-section {
// //   padding: 8px 12px;
// // }

// // .menu-section-title {
// //   font-size: 11px;
// //   font-weight: 600;
// //   text-transform: uppercase;
// //   letter-spacing: 0.05em;
// //   color: var(--text-muted);
// //   padding: 8px 16px;
// //   display: block;
// //   transition: var(--transition);
// // }

// // .menu-section-title.hidden {
// //   opacity: 0;
// //   visibility: hidden;
// // }

// // .menu-item {
// //   display: flex;
// //   align-items: center;
// //   gap: 12px;
// //   padding: 12px 16px;
// //   margin: 2px 0;
// //   border-radius: 12px;
// //   cursor: pointer;
// //   transition: var(--transition);
// //   position: relative;
// //   color: var(--text-secondary);
// // }

// // .menu-item:hover {
// //   background: rgba(99, 102, 241, 0.08);
// //   color: var(--primary);
// // }

// // .menu-item.active {
// //   background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.05));
// //   color: var(--primary);
// //   font-weight: 600;
// // }

// // .menu-icon-wrapper {
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   min-width: 24px;
// // }

// // .active-indicator {
// //   position: absolute;
// //   right: 12px;
// //   width: 6px;
// //   height: 6px;
// //   background: var(--primary);
// //   border-radius: 50%;
// //   box-shadow: 0 0 8px rgba(99, 102, 241, 0.6);
// // }

// // .logout-item {
// //   color: var(--danger);
// // }

// // .logout-item:hover {
// //   background: rgba(239, 68, 68, 0.08);
// //   color: var(--danger);
// // }

// // .sidebar-divider {
// //   height: 1px;
// //   background: var(--border-color);
// //   margin: 8px 20px;
// // }

// // .sidebar-footer {
// //   margin-top: auto;
// //   padding: 16px 20px;
// //   border-top: 1px solid var(--border-color);
// // }

// // .user-profile {
// //   display: flex;
// //   align-items: center;
// //   gap: 12px;
// //   padding: 12px;
// //   background: var(--bg-primary);
// //   border-radius: 12px;
// // }

// // .user-avatar {
// //   width: 36px;
// //   height: 36px;
// //   background: linear-gradient(135deg, var(--primary-light), var(--primary));
// //   color: white;
// //   border-radius: 10px;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   font-weight: 600;
// //   font-size: 12px;
// // }

// // .user-info {
// //   display: flex;
// //   flex-direction: column;
// //   flex: 1;
// // }

// // .user-name {
// //   font-size: 14px;
// //   font-weight: 600;
// //   color: var(--text-primary);
// // }

// // .user-role {
// //   font-size: 12px;
// //   color: var(--text-muted);
// // }

// // .notification-icon {
// //   color: var(--text-muted);
// //   cursor: pointer;
// //   transition: var(--transition);
// // }

// // .notification-icon:hover {
// //   color: var(--primary);
// // }

// // /* ============================================
// //    DASHBOARD HEADER
// //    ============================================ */
// // .dashboard-header {
// //   display: flex;
// //   justify-content: space-between;
// //   align-items: flex-start;
// //   margin-bottom: 28px;
// // }

// // .page-title {
// //   font-size: 28px;
// //   font-weight: 700;
// //   color: var(--text-primary);
// //   margin-bottom: 4px;
// // }

// // .page-subtitle {
// //   color: var(--text-secondary);
// //   font-size: 14px;
// // }

// // .header-actions {
// //   display: flex;
// //   gap: 12px;
// // }

// // .btn {
// //   display: flex;
// //   align-items: center;
// //   gap: 8px;
// //   padding: 10px 20px;
// //   border-radius: 12px;
// //   font-size: 14px;
// //   font-weight: 500;
// //   cursor: pointer;
// //   transition: var(--transition);
// //   border: none;
// // }

// // .btn-outline {
// //   background: var(--bg-secondary);
// //   border: 1px solid var(--border-color);
// //   color: var(--text-secondary);
// // }

// // .btn-outline:hover {
// //   border-color: var(--primary);
// //   color: var(--primary);
// //   box-shadow: var(--shadow-md);
// // }

// // .btn-primary {
// //   background: linear-gradient(135deg, var(--primary), var(--primary-dark));
// //   color: white;
// //   box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
// // }

// // .btn-primary:hover {
// //   transform: translateY(-2px);
// //   box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
// // }

// // /* ============================================
// //    STATS GRID
// //    ============================================ */
// // .stats-grid {
// //   display: grid;
// //   grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
// //   gap: 20px;
// //   margin-bottom: 28px;
// // }

// // .stat-card {
// //   background: var(--bg-card);
// //   border-radius: var(--border-radius);
// //   padding: 24px;
// //   box-shadow: var(--shadow-sm);
// //   border: 1px solid var(--border-color);
// //   transition: var(--transition);
// //   position: relative;
// //   overflow: hidden;
// // }

// // .stat-card::before {
// //   content: '';
// //   position: absolute;
// //   top: 0;
// //   left: 0;
// //   right: 0;
// //   height: 3px;
// //   background: linear-gradient(90deg, var(--primary), var(--secondary));
// //   opacity: 0;
// //   transition: var(--transition);
// // }

// // .stat-card:hover {
// //   transform: translateY(-4px);
// //   box-shadow: var(--shadow-xl);
// // }

// // .stat-card:hover::before {
// //   opacity: 1;
// // }

// // .stat-card-header {
// //   display: flex;
// //   justify-content: space-between;
// //   align-items: center;
// //   margin-bottom: 16px;
// // }

// // .stat-icon-wrapper {
// //   width: 48px;
// //   height: 48px;
// //   border-radius: 14px;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   color: white;
// // }

// // .stat-icon-wrapper.blue {
// //   background: linear-gradient(135deg, #3b82f6, #2563eb);
// //   box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
// // }

// // .stat-icon-wrapper.purple {
// //   background: linear-gradient(135deg, #8b5cf6, #7c3aed);
// //   box-shadow: 0 4px 14px rgba(139, 92, 246, 0.4);
// // }

// // .stat-icon-wrapper.orange {
// //   background: linear-gradient(135deg, #f97316, #ea580c);
// //   box-shadow: 0 4px 14px rgba(249, 115, 22, 0.4);
// // }

// // .stat-icon-wrapper.green {
// //   background: linear-gradient(135deg, #10b981, #059669);
// //   box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
// // }

// // .stat-change {
// //   display: flex;
// //   align-items: center;
// //   gap: 4px;
// //   font-size: 12px;
// //   font-weight: 600;
// //   padding: 4px 10px;
// //   border-radius: 20px;
// // }

// // .stat-change.up {
// //   background: rgba(16, 185, 129, 0.1);
// //   color: var(--success);
// // }

// // .stat-change.down {
// //   background: rgba(239, 68, 68, 0.1);
// //   color: var(--danger);
// // }

// // .stat-number {
// //   font-size: 32px;
// //   font-weight: 700;
// //   color: var(--text-primary);
// //   margin-bottom: 4px;
// // }

// // .stat-label {
// //   font-size: 14px;
// //   color: var(--text-secondary);
// //   margin-bottom: 16px;
// // }

// // .stat-progress-bar {
// //   height: 4px;
// //   background: var(--bg-primary);
// //   border-radius: 2px;
// //   overflow: hidden;
// // }

// // .stat-progress-fill {
// //   height: 100%;
// //   background: linear-gradient(90deg, var(--primary), var(--primary-light));
// //   border-radius: 2px;
// //   transition: width 1s ease;
// // }

// // /* ============================================
// //    DASHBOARD GRID
// //    ============================================ */
// // .dashboard-grid {
// //   display: grid;
// //   grid-template-columns: 2fr 1fr;
// //   gap: 20px;
// //   margin-bottom: 28px;
// // }

// // .chart-card,
// // .activity-card {
// //   background: var(--bg-card);
// //   border-radius: var(--border-radius);
// //   padding: 24px;
// //   box-shadow: var(--shadow-sm);
// //   border: 1px solid var(--border-color);
// // }

// // .card-header {
// //   display: flex;
// //   justify-content: space-between;
// //   align-items: center;
// //   margin-bottom: 20px;
// // }

// // .card-header h3 {
// //   font-size: 18px;
// //   font-weight: 600;
// //   color: var(--text-primary);
// // }

// // .select-dropdown {
// //   padding: 6px 12px;
// //   border: 1px solid var(--border-color);
// //   border-radius: 8px;
// //   background: var(--bg-primary);
// //   color: var(--text-secondary);
// //   font-size: 13px;
// //   cursor: pointer;
// //   outline: none;
// // }

// // /* Chart Placeholder */
// // .chart-placeholder {
// //   height: 200px;
// //   display: flex;
// //   flex-direction: column;
// //   justify-content: flex-end;
// // }

// // .chart-bars {
// //   display: flex;
// //   align-items: flex-end;
// //   justify-content: space-between;
// //   gap: 12px;
// //   height: 160px;
// // }

// // .chart-bar {
// //   flex: 1;
// //   display: flex;
// //   align-items: flex-end;
// //   border-radius: 8px 8px 0 0;
// //   overflow: hidden;
// // }

// // .chart-bar-fill {
// //   width: 100%;
// //   height: 100%;
// //   background: linear-gradient(180deg, var(--primary-light), var(--primary));
// //   border-radius: 8px 8px 0 0;
// //   opacity: 0.8;
// //   transition: var(--transition);
// // }

// // .chart-bar:hover .chart-bar-fill {
// //   opacity: 1;
// //   background: linear-gradient(180deg, var(--primary), var(--primary-dark));
// // }

// // .chart-labels {
// //   display: flex;
// //   justify-content: space-between;
// //   margin-top: 12px;
// //   padding: 0 4px;
// // }

// // .chart-labels span {
// //   font-size: 12px;
// //   color: var(--text-muted);
// //   text-align: center;
// //   flex: 1;
// // }

// // /* Activity Card */
// // .activity-list {
// //   display: flex;
// //   flex-direction: column;
// //   gap: 16px;
// // }

// // .activity-item {
// //   display: flex;
// //   align-items: center;
// //   gap: 14px;
// //   padding: 12px;
// //   border-radius: 12px;
// //   transition: var(--transition);
// // }

// // .activity-item:hover {
// //   background: var(--bg-primary);
// // }

// // .activity-avatar {
// //   width: 40px;
// //   height: 40px;
// //   background: linear-gradient(135deg, var(--primary-light), var(--primary));
// //   color: white;
// //   border-radius: 12px;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   font-weight: 600;
// //   font-size: 12px;
// //   flex-shrink: 0;
// // }

// // .activity-content p {
// //   font-size: 14px;
// //   color: var(--text-primary);
// //   margin-bottom: 2px;
// // }

// // .activity-content strong {
// //   font-weight: 600;
// // }

// // .activity-time {
// //   font-size: 12px;
// //   color: var(--text-muted);
// // }

// // /* ============================================
// //    QUICK STATS ROW
// //    ============================================ */
// // .quick-stats-row {
// //   display: grid;
// //   grid-template-columns: repeat(3, 1fr);
// //   gap: 20px;
// // }

// // .quick-stat {
// //   background: var(--bg-card);
// //   border-radius: var(--border-radius);
// //   padding: 20px 24px;
// //   display: flex;
// //   align-items: center;
// //   gap: 16px;
// //   box-shadow: var(--shadow-sm);
// //   border: 1px solid var(--border-color);
// //   transition: var(--transition);
// // }

// // .quick-stat:hover {
// //   transform: translateY(-2px);
// //   box-shadow: var(--shadow-md);
// // }

// // .quick-stat svg {
// //   color: var(--primary);
// // }

// // .quick-stat-value {
// //   display: block;
// //   font-size: 24px;
// //   font-weight: 700;
// //   color: var(--text-primary);
// // }

// // .quick-stat-label {
// //   font-size: 13px;
// //   color: var(--text-secondary);
// // }

// // /* ============================================
// //    RESPONSIVE
// //    ============================================ */
// // @media (max-width: 1024px) {
// //   .dashboard-grid {
// //     grid-template-columns: 1fr;
// //   }
  
// //   .quick-stats-row {
// //     grid-template-columns: 1fr;
// //   }
// // }

// // @media (max-width: 768px) {
// //   .sidebar {
// //     transform: translateX(-100%);
// //   }
  
// //   .sidebar.open {
// //     transform: translateX(0);
// //   }
  
// //   .main-content {
// //     margin-left: 0;
// //   }
  
// //   .stats-grid {
// //     grid-template-columns: 1fr;
// //   }
  
// //   .dashboard-header {
// //     flex-direction: column;
// //     gap: 16px;
// //   }
// // }

// // /* ============================================
// //    ANIMATIONS
// //    ============================================ */
// // @keyframes fadeIn {
// //   from {
// //     opacity: 0;
// //     transform: translateY(10px);
// //   }
// //   to {
// //     opacity: 1;
// //     transform: translateY(0);
// //   }
// // }

// // .stat-card,
// // .chart-card,
// // .activity-card,
// // .quick-stat {
// //   animation: fadeIn 0.5s ease forwards;
// // }

// // .stat-card:nth-child(1) { animation-delay: 0.1s; }
// // .stat-card:nth-child(2) { animation-delay: 0.2s; }
// // .stat-card:nth-child(3) { animation-delay: 0.3s; }
// // .stat-card:nth-child(4) { animation-delay: 0.4s; }

        
// //       `}</style>

// //       {/* Sidebar Component */}
// //       <Sidebar 


// //         isSidebarOpen={isSidebarOpen}
// //         setIsSidebarOpen={setIsSidebarOpen}
// //         activeItem={activeItem}
// //         setActiveItem={setActiveItem}
// //         setIsAuth={setIsAuth}
// //       />

// //       {/* Main Content Area */}
// //       <div className="main-content">
// //         {renderPage()}
// //       </div>

// //       {/* Modal Components */}
// //       {showProductForm && (
// //         <ProductForm 
// //           setShowProductForm={setShowProductForm} 
// //           editingProduct={editingProduct}
// //           onProductAdded={handleProductAdded}
// //         />
// //       )}
// //       {showCategoryForm && <CategoryForm setShowCategoryForm={setShowCategoryForm} selectedCategory={selectedCategory} />}
// //     </div>
// //   );
// // };

// // export default AdminPanel;
// // src/App.jsx
// import React, { useState } from 'react';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import DashboardStats from './components/DashboardStats';
// import RecentOrders from './components/RecentOrders';
// import SalesChart from './components/SalesChart';
// import TopProducts from './components/TopProducts';
// import CustomerList from './components/CustomerList';
// import InventoryStatus from './components/InventoryStatus';
// import './App.css';

// function AdminPanel() {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const renderContent = () => {
//     switch(activeTab) {
//       case 'dashboard':
//         return (
//           <>
//             <DashboardStats />
//             <div className="grid-2">
//               <SalesChart />
//               <TopProducts />
//             </div>
//             <RecentOrders />
//           </>
//         );
//       case 'orders':
//         return <RecentOrders fullPage />;
//       case 'customers':
//         return <CustomerList />;
//       case 'products':
//         return <InventoryStatus />;
//       case 'analytics':
//         return (
//           <div className="grid-2">
//             <SalesChart fullPage />
//             <TopProducts fullPage />
//           </div>
//         );
//       default:
//         return <DashboardStats />;
//     }
//   };

//   return (
//     <div className="admin-app">
//       <Sidebar 
//         activeTab={activeTab} 
//         setActiveTab={setActiveTab}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />
//       <div className={`main-content ${!sidebarOpen ? 'expanded' : ''}`}>
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//         <main className="dashboard-content">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminPanel;
// import React, { useState } from 'react';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import DashboardStats from './components/DashboardStats';
// import RecentOrders from './components/RecentOrders';
// import SalesChart from './components/SalesChart';
// import TopProducts from './components/TopProducts';
// import CustomerList from './components/CustomerList';
// import InventoryStatus from './components/InventoryStatus';
// import './App.css';

// function AdminPanel() {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return (
//           <>
//             <DashboardStats />
//             <div className="grid-2">
//               <SalesChart />
//               <TopProducts />
//             </div>
//             <RecentOrders />
//           </>
//         );

//       case 'orders':
//         return <RecentOrders fullPage />;

//       case 'customers':
//         return <CustomerList />;

//       case 'products':
//         return <InventoryStatus 
//         setShowProductForm={setShowProductForm}
//   setEditingProduct={setEditingProduct}
//   //       setShowProductForm={setShowProductForm}
//   // setEditingProduct={setEditingProduct}
        
//         />;

//       case 'analytics':
//         return (
//           <div className="grid-2">
//             <SalesChart fullPage />
//             <TopProducts fullPage />
//           </div>
//         );

//       default:
//         return <DashboardStats />;
//     }
//   };

//   return (
//     <div className="admin-app">
//       <Sidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />

//       <div className={`main-content ${!sidebarOpen ? 'expanded' : ''}`}>
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         <main className="dashboard-content">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminPanel;


import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import SalesChart from './components/SalesChart';
import TopProducts from './components/TopProducts';
import RecentOrders from './components/RecentOrders';
import InventoryStatus from './components/InventoryStatus';
import ProductForm from './components/ProductForm';
import CategoriesPage from './pages/Categories';
import CustomerList from './components/CustomerList';
import './App.css'; 

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2"><SalesChart /></div>
              <TopProducts />
            </div>
            <RecentOrders />
          </div>
        );
      
      case 'products':
        return (
          <InventoryStatus 
            setShowProductForm={setShowProductForm}  
            setEditingProduct={setEditingProduct}     
          />
        );
      
      case 'orders':
        return <RecentOrders fullPage />;
      
      case 'customers':
        return <CustomerList />;
        case 'categories':  // 
        return <CategoriesPage />;
        
      
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-light">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-[280px]' : 'ml-0'}`}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="p-4 lg:p-8">
          {renderContent()}
          
          {/* ⬅️ MODAL YAHAN RENDER HOGA */}
          {showProductForm && (
            <ProductForm 
              setShowProductForm={setShowProductForm}
              editingProduct={editingProduct}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;