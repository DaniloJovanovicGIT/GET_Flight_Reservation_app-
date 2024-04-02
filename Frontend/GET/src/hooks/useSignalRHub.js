import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const useSignalRHub = (hubLocation) => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5278/" + hubLocation)
      .withAutomaticReconnect()
      .build();

    newConnection.start()
      .then(() => {
        console.log('SignalR Connected');
        setConnection(newConnection);
      })
      .catch((err) => console.error(err));

    return () => {
      if (newConnection) { // Access newConnection instead of connection
        newConnection.stop();
      }
    };
  }, [hubLocation]); 

  return connection;
};

export default useSignalRHub;
