"use client";

// Opens the browser's print dialog, where the invoice can be saved as a PDF.
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="mt-8 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
    >
      Download / print invoice (PDF)
    </button>
  );
}
