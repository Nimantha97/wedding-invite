// ═══════════════════════════════════════════════════
//  Wedding Apps Script  v2
//  POST body is now application/x-www-form-urlencoded
//  (avoids CORS preflight — no OPTIONS request needed)
// ═══════════════════════════════════════════════════

const SHEET_NAME_GUESTS    = "Guests";
const SHEET_NAME_RSVP      = "RSVP";
const SHEET_NAME_GUESTBOOK = "Guestbook";

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── GET ─────────────────────────────────────────────
function doGet(e) {
  try {
    const action = e.parameter.action || "guests";
    if (action === "guests")    return getGuests();
    if (action === "guestbook") return getGuestbook();
    return jsonResponse({ error: "Unknown action" });
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

function getGuests() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME_GUESTS);
  const rows  = sheet.getDataRange().getValues();
  const guests = rows.slice(1)
    .filter(r => r[0] && r[1])
    .map(r => ({
      slug:  String(r[0]).trim().toLowerCase(),
      name:  String(r[1]).trim(),
      table: String(r[2] || "").trim(),
    }));
  return jsonResponse(guests);
}

function getGuestbook() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME_GUESTBOOK);
  const rows  = sheet.getDataRange().getValues();
  const messages = rows.slice(1)
    .filter(r => r[0] && String(r[4]).toLowerCase() === "yes")
    .map(r => ({
      timestamp: String(r[0]),
      name:      String(r[1]).trim(),
      relation:  String(r[2]).trim(),
      message:   String(r[3]).trim(),
    }));
  return jsonResponse(messages);
}

// ── POST — reads form-encoded body (e.parameter) ────
// Browser sends application/x-www-form-urlencoded
// which doesn't trigger a CORS preflight OPTIONS request.
function doPost(e) {
  try {
    // e.parameter contains all form fields as key-value pairs
    const p      = e.parameter;
    const action = p.action;

    if (action === "rsvp")      return submitRSVP(p);
    if (action === "guestbook") return submitGuestbook(p);

    return jsonResponse({ success: false, error: "Unknown action" });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function submitRSVP(p) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME_RSVP);
  sheet.appendRow([
    new Date().toISOString(),
    p.name      || "",
    p.phone     || "",
    p.email     || "",
    p.guests    || "1",
    p.attending || "",
    p.meal      || "",
    p.notes     || "",
  ]);

  // Uncomment to get email notifications:
  // MailApp.sendEmail("your@email.com", "New RSVP: " + p.name, JSON.stringify(p));

  return jsonResponse({ success: true, message: "RSVP received!" });
}

function submitGuestbook(p) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME_GUESTBOOK);
  sheet.appendRow([
    new Date().toISOString(),
    p.name     || "",
    p.relation || "",
    p.message  || "",
    "pending",
  ]);
  return jsonResponse({ success: true, message: "Message received!" });
}
