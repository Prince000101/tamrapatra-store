import { useState } from "react";
import { useCart } from "../hook/CartHook";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ShieldCheck, Truck, Leaf } from "lucide-react";
import SEO from "../components/SEO";

function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", city: "", pincode: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill required fields"); return false;
    }
    if (cart.length === 0) { toast.error("Cart is empty"); return false; }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    let token = localStorage.getItem("token");
    if (token && token.startsWith('"') && token.endsWith('"')) token = token.slice(1, -1);
    if (!token || token === "undefined" || token === "null") {
      toast.error("You must be logged in to place an order!");
      navigate("/login"); return;
    }
    setLoading(true);
    try {
      const orderItems = cart.map((item) => ({
        product: item._id, name: item.name, price: item.price, qty: item.qty, image: item.image || "",
      }));
      const { data } = await axios.post("/api/orders", {
        orderItems,
        shippingAddress: {
          name: formData.name, phone: formData.phone, address: formData.address,
          city: formData.city, postalCode: formData.pincode, country: "India",
        },
        paymentMethod: "COD", totalPrice,
      }, { headers: { Authorization: `Bearer ${token}` } });
      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/track-order?id=${data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.meswarm-grey || "Order processing failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 py-12 sm:py-16 md:px-14 lg:px-24 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <SEO
          title="Checkout"
          description="Complete your purchase of authentic Tamrapatra handicrafts. Secure checkout with free shipping on orders over ₹500."
          keywords="Tamrapatra checkout, secure payment, handicrafts order"
          url="https://tamrapatra.com/checkout"
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading text-indigo dark:text-ivory mb-8 sm:mb-10">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-10">
          {/* FORM */}
          <div className="lg:col-span-2 bg-white dark:bg-plum-light rounded-[20px] sm:rounded-[28px] p-5 sm:p-6 md:p-8 shadow-sm border border-gold/20 dark:border-indigo-light/30">
            <h2 className="text-xl sm:text-2xl font-heading text-indigo dark:text-ivory mb-4 sm:mb-6">Shipping Details</h2>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <input name="name" placeholder="Full Name" onChange={handleChange} className="rounded-xl sm:rounded-2xl border border-gold/30 dark:border-indigo-light/30 bg-transparent px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none text-indigo dark:text-ivory font-body transition focus:border-indigo" />
              <input name="email" placeholder="Email" onChange={handleChange} className="rounded-xl sm:rounded-2xl border border-gold/30 dark:border-indigo-light/30 bg-transparent px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none text-indigo dark:text-ivory font-body transition focus:border-indigo" />
              <input name="phone" placeholder="Phone Number" onChange={handleChange} className="rounded-xl sm:rounded-2xl border border-gold/30 dark:border-indigo-light/30 bg-transparent px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none text-indigo dark:text-ivory font-body transition focus:border-indigo" />
              <input name="city" placeholder="City" onChange={handleChange} className="rounded-xl sm:rounded-2xl border border-gold/30 dark:border-indigo-light/30 bg-transparent px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none text-indigo dark:text-ivory font-body transition focus:border-indigo" />
              <input name="pincode" placeholder="Pincode" onChange={handleChange} className="rounded-xl sm:rounded-2xl border border-gold/30 dark:border-indigo-light/30 bg-transparent px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none text-indigo dark:text-ivory font-body transition focus:border-indigo" />
              <textarea name="address" placeholder="Full Address" rows="3" onChange={handleChange} className="sm:col-span-2 rounded-xl sm:rounded-2xl border border-gold/30 dark:border-indigo-light/30 bg-transparent px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none text-indigo dark:text-ivory font-body transition focus:border-indigo" />
            </div>
          </div>

          {/* SUMMARY */}
          <div className="bg-white dark:bg-plum-light rounded-[20px] sm:rounded-[28px] p-5 sm:p-6 md:p-8 shadow-sm border border-gold/20 dark:border-indigo-light/30 h-fit sticky top-24">
            <h2 className="text-xl sm:text-2xl font-heading text-indigo dark:text-ivory mb-4 sm:mb-6">Order Summary</h2>
            <div className="space-y-3 sm:space-y-4 font-body">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between text-xs sm:text-sm text-indigo dark:text-ivory/70">
                  <span className="truncate pr-2">{item.name} × {item.qty}</span>
                  <span className="text-indigo dark:text-ivory shrink-0">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm font-body text-indigo dark:text-ivory/70">
              <div className="flex justify-between"><span className="flex items-center gap-2"><Truck size={14} /> Shipping</span><span className="text-indigo font-semibold">FREE</span></div>
              <div className="flex justify-between items-center"><span className="flex items-center gap-2"><ShieldCheck size={14} /> Secure</span><Leaf size={14} className="text-indigo" /></div>
            </div>
            <div className="border-t border-gold/20 dark:border-indigo-light/30 mt-4 sm:mt-6 pt-4 sm:pt-6">
              <div className="flex justify-between text-base sm:text-lg font-bold text-indigo dark:text-ivory">
                <span>Total</span>
                <span className="text-indigo dark:text-warm-grey">₹{totalPrice}</span>
              </div>
              <button onClick={handlePlaceOrder} disabled={loading} className="w-full mt-4 sm:mt-6 rounded-full bg-indigo py-3.5 sm:py-4 text-sm sm:text-base text-ivory font-body font-bold transition hover:bg-indigo-light disabled:opacity-50">
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
