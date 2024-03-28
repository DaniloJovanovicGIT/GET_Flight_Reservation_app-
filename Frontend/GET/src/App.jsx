import "./App.css";
import React from "react";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UnathorizedPage from "./pages/UnathorizedPage";
import AdminPanel from "./pages/AdminPanel";
import VisitorPanel from "./pages/VisitorPanel";
import AgentPanel from "./pages/AgentPanel";
import MissingPage from "./pages/MissingPage";
import RequireRole from "./components/RequireRole";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="unathorized" element={<UnathorizedPage />} />
        <Route element={<RequireRole allowedRole="admin"/>}>
          <Route path="adminPanel" element={<AdminPanel />} />
        </Route>
        <Route element={<RequireRole allowedRole="visitor"/>}>
            <Route path="visitorPanel" element={<VisitorPanel />} />
        </Route>
        <Route element={<RequireRole allowedRole="agent"/>}>
            <Route path="agentPanel" element={<AgentPanel />} />
        </Route>
          {/*Catch all*/}
          <Route path="*" element={<MissingPage />} />
        </Route>
    </Routes>
  );
}

export default App;
