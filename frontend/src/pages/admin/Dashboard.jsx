import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, AlertTriangle, Package } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import DashboardStats from "../../components/admin/DashboardStats";
import adminApi from "../../api/adminApi";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [dash, orders, top, stock] = await Promise.all([
          adminApi.getDashboard(),
          adminApi.getRecentOrders(),
          adminApi.getTopProducts(),
          adminApi.getLowStock(),
        ]);
        setStats(dash);
        setRecentOrders(orders);
        setTopProducts(top);
        setLowStock(stock);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-forest"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-12 text-red-500 font-dm">{error}</div>
      </AdminLayout>
    );
  }

  const statCards = stats
    ? [
        { key: "revenue", label: "Revenue", value: `₹${(stats.revenue || 0).toLocaleString()}` },
        { key: "orders", label: "Total Orders", value: stats.orders || 0 },
        { key: "products", label: "Products", value: stats.products || 0 },
        { key: "users", label: "Users", value: stats.users || 0 },
        { key: "paidOrders", label: "Paid", value: stats.paidOrders || 0 },
        { key: "deliveredOrders", label: "Delivered", value: stats.deliveredOrders || 0 },
      ]
    : [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold text-forest dark:text-cream">Dashboard</h1>

        <DashboardStats stats={statCards} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-charcoal-light rounded-2xl shadow-sm border border-gray-200 dark:border-forest-light/30 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-forest dark:text-cream flex items-center gap-2">
                <TrendingUp size={18} className="text-sage" />
                Top Selling Products
              </h2>
            </div>
            {topProducts.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-cream/50 text-center py-6">No sales data yet</p>
            ) : (
              <div className="space-y-3">
                {topProducts.map((p, i) => (
                  <div
                    key={p.productId}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-forest-light/10 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-full bg-forest/10 dark:bg-sage/10 text-forest dark:text-sage text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-cream truncate">{p.name}</p>
                      <p className="text-xs text-gray-500 dark:text-cream/50">Sold: {p.totalSold} | ₹{p.revenue.toLocaleString()}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-forest dark:text-sage">{p.totalSold} units</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-charcoal-light rounded-2xl shadow-sm border border-gray-200 dark:border-forest-light/30 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-forest dark:text-cream flex items-center gap-2">
                <AlertTriangle size={18} className="text-amber-500" />
                Low Stock Alerts
              </h2>
              <Link
                to="/admin/products"
                className="text-xs text-sage hover:text-forest dark:hover:text-cream font-medium transition-colors"
              >
                View All
              </Link>
            </div>
            {lowStock.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-cream/50 text-center py-6">All products well stocked</p>
            ) : (
              <div className="space-y-2">
                {lowStock.map((p) => (
                  <div
                    key={p._id}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-forest-light/10 transition-colors"
                  >
                    <Package size={16} className="text-amber-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-cream truncate">{p.name}</p>
                      <p className="text-xs text-gray-500 dark:text-cream/50">{p.category}</p>
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                        p.countInStock === 0
                          ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}
                    >
                      {p.countInStock} left
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-charcoal-light rounded-2xl shadow-sm border border-gray-200 dark:border-forest-light/30 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-forest dark:text-cream">Recent Orders</h2>
            <Link
              to="/admin/orders"
              className="text-xs text-sage hover:text-forest dark:hover:text-cream font-medium transition-colors"
            >
              View All
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-cream/50 text-center py-6">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-forest-light/30">
                    <th className="text-left p-3 text-xs font-semibold text-gray-500 dark:text-cream/60">Order ID</th>
                    <th className="text-left p-3 text-xs font-semibold text-gray-500 dark:text-cream/60">Customer</th>
                    <th className="text-left p-3 text-xs font-semibold text-gray-500 dark:text-cream/60">Total</th>
                    <th className="text-left p-3 text-xs font-semibold text-gray-500 dark:text-cream/60">Paid</th>
                    <th className="text-left p-3 text-xs font-semibold text-gray-500 dark:text-cream/60">Delivered</th>
                    <th className="text-left p-3 text-xs font-semibold text-gray-500 dark:text-cream/60">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o._id} className="border-b border-gray-100 dark:border-forest-light/10 hover:bg-gray-50 dark:hover:bg-forest-light/10 transition-colors">
                      <td className="p-3 text-xs font-mono text-gray-800 dark:text-cream/80">#{o._id.slice(-8)}</td>
                      <td className="p-3 text-xs text-gray-700 dark:text-cream/70">{o.user?.name || "N/A"}</td>
                      <td className="p-3 text-xs font-medium text-gray-800 dark:text-cream">₹{o.totalPrice?.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${o.isPaid ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"}`}>
                          {o.isPaid ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${o.isDelivered ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                          {o.isDelivered ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="p-3 text-xs text-gray-500 dark:text-cream/50">{new Date(o.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
