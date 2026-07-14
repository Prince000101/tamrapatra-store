import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Leaf, ShieldCheck, Clock3 } from "lucide-react";
import SEO from "../components/SEO";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = form;
    const body = `Name: ${name}%0AEmail: ${email}%0A%0AMeswarm-grey:%0A${message}`;
    window.location.href = `mailto:info@tamrapatra.com?subject=${encodeURIComponent(subject || "Contact from Tamrapatra")}&body=${body}`;
  };

  const features = [
    { icon: <Clock3 size={28} />, title: "Fast Support", desc: "Quick assistance from our support team." },
    { icon: <ShieldCheck size={28} />, title: "Secure Experience", desc: "Your information stays safe and protected." },
    { icon: <Leaf size={28} />, title: "Trusted Craftsmanship", desc: "Premium handcrafted decor from Gujarat." },
  ];

  const localBusinessLD = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Tamrapatra",
    url: "https://tamrapatra.com",
    email: "prince@creatordev.in",
    address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressRegion: "Gujarat", addressCountry: "IN" },
    openingHours: "Mo-Sa 09:00-20:00",
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 py-14 sm:py-20 md:px-14 lg:px-24 transition-colors duration-500">
      <SEO
        title="Contact Us"
        description="Get in touch with Tamrapatra. Reach out for orders, inquiries, or artisan collaboration. We're here to help with all your handicraft needs."
        keywords="contact Tamrapatra, customer support, handicraft inquiries, Tamrapatra contact"
        url="https://tamrapatra.com/contact"
        ld={localBusinessLD}
      />
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mx-auto mb-14 sm:mb-20 max-w-3xl text-center"
      >
        <p className="mb-3 sm:mb-4 uppercase tracking-[4px] sm:tracking-[5px] text-[10px] sm:text-xs text-warm-grey font-body">Tamrapatra Support</p>
        <h1 className="mb-4 sm:mb-6 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-indigo dark:text-ivory">Let's connect naturally</h1>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-indigo dark:text-ivory/60 font-body">
          Questions about products, or orders? Our team is always ready to help you.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-7xl gap-6 sm:gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-[24px] sm:rounded-[35px] bg-white dark:bg-plum-light p-6 sm:p-8 md:p-10 shadow-sm border border-gold/20 dark:border-indigo-light/30"
        >
          <h2 className="mb-8 sm:mb-10 font-heading text-2xl sm:text-3xl md:text-4xl text-indigo dark:text-ivory">Contact Information</h2>
          <div className="space-y-6 sm:space-y-8 md:space-y-10">
            {[
              { icon: <Mail className="text-indigo dark:text-warm-grey" size={20} />, title: "Email Address", desc: "info@tamrapatra.com" },
              { icon: <Phone className="text-indigo dark:text-warm-grey" size={20} />, title: "Phone Number", desc: "+91 8178452773" },
              { icon: <MapPin className="text-indigo dark:text-warm-grey" size={20} />, title: "Location", desc: "India" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 sm:gap-5">
                <div className="rounded-xl sm:rounded-2xl bg-warm-grey/20 dark:bg-indigo-light/30 p-3 sm:p-4">{item.icon}</div>
                <div>
                  <h3 className="mb-0.5 sm:mb-1 text-lg sm:text-xl font-heading text-indigo dark:text-ivory">{item.title}</h3>
                  <p className="text-sm sm:text-base text-indigo dark:text-ivory/60 font-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 sm:mt-10 md:mt-12 rounded-2xl sm:rounded-3xl bg-warm-grey/10 dark:bg-indigo-light/20 p-5 sm:p-6 md:p-8">
            <h3 className="mb-3 sm:mb-4 font-heading text-2xl sm:text-3xl text-indigo dark:text-ivory">Business Hours</h3>
            <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-indigo dark:text-ivory/60 font-body">
              <p>Monday – Saturday</p>
              <p>9:00 AM – 8:00 PM</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-[24px] sm:rounded-[35px] bg-white dark:bg-plum-light p-6 sm:p-8 md:p-10 shadow-sm border border-gold/20 dark:border-indigo-light/30"
        >
          <h2 className="mb-8 sm:mb-10 font-heading text-2xl sm:text-3xl md:text-4xl text-indigo dark:text-ivory">Send Us A Meswarm-grey</h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
            <input name="name" value={form.name} onChange={handleChange} required type="text" placeholder="Your Name" className="w-full rounded-xl sm:rounded-2xl border border-gold/30 dark:border-indigo-light/30 bg-transparent px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none text-indigo dark:text-ivory font-body transition focus:border-indigo" />
            <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="Your Email" className="w-full rounded-xl sm:rounded-2xl border border-gold/30 dark:border-indigo-light/30 bg-transparent px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none text-indigo dark:text-ivory font-body transition focus:border-indigo" />
            <input name="subject" value={form.subject} onChange={handleChange} type="text" placeholder="Subject" className="w-full rounded-xl sm:rounded-2xl border border-gold/30 dark:border-indigo-light/30 bg-transparent px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none text-indigo dark:text-ivory font-body transition focus:border-indigo" />
            <textarea name="message" value={form.message} onChange={handleChange} required rows="5" placeholder="Write your message..." className="w-full rounded-xl sm:rounded-2xl border border-gold/30 dark:border-indigo-light/30 bg-transparent px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none text-indigo dark:text-ivory font-body transition focus:border-indigo" />
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="flex w-full items-center justify-center gap-3 rounded-xl sm:rounded-2xl bg-indigo py-3.5 sm:py-4 text-base sm:text-lg font-body font-semibold text-ivory transition hover:bg-indigo-light">
              <Send size={18} /> Send Meswarm-grey
            </motion.button>
          </form>
        </motion.div>
      </div>

      <div className="mx-auto mt-16 sm:mt-20 md:mt-24 grid max-w-7xl gap-5 sm:gap-6 md:gap-8 sm:grid-cols-2 md:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="rounded-[20px] sm:rounded-[30px] bg-white dark:bg-plum-light p-5 sm:p-6 md:p-8 shadow-sm border border-gold/20 dark:border-indigo-light/30"
          >
            <div className="mb-4 sm:mb-6 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-warm-grey/20 dark:bg-indigo-light/30 text-indigo dark:text-warm-grey">
              {feature.icon}
            </div>
            <h3 className="mb-3 sm:mb-4 font-heading text-xl sm:text-2xl text-indigo dark:text-ivory">{feature.title}</h3>
            <p className="leading-relaxed text-sm sm:text-base text-indigo dark:text-ivory/60 font-body">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
