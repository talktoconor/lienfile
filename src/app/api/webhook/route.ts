import { getStripe } from "@/lib/stripe";
import { generateLienDocument } from "@/lib/generate-document";
import { generatePDF } from "@/lib/generate-pdf";
import { getResend } from "@/lib/resend";
import type Stripe from "stripe";

export const runtime = "nodejs";

// Reassemble form data that may have been split across multiple metadata keys
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

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};
    const tier = metadata.tier;
    const formData = extractFormData(metadata);

    try {
      // Generate the lien document using Claude AI
      const documentText = await generateLienDocument(formData);

      // Generate the PDF
      const pdfBuffer = generatePDF(documentText, formData);

      // Send confirmation email via Resend
      const customerEmail = session.customer_details?.email;
      if (customerEmail) {
        await getResend().emails.send({
          from: "LienFile.io <noreply@lienfile.io>",
          to: customerEmail,
          subject: `Your ${tier} document is ready - LienFile.io`,
          html: `
            <h1>Your Lien Document is Ready</h1>
            <p>Thank you for your purchase. Your ${tier} document has been generated.</p>
            <p>You can download your document from your confirmation page, or use the link below:</p>
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/file/success?session_id=${session.id}">Download Document</a></p>
            <p>If you have any questions, reply to this email.</p>
            <p>- The LienFile.io Team</p>
          `,
          attachments: [
            {
              filename: "lien-document.pdf",
              content: pdfBuffer.toString("base64"),
            },
          ],
        });
      }

      // TODO: If tier includes certified mail, queue Lob API call
      // Tiers "preliminary-notice", "lien-document", and "full-protection"
      // all include certified mail delivery
      if (
        tier === "preliminary-notice" ||
        tier === "lien-document" ||
        tier === "full-protection"
      ) {
        // TODO: Queue Lob API call for certified mail delivery
        // await queueCertifiedMail({
        //   to: formData.propertyOwnerAddress,
        //   from: formData.claimantAddress,
        //   document: pdfBuffer,
        // });
        console.log(`TODO: Queue certified mail for session ${session.id}`);
      }

      // TODO: Set up deadline reminders
      // Each state has different lien enforcement deadlines.
      // Set up a reminder sequence based on the state's requirements.
      // await scheduleDeadlineReminders({
      //   email: customerEmail,
      //   state: formData.state,
      //   filingDate: new Date(),
      //   tier,
      // });
      console.log(`TODO: Set up deadline reminders for session ${session.id}`);
    } catch (error) {
      console.error("Error processing checkout completion:", error);
      // Don't return an error to Stripe -- we've received the webhook
      // and can retry processing later
    }
  }

  return new Response("OK", { status: 200 });
}
