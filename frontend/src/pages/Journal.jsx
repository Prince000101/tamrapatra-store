import journalData from "../data/journalData";
import JournalCard from "../components/JournalCard";
import FeaturedArticle from "../components/FeaturedArticle";
import SEO from "../components/SEO";

function Journal() {
  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-14 lg:px-24 py-12 sm:py-16 transition-colors duration-500">
      <SEO
        title="Journal"
        description="Stories of craft, heritage, and artisan traditions. Read about Indian handicrafts, Gujarat's artistry, and the Tamrapatra journey."
        keywords="Tamrapatra journal, Indian craft stories, artisan heritage, Gujarat handicraft blog"
        url="https://tamrapatra.com/journal"
      />
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading text-indigo dark:text-ivory">Tamrapatra Journal</h1>
        <p className="text-indigo dark:text-ivory/60 font-body mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base">
          Discover Gujarat's rich handicraft heritage, artisan stories, traditional craftsmanship, and cultural artistry.
        </p>
      </div>
      <FeaturedArticle />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
        {journalData.map((article) => (
          <JournalCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default Journal;
