import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 transition-colors duration-500">
      <div className="bg-white dark:bg-plum-light rounded-[20px] sm:rounded-[28px] shadow-sm border border-gold/20 dark:border-indigo-light/30 p-6 sm:p-8 md:p-10 text-center max-w-lg mx-auto">
        <SEO
          title="Order Confirmed"
          description="Your Tamrapatra order has been placed successfully. Thank you for choosing authentic Indian handicrafts."
          keywords="Tamrapatra order confirmed, order placed, handicraft order"
          url="https://tamrapatra.com/order-success"
        />
        <CheckCircle size={64} className="mx-auto text-indigo" strokeWidth={1.5} />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading text-indigo dark:text-ivory mt-4 sm:mt-6">Order Placed Successfully</h1>
        <p className="text-sm sm:text-base text-indigo dark:text-ivory/60 font-body mt-3 sm:mt-4">Thank you for shopping with Tamrapatra.</p>
        <Link to="/products" className="inline-block mt-6 sm:mt-8 rounded-full bg-indigo px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base text-ivory font-body font-semibold transition hover:bg-indigo-light">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
