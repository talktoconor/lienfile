import { getStripe } from "@/lib/stripe";

function parseAddress(raw: string) {
  const parts = raw.split(",").map((s) => s.trim());
  if (parts.length >= 3) {
    const stateZip = parts[parts.length - 1].split(/\s+/);
    const zip = stateZip.pop() || "";
    const state = stateZip.join(" ");
    const city = parts[parts.length - 2];
    const line1 = parts.slice(0, parts.length - 2).join(", ");
    return {
      address_line1: line1,
      address_city: city,
      address_state: state,
      address_zip: zip,
      address_country: "US" as const,
    };
  }
  return { address_line1: raw, address_country: "US" as const };
}

function reassembleFormData(
  metadata: Record<string, string>
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

export async function POST(request: Request) {
  try {
    const { sessionId, documentText } = await request.json();

    if (!sessionId) {
      return Response.json({ error: "Missing session ID" }, { status: 400 });
    }

    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return Response.json(
        { error: "Payment not completed" },
        { status: 403 }
      );
    }

    const metadata = session.metadata || {};
    if (metadata.sendCertified !== "true") {
      return Response.json(
        { error: "Certified mail not purchased" },
        { status: 400 }
      );
    }

    const formData = reassembleFormData(metadata);

    const recipientName = formData.propertyOwnerName;
    const recipientAddress = [
      formData.propertyStreet,
      formData.propertyCity,
      `${formData.propertyState} ${formData.propertyZip}`,
    ]
      .filter(Boolean)
      .join(", ");

    const senderName = formData.companyName;
    const senderAddress = formData.companyAddress;

    if (!recipientAddress || !senderAddress) {
      return Response.json(
        { error: "Both sender and recipient addresses are required" },
        { status: 400 }
      );
    }

    const lobApiKey = process.env.LOB_API_KEY;
    if (!lobApiKey) {
      return Response.json(
        { error: "Mail service not configured" },
        { status: 500 }
      );
    }

    const lobRes = await fetch("https://api.lob.com/v1/letters", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(lobApiKey + ":").toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: `Mechanic's lien notice to ${recipientName}`,
        to: {
          name: recipientName,
          ...parseAddress(recipientAddress),
        },
        from: {
          name: senderName,
          ...parseAddress(senderAddress),
        },
        file: `<html><body style="font-family: Georgia, serif; font-size: 12pt; line-height: 1.6; margin: 1in; white-space: pre-wrap;">${documentText}</body></html>`,
        color: false,
        mail_type: "usps_first_class",
        extra_service: "certified",
        return_envelope: false,
      }),
    });

    const lobData = await lobRes.json();

    if (!lobRes.ok) {
      console.error("Lob API error:", lobData);
      return Response.json(
        { error: "Failed to send certified mail" },
        { status: 500 }
      );
    }

    return Response.json({
      trackingNumber: lobData.tracking_number,
      expectedDelivery: lobData.expected_delivery_date,
      carrier: "USPS",
      letterId: lobData.id,
    });
  } catch (err) {
    console.error("Certified mail error:", err);
    return Response.json(
      { error: "Failed to send certified mail" },
      { status: 500 }
    );
  }
}
