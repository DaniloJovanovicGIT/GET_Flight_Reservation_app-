import React from "react";
import { useError } from "../context/ErrorContext";
import Popup from "./ui/popup";

function ErrorPopup() {
  const { errors, clearErrors } = useError();

  const handleClose = () => {
    clearErrors();
  };

  return (
    errors.length > 0 && (
        <Popup onClose={handleClose}>
          <h2>Error</h2>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Popup>
    )
  );
}

export default ErrorPopup;
