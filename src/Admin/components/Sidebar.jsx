// // import React from 'react';
// // import { Home, Package, Grid, ChevronLeft, ChevronRight, LogOut, Type } from 'lucide-react';
// // import { icon } from 'leaflet';
// // import { useNavigate } from "react-router-dom";





// // const navigate = useNavigate();
// // const handleLogout = () => {
// //   localStorage.removeItem("userInfo");
// //   setIsAuth(false);
// //   setIsSidebarOpen(false);
// //   navigate("/login");
// // };
// // const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, activeItem, setActiveItem,setIsAuth,navigate }) => {
// //   const menuItems = [
// //     { id: 'home', label: 'Home', icon: Home },
// //     { id: 'products', label: 'Products', icon: Package },
// //     { id: 'categories', label: 'Categories', icon: Grid },
// //     { id: 'logout', label: 'Log Out', icon: LogOut ,},
// //   ];

// //   return (
// //     <div className="sidebar">
// //       <div className="sidebar-header">
// //         <div className="logo">A</div>
// //         <div className="brand-name">AdminPro</div>
// //         <button 
// //           className="toggle-btn"
// //           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// //         >
// //           {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
// //         </button>
// //       </div>

// //       <div className="menu">
// //         {menuItems.map((item) => {
// //           const Icon = item.icon;
// //           return (
// //             <div
// //               key={item.id}
// //               className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
// //               onClick={() => setActiveItem(item.id)
// //               // onClick={() => {
// //               //   if (item.id === 'logout') {
// //               //     handleLogout();  
                

// // }
// //             >
// //               <Icon className="menu-icon" />
// //               <span className="menu-label">{item.label}</span>
// //             </div>
// //           );
       
       
       
       
// //        })}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;
// import React from 'react';
// import {
//   Home,
//   Package,
//   Grid,
//   ChevronLeft,
//   ChevronRight,
//   LogOut
// } from 'lucide-react';

// import { useNavigate } from "react-router-dom";

// const Sidebar = ({
//   isSidebarOpen,
//   setIsSidebarOpen,
//   activeItem,
//   setActiveItem,
//   setIsAuth
// }) => {
// const navigate = useNavigate();

// const handleLogout = () => {
//     localStorage.removeItem("userInfo");

//     setIsAuth(false);

//     setIsSidebarOpen(false);

//     navigate("/");
//     window.location.reload();
//   };

//   const menuItems = [
//     { id: 'home', label: 'Home', icon: Home },
//     { id: 'products', label: 'Products', icon: Package },
//     { id: 'categories', label: 'Categories', icon: Grid },
//     { id: 'logout', label: 'Log Out', icon: LogOut },
//   ];

//   return (
//     <div className="sidebar">

//       <div className="sidebar-header">
//         <div className="logo">A</div>

//         <div className="brand-name">
//           AdminPro
//         </div>

//         <button
//           className="toggle-btn"
//           onClick={() =>
//             setIsSidebarOpen(!isSidebarOpen)
//           }
//         >
//           {isSidebarOpen
//             ? <ChevronLeft size={18} />
//             : <ChevronRight size={18} />
//           }
//         </button>
//       </div>

//       <div className="menu">

//         {menuItems.map((item) => {

//           const Icon = item.icon;

//           return (
//             <div
//               key={item.id}
//               className={`menu-item ${
//                 activeItem === item.id
//                   ? 'active'
//                   : ''
//               }`}

//               onClick={() => {

//                 setActiveItem(item.id);

//                 if (item.id === "logout") {
//                   handleLogout();
//                   console.log("Logout clicked");
//                 }
//               }}
//             >

//               <Icon className="menu-icon" />

//               <span className="menu-label">
//                 {item.label}
//               </span>

//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
// import React from 'react';
// import {
//   Home,
//   Package,
//   LayoutGrid,
//   ChevronLeft,
//   ChevronRight,
//   LogOut,
//   Settings,
//   Bell,
//   Search
// } from 'lucide-react';
// import { useNavigate } from "react-router-dom";

