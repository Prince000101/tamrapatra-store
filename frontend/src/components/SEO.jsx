import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "Home",
  description = "Authentic handcrafted decor from Gujarat. Brass, wood, and textile artistry.",
  keywords = "Indian handicrafts, brass decor, wood carving, Gujarat artisan, Tamrapatra",
  url = "https://tamrapatra.com",
  image = "/uploads/19.jpg",
  type = "website",
  ld = null,
}) {
  const siteName = "Tamrapatra";
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {ld && (
        <script type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      )}
    </Helmet>
  );
}
