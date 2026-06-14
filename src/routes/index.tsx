import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harshit Batham — IT Support & Web Developer Portfolio" },
      { name: "description", content: "BCA graduate based in Kanpur. Hands-on with IT support, web development, design and digital tools. Open to roles in Technology, UI/UX, Product, Analyst, Consulting and Operations." },
      { property: "og:title", content: "Harshit Batham — Portfolio" },
      { property: "og:description", content: "Premium portfolio for a BCA graduate exploring roles in tech, design, product and operations." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Harshit Batham",
          jobTitle: "IT Support & Web Developer",
          email: "mailto:hbatham910@gmail.com",
          telephone: "+91-9628977111",
          address: { "@type": "PostalAddress", addressLocality: "Kanpur", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
          sameAs: ["https://linkedin.com/in/harshit-batham"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