// const Sidebar = ({
//   isSidebarOpen,
//   setIsSidebarOpen,
//   activeItem,
//   setActiveItem,
//   setIsAuth
// }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("userInfo");
//     setIsAuth(false);
//     setIsSidebarOpen(false);
//     navigate("/");
//     window.location.reload();
//   };

//   const menuItems = [
//     { id: 'home', label: 'Dashboard', icon: Home },
//     { id: 'products', label: 'Products', icon: Package },
//     { id: 'categories', label: 'Categories', icon: LayoutGrid },
//   ];

//   const bottomItems = [
//     { id: 'settings', label: 'Settings', icon: Settings },
//     { id: 'logout', label: 'Log Out', icon: LogOut },
//   ];

//   return (
//     <div className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
//       <div className="sidebar-header">
//         <div className="logo-container">
//           <div className="logo">A</div>
//           {isSidebarOpen && <div className="brand-name">AdminPro</div>}
//         </div>
//         <button 
//           className="toggle-btn"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         >
//           {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
//         </button>
//       </div>

//       <div className="sidebar-search">
//         <Search size={16} />
//         {isSidebarOpen && <input type="text" placeholder="Search..." />}
//       </div>

//       <div className="menu-section">
//         <span className={`menu-section-title ${!isSidebarOpen ? 'hidden' : ''}`}>MAIN MENU</span>
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = activeItem === item.id;
//           return (
//             <div
//               key={item.id}
//               className={`menu-item ${isActive ? 'active' : ''}`}
//               onClick={() => setActiveItem(item.id)}
//             >
//               <div className="menu-icon-wrapper">
//                 <Icon size={20} />
//               </div>
//               {isSidebarOpen && <span className="menu-label">{item.label}</span>}
//               {isActive && isSidebarOpen && <div className="active-indicator"></div>}
//             </div>
//           );
//         })}
//       </div>

//       <div className="sidebar-divider"></div>

//       <div className="menu-section">
//         <span className={`menu-section-title ${!isSidebarOpen ? 'hidden' : ''}`}>SYSTEM</span>
//         {bottomItems.map((item) => {
//           const Icon = item.icon;
//           return (
//             <div
//               key={item.id}
//               className={`menu-item ${item.id === 'logout' ? 'logout-item' : ''}`}
//               onClick={() => {
//                 if (item.id === "logout") {
//                   handleLogout();
//                 } else {
//                   setActiveItem(item.id);
//                 }
//               }}
//             >
//               <div className="menu-icon-wrapper">
//                 <Icon size={20} />
//               </div>
//               {isSidebarOpen && <span className="menu-label">{item.label}</span>}
//             </div>
//           );
//         })}
//       </div>

//       {isSidebarOpen && (
//         <div className="sidebar-footer">
//           <div className="user-profile">
//             <div className="user-avatar">AD</div>
//             <div className="user-info">
//               <span className="user-name">Admin User</span>
//               <span className="user-role">Super Admin</span>
//             </div>
//             <Bell size={16} className="notification-icon" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;
// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    {
      section: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'orders', label: 'Orders', icon: '📦', badge: '12' },
        { id: 'products', label: 'Products', icon: '🛍️' },
        { id: 'categories', label: 'Categories', icon: '📂' },
        { id: 'customers', label: 'Customers', icon: '👥' },
      ]
    },
    {
      section: 'Analytics',
      items: [
        { id: 'analytics', label: 'Sales Analytics', icon: '📈' },
        { id: 'inventory', label: 'Inventory', icon: '📋' },
        { id: 'reports', label: 'Reports', icon: '📄' },
      ]
    },
    {
      section: 'Settings',
      items: [
        { id: 'settings', label: 'Settings', icon: '⚙️' },
        { id: 'help', label: 'Help Center', icon: '❓' },
      ]
    }
  ];

  return (
    <aside className={`sidebar ${!sidebarOpen ? 'closed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-icon">🥬</div>
        <div className="logo-text">Nest<span>Admin</span></div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((section, idx) => (
          <div key={idx} className="nav-section">
            <div className="nav-section-title">{section.section}</div>
            {section.items.map(item => (
              <div
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">👨‍💼</div>
          <div className="user-info">
            <h4>Admin User</h4>
            <p>Store Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;