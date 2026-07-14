import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../hook/CartHook";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const Wishlisted = isInWishlist(product._id);

  return (
    <div className="rounded-2xl bg-white dark:bg-plum-light p-6 shadow-sm border border-gold/20 dark:border-indigo-light/30">
      <img src={product.image} alt={product.name} className="h-48 w-full rounded-xl object-cover" />
      <h2 className="text-xl font-heading mt-4 text-indigo dark:text-ivory">{product.name}</h2>
      <p className="text-warm-grey dark:text-ivory/60 font-body text-sm">{product.category}</p>
      <p className="text-indigo dark:text-warm-grey font-bold mt-2">₹{product.price}</p>
      <p className="text-yellow-500">⭐ {product.rating}</p>
      <p className="text-warm-grey dark:text-ivory/70 font-body mt-3 text-sm">{product.description}</p>
      <div className="flex gap-3 mt-4">
        <button onClick={() => toggleWishlist(product._id, product)} className={`p-2 rounded-full transition ${Wishlisted ? "bg-red-500 text-white" : "bg-gold/30 text-indigo dark:bg-indigo-light/30 dark:text-ivory"}`}>
          <Heart size={18} />
        </button>
        <button onClick={() => addToCart(product)} className="bg-indigo hover:bg-indigo-light text-ivory p-2 rounded-full transition">
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
