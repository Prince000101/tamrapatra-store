import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Plus, Edit2, Trash2, Search, X, Heart, ShoppingCart } from "lucide-react";
import productApi from "../../api/productapi";
import adminApi from "../../api/adminApi";
import ImageWithSkeleton from "../../components/ImageWithSkeleton";

const emptyForm = {
  name: "",
  price: "",
  category: "",
  description: "",
  image: "",
  countInStock: "",
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState("list"); // "list" or "stats"

  const fetchProducts = async () => {
    try {
      const [productData, statsData] = await Promise.all([
        productApi.getAll(),
        adminApi.getProductStats().catch(() => []),
      ]);
      setProducts(Array.isArray(productData) ? productData : []);
      setStats(Array.isArray(statsData) ? statsData : []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setForm({
      name: product.name || "",
      price: product.price?.toString() || "",
      category: product.category || "",
      description: product.description || "",
      image: product.image || "",
      countInStock: product.countInStock?.toString() || "",
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        countInStock: Number(form.countInStock),
      };
      if (editing) {
        await productApi.update(editing._id, payload);
      } else {
        await productApi.create(payload);
      }
      setModalOpen(false);
      await fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await productApi.delete(id);
      await fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-forest dark:text-cream">Products</h1>
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 dark:bg-charcoal-dark rounded-xl p-0.5">
              <button
                onClick={() => setView("list")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${view === "list" ? "bg-white dark:bg-charcoal-light text-forest dark:text-cream shadow-sm" : "text-gray-500 dark:text-cream/50 hover:text-forest dark:hover:text-cream"}`}
              >
                List
              </button>
              <button
                onClick={() => setView("stats")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${view === "stats" ? "bg-white dark:bg-charcoal-light text-forest dark:text-cream shadow-sm" : "text-gray-500 dark:text-cream/50 hover:text-forest dark:hover:text-cream"}`}
              >
                Analytics
              </button>
            </div>
            {view === "list" && (
              <button
                onClick={openAdd}
                className="flex items-center gap-2 bg-forest text-cream px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-forest-light transition-all w-fit"
              >
                <Plus size={18} /> Add Product
              </button>
            )}
          </div>
        </div>

        {view === "list" && (
          <div className="relative max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-forest-light/30 bg-white dark:bg-charcoal-light text-sm text-gray-800 dark:text-cream focus:outline-none focus:ring-2 focus:ring-forest/20"
            />
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-forest"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-cream/50 font-dm text-sm">
            {search ? "No products match your search" : "No products yet. Add your first product!"}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl bg-white dark:bg-charcoal-light shadow-sm border border-gray-200 dark:border-forest-light/30">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-forest-light/30 bg-gray-50 dark:bg-charcoal-dark">
                  {["Image", "Name", "Category", "Price", "Stock", "Actions"].map((h) => (
                    <th key={h} className="text-left p-3 text-xs font-semibold text-gray-500 dark:text-cream/60">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p._id} className="border-b border-gray-100 dark:border-forest-light/10 hover:bg-gray-50 dark:hover:bg-forest-light/10 transition-colors">
                    <td className="p-3">
                      <ImageWithSkeleton
                        src={p.image || "/placeholder.png"}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg"
                      />
                    </td>
                    <td className="p-3 font-medium text-gray-800 dark:text-cream">{p.name}</td>
                    <td className="p-3 text-gray-500 dark:text-cream/60">{p.category}</td>
                    <td className="p-3 font-medium text-forest dark:text-sage">₹{p.price?.toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        p.countInStock > 10
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : p.countInStock > 0
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}>
                        {p.countInStock}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-forest hover:bg-forest/10 dark:hover:text-sage dark:hover:bg-sage/10 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id, p.name)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {view === "stats" && !loading && (
        <div className="space-y-4">
          {stats.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-cream/50 font-dm text-sm">No analytics data yet</div>
          ) : (
            <div className="overflow-x-auto rounded-2xl bg-white dark:bg-charcoal-light shadow-sm border border-gray-200 dark:border-forest-light/30">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-forest-light/30 bg-gray-50 dark:bg-charcoal-dark">
                    {["Product", "Price", "Stock", "In Cart", "Wishlisted", "Total Interest"].map((h) => (
                      <th key={h} className="text-left p-3 text-xs font-semibold text-gray-500 dark:text-cream/60">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats
                    .filter((s) => !search || s.name?.toLowerCase().includes(search.toLowerCase()))
                    .sort((a, b) => (b.inCart + b.inWishlist) - (a.inCart + a.inWishlist))
                    .map((s) => {
                      const totalInterest = s.inCart + s.inWishlist;
                      return (
                        <tr key={s._id} className="border-b border-gray-100 dark:border-forest-light/10 hover:bg-gray-50 dark:hover:bg-forest-light/10 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <ImageWithSkeleton src={s.image || "/placeholder.png"} alt={s.name} className="w-8 h-8 rounded-lg" />
                              <span className="font-medium text-gray-800 dark:text-cream truncate max-w-[200px]">{s.name}</span>
                            </div>
                          </td>
                          <td className="p-3 font-medium text-forest dark:text-sage">₹{s.price?.toLocaleString()}</td>
                          <td className="p-3">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              s.countInStock > 10
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : s.countInStock > 0
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}>{s.countInStock}</span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1.5">
                              <ShoppingCart size={13} className="text-blue-500" />
                              <span className="text-sm font-medium text-gray-800 dark:text-cream">{s.inCart}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1.5">
                              <Heart size={13} className="text-red-500" />
                              <span className="text-sm font-medium text-gray-800 dark:text-cream">{s.inWishlist}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="h-2 rounded-full bg-gray-200 dark:bg-forest-light/20 w-20 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-forest dark:bg-sage transition-all"
                                  style={{ width: `${Math.min((totalInterest / Math.max(...stats.map((x) => x.inCart + x.inWishlist))) * 100, 100)}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium text-gray-600 dark:text-cream/70">{totalInterest}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-charcoal-light rounded-2xl shadow-xl w-full max-w-lg p-5 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-forest dark:text-cream">
                {editing ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-cream p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-forest-light/20 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-cream/60 mb-1">Product Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Ashwagandha Powder"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-forest-light/30 bg-white dark:bg-charcoal-dark text-sm text-gray-800 dark:text-cream focus:outline-none focus:ring-2 focus:ring-forest/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-cream/60 mb-1">Price (₹)</label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={handleChange}
                    required
                    placeholder="299"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-forest-light/30 bg-white dark:bg-charcoal-dark text-sm text-gray-800 dark:text-cream focus:outline-none focus:ring-2 focus:ring-forest/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-cream/60 mb-1">Stock</label>
                  <input
                    name="countInStock"
                    type="number"
                    min="0"
                    value={form.countInStock}
                    onChange={handleChange}
                    required
                    placeholder="50"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-forest-light/30 bg-white dark:bg-charcoal-dark text-sm text-gray-800 dark:text-cream focus:outline-none focus:ring-2 focus:ring-forest/20"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-cream/60 mb-1">Category</label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Brass Decor"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-forest-light/30 bg-white dark:bg-charcoal-dark text-sm text-gray-800 dark:text-cream focus:outline-none focus:ring-2 focus:ring-forest/20"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-cream/60 mb-1">Image URL</label>
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-forest-light/30 bg-white dark:bg-charcoal-dark text-sm text-gray-800 dark:text-cream focus:outline-none focus:ring-2 focus:ring-forest/20"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-cream/60 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Product description..."
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-forest-light/30 bg-white dark:bg-charcoal-dark text-sm text-gray-800 dark:text-cream focus:outline-none focus:ring-2 focus:ring-forest/20 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-forest-light/30 text-sm font-medium text-gray-600 dark:text-cream/70 hover:bg-gray-50 dark:hover:bg-forest-light/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-forest text-cream text-sm font-medium hover:bg-forest-light transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : editing ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Products;
