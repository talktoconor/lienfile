import { getStripe } from "@/lib/stripe";
import { PRICING_TIERS } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const { tier, formData } = await request.json();

    // Find the matching pricing tier
    const pricingTier = PRICING_TIERS.find((t) => t.id === tier);
    if (!pricingTier) {
      return Response.json({ error: "Invalid tier" }, { status: 400 });
    }

    // Stripe metadata values are limited to 500 characters each.
    // Split the form data JSON across multiple metadata keys if needed.
    const formDataJson = JSON.stringify(formData);
    const metadata: Record<string, string> = { tier };
    const chunkSize = 490;

    if (formDataJson.length <= chunkSize) {
      metadata.formData = formDataJson;
    } else {
      const chunks = Math.ceil(formDataJson.length / chunkSize);
      for (let i = 0; i < chunks; i++) {
        metadata[`formData_${i}`] = formDataJson.slice(
          i * chunkSize,
          (i + 1) * chunkSize
        );
      }
      metadata.formDataChunks = String(chunks);
    }

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: pricingTier.stripePriceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/file/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/file`,
      metadata,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return Response.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
