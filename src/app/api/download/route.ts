import { type NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { generateLienDocument } from "@/lib/generate-document";
import { generatePDF } from "@/lib/generate-pdf";
import type Stripe from "stripe";

function extractFormData(metadata: Stripe.Metadata): Record<string, string> {
  if (metadata.formData) {
    return JSON.parse(metadata.formData);
  }

  const chunks = parseInt(metadata.formDataChunks || "0", 10);
  if (chunks > 0) {
    let json = "";
    for (let i = 0; i < chunks; i++) {
      json += metadata[`formData_${i}`] || "";
    }
    return JSON.parse(json);
  }

  return {};
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return Response.json(
        { error: "Missing session_id parameter" },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const session = await getStripe().checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return Response.json(
        { error: "Payment not completed" },
        { status: 402 }
      );
    }

    const metadata = session.metadata || {};
    const formData = extractFormData(metadata);

    // Generate the document and PDF
    const documentText = await generateLienDocument(formData);
    const pdfBuffer = generatePDF(documentText, formData);

    // Return the PDF with appropriate headers
    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="lien-document-${sessionId.slice(-8)}.pdf"`,
        "Content-Length": String(pdfBuffer.length),
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return Response.json(
      { error: "Failed to generate document" },
      { status: 500 }
    );
  }
}
