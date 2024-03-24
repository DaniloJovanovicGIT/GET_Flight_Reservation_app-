import { Table } from "lucide-react";
import "./App.css";
import { Button } from "./components/ui/button";
import FlightPage from "./pages/FlightPage";
import AddFlightPage from "./pages/AddFlightPage";

function App() {
  return (
    <main>
      <FlightPage />
      <AddFlightPage/>
    </main>
  );
}

export default App;
