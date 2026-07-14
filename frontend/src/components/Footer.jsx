import { Link } from "react-router-dom";
import { Gem, Mail, Globe, ArrowUpRight, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ornate-gradient text-ivory/80">
      {/* Top decorative border */}
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-14 lg:px-24 py-14 sm:py-20">
        <div className="grid gap-8 sm:gap-12 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1 text-center sm:text-left">
            <div className="mb-4 sm:mb-6 flex items-center justify-center sm:justify-start gap-2.5">
              <Gem className="text-gold" size={24} strokeWidth={1.5} />
              <span className="text-xl sm:text-2xl font-heading font-semibold text-ivory" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                TAMRAPATRA
              </span>
            </div>
            <p className="text-sm font-body leading-relaxed text-ivory/50 max-w-xs mx-auto sm:mx-0">
              Royal Indian Handicrafts since 1998. Authentic handcrafted decor from Gujarat,
              preserving centuries of artisan heritage and tradition.
            </p>
            <div className="mt-4 sm:mt-6 flex items-center justify-center sm:justify-start gap-4">
              <a href="#" className="text-ivory/30 hover:text-gold transition-colors">
                <Globe size={18} />
              </a>
              <a href="mailto:prince@creatordev.in" className="text-ivory/30 hover:text-gold transition-colors">
                <Mail size={18} />
              </a>
              <a href="#" className="text-ivory/30 hover:text-gold transition-colors">
                <MapPin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="mb-4 sm:mb-6 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] text-gold/60 font-body font-medium">
              Explore
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {[
                { name: "Shop Collection", path: "/products" },
                { name: "Our Heritage", path: "/about" },
                { name: "Artisan Journal", path: "/journal" },
                { name: "Contact Us", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center gap-2 text-xs sm:text-sm font-body text-ivory/60 hover:text-gold transition-colors"
                  >
                    {item.name}
                    <ArrowUpRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Contact */}
          <div className="text-center sm:text-left">
            <h3 className="mb-4 sm:mb-6 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] text-gold/60 font-body font-medium">
              Support
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {["Track Order", "Shipping & Returns", "Gift Wrapping", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs sm:text-sm font-body text-ivory/60 hover:text-gold transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-ivory/10 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs font-body text-ivory/30">
            &copy; {new Date().getFullYear()} Tamrapatra. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-[10px] sm:text-xs font-body text-ivory/25">
            <span>Handcrafted with care</span>
            <Gem size={10} className="text-gold/40" />
            <span>Made in Gujarat, India</span>
          </div>
          <p className="text-[10px] sm:text-xs font-body text-ivory/20">
            Built by <span className="text-gold/50">Prince</span> | Creator Dev
          </p>
        </div>
      </div>
    </footer>
  );
}
