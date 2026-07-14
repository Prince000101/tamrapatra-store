import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  ShoppingCart,
  Star,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  Leaf,
  BadgeCheck,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// 🔥 FIXED: Updated import path to target the correct hook file
import { useCart } from "../hook/CartHook";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-toastify";

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
}) {
  const [qty, setQty] = useState(1);

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  useEffect(() => {
    if (isOpen) 
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQty(1);
  
},[isOpen]);

  if (!isOpen || !product) return null;

  const increase = () => setQty((prev) => prev + 1);

  const decrease = () => {
    if (qty > 1) setQty((prev) => prev - 1);
  };

  const handleAddCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }

    toast.success(`${qty} item(s) added to cart 🌿`);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-ivory shadow-2xl dark:bg-plum"
        >
          <button
            onClick={onClose}
            className="fixed right-3 top-3 sm:absolute sm:right-5 sm:top-5 z-50 rounded-full bg-ivory dark:bg-plum-light p-2.5 sm:p-3 shadow-lg transition hover:rotate-90 text-indigo dark:text-ivory"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col lg:grid lg:grid-cols-[45%_55%]">

            <div className="bg-gold/20 dark:bg-plum-light p-6 sm:p-10 flex items-center justify-center max-lg:max-h-64 sm:max-lg:max-h-80">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: .3 }}
                src={product.image}
                alt={product.name}
                className="max-h-48 sm:max-h-64 lg:max-h-[500px] rounded-2xl lg:rounded-3xl shadow-2xl object-contain"
              />
            </div>

            <div className="p-5 sm:p-8 lg:p-10 overflow-y-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo/10 dark:bg-indigo-light/30 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-indigo dark:text-warm-grey font-body">
                <BadgeCheck size={14} className="hidden sm:block" />
                In Stock
              </span>

              <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl lg:text-5xl font-heading font-bold leading-tight text-indigo dark:text-ivory">
                {product.name}
              </h2>

              <div className="mt-3 sm:mt-5 flex items-center gap-1.5 sm:gap-2">
                {[1,2,3,4,5].map((star)=>(
                  <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-warm-grey font-body">
                  (5.0 • 126 Reviews)
                </span>
              </div>

              <div className="mt-5 sm:mt-8 flex items-center gap-3 sm:gap-4 flex-wrap">
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-indigo dark:text-warm-grey">
                  ₹{product.price}
                </h2>
                <span className="text-lg sm:text-xl lg:text-2xl text-gold-dark line-through">
                  ₹{Math.round(product.price * 1.25)}
                </span>
                <span className="rounded-full bg-red-100 px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-bold text-red-600">
                  25% OFF
                </span>
              </div>

              <p className="mt-5 sm:mt-8 leading-7 sm:leading-8 text-sm sm:text-base text-warm-grey dark:text-ivory/70 font-body">
                {product.description}
              </p>

              <div className="mt-5 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
                <span className="rounded-full bg-indigo/10 dark:bg-indigo-light/30 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-body font-medium text-indigo dark:text-warm-grey">
                  🌿 Organic
                </span>
                <span className="rounded-full bg-indigo/10 dark:bg-indigo-light/30 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-body font-medium text-indigo dark:text-warm-grey">
                  Vegan
                </span>
                <span className="rounded-full bg-indigo/10 dark:bg-indigo-light/30 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-body font-medium text-indigo dark:text-warm-grey">
                  Non GMO
                </span>
                <span className="rounded-full bg-indigo/10 dark:bg-indigo-light/30 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-body font-medium text-indigo dark:text-warm-grey">
                  Handcrafted
                </span>
              </div>

              <div className="mt-6 sm:mt-10">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-indigo dark:text-ivory">
                  Key Benefits
                </h3>
                <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-warm-grey dark:text-ivory/70 font-body">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Leaf size={16} className="text-indigo shrink-0"/>
                    Artisan Made
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Leaf size={16} className="text-indigo shrink-0"/>
                    Traditional Design
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Leaf size={16} className="text-indigo shrink-0"/>
                    Heritage Craft
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Leaf size={16} className="text-indigo shrink-0"/>
                    Hand Finished
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-10 flex items-center gap-3 sm:gap-5">
                <button onClick={decrease} className="rounded-xl border border-gold/30 dark:border-indigo-light/30 p-3 sm:p-4 hover:bg-gold/20 dark:hover:bg-indigo-light/20 text-indigo dark:text-ivory">
                  <Minus size={16} />
                </button>
                <span className="text-xl sm:text-2xl font-bold text-indigo dark:text-ivory">{qty}</span>
                <button onClick={increase} className="rounded-xl border border-gold/30 dark:border-indigo-light/30 p-3 sm:p-4 hover:bg-gold/20 dark:hover:bg-indigo-light/20 text-indigo dark:text-ivory">
                  <Plus size={16} />
                </button>
              </div>

              <div className="mt-6 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
                <button onClick={handleAddCart} className="flex-1 sm:flex-none flex items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-indigo px-5 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-body font-semibold text-ivory transition hover:bg-indigo-light">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button className="flex-1 sm:flex-none rounded-xl sm:rounded-2xl border-2 border-indigo px-5 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-body font-semibold text-indigo dark:text-warm-grey transition hover:bg-indigo hover:text-ivory">
                  ⚡ Buy Now
                </button>
                <button onClick={() => toggleWishlist(product._id || product.id, product)} className="rounded-xl sm:rounded-2xl border-2 border-gold/30 dark:border-indigo-light/30 p-3 sm:p-4 text-indigo dark:text-ivory transition hover:bg-gold/20 dark:hover:bg-indigo-light/20">
                  <Heart size={18} className={isInWishlist(product._id || product.id) ? "fill-red-500 text-red-500" : ""} />
                </button>
              </div>

              <div className="mt-6 sm:mt-10 rounded-2xl sm:rounded-3xl border border-gold/20 dark:border-indigo-light/30 bg-ivory-light dark:bg-plum-light p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Truck className="text-indigo shrink-0" size={18} />
                  <h3 className="text-base sm:text-lg font-heading font-bold text-indigo dark:text-ivory">Free Delivery</h3>
                </div>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-warm-grey dark:text-ivory/70 font-body">
                  Estimated delivery in <strong>2–4 business days</strong>.
                </p>
                <div className="mt-3 sm:mt-5 space-y-2 sm:space-y-3 font-body text-xs sm:text-sm text-warm-grey dark:text-ivory/70">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <ShieldCheck size={16} className="text-indigo shrink-0" />
                    <span>100% Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <BadgeCheck size={16} className="text-indigo shrink-0" />
                    <span>Authentic Handcrafted Product</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Truck size={16} className="text-indigo shrink-0" />
                    <span>Cash on Delivery Available</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <ShieldCheck size={16} className="text-indigo shrink-0" />
                    <span>Easy 7-Day Returns</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-10">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-indigo dark:text-ivory">
                  Product Highlights
                </h3>
                <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-warm-grey dark:text-ivory/70 font-body">
                  <li>✔ Handcrafted by Gujarat artisans</li>
                  <li>✔ Traditional techniques passed down generations</li>
                  <li>✔ Each piece is unique</li>
                  <li>✔ Supports Indian artisan communities</li>
                </ul>
              </div>

              <Link
                to={`/products/${product._id || product.id}`}
                onClick={onClose}
                className="mt-6 sm:mt-10 inline-flex items-center text-sm sm:text-base font-body font-semibold text-indigo dark:text-warm-grey transition hover:translate-x-2 hover:underline"
              >
                View Full Details →
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>

    </AnimatePresence>
  );
}