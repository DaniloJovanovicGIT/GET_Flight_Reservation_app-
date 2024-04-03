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
import ErrorPopup from "./components/ErrorPopup";
import AddFlightPage from "./pages/AgentAddFlightPage";
import AgentReservationsPage from "./pages/AgentReservationsPage";
import AgentsFlights from "./pages/AgentsFlights";
import VisitorFlightsPage from "./pages/VisitorFlightsPage";
import VisitorReservationsPage from "./pages/VisitorReservationsPage";
import AdminFlightsPage from "./pages/AdminFlightsPage";
import AdminAddUserPage from "./pages/AdminAddUserPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="unathorized" element={<UnathorizedPage />} />
          <Route element={<RequireRole allowedRole="admin" />}>
            <Route path="adminPanel" element={<AdminPanel />}>
              <Route path="flights" element={<AdminFlightsPage />} />
              <Route path="users" element={<AdminAddUserPage />} />
            </Route>
          </Route>
          <Route element={<RequireRole allowedRole="visitor" />}>
            <Route path="visitorPanel" element={<VisitorPanel />}>
              <Route path="flights" element={<VisitorFlightsPage />} />
              <Route
                path="reservations"
                element={<VisitorReservationsPage />}
              />
            </Route>
          </Route>
          <Route element={<RequireRole allowedRole="agent" />}>
            <Route path="agentPanel" element={<AgentPanel />}>
              <Route path="addFlight" element={<AddFlightPage />} />
              <Route path="agentsflights" element={<AgentsFlights />} />
              <Route path="reservations" element={<AgentReservationsPage />} />
            </Route>
          </Route>
          {/*Catch all*/}
          <Route path="*" element={<MissingPage />} />
        </Route>
      </Routes>
      {<ErrorPopup />}
    </>
  );
}

export default App;
