import { jsPDF } from "jspdf";

const PAGE_WIDTH = 215.9; // Letter width in mm
const PAGE_HEIGHT = 279.4; // Letter height in mm
const MARGIN_LEFT = 25.4; // 1 inch
const MARGIN_RIGHT = 25.4;
const MARGIN_TOP = 25.4;
const MARGIN_BOTTOM = 25.4;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
const LINE_HEIGHT = 6;

export function generatePDF(
  documentText: string,
  formData: Record<string, string>
): Buffer {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "letter",
  });

  let y = MARGIN_TOP;

  // --- Helper: add a new page if needed ---
  function checkPageBreak(needed: number) {
    if (y + needed > PAGE_HEIGHT - MARGIN_BOTTOM) {
      doc.addPage();
      y = MARGIN_TOP;
    }
  }

  // --- Header: Recording information ---
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Recording Requested By and", MARGIN_LEFT, y);
  y += 4;
  doc.text("When Recorded Mail To:", MARGIN_LEFT, y);
  y += 4;
  doc.text(formData.claimantName || "_______________", MARGIN_LEFT, y);
  y += 4;
  doc.text(formData.claimantAddress || "_______________", MARGIN_LEFT, y);
  y += 8;

  // --- Horizontal rule ---
  doc.setLineWidth(0.5);
  doc.line(MARGIN_LEFT, y, PAGE_WIDTH - MARGIN_RIGHT, y);
  y += 10;

  // --- Title ---
  const state = formData.state || "___________";
  const title = getLienTitle(state);

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  const titleWidth = doc.getTextWidth(title);
  doc.text(title, (PAGE_WIDTH - titleWidth) / 2, y);
  y += 10;

  // --- State and County ---
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  const stateCounty = `State of ${state}, County of ${formData.county || "___________"}`;
  const scWidth = doc.getTextWidth(stateCounty);
  doc.text(stateCounty, (PAGE_WIDTH - scWidth) / 2, y);
  y += 12;

  // --- Parties Section ---
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("CLAIMANT:", MARGIN_LEFT, y);
  doc.setFont("helvetica", "normal");
  doc.text(formData.claimantName || "_______________", MARGIN_LEFT + 30, y);
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  doc.text("Address:", MARGIN_LEFT, y);
  doc.setFont("helvetica", "normal");
  doc.text(formData.claimantAddress || "_______________", MARGIN_LEFT + 30, y);
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  doc.text("Role:", MARGIN_LEFT, y);
  doc.setFont("helvetica", "normal");
  doc.text(formData.claimantRole || "_______________", MARGIN_LEFT + 30, y);
  y += LINE_HEIGHT * 1.5;

  doc.setFont("helvetica", "bold");
  doc.text("PROPERTY OWNER:", MARGIN_LEFT, y);
  doc.setFont("helvetica", "normal");
  doc.text(
    formData.propertyOwnerName || "_______________",
    MARGIN_LEFT + 50,
    y
  );
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  doc.text("Address:", MARGIN_LEFT, y);
  doc.setFont("helvetica", "normal");
  doc.text(
    formData.propertyOwnerAddress || "_______________",
    MARGIN_LEFT + 30,
    y
  );
  y += LINE_HEIGHT * 1.5;

  doc.setFont("helvetica", "bold");
  doc.text("PROPERTY ADDRESS:", MARGIN_LEFT, y);
  doc.setFont("helvetica", "normal");
  doc.text(
    formData.propertyAddress || "_______________",
    MARGIN_LEFT + 55,
    y
  );
  y += LINE_HEIGHT;

  if (formData.legalDescription) {
    doc.setFont("helvetica", "bold");
    doc.text("Legal Description:", MARGIN_LEFT, y);
    y += LINE_HEIGHT;
    doc.setFont("helvetica", "normal");
    const descLines = doc.splitTextToSize(
      formData.legalDescription,
      CONTENT_WIDTH
    );
    for (const line of descLines) {
      checkPageBreak(LINE_HEIGHT);
      doc.text(line, MARGIN_LEFT, y);
      y += LINE_HEIGHT;
    }
  }
  y += LINE_HEIGHT;

  // --- Lien amounts ---
  checkPageBreak(LINE_HEIGHT * 4);
  doc.setFont("helvetica", "bold");
  doc.text("LIEN AMOUNT:", MARGIN_LEFT, y);
  doc.setFont("helvetica", "normal");
  doc.text(`$${formData.lienAmount || "___________"}`, MARGIN_LEFT + 40, y);
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  doc.text("Contract Amount:", MARGIN_LEFT, y);
  doc.setFont("helvetica", "normal");
  doc.text(
    `$${formData.contractAmount || "___________"}`,
    MARGIN_LEFT + 50,
    y
  );
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  doc.text("Amount Paid:", MARGIN_LEFT, y);
  doc.setFont("helvetica", "normal");
  doc.text(
    `$${formData.amountPaid || "0"}`,
    MARGIN_LEFT + 40,
    y
  );
  y += LINE_HEIGHT * 2;

  // --- Document body ---
  checkPageBreak(LINE_HEIGHT * 2);
  doc.setLineWidth(0.3);
  doc.line(MARGIN_LEFT, y, PAGE_WIDTH - MARGIN_RIGHT, y);
  y += LINE_HEIGHT;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const lines = doc.splitTextToSize(documentText, CONTENT_WIDTH);
  for (const line of lines) {
    checkPageBreak(LINE_HEIGHT);
    doc.text(line, MARGIN_LEFT, y);
    y += 4.5;
  }

  y += LINE_HEIGHT * 2;

  // --- Signature block ---
  checkPageBreak(LINE_HEIGHT * 8);
  doc.setLineWidth(0.3);
  doc.line(MARGIN_LEFT, y, PAGE_WIDTH - MARGIN_RIGHT, y);
  y += LINE_HEIGHT * 2;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Dated: ___________________________", MARGIN_LEFT, y);
  y += LINE_HEIGHT * 3;

  doc.text("_________________________________", MARGIN_LEFT, y);
  y += LINE_HEIGHT;
  doc.text(
    `${formData.claimantName || "Claimant"}, ${formData.claimantRole || "Claimant"}`,
    MARGIN_LEFT,
    y
  );
  y += LINE_HEIGHT * 3;

  // --- Notary block ---
  checkPageBreak(LINE_HEIGHT * 12);
  doc.setFont("helvetica", "bold");
  doc.text("NOTARY ACKNOWLEDGMENT", MARGIN_LEFT, y);
  y += LINE_HEIGHT * 1.5;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const notaryBlock = [
    `State of ${state}`,
    `County of ${formData.county || "___________"}`,
    "",
    `On this _____ day of _______________, 20___, before me, the undersigned,`,
    `a Notary Public in and for said State, personally appeared`,
    `${formData.claimantName || "___________________________"},`,
    `known to me (or proved to me on the basis of satisfactory evidence) to be`,
    `the person whose name is subscribed to the within instrument and acknowledged`,
    `to me that they executed the same in their authorized capacity, and that by`,
    `their signature on the instrument, the person, or the entity upon behalf of`,
    `which the person acted, executed the instrument.`,
    "",
    `WITNESS my hand and official seal.`,
    "",
    "",
    `_________________________________`,
    `Notary Public`,
    `My Commission Expires: ___________`,
  ];

  for (const line of notaryBlock) {
    checkPageBreak(LINE_HEIGHT);
    doc.text(line, MARGIN_LEFT, y);
    y += 4.5;
  }

  // --- Output as Buffer ---
  const arrayBuffer = doc.output("arraybuffer");
  return Buffer.from(arrayBuffer);
}

/**
 * Returns the state-specific title for a mechanic's lien document.
 */
function getLienTitle(state: string): string {
  const titles: Record<string, string> = {
    California: "CLAIM OF MECHANIC'S LIEN",
    Texas: "AFFIDAVIT CLAIMING A MECHANIC'S AND MATERIALMAN'S LIEN",
    Florida: "CLAIM OF LIEN",
    "New York": "NOTICE OF MECHANIC'S LIEN",
    Illinois: "STATEMENT OF CONTRACTOR'S OR SUB-CONTRACTOR'S LIEN",
    Pennsylvania: "MECHANIC'S LIEN CLAIM",
    Ohio: "AFFIDAVIT FOR MECHANIC'S LIEN",
    Georgia: "CLAIM OF LIEN",
    "North Carolina": "CLAIM OF LIEN ON REAL PROPERTY",
    Michigan: "STATEMENT OF LIEN",
    Arizona: "NOTICE AND CLAIM OF MECHANIC'S LIEN",
    Washington: "CLAIM OF LIEN",
    Colorado: "STATEMENT OF LIEN",
    Oregon: "CLAIM OF LIEN",
    Nevada: "NOTICE OF LIEN",
  };

  return titles[state] || "MECHANIC'S LIEN";
}
