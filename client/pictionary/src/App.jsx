import { RouterProvider } from "react-router-dom";
import router from "./routers/router";
// import { SocketProvider } from "./context/SocketProvider"; // Pastikan import provider dari file yang benar
import { useState } from "react";
import LobbyPage from "./views/LobbyPage";
import GamePage from "./views/GamePage";
import MainPage from "./views/MainPage";

function App() {
  // const [username, setUsername] = useState("");
  // const [join, setJoin] = useState(true);
  // const [startGame, setStartGame] = useState(true);

  // let pageToRender;
  {
    /* <SocketProvider>{pageToRender}</SocketProvider>; */
  }
  // if (join) {
  //   pageToRender = <LobbyPage setStartGame={setStartGame} setJoin={setJoin} />;
  // } else if (startGame) {
  //   pageToRender = <GamePage />;
  // } else {
  //   pageToRender = <MainPage username={username} setUsername={setUsername} setJoin={setJoin} />;
  // }

  return <RouterProvider router={router} />;
}

export default App;
