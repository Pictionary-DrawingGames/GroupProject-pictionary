import { createBrowserRouter, redirect } from "react-router-dom";
import MainPage from "../views/MainPage";
import AvatarPage from "../views/AvatarPage";
import FinalPage from "../views/FinalPage";
import GamePage from "../views/GamePage";
import LobbyPage from "../views/LobbyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/avatar",
    element: <AvatarPage />,
  },
  {
    path: "/final",
    element: <FinalPage />,
  },
  {
    path: "/game",
    element: <GamePage />,
  },
  {
    path: "/lobby",
    element: <LobbyPage />,
  },
]);

export default router;
