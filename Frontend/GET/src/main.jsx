import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ErrorProvider } from "./context/ErrorContext.jsx";
import { InfoProvider } from "./context/InfoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <InfoProvider>
        <ErrorProvider>
          <AuthProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </AuthProvider>
        </ErrorProvider>
      </InfoProvider>
    </BrowserRouter>
  </React.StrictMode>
);
