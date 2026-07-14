import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Gem, Send } from "lucide-react";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    const existing = JSON.parse(localStorage.getItem("tamrapatraNewsletter") || "[]");
    if (existing.includes(email)) {
      toast.info("Already subscribed!");
      return;
    }
    existing.push(email);
    localStorage.setItem("tamrapatraNewsletter", JSON.stringify(existing));
    toast.success("Subscribed! Welcome to the Tamrapatra family.");
    setEmail("");
  };

  return (
    <section className="mx-6 my-20 rounded-[32px] bg-ornate-gradient px-6 py-16 text-ivory shadow-2xl overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-6 right-10 w-3 h-3 bg-gold/20 rotate-45 animate-diamond-float" />
      <div className="absolute bottom-8 left-12 w-2 h-2 bg-gold/15 rotate-45 animate-diamond-float" style={{ animationDelay: "2s" }} />
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gold/5 animate-blob-morph" />

      <div className="mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gem className="text-gold" size={20} />
            <span className="text-xs uppercase tracking-[4px] text-gold/60 font-body">Stay Connected</span>
            <Gem className="text-gold" size={20} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading text-ivory" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Join the Tamrapatra Family
          </h2>
          <p className="mt-4 text-lg text-ivory/50 font-body">
            Get artisan stories, new arrivals, and exclusive offers
            delivered directly to your inbox.
          </p>
        </motion.div>
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full sm:w-96 rounded-full border border-gold/20 bg-ivory/10 px-5 py-4 text-ivory placeholder-ivory/30 outline-none focus:border-gold/50 transition-colors font-body"
          />
          <button
            type="submit"
            className="flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-semibold text-indigo font-body transition hover:scale-105 hover:bg-gold-light"
          >
            <Send size={16} />
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
