import { Button } from "@/components/ui/button";
import useCities from "@/hooks/useCities";
import React, { useState } from "react";
import axios from "axios";
import { useError } from "@/context/ErrorContext";
import useAddFlight from "@/hooks/useAddFlight";
import Popup from "@/components/ui/popup";
import { useInfo } from "@/context/InfoContext";

function AddFlightPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [numberOfConnections, setNumberOfConnections] = useState(0);
  const [availableSeats, setAvailableSeats] = useState(0);
  const { cities, loading, error } = useCities();
  const { addError } = useError();
  const { addInfo } = useInfo();
  const { addFlight } = useAddFlight();

  const handleDepartureCityChange = (event) => {
    setDepartureCity(event.target.value);
  };

  const handleArrivalCityChange = (event) => {
    setArrivalCity(event.target.value);
  };

  const handleDepartureDateChange = (event) => {
    setDepartureDate(event.target.value);
  };

  const handleNumberOfConnectionsChange = (event) => {
    setNumberOfConnections(parseInt(event.target.value));
  };

  const handleAvailableSeatsChange = (event) => {
    setAvailableSeats(parseInt(event.target.value));
  };

  const handleFlighSavedSuccesfully = () => {
    addInfo("Flight saved successfully");
    setDepartureCity("");
    setArrivalCity("");
    setAvailableSeats(0);
    setNumberOfConnections(0);
    setDepartureDate(0);
    setShowPopup(true);
  }

  const closePopup = () =>{
    setShowPopup(false)
  }

  const validateForm = () => {
    if (!departureCity) {
      addError("Departure city is required");
      return false;
    }
    if (!arrivalCity) {
      addError("Arrival city is required");
      return false;
    }
    if (!departureDate) {
      addError("Departure date is required");
      return false;
    }
    if (!availableSeats) {
      addError("Available seats count is required");
      return false;
    }
    if (availableSeats < 1) {
      addError("Available seats must be greater than 0");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    const formData = {
      DepartureCityID: departureCity,
      ArrivalCityID: arrivalCity,
      departureDate: departureDate,
      numberOfConnections: numberOfConnections,
      availableSeatsCount: availableSeats,
    };
    try {
      const response = addFlight(formData);
      handleFlighSavedSuccesfully();
    } catch (error) {
      addError(error.message);
    }
  };

  return (
    <section className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Departure:</label>
          <select
            value={departureCity}
            onChange={handleDepartureCityChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select departure city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Arrival:</label>
          <select
            value={arrivalCity}
            onChange={handleArrivalCityChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select arrival city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Departure Date:</label>
          <input
            type="date"
            value={departureDate}
            onChange={handleDepartureDateChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1">Number of Connections:</label>
          <input
            type="number"
            value={numberOfConnections}
            onChange={handleNumberOfConnectionsChange}
            className="w-full px-3 py-2 border rounded-md"
            min={0}
          />
        </div>
        <div>
          <label className="block mb-1">Available Seats:</label>
          <input
            type="number"
            value={availableSeats}
            onChange={handleAvailableSeatsChange}
            className="w-full px-3 py-2 border rounded-md"
            min={1}
          />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
      {showPopup && <Popup onClose={closePopup()}>FLight saved successfully</Popup>}
    </section>
  );
}

export default AddFlightPage;
