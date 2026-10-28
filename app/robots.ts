import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private pages: purchase confirmations, form endpoints, invoices, the asset portfolio.
      disallow: ["/confirm", "/api/", "/invoice/", "/view-assets"],
    },
  };
}
