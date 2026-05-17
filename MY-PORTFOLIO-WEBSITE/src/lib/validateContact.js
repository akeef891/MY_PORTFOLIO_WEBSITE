const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm({ name, email, message }) {
  const errors = {};
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName) errors.name = "Please enter your name.";
  else if (trimmedName.length < 2) errors.name = "Name should be at least 2 characters.";

  if (!trimmedEmail) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(trimmedEmail)) errors.email = "Please enter a valid email address.";

  if (!trimmedMessage) errors.message = "Please write a short message.";
  else if (trimmedMessage.length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
    values: {
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    },
  };
}
