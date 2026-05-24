import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export async function generateLienDocument(
  formData: Record<string, string>
): Promise<string> {
  const prompt = `Generate a formal mechanic's lien document for the state of ${formData.state}.

This must be a legally formatted document that complies with ${formData.state}'s specific statutory requirements for mechanic's liens. Include all required statutory references and formatting.

Use the following information:

CLAIMANT (Person/Company Filing the Lien):
- Name: ${formData.claimantName}
- Address: ${formData.claimantAddress}
- Role: ${formData.claimantRole}

PROPERTY OWNER:
- Name: ${formData.propertyOwnerName}
- Address: ${formData.propertyOwnerAddress}

PROPERTY INFORMATION:
- Property Address: ${formData.propertyAddress}
- County: ${formData.county}
- State: ${formData.state}
- Legal Description: ${formData.legalDescription || "To be determined from county records"}

GENERAL CONTRACTOR (if claimant is a subcontractor/supplier):
- Name: ${formData.generalContractorName || "N/A"}

PROJECT INFORMATION:
- Project Type: ${formData.projectType}
- Description of Work/Materials: ${formData.workDescription}
- Contract Amount: $${formData.contractAmount}
- Amount Paid to Date: $${formData.amountPaid || "0"}
- Amount Owed (Lien Amount): $${formData.lienAmount}
- Date Work Commenced: ${formData.workStartDate}
- Date Last Work Performed: ${formData.lastWorkDate}

FORMAT REQUIREMENTS:
1. Use the correct state-specific title for this type of document
2. Include the proper statutory citation for ${formData.state}'s mechanic's lien statute
3. Include a proper verification/affidavit section with oath language
4. Include a notary acknowledgment block appropriate for ${formData.state}
5. Include a signature line for the claimant
6. Format as a recordable document with proper headers
7. Include county recorder filing information if required by ${formData.state}
8. Include all paragraphs and recitals required by ${formData.state} law

Output ONLY the document text. Do not include any commentary or explanation outside the document itself.`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";

  if (!text) {
    throw new Error("Failed to generate document: empty response from AI");
  }

  return text;
}
