export const createOrder = (orderData) => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const newOrder = {
    id: "ORD-" + Date.now(),
    items: orderData.items,
    total: orderData.total,
    status: "Placed",
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  return newOrder;
};

export const getOrderById = (id) => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  return orders.find((o) => o.id === id);
};