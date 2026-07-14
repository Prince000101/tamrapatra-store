import { useMemo } from "react";
import { randomCraftImage } from "../utils/images";

function FeaturedArticle() {
  const featImage = useMemo(() => randomCraftImage(), []);

  return (
    <div className="relative rounded-[16px] sm:rounded-[28px] overflow-hidden mb-10 sm:mb-14">
      <img src={featImage} alt="Featured" loading="lazy" decoding="async" className="w-full h-[280px] sm:h-[350px] md:h-[400px] object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo/90 via-indigo/70 to-indigo/30 sm:via-indigo/60 sm:to-transparent flex flex-col justify-center p-5 sm:p-8 md:p-16">
        <span className="text-gold font-body font-semibold mb-2 sm:mb-3 uppercase tracking-[2px] sm:tracking-[3px] text-[10px] sm:text-sm">Featured Article</span>
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-ivory max-w-xl md:max-w-2xl leading-tight">Gujarat's Rich Handicraft Heritage</h2>
        <p className="text-ivory/70 font-body mt-2 sm:mt-5 max-w-lg text-xs sm:text-base">Explore the timeless artistry and cultural richness of Gujarat's traditional crafts.</p>
        <button className="mt-3 sm:mt-6 w-fit rounded-full bg-ivory text-indigo hover:bg-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-base font-body font-semibold transition">
          Explore Now
        </button>
      </div>
    </div>
  );
}

export default FeaturedArticle;
