import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Search, Shield, User as UserIcon, Calendar, ShoppingBag } from "lucide-react";
import authApi from "../../api/authApi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await authApi.getAllUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-5">
        <h1 className="text-xl sm:text-2xl font-bold text-forest dark:text-cream">Users</h1>

        <div className="relative max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-forest-light/30 bg-white dark:bg-charcoal-light text-sm text-gray-800 dark:text-cream focus:outline-none focus:ring-2 focus:ring-forest/20"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-forest"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-cream/50 font-dm text-sm">
            {search ? "No users match your search" : "No users yet"}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((u) => (
              <div
                key={u._id}
                className="bg-white dark:bg-charcoal-light rounded-2xl shadow-sm border border-gray-200 dark:border-forest-light/30 p-4 sm:p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-forest/10 dark:bg-sage/10 flex items-center justify-center shrink-0">
                    <UserIcon size={18} className="text-forest dark:text-sage" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-800 dark:text-cream truncate">{u.name}</p>
                      {u.isAdmin && (
                        <span className="shrink-0 flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-forest/10 text-forest dark:bg-sage/10 dark:text-sage">
                          <Shield size={11} /> Admin
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-cream/50 truncate">{u.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-cream/50">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    <span>Joined {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShoppingBag size={12} />
                    <span>{u.cart?.length || 0} in cart</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Users;
