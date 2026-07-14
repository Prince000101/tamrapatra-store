function JournalCard({ article }) {
  return (
    <div className="bg-white dark:bg-plum-light rounded-[16px] sm:rounded-[24px] overflow-hidden shadow-sm border border-gold/20 dark:border-indigo-light/30 hover:shadow-md transition-all duration-300">
      <img src={article.image} alt={article.title} loading="lazy" decoding="async" className="h-48 sm:h-56 w-full object-cover" />
      <div className="p-4 sm:p-6">
        <span className="text-indigo dark:text-warm-grey text-[10px] sm:text-sm font-body font-semibold">{article.category}</span>
        <h2 className="text-base sm:text-lg md:text-xl font-heading mt-1.5 sm:mt-2 text-indigo dark:text-ivory leading-tight">{article.title}</h2>
        <p className="text-warm-grey dark:text-ivory/60 font-body mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed">{article.excerpt}</p>
        <div className="flex items-center justify-between mt-3 sm:mt-5 text-xs sm:text-sm text-warm-grey dark:text-ivory/60 font-body">
          <span>{article.author}</span>
          <span>{article.date}</span>
        </div>
        <button className="mt-3 sm:mt-5 rounded-full bg-indigo hover:bg-indigo-light text-ivory px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-body font-medium transition">
          Read More
        </button>
      </div>
    </div>
  );
}

export default JournalCard;
