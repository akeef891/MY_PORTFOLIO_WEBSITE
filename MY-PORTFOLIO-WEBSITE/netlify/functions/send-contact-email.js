const { Resend } = require("resend");

const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || "mdakeef2009@gmail.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

exports.handler = async (event) => {
  console.log("[send-contact-email] Function invoked", event.httpMethod);

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    console.log("[send-contact-email] Rejected method:", event.httpMethod);
    return jsonResponse(405, { ok: false, error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[send-contact-email] RESEND_API_KEY is not set");
    return jsonResponse(500, { ok: false, error: "Email service not configured" });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
    console.log("[send-contact-email] Request received for:", payload.email);
  } catch (parseError) {
    console.error("[send-contact-email] Invalid JSON body", parseError);
    return jsonResponse(400, { ok: false, error: "Invalid request body" });
  }

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const message = String(payload.message || "").trim();

  if (!name || !email || !message) {
    console.log("[send-contact-email] Missing required fields");
    return jsonResponse(400, { ok: false, error: "Name, email, and message are required" });
  }

  if (message.length < 10) {
    return jsonResponse(400, { ok: false, error: "Message is too short" });
  }

  const sentAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [NOTIFY_EMAIL],
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      html: `
        <h2>New contact form message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><strong>Sent at:</strong> ${sentAt}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    if (error) {
      console.error("[send-contact-email] Resend API error:", error);
      return jsonResponse(500, { ok: false, error: error.message || "Resend failed to send" });
    }

    console.log("[send-contact-email] Resend success, id:", data?.id);
    return jsonResponse(200, { ok: true, id: data?.id });
  } catch (err) {
    console.error("[send-contact-email] Unexpected error:", err);
    return jsonResponse(500, {
      ok: false,
      error: err.message || "Failed to send notification email",
    });
  }
};
