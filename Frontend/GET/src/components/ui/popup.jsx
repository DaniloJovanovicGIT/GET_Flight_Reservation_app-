import React from "react";
import ReactDOM from "react-dom";
import "./Popup.css"; 

const Popup = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("popup-root")
  );
};

export default Popup;