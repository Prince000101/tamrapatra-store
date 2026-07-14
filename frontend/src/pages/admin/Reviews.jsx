import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Search, Trash2, Star } from "lucide-react";
import reviewApi from "../../api/reviewApi";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewApi.getAll();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await reviewApi.delete(id);
      await fetchReviews();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete review");
    }
  };

  const filtered = reviews.filter(
    (r) =>
      (r.user?.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (r.comment || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-5">
        <h1 className="text-xl sm:text-2xl font-bold text-forest dark:text-cream">Reviews</h1>

        <div className="relative max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search reviews..."
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
            {search ? "No reviews match your search" : "No reviews yet"}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((r) => (
              <div key={r._id} className="bg-white dark:bg-charcoal-light rounded-2xl shadow-sm border border-gray-200 dark:border-forest-light/30 p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-forest/10 dark:bg-sage/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-forest dark:text-sage">
                        {(r.user?.name || "U")[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-gray-800 dark:text-cream">{r.user?.name || "Anonymous"}</span>
                        {r.rating && (
                          <span className="flex items-center gap-0.5 text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={12} fill={i < r.rating ? "currentColor" : "none"} />
                            ))}
                          </span>
                        )}
                      </div>
                      {r.product?.name && (
                        <p className="text-xs text-gray-500 dark:text-cream/50 mt-0.5">on {r.product.name}</p>
                      )}
                      <p className="text-sm text-gray-700 dark:text-cream/80 mt-1.5">{r.comment || "No comment"}</p>
                      <p className="text-xs text-gray-400 dark:text-cream/40 mt-1">
                        {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shrink-0"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Reviews;
