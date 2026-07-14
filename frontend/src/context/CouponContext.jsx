import { createContext, useContext, useState } from "react";

const CouponContext = createContext();

export function CouponProvider({ children }) {
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");

  /* =========================================
     AVAILABLE COUPONS (EASILY SCALABLE)
  ========================================= */
  const coupons = {
    CRAFT10: 10,
    CRAFT20: 20,
  };

  /* =========================================
     APPLY COUPON
  ========================================= */
  const applyCoupon = (code) => {
    const formatted = code.trim().toUpperCase();

    if (!formatted) return "Please enter a coupon code";

    const discountValue = coupons[formatted];

    if (!discountValue) {
      setDiscount(0);
      setCouponCode("");
      return "Invalid Coupon ❌";
    }

    setDiscount(discountValue);
    setCouponCode(formatted);

    return `${discountValue}% Discount Applied 🎉`;
  };

  /* =========================================
     REMOVE COUPON
  ========================================= */
  const removeCoupon = () => {
    setDiscount(0);
    setCouponCode("");
  };

  return (
    <CouponContext.Provider
      value={{
        discount,
        couponCode,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
}

/* =========================================
   CUSTOM HOOK
========================================= */
// eslint-disable-next-line react-refresh/only-export-components
export const useCoupon = () => useContext(CouponContext);