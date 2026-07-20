import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";
import { LoaderProvider } from "./context/LoaderContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoaderProvider>
        <App />
      </LoaderProvider>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "16px",
            background: "#fffaf3",
            color: "#2D1B1E",
            border: "1px solid #F5E6B8",
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);