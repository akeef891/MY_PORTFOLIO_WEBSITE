const EMAIL_FUNCTION_URL = "/.netlify/functions/send-contact-email";

export async function sendContactEmailNotification({ name, email, message }) {
  const response = await fetch(EMAIL_FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok || !data.ok) {
    throw new Error(data.error || "Email notification failed");
  }

  return data;
}
