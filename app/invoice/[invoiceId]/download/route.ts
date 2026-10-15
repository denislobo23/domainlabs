
import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ invoiceId: string }>;
};

export async function GET(
  _request: Request,
  { params }: Props
) {
  const { invoiceId } = await params;

  if (invoiceId !== "DOM260828-colouranalysis") {
    return new NextResponse("Invoice not found", {
      status: 404,
    });
  }

  try {
    const filePath = path.join(
      process.cwd(),
      "private",
      "invoices",
      "DOM260828.pdf"
    );

    const pdf = await readFile(filePath);

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="DOM260828.pdf"',
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Invoice PDF unavailable", error);

    return new NextResponse("Invoice PDF unavailable", {
      status: 500,
    });
  }
}
