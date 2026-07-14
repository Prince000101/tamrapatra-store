import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useCart } from "../hook/CartHook";
import { useWishlist } from "../context/WishlistContext";
import SEO from "../components/SEO";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resolveItems = async () => {
      setLoading(true);
      const hasObjects = wishlist.some((item) => typeof item === "object" && item._id);
      if (hasObjects) { setItems(wishlist); setLoading(false); return; }
      const ids = wishlist.filter((id) => typeof id === "string");
      if (ids.length === 0) { setItems([]); setLoading(false); return; }
      try {
        const { data } = await axios.get("/api/products");
        const matched = data.filter((p) => ids.includes(p._id));
        setItems(matched);
      } catch { setItems([]); }
      finally { setLoading(false); }
    };
    resolveItems();
  }, [wishlist]);

  const handleRemove = async (productId) => {
    await removeFromWishlist(productId);
    toast.info("Removed from Wishlist");
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-indigo border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-20 md:px-14 lg:px-24 transition-colors duration-500">
      <div className="mx-auto max-w-7xl">
        <SEO
          title="Wishlist"
          description="Your saved Tamrapatra handicrafts. Review and add your favourite brass, wood, and textile pieces to cart."
          keywords="Tamrapatra wishlist, saved handicrafts, favourite items"
          url="https://tamrapatra.com/wishlist"
        />
        <div className="mb-12 text-center">
          <Heart className="mx-auto text-indigo dark:text-warm-grey" size={40} strokeWidth={1.5} />
          <h1 className="mt-4 text-4xl md:text-5xl font-heading text-indigo dark:text-ivory">My Wishlist</h1>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-indigo dark:text-ivory/60 font-body">Your Wishlist is empty.</p>
            <Link to="/products" className="mt-4 inline-block font-body font-medium text-indigo dark:text-warm-grey hover:text-indigo-light">
              Browse Products →
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product) => (
              <div key={product._id} className="overflow-hidden rounded-[28px] bg-white dark:bg-plum-light shadow-sm border border-gold/20 dark:border-indigo-light/30 transition hover:shadow-xl">
                <img src={product.image} alt={product.name} loading="lazy" decoding="async" className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h2 className="font-heading text-2xl text-indigo dark:text-ivory">{product.name}</h2>
                  <p className="mt-1 text-sm text-indigo font-body">{product.category}</p>
                  <p className="mt-2 text-xl font-bold text-indigo dark:text-warm-grey">₹{product.price}</p>
                  <div className="mt-5 flex gap-3">
                    <button onClick={() => handleAddToCart(product)} className="flex-1 rounded-xl bg-indigo px-4 py-3 font-body font-semibold text-ivory transition hover:bg-indigo-light flex items-center justify-center gap-2">
                      <ShoppingCart size={18} /> Add to Cart
                    </button>
                    <button onClick={() => handleRemove(product._id)} className="rounded-xl bg-red-600 p-3 text-white transition hover:bg-red-700">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link to="/products" className="font-body font-medium text-indigo dark:text-warm-grey hover:text-indigo-light">
            Continue Shopping →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
