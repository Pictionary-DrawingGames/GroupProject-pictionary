import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children, setEndGame }) => {
  const [socket, setSocket] = useState(null);
  const [socketData, setSocketData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [players, setPlayers] = useState({});
  const [drawer, setDrawer] = useState(null);
  const [word, setWord] = useState(null);
  const [end, setEnd] = useState(false);

  // Koneksi ke server menggunakan socket.io
  const connectToServer = () => {
    const newSocket = io("http://localhost:3000");

    newSocket.on("connect", () => {
      console.log("Connected to the server");
    });

    newSocket.on("join", data => {
      if (data.payload) {
        setPlayers(data.payload.players);
        setSocketData(data); // Set structured socket data
      }
    });

    newSocket.on("get_id", data => {
      setUserId(data.payload.id);
      setSocketData(data); // Set structured socket data
    });

    newSocket.on("next", data => {
      if (data.payload) {
        setDrawer(data.payload.drawer);
        setPlayers(data.payload.players);
        setSocketData(data); // Set structured socket data
      } else {
        console.error("Payload is null or undefined for 'next' event:", data);
      }
    });

    newSocket.on("set_word", data => {
      if (data.payload) {
        setWord(data.payload.word);
        setSocketData(data); // Set structured socket data
      } else {
        console.error("Payload is null or undefined for 'set_word' event:", data);
      }
    });

    newSocket.on("score", data => {
      if (data.payload) {
        setPlayers(data.payload.players);
        setSocketData(data); // Set structured socket data
      }
    });

    newSocket.on("end", data => {
      if (data.payload) {
        setEndGame(true);
        setPlayers(data.payload.players);
        setEnd(true);
        setSocketData(data); // Set structured socket data
      }
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    newSocket.on("error", err => {
      console.error("Socket error:", err);
    });

    setSocket(newSocket);
  };

  useEffect(() => {
    connectToServer();

    // Cleanup socket connection when component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [setEndGame]);

  // Mengirim data ke server menggunakan socket.io
  const sendData = data => {
    if (socket && data && data.action) {
      // Emit sesuai action
      socket.emit(data.action, data);
    } else {
      console.error("Data atau socket tidak valid untuk dikirim.");
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        socketData,
        userId,
        players,
        drawer,
        word,
        end,
        setWord,
        setPlayers,
        sendData,
        connectToServer,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
