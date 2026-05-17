import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const MESSAGES_COLLECTION = "contactMessages";

export async function saveContactMessage({ name, email, message }) {
  await addDoc(collection(db, MESSAGES_COLLECTION), {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    createdAt: serverTimestamp(),
    source: "portfolio",
  });
}
