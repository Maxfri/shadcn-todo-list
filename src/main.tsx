import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactQueryProvider } from "./app/providers/ReactQueryProvider.tsx";
import { ThemeProvider } from "./shared/lib/themeContext.tsx";

import App from "./app";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ReactQueryProvider>
  </StrictMode>
);
