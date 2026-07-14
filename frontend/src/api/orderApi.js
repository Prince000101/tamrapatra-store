import api from "../services/api";

const orderApi = {
  getAll: async () => {
    const res = await api.get("/orders/admin");
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/orders/${id}`);
    return res.data;
  },
  markDelivered: async (id) => {
    const res = await api.put(`/orders/${id}/deliver`);
    return res.data;
  },
};

export default orderApi;
