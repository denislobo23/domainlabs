
import { NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { findInvoice } from "@/lib/data/invoices";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ invoiceId: string }>;
};

export async function GET(_request: Request, { params }: Props) {
  const { invoiceId } = await params;
  const invoice = findInvoice(invoiceId);

  if (!invoice?.pdfBlob) {
    return new NextResponse("Invoice not found", { status: 404 });
  }
  const pdfName = invoice.pdfBlob;

  try {
    let pdf: Uint8Array;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await get(pdfName, {
        access: "private",
      });

      if (!blob?.stream) {
        return new NextResponse("Invoice PDF not found", { status: 404 });
      }

      const bytes = await new Response(blob.stream).arrayBuffer();
      pdf = new Uint8Array(bytes);
    } else {
      // Local development: use the PDF on your computer.
      const filePath = path.join(
        process.cwd(),
        "private",
        "invoices",
        pdfName
      );
      pdf = new Uint8Array(await readFile(filePath));
    }

    return new NextResponse(new Blob([new Uint8Array(pdf)], { type: "application/pdf" }), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${pdfName}"`,
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch (error) {
    console.error("Invoice PDF unavailable", error);
    return new NextResponse("Invoice PDF unavailable", { status: 500 });
  }
}
