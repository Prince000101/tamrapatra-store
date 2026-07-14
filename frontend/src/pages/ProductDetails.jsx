import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../hook/CartHook";
import { useWishlist } from "../context/WishlistContext";
import { Heart, Star, Truck, ShieldCheck, ArrowRight, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import SEO from "../components/SEO";

const SkeletonLoader = () => (
  <div className="min-h-screen animate-pulse px-4 sm:px-6 py-12 sm:py-16">
    <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 lg:grid-cols-2">
      <div className="h-[300px] sm:h-[400px] md:h-[550px] w-full rounded-2xl sm:rounded-3xl bg-gold/40 dark:bg-plum-light" />
      <div className="flex flex-col space-y-4 sm:space-y-6 pt-4 sm:pt-10">
        <div className="h-4 sm:h-6 w-24 sm:w-32 rounded-full bg-gold/40 dark:bg-plum-light" />
        <div className="h-8 sm:h-12 w-3/4 rounded-lg sm:rounded-xl bg-gold/40 dark:bg-plum-light" />
        <div className="h-6 sm:h-8 w-1/2 rounded-lg sm:rounded-xl bg-gold/40 dark:bg-plum-light" />
        <div className="h-24 sm:h-32 w-full rounded-lg sm:rounded-xl bg-gold/40 dark:bg-plum-light" />
        <div className="h-20 sm:h-24 w-full rounded-lg sm:rounded-xl bg-gold/40 dark:bg-plum-light" />
      </div>
    </div>
  </div>
);

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/products/${id}`);
        const data = res.data?.data || res.data?.product || res.data || null;
        if (mounted && data) {
          setProduct(data);
          if (data.variants?.length > 0) setSelectedVariant(data.variants[0]);
          setRelatedProducts([
            { _id: "related1", name: "Patola Silk Dupatta", price: 3499, image: "/uploads/02.jpg" },
            { _id: "related2", name: "Brass Ganesh Idol", price: 2499, image: "/uploads/08.jpg" },
          ]);
          setReviews([
            { id: 1, user: "Rahul K.", rating: 5, comment: "Amazing quality, genuine product!", date: "2 days ago" },
            { id: 2, user: "Priya S.", rating: 4, comment: "Good packaging, fast delivery.", date: "1 week ago" },
          ]);
          const recent = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
          const updatedRecent = [data, ...recent.filter((item) => item._id !== data._id)].slice(0, 5);
          localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecent));
        }
      } catch {
        if (mounted) setError("Failed to load product");
      } finally {
        setTimeout(() => { if (mounted) setLoading(false); }, 800);
      }
    };
    fetchProductData();
    return () => { mounted = false; };
  }, [id]);

  const isWishlisted = wishlist?.some((item) => typeof item === "string" ? item === product?._id : item._id === product?._id);
  const currentPrice = selectedVariant ? selectedVariant.price : product?.price;
  const currentStock = selectedVariant ? selectedVariant.stock : product?.countInStock;
  const displayImages = product?.images?.length ? product.images : [product?.image];

  const handleWishlistToggle = async () => {
    setActionLoading(true);
    try {
      if (isWishlisted) { await removeFromWishlist(product._id); toast.info("Removed from Wishlist"); }
      else { await addToWishlist(product._id, product); toast.success("Saved to Wishlist"); }
    } catch { toast.error("Failed to sync Wishlist"); }
    finally { setActionLoading(false); }
  };

  const handleAddToCart = async () => {
    setActionLoading(true);
    try { await addToCart({ ...product, selectedVariant }); toast.success("Added to Cart"); }
    catch { toast.error("Failed to add to Cart"); }
    finally { setActionLoading(false); }
  };

  if (loading) return <SkeletonLoader />;
  if (error) return <div className="flex min-h-screen items-center justify-center text-red-500 text-2xl font-bold">{error}</div>;
  if (!product) return <div className="flex min-h-screen items-center justify-center text-2xl font-bold text-indigo">Product not found</div>;

  const productLD = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: { "@type": "Brand", name: "Tamrapatra" },
    offers: { "@type": "Offer", price: currentPrice, priceCurrency: "INR", availability: "https://schema.org/InStock" },
  };

  return (
    <div className="min-h-screen pb-16 sm:pb-20 transition-colors duration-500">
      <SEO
        title={product.name}
        description={product.description ? product.description.slice(0, 160) : `Buy ${product.name} from Tamrapatra — authentic Indian handicraft.`}
        keywords={`${product.name}, Tamrapatra, Indian handicraft, ${product.category || "handicrafts"}`}
        url={`https://tamrapatra.com/products/${product._id}`}
        image={product.image}
        type="product"
        ld={productLD}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-6 text-xs sm:text-sm text-indigo flex items-center gap-1 sm:gap-2 font-body flex-wrap">
        <Link to="/" className="hover:text-indigo dark:hover:text-gold">Home</Link> <ChevronRight size={14} />
        <Link to="/products" className="hover:text-indigo dark:hover:text-gold">Shop</Link> <ChevronRight size={14} />
        <span className="text-indigo dark:text-ivory font-medium truncate">{product.name}</span>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 px-4 sm:px-6 lg:grid-cols-2">
        {/* LEFT - GALLERY */}
        <div className="flex flex-col gap-3 sm:gap-4 lg:sticky lg:top-6 lg:self-start">
          <div className="relative flex h-[300px] sm:h-[400px] md:h-[500px] items-center justify-center overflow-hidden rounded-[20px] sm:rounded-[32px] bg-white dark:bg-plum-light p-4 sm:p-6 md:p-8 shadow-sm border border-gold/20 dark:border-indigo-light/30 group">
            {currentStock < 1 && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-ivory/60 backdrop-blur-sm dark:bg-plum/60">
                <span className="rounded-full bg-red-600 px-6 py-2 text-xl font-bold text-ivory tracking-widest uppercase">Sold Out</span>
              </div>
            )}
            <img src={displayImages[selectedImage] || "/placeholder.jpg"} alt={product.name} loading="lazy" decoding="async" className="max-h-full w-full object-contain transition duration-700 group-hover:scale-110" />
          </div>
          {displayImages.length > 1 && (
            <div className="flex gap-2 sm:gap-4 overflow-x-auto py-1 sm:py-2 no-scrollbar">
              {displayImages.map((img, idx) => (
                <button key={idx} onClick={() => setSelectedImage(idx)} className={`h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 shrink-0 overflow-hidden rounded-lg sm:rounded-xl border-2 transition-all ${selectedImage === idx ? "border-indigo shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}>
                  <img src={img} loading="lazy" decoding="async" className="h-full w-full object-cover bg-white dark:bg-plum-light" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT - DETAILS */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className={`w-fit rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-body font-bold uppercase tracking-wider ${currentStock > 0 ? 'bg-warm-grey/20 text-indigo dark:text-warm-grey' : 'bg-red-100 text-red-700'}`}>
              {currentStock > 0 ? "In Stock" : "Out of Stock"}
            </span>
            <span className="text-xs sm:text-sm text-indigo flex items-center gap-1 font-body"><Star size={14} className="text-yellow-500 fill-yellow-500" /> {product.rating || 4.8} ({reviews.length} reviews)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-indigo dark:text-ivory mb-4 sm:mb-6">
            {product.name}
          </h1>

          <div className="flex items-end gap-3 sm:gap-4 mb-6 sm:mb-8 flex-wrap">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo dark:text-warm-grey">₹{currentPrice}</h2>
            <span className="text-lg sm:text-xl md:text-2xl font-medium text-gold-dark line-through mb-0.5 sm:mb-1">₹{Math.round(currentPrice * 1.25)}</span>
            <span className="rounded bg-red-100 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold text-red-700">SAVE 25%</span>
          </div>

          {product.variants?.length > 0 && (
            <div className="mb-6 sm:mb-8 border-t border-gold/20 dark:border-indigo-light/30 pt-4 sm:pt-6">
              <h3 className="text-xs sm:text-sm font-body font-bold uppercase tracking-wider text-warm-grey mb-3 sm:mb-4">Select Variant</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {product.variants.map((variant) => (
                  <button key={variant._id || variant.name} onClick={() => { setSelectedVariant(variant); setQuantity(1); }} className={`rounded-lg sm:rounded-xl px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-body font-semibold border-2 transition-all ${selectedVariant?.name === variant.name ? "border-indigo bg-indigo/5 text-indigo dark:border-warm-grey dark:bg-indigo-light/20 dark:text-warm-grey" : "border-gold/30 bg-white text-indigo hover:border-warm-grey dark:border-indigo-light/30 dark:bg-plum-light dark:text-ivory/60"}`}>
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="lg:sticky lg:top-20 z-20 mb-6 sm:mb-8 space-y-3 sm:space-y-4 rounded-[20px] sm:rounded-[28px] bg-white dark:bg-plum-light p-4 sm:p-5 md:p-6 shadow-sm border border-gold/20 dark:border-indigo-light/30">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 sm:h-12 md:h-14 items-center rounded-lg sm:rounded-xl border-2 border-gold/30 dark:border-indigo-light/30">
                <button onClick={() => setQuantity((p) => Math.max(1, p - 1))} className="px-3 sm:px-4 md:px-5 text-base sm:text-lg md:text-xl font-bold text-indigo hover:text-indigo dark:hover:text-ivory">-</button>
                <span className="w-6 sm:w-8 text-center text-sm sm:text-base md:text-lg font-bold text-indigo dark:text-ivory">{quantity}</span>
                <button onClick={() => setQuantity((p) => (p < currentStock ? p + 1 : p))} className="px-3 sm:px-4 md:px-5 text-base sm:text-lg md:text-xl font-bold text-indigo hover:text-indigo dark:hover:text-ivory">+</button>
              </div>
              <button onClick={handleAddToCart} disabled={actionLoading || currentStock < 1} className="flex-1 h-10 sm:h-12 md:h-14 rounded-lg sm:rounded-xl bg-indigo text-xs sm:text-sm text-ivory font-body font-bold hover:bg-indigo-light disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-1 sm:gap-2 shadow-lg shadow-indigo/20">
                Add to Cart
              </button>
              <button onClick={handleWishlistToggle} disabled={actionLoading} className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 flex items-center justify-center rounded-lg sm:rounded-xl border-2 border-gold/30 dark:border-indigo-light/30 text-indigo hover:bg-gold/20 dark:hover:bg-indigo-light/20 transition-all active:scale-95">
                <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : "dark:text-ivory"} />
              </button>
            </div>
            <button onClick={handleAddToCart} disabled={actionLoading || currentStock < 1} className="w-full h-10 sm:h-12 md:h-14 rounded-lg sm:rounded-xl bg-indigo-light text-ivory text-xs sm:text-sm font-body font-bold hover:bg-indigo disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-1 sm:gap-2">
              Buy it Now <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 py-4 sm:py-6 border-y border-gold/20 dark:border-indigo-light/30">
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-indigo font-body">
              <Truck className="text-indigo shrink-0" size={18} /> <span>Free Shipping over ₹500</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-indigo font-body">
              <ShieldCheck className="text-indigo shrink-0" size={18} /> <span>100% Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-14 sm:mt-20">
        <div className="flex border-b border-gold/20 dark:border-indigo-light/30 overflow-x-auto no-scrollbar">
          {["description", "specifications", "reviews"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 sm:pb-4 px-3 sm:px-6 text-[10px] sm:text-sm font-body font-bold uppercase tracking-wider whitespace-nowrap transition-all ${activeTab === tab ? "border-b-2 border-indigo text-indigo" : "text-indigo hover:text-indigo dark:hover:text-ivory"}`}>
              {tab} {tab === "reviews" && `(${reviews.length})`}
            </button>
          ))}
        </div>
        <div className="py-6 sm:py-8 min-h-[200px]">
          {activeTab === "description" && (
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-indigo dark:text-ivory/70 font-body max-w-4xl">{product.description}</p>
          )}
          {activeTab === "specifications" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-y-4 text-xs sm:text-sm text-indigo dark:text-ivory/70 font-body max-w-3xl bg-ivory-light dark:bg-plum-light p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl">
              <p><strong className="text-indigo dark:text-ivory block mb-0.5 sm:mb-1">Brand</strong> {product.brand || "Tamrapatra"}</p>
              <p><strong className="text-indigo dark:text-ivory block mb-0.5 sm:mb-1">Category</strong> {product.category || "Handicraft"}</p>
              <p><strong className="text-indigo dark:text-ivory block mb-0.5 sm:mb-1">SKU</strong> {selectedVariant?._id || product._id}</p>
              <p><strong className="text-indigo dark:text-ivory block mb-0.5 sm:mb-1">Care</strong> Wipe with dry cloth</p>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="space-y-4 sm:space-y-6 max-w-4xl">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-plum-light p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gold/20 dark:border-indigo-light/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm sm:text-base text-indigo dark:text-ivory">{review.user}</span>
                    <span className="text-xs sm:text-sm text-indigo">{review.date}</span>
                  </div>
                  <div className="flex text-yellow-500 mb-2 sm:mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />)}
                  </div>
                  <p className="text-xs sm:text-sm text-indigo dark:text-ivory/70">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-14 sm:mt-20">
          <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-indigo dark:text-ivory mb-6 sm:mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {relatedProducts.map((item) => (
              <Link to={`/products/${item._id}`} key={item._id} className="group block bg-white dark:bg-plum-light p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm border border-gold/20 dark:border-indigo-light/30 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-square bg-gold/20 dark:bg-plum rounded-lg sm:rounded-xl mb-3 sm:mb-4 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-indigo dark:text-ivory truncate font-body">{item.name}</h3>
                <p className="text-indigo font-bold text-xs sm:text-sm mt-0.5">₹{item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
