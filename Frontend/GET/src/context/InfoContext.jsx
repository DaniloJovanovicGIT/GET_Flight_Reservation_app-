import React, { createContext, useContext, useState } from 'react';

const InfoContext = createContext();

export const useInfo = () => useContext(InfoContext);

export const InfoProvider = ({ children }) => {
  const [infos, setInfos] = useState([]);

  const addInfo = (infoMessage) => {
    setInfos((prevInfos) => [...prevInfos, infoMessage]);
  };

  const clearInfos = () => {
    setInfos([]);
  };

  return (
    <InfoContext.Provider value={{ infos, addInfo, clearInfos }}>
      {children}
    </InfoContext.Provider>
  );
};
