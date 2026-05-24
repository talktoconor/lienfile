import Anthropic from "@anthropic-ai/sdk";
import { getStripe } from "@/lib/stripe";
import type Stripe from "stripe";

function reassembleFormData(
  metadata: Stripe.Metadata
): Record<string, string> {
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

function buildPrompt(formData: Record<string, string>): string {
  const state = formData.propertyState || formData.state || "Unknown";
  return `Generate a formal mechanic's lien document for the state of ${state}.

This must be a legally formatted document that complies with ${state}'s specific statutory requirements for mechanic's liens. Include all required statutory references and formatting.

Use the following information:

CLAIMANT (Person/Company Filing the Lien):
- Name: ${formData.companyName || ""}
- Address: ${formData.companyAddress || ""}
- Role: ${formData.role || ""}
- License Number: ${formData.licenseNumber || "N/A"}

PROPERTY OWNER:
- Name: ${formData.propertyOwnerName || ""}

PROPERTY INFORMATION:
- Street: ${formData.propertyStreet || ""}
- City: ${formData.propertyCity || ""}
- State: ${state}
- ZIP: ${formData.propertyZip || ""}
- Legal Description: ${formData.legalDescription || "To be determined from county records"}

GENERAL CONTRACTOR (if claimant is a subcontractor/supplier):
- Name: ${formData.gcName || "N/A"}
- Address: ${formData.gcAddress || "N/A"}

PROJECT INFORMATION:
- Project Type: ${formData.projectType || ""}
- Contract Amount: $${formData.contractAmount || "0"}
- Amount Owed (Lien Amount): $${formData.amountOwed || "0"}
- Date Work Commenced: ${formData.firstWorkDate || ""}
- Date Last Work Performed: ${formData.lastWorkDate || ""}

FORMAT REQUIREMENTS:
1. Use the state-specific title (e.g., "CLAIM OF LIEN", "MECHANIC'S LIEN", "NOTICE OF MECHANIC'S LIEN" -- whatever ${state} requires)
2. Include the proper statutory citation for ${state}'s mechanic's lien statute
3. Include a proper verification/affidavit section
4. Include a notary acknowledgment block
5. Include a signature line for the claimant
6. Format as a recordable document with proper headers
7. Include county recorder filing information where required

Output the complete document text, ready to be formatted into a PDF.`;
}

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get("session_id");
    let formData: Record<string, string>;
    let sendCertified = false;

    if (sessionId) {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      if (session.payment_status !== "paid") {
        return Response.json(
          { error: "Payment not completed" },
          { status: 402 }
        );
      }
      const metadata = session.metadata || {};
      formData = reassembleFormData(metadata);
      sendCertified = metadata.sendCertified === "true";
    } else {
      formData = await request.json();
    }

    const anthropic = new Anthropic();
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [{ role: "user", content: buildPrompt(formData) }],
    });

    const documentText =
      message.content[0].type === "text" ? message.content[0].text : "";

    return Response.json({ document: documentText, sendCertified });
  } catch (error) {
    console.error("Document generation error:", error);
    return Response.json(
      { error: "Failed to generate document" },
      { status: 500 }
    );
  }
}
