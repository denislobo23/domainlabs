import type { MetadataRoute } from "next";
import { domainSales, SITE_URL } from "@/lib/data/domain-sales";

// Tells Google about the site's public pages, including every domain for sale.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.5,
  }));

  const forSale = domainSales
    .filter((d) => !d.sold)
    .map((d) => ({
      url: `${SITE_URL}/${d.domain}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [...pages, ...forSale];
}
