import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Plus, Trash2, X } from "lucide-react";
import couponApi from "../../api/couponApi";

const emptyForm = { code: "", discount: "" };

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const data = await couponApi.getAll();
      setCoupons(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch coupons:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCoupons(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await couponApi.create({ ...form, discount: Number(form.discount) });
      setModalOpen(false);
      setForm(emptyForm);
      await fetchCoupons();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create coupon");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, code) => {
    if (!window.confirm(`Delete coupon "${code}"?`)) return;
    try {
      await couponApi.delete(id);
      await fetchCoupons();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete coupon");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-forest dark:text-cream">Coupons</h1>
          <button
            onClick={() => { setForm(emptyForm); setModalOpen(true); }}
            className="flex items-center gap-2 bg-forest text-cream px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-forest-light transition-all"
          >
            <Plus size={18} /> Add Coupon
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-forest"></div>
          </div>
        ) : coupons.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-cream/50 font-dm text-sm">No coupons yet</div>
        ) : (
          <div className="overflow-x-auto rounded-2xl bg-white dark:bg-charcoal-light shadow-sm border border-gray-200 dark:border-forest-light/30">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-forest-light/30 bg-gray-50 dark:bg-charcoal-dark">
                  {["Code", "Discount", "Created", ""].map((h) => (
                    <th key={h} className="text-left p-3 text-xs font-semibold text-gray-500 dark:text-cream/60">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {coupons.map((c) => (
                  <tr key={c._id} className="border-b border-gray-100 dark:border-forest-light/10 hover:bg-gray-50 dark:hover:bg-forest-light/10 transition-colors">
                    <td className="p-3">
                      <span className="font-mono text-sm font-bold text-forest dark:text-sage uppercase">{c.code}</span>
                    </td>
                    <td className="p-3 text-sm font-medium text-gray-800 dark:text-cream">{c.discount}%</td>
                    <td className="p-3 text-xs text-gray-500 dark:text-cream/50">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A"}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(c._id, c.code)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-charcoal-light rounded-2xl shadow-xl w-full max-w-md p-5 sm:p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-forest dark:text-cream">Add Coupon</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-cream p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-forest-light/20 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-cream/60 mb-1">Coupon Code</label>
                <input
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  required
                  placeholder="e.g. SUMMER20"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-forest-light/30 bg-white dark:bg-charcoal-dark text-sm text-gray-800 dark:text-cream focus:outline-none focus:ring-2 focus:ring-forest/20 uppercase"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-cream/60 mb-1">Discount (%)</label>
                <input
                  name="discount"
                  type="number"
                  min="1"
                  max="100"
                  value={form.discount}
                  onChange={handleChange}
                  required
                  placeholder="20"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-forest-light/30 bg-white dark:bg-charcoal-dark text-sm text-gray-800 dark:text-cream focus:outline-none focus:ring-2 focus:ring-forest/20"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-forest-light/30 text-sm font-medium text-gray-600 dark:text-cream/70 hover:bg-gray-50 dark:hover:bg-forest-light/10 transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 rounded-xl bg-forest text-cream text-sm font-medium hover:bg-forest-light transition-colors disabled:opacity-50">
                  {saving ? "Saving..." : "Add Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Coupons;
