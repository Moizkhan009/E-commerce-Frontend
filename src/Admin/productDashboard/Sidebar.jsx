import { ShoppingCart, Home, Package, Users, Settings } from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab }) {
  const menu = [
    { key: "home", label: "Home", icon: Home },
    { key: "products", label: "Products", icon: Package },
    { key: "customers", label: "Customers", icon: Users },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingCart className="w-8 h-8" />
          Dashboard
        </h1>
      </div>

      <nav className="flex-1 p-4">
        {menu.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
              activeTab === key
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
