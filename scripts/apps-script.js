// ═══════════════════════════════════════════════════
//  Wedding Apps Script
//  Handles: Guest List · RSVP · Guestbook
// ═══════════════════════════════════════════════════

const SHEET_NAME_GUESTS    = "Guests";
const SHEET_NAME_RSVP      = "RSVP";
const SHEET_NAME_GUESTBOOK = "Guestbook";

// ── CORS headers for all responses ─────────────────
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ═══════════════════════════════════════════════════
//  GET handler — serves guest list
// ═══════════════════════════════════════════════════
function doGet(e) {
  try {
    const action = e.parameter.action || "guests";

    if (action === "guests") {
      return getGuests();
    }

    if (action === "guestbook") {
      return getGuestbook();
    }

    return jsonResponse({ error: "Unknown action" });

  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

function getGuests() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME_GUESTS);
  const rows  = sheet.getDataRange().getValues();

  // Skip header row
  const guests = rows.slice(1)
    .filter(r => r[0] && r[1])            // must have slug + name
    .map(r => ({
      slug:  String(r[0]).trim().toLowerCase(),
      name:  String(r[1]).trim(),
      table: String(r[2] || "").trim(),
    }));

  return jsonResponse(guests);
}

function getGuestbook() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME_GUESTBOOK);
  const rows  = sheet.getDataRange().getValues();

  // Only return approved messages (col 5 = "yes")
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

// ═══════════════════════════════════════════════════
//  POST handler — RSVP + Guestbook submissions
// ═══════════════════════════════════════════════════
function doPost(e) {
  try {
    const body   = JSON.parse(e.postData.contents);
    const action = body.action;

    if (action === "rsvp") {
      return submitRSVP(body);
    }

    if (action === "guestbook") {
      return submitGuestbook(body);
    }

    return jsonResponse({ success: false, error: "Unknown action" });

  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function submitRSVP(data) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME_RSVP);

  sheet.appendRow([
    new Date().toISOString(),
    data.name      || "",
    data.phone     || "",
    data.email     || "",
    data.guests    || "1",
    data.attending || "",
    data.meal      || "",
    data.notes     || "",
  ]);

  // Optional: send notification email to yourself
  // MailApp.sendEmail("your@email.com", "New RSVP: " + data.name, JSON.stringify(data));

  return jsonResponse({ success: true, message: "RSVP received!" });
}

function submitGuestbook(data) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME_GUESTBOOK);

  sheet.appendRow([
    new Date().toISOString(),
    data.name     || "",
    data.relation || "",
    data.message  || "",
    "pending",     // approved column — change to "yes" in sheet to show publicly
  ]);

  return jsonResponse({ success: true, message: "Message received!" });
}
