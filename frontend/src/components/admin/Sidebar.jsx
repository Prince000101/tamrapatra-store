import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users, Tag, Star, Menu, X, Leaf } from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
  { name: "Products", path: "/admin/products", icon: <Package size={18} /> },
  { name: "Orders", path: "/admin/orders", icon: <ShoppingCart size={18} /> },
  { name: "Users", path: "/admin/users", icon: <Users size={18} /> },
  { name: "Coupons", path: "/admin/coupons", icon: <Tag size={18} /> },
  { name: "Reviews", path: "/admin/reviews", icon: <Star size={18} /> },
];

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <button
        className="lg:hidden fixed top-3 left-3 z-50 rounded-xl bg-indigo p-2.5 text-ivory shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen
        w-64 bg-indigo text-ivory flex flex-col shrink-0
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="flex items-center gap-2.5 p-5 border-b border-ivory/10">
          <Leaf size={24} strokeWidth={1.5} />
          <span className="text-lg font-heading font-semibold">Tamrapatra Admin</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-5 py-3 mx-2 rounded-xl text-sm font-body font-medium transition-all ${
                  isActive
                    ? "bg-ivory/15 text-ivory"
                    : "text-ivory/80 hover:bg-ivory/10 hover:text-ivory"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
