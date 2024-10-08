import { createBrowserRouter, redirect } from "react-router-dom";
import MainPage from "../views/MainPage";
import AvatarPage from "../views/AvatarPage";
import FinalPage from "../views/FinalPage";
import GamePage from "../views/GamePage";
import Lobby from "../../../../../draw-guesser/client/src/pages/Lobby";

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
    element: <Lobby />,
  },
]);

export default router;
