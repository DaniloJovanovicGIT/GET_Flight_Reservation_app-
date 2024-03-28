import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

function Layout() {
  return (
    <main className="app">
        <h1>GET Flight Reservation System</h1>
      <Outlet />
    </main>
  );
}

export default Layout;
