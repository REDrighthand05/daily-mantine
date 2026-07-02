import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./i18n";
import App from "./App";
import ErrorBoundary from "./components/diagnostics/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <MantineProvider defaultColorScheme="dark">
        <App />
      </MantineProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
