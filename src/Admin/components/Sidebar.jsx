import React from 'react';
import { Home, Package, Grid, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, activeItem, setActiveItem }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Grid }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">A</div>
        <div className="brand-name">AdminPro</div>
        <button 
          className="toggle-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <div className="menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => setActiveItem(item.id)}
            >
              <Icon className="menu-icon" />
              <span className="menu-label">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;