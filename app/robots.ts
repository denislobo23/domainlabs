import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data/domain-sales";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private pages: purchase confirmations, form endpoints, invoices, the asset portfolio.
      disallow: ["/confirm", "/api/", "/invoice/", "/view-assets"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
