import React from "react";
import FlightPage from "../components/FlightsTable";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Link to="login">Login</Link>
      <FlightPage />
    </>
  );
}

export default Home;
