import { NextResponse, type NextRequest } from "next/server";
import { findDomainSale, SITE_URL } from "@/lib/data/domain-sales";

// When a domain we're selling is pointed at this Vercel project (e.g. someone
// types mypayments.com.au), send the visitor to its sale page on domainlabs.com.au.
export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") || "").split(":")[0];
  const sale = host ? findDomainSale(host) : undefined;

  if (sale && !sale.sold) {
    // Temporary (307) redirect, so nothing sticks in browsers once the domain is sold.
    return NextResponse.redirect(`${SITE_URL}/${sale.domain}`, 307);
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next.js internals and static files.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
