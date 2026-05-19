const EMAIL_FUNCTION_URL = "/.netlify/functions/send-contact-email";

export async function sendContactEmailNotification({ name, email, message }) {
  let response;
  try {
    response = await fetch(EMAIL_FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
  } catch (networkError) {
    console.error("[sendContactEmail] Network error:", networkError);
    throw new Error("Could not reach the email service");
  }

  const contentType = response.headers.get("content-type") || "";
  let data = {};

  if (contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = {};
    }
  } else {
    const text = await response.text();
    console.error("[sendContactEmail] Non-JSON response:", {
      status: response.status,
      preview: text.slice(0, 200),
    });
    if (response.status === 404) {
      throw new Error("Email function not deployed (Netlify Functions)");
    }
    throw new Error(`Email service error (HTTP ${response.status})`);
  }

  if (!response.ok || !data.ok) {
    console.error("[sendContactEmail] Failed:", {
      status: response.status,
      error: data.error,
      data,
    });
    throw new Error(data.error || `Email notification failed (HTTP ${response.status})`);
  }

  console.log("[sendContactEmail] Notification sent, id:", data.id);
  return data;
}
