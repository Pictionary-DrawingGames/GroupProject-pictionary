import { RouterProvider } from "react-router-dom";
import router from "./routers/router";
import { SocketProvider } from "./context/SocketProvider"; // Pastikan import provider dari file yang benar
import { useState } from "react";
import LobbyPage from "./views/LobbyPage";
import GamePage from "./views/GamePage";
import MainPage from "./views/MainPage";

function App() {
  const [username, setUsername] = useState("");
  const [join, setJoin] = useState(false);
  const [startGame, setStartGame] = useState(false);

  return (
    <SocketProvider>
      {" "}
      {/* Bungkus semua komponen dengan SocketProvider */}
      {join ? <LobbyPage setStartGame={setStartGame} setJoin={setJoin} /> : startGame ? <GamePage /> : <MainPage username={username} setUsername={setUsername} setJoin={setJoin} />}
    </SocketProvider>
  );
}

export default App;
