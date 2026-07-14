import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Search, Eye, X, Package, MapPin, CreditCard } from "lucide-react";
import orderApi from "../../api/orderApi";
import ImageWithSkeleton from "../../components/ImageWithSkeleton";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderApi.getAll();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleDeliver = async (id) => {
    try {
      await orderApi.markDelivered(id);
      await fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update order");
    }
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      !search ||
      o._id?.toLowerCase().includes(search.toLowerCase()) ||
      o.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.user?.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "paid" && o.isPaid) ||
      (statusFilter === "unpaid" && !o.isPaid) ||
      (statusFilter === "delivered" && o.isDelivered) ||
      (statusFilter === "undelivered" && !o.isDelivered);
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-5">
        <h1 className="text-xl sm:text-2xl font-bold text-forest dark:text-cream">Orders</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-forest-light/30 bg-white dark:bg-charcoal-light text-sm text-gray-800 dark:text-cream focus:outline-none focus:ring-2 focus:ring-forest/20"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 dark:border-forest-light/30 bg-white dark:bg-charcoal-light text-sm text-gray-800 dark:text-cream focus:outline-none focus:ring-2 focus:ring-forest/20"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="delivered">Delivered</option>
            <option value="undelivered">Not Delivered</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-forest"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-cream/50 font-dm text-sm">No orders found</div>
        ) : (
          <div className="overflow-x-auto rounded-2xl bg-white dark:bg-charcoal-light shadow-sm border border-gray-200 dark:border-forest-light/30">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-forest-light/30 bg-gray-50 dark:bg-charcoal-dark">
                  {["Order ID", "Customer", "Items", "Total", "Paid", "Delivered", "Date", ""].map((h) => (
                    <th key={h} className="text-left p-3 text-xs font-semibold text-gray-500 dark:text-cream/60">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o._id} className="border-b border-gray-100 dark:border-forest-light/10 hover:bg-gray-50 dark:hover:bg-forest-light/10 transition-colors">
                    <td className="p-3 text-xs font-mono text-gray-800 dark:text-cream/80">#{o._id?.slice(-8)}</td>
                    <td className="p-3">
                      <div className="text-xs text-gray-800 dark:text-cream">{o.user?.name || "N/A"}</div>
                      <div className="text-xs text-gray-500 dark:text-cream/50">{o.user?.email}</div>
                    </td>
                    <td className="p-3 text-xs text-gray-600 dark:text-cream/60">{o.orderItems?.length || 0} items</td>
                    <td className="p-3 text-xs font-medium text-forest dark:text-sage">₹{o.totalPrice?.toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        o.isPaid
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}>{o.isPaid ? "Paid" : "Unpaid"}</span>
                    </td>
                    <td className="p-3">
                      {o.isDelivered ? (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Delivered</span>
                      ) : (
                        <button
                          onClick={() => handleDeliver(o._id)}
                          className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-forest hover:text-cream dark:hover:bg-forest dark:hover:text-cream transition-colors"
                        >
                          Mark Done
                        </button>
                      )}
                    </td>
                    <td className="p-3 text-xs text-gray-500 dark:text-cream/50">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">
                      <button
                        onClick={() => setSelected(o)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-forest hover:bg-forest/10 dark:hover:text-sage dark:hover:bg-sage/10 transition-colors"
                        title="View Details"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white dark:bg-charcoal-light rounded-2xl shadow-xl w-full max-w-2xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-forest dark:text-cream">Order #{selected._id?.slice(-8)}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-cream p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-forest-light/20 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-charcoal-dark">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-gray-400" />
                  <span className="text-xs font-semibold text-gray-500 dark:text-cream/60">Shipping Address</span>
                </div>
                <p className="text-sm text-gray-800 dark:text-cream">{selected.shippingAddress?.address}</p>
                <p className="text-xs text-gray-500 dark:text-cream/50">
                  {selected.shippingAddress?.city}, {selected.shippingAddress?.postalCode}
                </p>
                <p className="text-xs text-gray-500 dark:text-cream/50">{selected.shippingAddress?.country}</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-charcoal-dark">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard size={14} className="text-gray-400" />
                  <span className="text-xs font-semibold text-gray-500 dark:text-cream/60">Payment</span>
                </div>
                <p className="text-sm text-gray-800 dark:text-cream">{selected.paymentMethod || "N/A"}</p>
                <p className="text-xs text-gray-500 dark:text-cream/50">
                  {selected.isPaid ? `Paid${selected.paidAt ? " on " + new Date(selected.paidAt).toLocaleDateString() : ""}` : "Not paid"}
                </p>
                <p className="text-xs text-gray-500 dark:text-cream/50">
                  {selected.isDelivered ? `Delivered${selected.deliveredAt ? " on " + new Date(selected.deliveredAt).toLocaleDateString() : ""}` : "Not delivered"}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Package size={14} className="text-gray-400" />
                <span className="text-xs font-semibold text-gray-500 dark:text-cream/60">Order Items ({selected.orderItems?.length})</span>
              </div>
              <div className="space-y-2">
                {selected.orderItems?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-charcoal-dark">
                    <ImageWithSkeleton
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-cream truncate">{item.name}</p>
                      <p className="text-xs text-gray-500 dark:text-cream/50">Qty: {item.qty} × ₹{item.price}</p>
                    </div>
                    <p className="text-sm font-medium text-forest dark:text-sage shrink-0">₹{(item.qty * item.price).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-forest-light/30 pt-3 flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-600 dark:text-cream/70">Total</span>
              <span className="text-lg font-bold text-forest dark:text-sage">₹{selected.totalPrice?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Orders;
