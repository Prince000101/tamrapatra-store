import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  ArrowRight,
  Heart,
  Gem,
  Star,
  Sparkles,
  Trophy,
  Palette,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import Newsletter from "../components/Newsletter";
import { useCart } from "../hook/CartHook";
import { useWishlist } from "../context/WishlistContext";
import SEO from "../components/SEO";
import journalData from "../data/journalData";

export default function Home() {
  const { addToCart, cart } = useCart();
  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const philosophy = [
    {
      icon: <Gem size={28} />,
      title: "Handcrafted Excellence",
      desc: "Every piece is meticulously crafted by skilled artisans from Gujarat, preserving centuries-old techniques passed down through generations.",
    },
    {
      icon: <Star size={28} />,
      title: "Authentic Heritage",
      desc: "Rooted in the rich artisan traditions of India, our designs honor the cultural legacy of brass work, wood carving, and textile artistry.",
    },
    {
      icon: <Trophy size={28} />,
      title: "Since 1998",
      desc: "Over two decades of bringing royal Indian craftsmanship to homes worldwide. Trusted by collectors and art lovers across the globe.",
    },
  ];

  const features = [
    "HANDCRAFTED",
    "AUTHENTIC GUJARAT",
    "SINCE 1998",
    "ARTISAN MADE",
    "BRASS & WOOD",
    "GIFT READY",
  ];

  const organizationLD = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tamrapatra",
    url: "https://tamrapatra.com",
    logo: "/uploads/19.jpg",
    description: "Royal Indian Handicrafts since 1998. Authentic handcrafted decor from Gujarat.",
    foundingDate: "1998",
    address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressRegion: "Gujarat", addressCountry: "IN" },
    contactPoint: { "@type": "ContactPoint", email: "prince@creatordev.in", contactType: "customer service" },
  };

  const webSiteLD = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tamrapatra",
    url: "https://tamrapatra.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://tamrapatra.com/products?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="overflow-hidden">
      <SEO
        title="Home"
        description="Royal Indian Handicrafts since 1998. Authentic handcrafted decor from Gujarat — brass, wood, and textile artistry for homes that celebrate heritage."
        keywords="Indian handicrafts, Tamrapatra, brass decor, wood carving, Gujarat artisan, royal handicrafts"
        url="https://tamrapatra.com"
        ld={[organizationLD, webSiteLD]}
      />

      {/* =========================================
                    HERO SECTION
      ========================================= */}
      <section className="relative min-h-[90svh] md:min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-between px-4 sm:px-6 md:px-14 lg:px-24 overflow-hidden pt-20 md:pt-0">

        {/* Animated blob */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] bg-gold/8 dark:bg-gold/5 animate-blob-morph z-0"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-indigo/8 dark:bg-indigo/10 animate-float-slow"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        {/* Floating decorative diamonds */}
        <motion.div
          className="absolute top-[15%] right-[10%] w-4 h-4 bg-gold/20 rotate-45 animate-diamond-float"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[8%] w-3 h-3 bg-gold/15 rotate-45 animate-diamond-float"
          style={{ animationDelay: "2s" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
        />
        <motion.div
          className="absolute top-[60%] right-[25%] w-2 h-2 bg-indigo/15 rotate-45 animate-diamond-float"
          style={{ animationDelay: "3s" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
        />

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 max-w-xl text-center md:text-left"
        >
          <p className="mb-4 sm:mb-6 text-[10px] sm:text-xs uppercase tracking-[4px] sm:tracking-[6px] text-gold font-body font-medium">
            Established 1998 &middot; Gujarat, India
          </p>

          <h1 className="mb-6 sm:mb-8 text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] font-heading" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            <span className="text-indigo dark:text-ivory">Royal Indian</span>
            <br />
            <span className="text-gradient-gold italic">Handicrafts.</span>
          </h1>

          <p className="mb-8 sm:mb-10 max-w-md mx-auto md:mx-0 text-sm sm:text-base leading-relaxed text-warm-grey dark:text-ivory/70 font-body">
            Authentic handcrafted decor from Gujarat. Timeless brass, wood, and textile artistry 
            for homes that celebrate heritage.
          </p>

          <Link to="/products" className="inline-block">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 rounded-full bg-indigo dark:bg-gold px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base text-ivory dark:text-indigo font-body font-medium shadow-lg shadow-indigo/20 transition hover:bg-indigo-dark dark:hover:bg-gold-dark"
            >
              Explore Collection
              <ArrowRight size={16} className="sm:size-[18px]" />
            </motion.button>
          </Link>
        </motion.div>

        {/* RIGHT - FLOATING PRODUCT CARD */}
        <motion.div
          initial={{ opacity: 0, x: 80, rotate: 2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="relative z-10 hidden lg:block shrink-0"
        >
          <div className="relative animate-float">
            <div className="w-full max-w-[480px] aspect-[12/10] rounded-[40px] bg-ivory-dark dark:bg-plum-light overflow-hidden shadow-2xl border border-gold/15">
              <img
                src="/uploads/12.jpg"
                alt="Tamrapatra brass handicraft"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-90 dark:opacity-80"
              />
            </div>
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gold/10 animate-float-slow" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-indigo/15" />
            {/* Decorative gold border ring */}
            <div className="absolute inset-0 rounded-[40px] border border-gold/20 pointer-events-none" />
          </div>
        </motion.div>

        {/* BOTTOM FEATURES BAR */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-6 md:bottom-10 left-0 right-0 px-4 sm:px-6 md:px-14 lg:px-24"
        >
          <div className="flex items-center gap-4 sm:gap-8 text-[10px] sm:text-xs uppercase tracking-[3px] sm:tracking-[4px] text-warm-grey/60 dark:text-ivory/40 font-body font-medium overflow-x-auto pb-1 no-scrollbar">
            {features.map((feature, i) => (
              <span key={feature} className="flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                {feature}
                {i < features.length - 1 && (
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gold/40 dark:bg-gold/30" />
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

       {/* =========================================
                   PHILOSOPHY SECTION
       ========================================= */}
       <section className="px-4 sm:px-6 py-20 sm:py-32 md:px-14 lg:px-24 bg-ivory-light/70 dark:bg-plum/50 pattern-rangoli">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16 text-center md:text-left"
          >
            <p className="mb-3 sm:mb-4 text-[10px] sm:text-xs uppercase tracking-[4px] sm:tracking-[5px] text-gold font-body font-medium">
              Our Craft
            </p>

            <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-indigo dark:text-ivory" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Where tradition meets<br className="hidden sm:block" /> timeless artistry.
            </h2>

            <p className="max-w-2xl mx-auto md:mx-0 text-sm sm:text-base leading-relaxed text-warm-grey font-body dark:text-ivory/70">
              Every Tamrapatra piece is a celebration of India's rich craft heritage,
              meticulously created by master artisans using techniques perfected over centuries.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {philosophy.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group rounded-[24px] sm:rounded-[32px] bg-white dark:bg-plum-light p-6 sm:p-10 shadow-sm border border-gold/15 dark:border-gold/10 transition-all duration-500 hover:shadow-xl hover:border-gold/30"
              >
                <div className="mb-5 sm:mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-indigo/5 text-gold group-hover:bg-indigo group-hover:text-ivory dark:group-hover:bg-gold dark:group-hover:text-indigo transition-all duration-500">
                  {item.icon}
                </div>

                <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-heading text-indigo dark:text-ivory" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {item.title}
                </h3>

                <p className="leading-relaxed text-warm-grey dark:text-ivory/70 font-body text-sm sm:text-[15px]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
                  PRODUCTS SECTION
      ========================================= */}
      <section className="px-4 sm:px-6 py-20 sm:py-32 md:px-14 lg:px-24 bg-ivory dark:bg-plum">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-10 sm:mb-14 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 sm:gap-0 text-center sm:text-left"
          >
            <div>
              <p className="mb-2 sm:mb-3 text-[10px] sm:text-xs uppercase tracking-[4px] sm:tracking-[5px] text-gold font-body font-medium">
                Curated Collection
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-indigo dark:text-ivory" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Heritage pieces, cherished forever
              </h2>
            </div>

            <Link
              to="/products"
              className="hidden md:flex items-center gap-2 text-gold font-body font-medium transition-all hover:gap-4"
            >
              View All
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent" />
            </div>
          ) : (
            <div className="grid gap-6 sm:gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  onClick={() => navigate(`/products/${product._id}`)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-[20px] sm:rounded-[32px] bg-ivory-dark dark:bg-plum-light mb-3 sm:mb-5 border border-gold/10 transition-all duration-500 hover:border-gold/30">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product._id, product);
                        toast.success(
                          isInWishlist(product._id)
                            ? "Removed from Wishlist"
                            : "Added to Wishlist"
                        );
                      }}
                      className="absolute right-2 sm:right-4 top-2 sm:top-4 z-20 rounded-full bg-ivory/80 dark:bg-plum/80 p-2 sm:p-3 shadow-md backdrop-blur-sm transition hover:bg-white dark:hover:bg-plum-light hover:scale-110"
                    >
                      <Heart
                        size={14}
                        className={`transition ${
                          isInWishlist(product._id)
                            ? "fill-gold text-gold"
                            : "text-indigo"
                        }`}
                      />
                    </button>

                    <div className="absolute inset-0 flex items-end justify-center pb-3 sm:pb-6 opacity-0 transition-all duration-500 group-hover:opacity-100 max-sm:hidden">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const existing = cart.find((i) => i._id === product._id);
                          addToCart(product);
                          toast.success(
                            existing
                              ? `${product.name} quantity increased`
                              : `${product.name} added to cart`
                          );
                        }}
                        className="flex items-center gap-2 rounded-full bg-indigo px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-ivory font-body font-medium shadow-xl transition hover:scale-105 hover:bg-indigo-dark"
                      >
                        <ShoppingCart size={14} />
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="px-0 sm:px-1">
                    <p className="mb-0.5 sm:mb-1 text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] text-gold font-body">
                      {product.category || "Indian Handicrafts"}
                    </p>
                    <h3 className="text-sm sm:text-lg md:text-xl font-heading mb-0.5 sm:mb-1 dark:text-ivory text-indigo leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {product.name}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg font-body font-medium text-gold">
                      ₹{product.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-10 sm:mt-12 text-center md:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-gold font-body font-medium transition-all hover:gap-4"
            >
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
                  FEATURED BANNER
      ========================================= */}
      <section className="px-4 sm:px-6 py-20 sm:py-32 md:px-14 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[24px] sm:rounded-[40px] bg-ornate-gradient p-6 sm:p-8 md:p-12 lg:p-20"
          >
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gold/10 animate-blob-morph" />
            <div className="absolute -left-10 -bottom-10 w-60 h-60 rounded-full bg-indigo-light/20" />

            {/* Floating decorative elements */}
            <div className="absolute top-8 right-[30%] w-3 h-3 bg-gold/20 rotate-45 animate-diamond-float" />
            <div className="absolute bottom-12 left-[20%] w-2 h-2 bg-gold/15 rotate-45 animate-diamond-float" style={{ animationDelay: "1.5s" }} />

            <div className="relative z-10 grid md:grid-cols-2 gap-8 sm:gap-12 items-center text-center md:text-left">
              <div>
                <p className="mb-3 sm:mb-4 text-[10px] sm:text-xs uppercase tracking-[4px] sm:tracking-[5px] text-gold/60 font-body">
                  Our Heritage
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-ivory mb-4 sm:mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Ancient craft,<br />modern elegance.
                </h2>
                <p className="text-ivory/60 font-body leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                  Explore our curated collection of authentic Indian handicrafts, each piece
                  telling a story of heritage, skill, and the timeless beauty of Gujarat's artisan traditions.
                </p>
                <Link to="/products" className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-3 rounded-full bg-gold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base text-indigo font-body font-semibold transition hover:bg-gold-light"
                  >
                    Shop Heritage Collection
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </div>

              <div className="relative max-md:hidden">
                <div className="h-64 md:h-72 lg:h-80 rounded-[24px] sm:rounded-[32px] bg-gold/10 overflow-hidden border border-gold/15">
                  <img
                    src="/uploads/07.jpg"
                    alt="Tamrapatra handcrafted wooden art"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================
                  JOURNAL SECTION
      ========================================= */}
      <section className="px-4 sm:px-6 py-20 sm:py-32 md:px-14 lg:px-24 bg-ivory-light/70 dark:bg-plum/50 pattern-rangoli">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-10 sm:mb-14 text-center md:text-left"
          >
            <p className="mb-2 sm:mb-3 text-[10px] sm:text-xs uppercase tracking-[4px] sm:tracking-[5px] text-gold font-body font-medium">
              Tamrapatra Journal
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-indigo dark:text-ivory" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Stories of craft & heritage
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {journalData.map((article, index) => (
              <motion.div
                key={article._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-[20px] sm:rounded-[28px] bg-ivory-dark dark:bg-plum-light mb-3 sm:mb-5 border border-gold/10">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="px-0 sm:px-1">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <span className="text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] text-gold font-body font-medium">
                      {article.category}
                    </span>
                    <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-gold/40" />
                    <span className="text-[10px] sm:text-xs text-warm-grey/60 font-body">
                      {article.date}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-xl font-heading leading-snug text-indigo dark:text-ivory group-hover:text-gold dark:group-hover:text-gold-light transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {article.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
