import { createContext, useContext, useEffect, useState } from "react";

// 1. CREATE CONTEXT
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

// 2. PROVIDER
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("tamrapatraCart");
    return saved ? JSON.parse(saved) : [];
  });

  // 💾 sync with localStorage
  useEffect(() => {
    localStorage.setItem("tamrapatraCart", JSON.stringify(cart));
  }, [cart]);

  // =====================
  // ADD TO CART
  // =====================
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((i) => i._id === product._id);

      if (exist) {
        return prev.map((i) =>
          i._id === product._id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // =====================
  // INCREASE QTY
  // =====================
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((i) =>
        i._id === id ? { ...i, qty: i.qty + 1 } : i
      )
    );
  };

  // =====================
  // DECREASE QTY
  // =====================
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((i) =>
        i._id === id
          ? { ...i, qty: i.qty > 1 ? i.qty - 1 : 1 }
          : i
      )
    );
  };

  // =====================
  // REMOVE ITEM
  // =====================
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  // =====================
  // CLEAR CART
  // =====================
  const clearCart = () => {
    setCart([]);
  };

  // =====================
  // TOTAL PRICE
  // =====================
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 3. CUSTOM HOOK
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};