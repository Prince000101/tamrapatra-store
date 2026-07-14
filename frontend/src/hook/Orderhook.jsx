/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from "react";
import axios from "axios";
import useAuth from "../hook/AuthContextHook";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { userInfo } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get token from AuthContext or localStorage
  const token = userInfo?.token || localStorage.getItem("token");

  // ==========================
  // PLACE ORDER
  // ==========================
  const placeOrder = async (orderData) => {
    if (!token) {
      return {
        success: false,
        message: "Please login first.",
      };
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "/api/orders",
        orderData,
        config
      );

      setOrders((prev) => [...prev, data.order || data]);

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error("Place Order Error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to place order.",
      };
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // GET MY ORDERS
  // ==========================
  const getMyOrders = async () => {
    if (!token) return;

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        "/api/orders/myorders",
        config
      );

      setOrders(data);
    } catch (error) {
      console.error("Fetch Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        placeOrder,
        getMyOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrder must be used within an OrderProvider"
    );
  }

  return context;
};