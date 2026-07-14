import api from "../services/api";

const adminApi = {
  getDashboard: async () => {
    const res = await api.get("/admin/dashboard");
    return res.data;
  },

  getRecentOrders: async () => {
    const res = await api.get("/admin/recent-orders");
    return res.data;
  },

  getTopProducts: async () => {
    const res = await api.get("/admin/top-products");
    return res.data;
  },

  getLowStock: async () => {
    const res = await api.get("/admin/low-stock");
    return res.data;
  },

  getProductStats: async () => {
    const res = await api.get("/admin/product-stats");
    return res.data;
  },

  getSales: async () => {
    const res = await api.get("/admin/sales");
    return res.data;
  },
};

export default adminApi;
