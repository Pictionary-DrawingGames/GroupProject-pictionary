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

  let pageToRender;

  if (join) {
    pageToRender = <LobbyPage setStartGame={setStartGame} setJoin={setJoin} />;
  } else if (startGame) {
    pageToRender = <GamePage />;
  } else {
    pageToRender = <MainPage username={username} setUsername={setUsername} setJoin={setJoin} />;
  }

  return <SocketProvider>{pageToRender}</SocketProvider>;
}

export default App;
