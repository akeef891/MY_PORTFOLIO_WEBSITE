import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/navbar-blur-fix.css";
import MotionProvider from "./components/providers/MotionProvider";
import App from "./App.jsx";
import { initAnalytics } from "./lib/firebase";

if (typeof window !== "undefined") {
  const runAnalytics = () => {
    void initAnalytics();
  };
  if ("requestIdleCallback" in window) {
    requestIdleCallback(runAnalytics, { timeout: 2500 });
  } else {
    window.setTimeout(runAnalytics, 1200);
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MotionProvider>
      <App />
    </MotionProvider>
  </StrictMode>
);
