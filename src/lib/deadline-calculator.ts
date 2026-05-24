import { STATES } from "./states-data";

export interface DeadlineResult {
  preliminaryNoticeDeadline?: Date;
  lienFilingDeadline: Date;
  enforcementDeadline: Date;
  daysRemaining: number;
}

/**
 * Parse a days-based deadline string and extract the number of days.
 * Handles formats like "90 days", "8 months", "120 days", "1 year", etc.
 */
function parseDaysFromDeadline(deadlineStr: string): number {
  const lower = deadlineStr.toLowerCase();

  // Try to extract months
  const monthMatch = lower.match(/(\d+)\s*month/);
  if (monthMatch) {
    return parseInt(monthMatch[1]) * 30;
  }

  // Try to extract years
  const yearMatch = lower.match(/(\d+)\s*year/);
  if (yearMatch) {
    return parseInt(yearMatch[1]) * 365;
  }

  // Try to extract days
  const dayMatch = lower.match(/(\d+)\s*day/);
  if (dayMatch) {
    return parseInt(dayMatch[1]);
  }

  // Try to extract "15th day of the Xth month" pattern (Texas-style)
  const ordinalMonthMatch = lower.match(/(\d+)(?:st|nd|rd|th)\s*day\s*of\s*the\s*(\d+)(?:st|nd|rd|th)\s*month/);
  if (ordinalMonthMatch) {
    const months = parseInt(ordinalMonthMatch[2]);
    return months * 30 + parseInt(ordinalMonthMatch[1]);
  }

  // Default to 90 days if unparseable
  return 90;
}

/**
 * Calculate key deadlines based on state lien laws, claimant role, and last day of work.
 *
 * @param state - State slug (e.g., "california", "new-york")
 * @param role - Claimant role (e.g., "General Contractor", "Subcontractor")
 * @param lastDayOfWork - ISO date string for the last day of work (e.g., "2026-03-15")
 * @returns Object with calculated deadlines and days remaining until the most urgent one
 */
export function calculateDeadlines(
  state: string,
  role: string,
  lastDayOfWork: string
): DeadlineResult {
  const stateData = STATES[state];
  if (!stateData) {
    throw new Error(`Unknown state: ${state}. Use the state slug (e.g., "california", "new-york").`);
  }

  const lastWorkDate = new Date(lastDayOfWork);
  if (isNaN(lastWorkDate.getTime())) {
    throw new Error(`Invalid date: ${lastDayOfWork}. Use ISO format (e.g., "2026-03-15").`);
  }

  const now = new Date();

  // Calculate preliminary notice deadline (if required)
  let preliminaryNoticeDeadline: Date | undefined;
  if (stateData.preliminaryNotice.required) {
    const prelimDays = parseDaysFromDeadline(stateData.preliminaryNotice.deadline);
    preliminaryNoticeDeadline = new Date(lastWorkDate);
    preliminaryNoticeDeadline.setDate(preliminaryNoticeDeadline.getDate() + prelimDays);
  }

  // Calculate lien filing deadline
  const lienDays = parseDaysFromDeadline(stateData.lienDeadline);
  const lienFilingDeadline = new Date(lastWorkDate);
  lienFilingDeadline.setDate(lienFilingDeadline.getDate() + lienDays);

  // Calculate enforcement deadline (from the lien filing deadline)
  const enforcementDays = parseDaysFromDeadline(stateData.enforcementDeadline);
  const enforcementDeadline = new Date(lienFilingDeadline);
  enforcementDeadline.setDate(enforcementDeadline.getDate() + enforcementDays);

  // Calculate days remaining until the most urgent upcoming deadline
  const upcomingDeadlines: Date[] = [lienFilingDeadline, enforcementDeadline];
  if (preliminaryNoticeDeadline) {
    upcomingDeadlines.push(preliminaryNoticeDeadline);
  }

  const futureDeadlines = upcomingDeadlines.filter((d) => d.getTime() > now.getTime());
  let daysRemaining: number;

  if (futureDeadlines.length === 0) {
    // All deadlines have passed
    const mostRecent = upcomingDeadlines.reduce((a, b) => (a > b ? a : b));
    daysRemaining = Math.floor((mostRecent.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  } else {
    const nextDeadline = futureDeadlines.reduce((a, b) => (a < b ? a : b));
    daysRemaining = Math.floor((nextDeadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  }

  return {
    preliminaryNoticeDeadline,
    lienFilingDeadline,
    enforcementDeadline,
    daysRemaining,
  };
}
