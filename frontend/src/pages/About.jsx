import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gem, Star, Heart, Users, Award, Clock } from "lucide-react";
import SEO from "../components/SEO";

export default function About() {
  const milestones = [
    { year: "1998", event: "Founded in Gujarat", desc: "Started as a small workshop preserving traditional brass and wood craft techniques." },
    { year: "2005", event: "First Export Order", desc: "Shipped our first collection to international collectors in London and Dubai." },
    { year: "2012", event: "100+ Artisans", desc: "Grew to support over 100 skilled artisans across Gujarat and Rajasthan." },
    { year: "2020", event: "Digital Heritage", desc: "Launched online to bring authentic Indian handicrafts to homes worldwide." },
    { year: "2026", event: "Global Presence", desc: "Serving collectors and art lovers across 25+ countries with pride." },
  ];

  const values = [
    { icon: <Gem size={24} />, title: "Master Craftsmanship", desc: "Every piece is hand-crafted by artisans with decades of expertise in traditional Indian metalwork, woodcarving, and textile arts." },
    { icon: <Star size={24} />, title: "Authentic Materials", desc: "We use only pure brass, seasoned sheesham wood, hand-spun textiles, and traditional natural dyes — never synthetic shortcuts." },
    { icon: <Heart size={24} />, title: "Fair Artisan Wages", desc: "Our artisans are partners, not suppliers. Every purchase directly supports skilled craftspeople and their families." },
    { icon: <Users size={24} />, title: "Community First", desc: "We invest in artisan villages, supporting education, healthcare, and the preservation of endangered craft traditions." },
    { icon: <Award size={24} />, title: "Quality Guarantee", desc: "Each piece passes through rigorous quality checks. We stand behind every product with our satisfaction promise." },
    { icon: <Clock size={24} />, title: "Heritage Preserved", desc: "By keeping traditional techniques alive, we ensure that centuries of Indian artisan wisdom endures for future generations." },
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

  return (
    <div className="min-h-screen transition-colors duration-500">
      <SEO
        title="Our Story"
        description="Discover Tamrapatra's legacy — over two decades of preserving India's royal artisan heritage through handcrafted brass, wood, and textile artistry from Gujarat."
        keywords="Tamrapatra story, about Tamrapatra, Indian artisan heritage, Gujarat handicrafts, royal craftsmanship"
        url="https://tamrapatra.com/about"
        ld={organizationLD}
      />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-14 lg:px-24 py-16 sm:py-20 gap-10 sm:gap-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl text-center md:text-left"
        >
          <p className="uppercase text-[10px] sm:text-xs tracking-[4px] sm:tracking-[5px] text-gold font-body mb-3 sm:mb-4">Our Heritage</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-indigo dark:text-ivory mb-4 sm:mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            A legacy of<br />royal craftsmanship.
          </h1>
          <p className="text-sm sm:text-base text-warm-grey dark:text-ivory/70 font-body mb-3 sm:mb-4 leading-relaxed">
            Since 1998, Tamrapatra has been dedicated to preserving and celebrating India's rich artisan heritage.
            From the bustling workshops of Gujarat to homes across the globe, our handcrafted pieces carry
            forward centuries of tradition, skill, and devotion.
          </p>
          <p className="text-sm sm:text-base text-warm-grey dark:text-ivory/70 font-body mb-6 sm:mb-8 leading-relaxed">
            Every brass idol, every carved wooden panel, every embroidered textile tells a story — of skilled hands,
            patient artistry, and an unwavering commitment to authenticity that defines the Tamrapatra legacy.
          </p>
          <Link to="/products" className="inline-block rounded-full bg-indigo dark:bg-gold px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base text-ivory dark:text-indigo font-body font-medium shadow-md hover:bg-indigo-dark dark:hover:bg-gold-dark transition-all hover:scale-105">
            Visit the Collection
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="shrink-0 w-full md:w-auto"
        >
          <div className="w-full max-w-[500px] mx-auto h-[350px] sm:h-[450px] md:h-[550px] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-xl border border-gold/15">
            <img
              src="/uploads/01.jpg"
              alt="Tamrapatra artisan at work"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      <div className="deco-line mx-4 sm:mx-6 md:mx-14 lg:mx-24 mb-12 sm:mb-16" />

      {/* Values Section */}
      <section className="px-4 sm:px-6 md:px-14 lg:px-24 pb-16 sm:pb-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-14 text-center"
        >
          <p className="mb-2 sm:mb-3 text-[10px] sm:text-xs uppercase tracking-[4px] sm:tracking-[5px] text-gold font-body font-medium">
            What We Stand For
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-indigo dark:text-ivory" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Our Values
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="card-ornate rounded-[20px] sm:rounded-[28px] bg-white dark:bg-plum-light p-6 sm:p-8 shadow-sm hover:shadow-md transition-all"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                {item.icon}
              </div>
              <h3 className="font-heading text-lg sm:text-xl text-indigo dark:text-ivory mb-2 sm:mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{item.title}</h3>
              <p className="text-warm-grey dark:text-ivory/70 text-xs sm:text-sm font-body leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline / Journey Section */}
      <section className="px-4 sm:px-6 md:px-14 lg:px-24 py-20 sm:py-32 bg-ivory-light/70 dark:bg-plum/50 pattern-rangoli">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16 text-center"
          >
            <p className="mb-2 sm:mb-3 text-[10px] sm:text-xs uppercase tracking-[4px] sm:tracking-[5px] text-gold font-body font-medium">
              Our Journey
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-indigo dark:text-ivory" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Two decades of heritage
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gold/20" />

            {milestones.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-start mb-10 sm:mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 pl-12 md:pl-0 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                  <div className="text-gold font-body font-semibold text-lg mb-1">{item.year}</div>
                  <h3 className="font-heading text-xl sm:text-2xl text-indigo dark:text-ivory mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{item.event}</h3>
                  <p className="text-warm-grey dark:text-ivory/70 text-sm font-body leading-relaxed">{item.desc}</p>
                </div>

                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold border-4 border-ivory dark:border-plum z-10 mt-1" />

                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Stories Section */}
      <section className="px-4 sm:px-6 md:px-14 lg:px-24 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16 text-center"
          >
            <p className="mb-2 sm:mb-3 text-[10px] sm:text-xs uppercase tracking-[4px] sm:tracking-[5px] text-gold font-body font-medium">
              The Hands Behind Our Craft
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-indigo dark:text-ivory" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Meet our artisans
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {[
              {
                name: "Rameshbhai Patel",
                craft: "Brass Idol Making",
                years: "28 years",
                image: "/uploads/06.jpg",
                quote: "Every Ganesha I craft carries the prayers of my father and his father before him.",
              },
              {
                name: "Sunita Devi",
                craft: "Kutch Mirror Work",
                years: "22 years",
                image: "/uploads/19.jpg",
                quote: "Each mirror I place reflects not just light, but the spirit of our village traditions.",
              },
              {
                name: "Arjun Mevada",
                craft: "Wood Carving",
                years: "18 years",
                image: "/uploads/09.jpg",
                quote: "In every groove of wood, I carve a piece of Gujarat's soul for the world to see.",
              },
            ].map((artisan, index) => (
              <motion.div
                key={artisan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="card-ornate rounded-[20px] sm:rounded-[28px] bg-white dark:bg-plum-light overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading text-xl text-indigo dark:text-ivory" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{artisan.name}</h3>
                    <span className="text-[10px] uppercase tracking-[2px] text-gold font-body">{artisan.years}</span>
                  </div>
                  <p className="text-xs uppercase tracking-[3px] text-gold/70 font-body mb-3">{artisan.craft}</p>
                  <p className="text-warm-grey dark:text-ivory/70 text-sm font-body leading-relaxed italic">&ldquo;{artisan.quote}&rdquo;</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
