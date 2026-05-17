import { contact, personal } from "../data/portfolio";

const FORM_ENDPOINT = contact.formSubmitUrl;
const REQUEST_TIMEOUT_MS = 25000;

/** FormSubmit AJAX returns success as boolean true or a thank-you string. */
function isSuccessResponse(data) {
  if (!data || typeof data !== "object") return false;
  const { success } = data;
  if (success === true || success === "true") return true;
  if (typeof success === "string" && success.trim().length > 0) return true;
  return false;
}

function getErrorMessage(data, status, rawText) {
  if (data?.message && typeof data.message === "string") {
    if (/activat/i.test(data.message)) {
      return "Check mdakeef2009@gmail.com to activate FormSubmit, then try again.";
    }
    return data.message;
  }
  if (data?.title && typeof data.title === "string" && status >= 500) {
    return "Form service is temporarily unavailable. Use Email me instead.";
  }
  if (status === 422) return "Please check your details and try again.";
  if (status >= 500) return "Form service is temporarily unavailable. Use Email me instead.";
  if (rawText && /activat/i.test(rawText)) {
    return "Check mdakeef2009@gmail.com to activate FormSubmit, then try again.";
  }
  return "Couldn't send right now. Try emailing me directly.";
}

async function readResponseBody(response) {
  const text = await response.text();
  if (!text) return { data: null, text: "" };
  try {
    return { data: JSON.parse(text), text };
  } catch {
    return { data: null, text };
  }
}

function evaluateResponse(response, data, text) {
  if (isSuccessResponse(data)) {
    return { ok: true };
  }

  if (response.ok && /thank you|thanks for|successfully/i.test(text)) {
    return { ok: true };
  }

  return {
    ok: false,
    message: getErrorMessage(data, response.status, text),
  };
}

function buildFormData(values) {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("email", values.email);
  formData.append("message", values.message);
  formData.append("_subject", `Portfolio message from ${values.name}`);
  formData.append("_replyto", values.email);
  formData.append("_template", "table");
  formData.append("_captcha", "false");
  return formData;
}

function buildJsonBody(values) {
  return JSON.stringify({
    name: values.name,
    email: values.email,
    message: values.message,
    _subject: `Portfolio message from ${values.name}`,
    _replyto: values.email,
    _template: "table",
    _captcha: false,
  });
}

async function postFormData(values, signal) {
  return fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: buildFormData(values),
    signal,
    mode: "cors",
  });
}

async function postJson(values, signal) {
  return fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: buildJsonBody(values),
    signal,
    mode: "cors",
  });
}

/**
 * Submit contact form via FormSubmit AJAX API.
 * @see https://formsubmit.co/ajax-documentation
 */
export async function submitContactForm(values) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const attempts = [postJson, postFormData];
  let lastResult = {
    ok: false,
    message: "Couldn't send right now. Try emailing me directly.",
  };

  try {
    for (const attempt of attempts) {
      const response = await attempt(values, controller.signal);
      const { data, text } = await readResponseBody(response);
      const result = evaluateResponse(response, data, text);

      if (result.ok) {
        return result;
      }

      lastResult = result;

      if (result.message?.includes("activate FormSubmit")) {
        return result;
      }
    }

    return lastResult;
  } catch (err) {
    if (err?.name === "AbortError") {
      return { ok: false, message: "Request timed out. Please try again or use Email me." };
    }
    return {
      ok: false,
      message: `Couldn't send right now. Email ${personal.email} directly.`,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
