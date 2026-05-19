/**
 * Netlify Function: portfolio contact form email via Resend HTTP API.
 * Env (set in Netlify UI → Site configuration → Environment variables):
 *   RESEND_API_KEY          — required
 *   CONTACT_NOTIFY_EMAIL    — default mdakeef2009@gmail.com
 *   RESEND_FROM_EMAIL       — default "Portfolio <onboarding@resend.dev>"
 *
 * With onboarding@resend.dev (no verified domain), Resend only delivers to the
 * account owner's email or Resend test addresses until a domain is verified.
 */

const RESEND_API_URL = "https://api.resend.com/emails";
const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || "mdakeef2009@gmail.com";
const DEFAULT_FROM = "Portfolio <onboarding@resend.dev>";

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

/** Normalize from address; fix common typos like spaces in onboarding@resend.dev */
function resolveFromAddress() {
  const raw = (process.env.RESEND_FROM_EMAIL || DEFAULT_FROM).trim();
  return raw.replace(/on\s+boarding@resend\.dev/gi, "onboarding@resend.dev");
}

function formatResendError(payload, status) {
  if (!payload || typeof payload !== "object") {
    return `Resend request failed (HTTP ${status})`;
  }
  const message = payload.message || payload.error || payload.name;
  if (message) return String(message);
  return `Resend request failed (HTTP ${status})`;
}

async function sendWithResend(apiKey, emailPayload) {
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailPayload),
  });

  let body = {};
  const text = await response.text();
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      console.error("[send-contact-email] Non-JSON Resend response:", text.slice(0, 500));
      body = { message: text.slice(0, 200) };
    }
  }

  return { ok: response.ok, status: response.status, body };
}

exports.handler = async (event) => {
  console.log("[send-contact-email] Invoked", {
    method: event.httpMethod,
    hasBody: Boolean(event.body),
  });

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { ok: false, error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error(
      "[send-contact-email] RESEND_API_KEY is missing. Add it in Netlify → Environment variables."
    );
    return jsonResponse(500, { ok: false, error: "Email service not configured" });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (parseError) {
    console.error("[send-contact-email] Invalid JSON body:", parseError);
    return jsonResponse(400, { ok: false, error: "Invalid request body" });
  }

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const message = String(payload.message || "").trim();

  console.log("[send-contact-email] Payload validated for sender:", email);

  if (!name || !email || !message) {
    return jsonResponse(400, { ok: false, error: "Name, email, and message are required" });
  }

  if (message.length < 10) {
    return jsonResponse(400, { ok: false, error: "Message is too short" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return jsonResponse(400, { ok: false, error: "Invalid email address" });
  }

  const from = resolveFromAddress();
  const sentAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const html = `
    <h2>New portfolio contact message</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
    <p><strong>Sent at:</strong> ${sentAt} (IST)</p>
    <hr />
    <p><strong>Message:</strong></p>
    <p>${safeMessage}</p>
  `.trim();

  const text = [
    "New portfolio contact message",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Sent at: ${sentAt} (IST)`,
    "",
    "Message:",
    message,
  ].join("\n");

  const resendPayload = {
    from,
    to: [NOTIFY_EMAIL],
    reply_to: email,
    subject: `Portfolio contact — ${name}`,
    html,
    text,
  };

  console.log("[send-contact-email] Sending via Resend", {
    from,
    to: NOTIFY_EMAIL,
    reply_to: email,
  });

  try {
    const { ok, status, body } = await sendWithResend(apiKey, resendPayload);

    if (!ok) {
      const errorMessage = formatResendError(body, status);
      console.error("[send-contact-email] Resend API error:", {
        status,
        name: body?.name,
        message: body?.message,
        body,
      });

      if (
        status === 403 &&
        /only send testing emails|verify a domain|not authorized/i.test(errorMessage)
      ) {
        console.error(
          "[send-contact-email] Hint: With onboarding@resend.dev, set CONTACT_NOTIFY_EMAIL to your Resend account email, or verify a domain and set RESEND_FROM_EMAIL to that domain."
        );
      }

      return jsonResponse(500, { ok: false, error: errorMessage });
    }

    const messageId = body?.id;
    console.log("[send-contact-email] Resend success, id:", messageId);
    return jsonResponse(200, { ok: true, id: messageId });
  } catch (err) {
    console.error("[send-contact-email] Network or unexpected error:", err);
    return jsonResponse(500, {
      ok: false,
      error: err.message || "Failed to send notification email",
    });
  }
};
