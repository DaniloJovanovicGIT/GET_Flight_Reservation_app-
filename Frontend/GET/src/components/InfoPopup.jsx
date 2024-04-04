import React from "react";
import { useInfo } from "../context/InfoContext";
import Popup from "./ui/popup";

function InfoPopup() {
  const { infos, clearInfos } = useInfo();

  const handleClose = () => {
    clearInfos();
  };

  return (
    infos.length > 0 && (
        <Popup onClose={handleClose}>
          <h2>Info</h2>
          <ul>
            {infos.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        </Popup>
    )
  );
}

export default InfoPopup;
