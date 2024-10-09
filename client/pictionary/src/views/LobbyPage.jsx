import React, { useContext, useEffect, useState } from "react";
import Banner from "../assets/banner.png";
import Background from "../assets/bg-repeat.png";
import { SocketContext } from "../context/SocketProvider";

export default function LobbyPage({ setStartGame, setJoin }) {
  const { socketData, sendData, players, setPlayers } =
    useContext(SocketContext);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle incoming socket data
  useEffect(() => {
    if (!socketData) return;
    console.log("Socket Data Received:", socketData);
    const { action, payload } = socketData;

    switch (action) {
      case "join":
      case "ready":
      case "leave":
        setPlayers(payload.players);
        logPlayerReadiness(payload.players); // Log pemain yang sudah ready
        break;
      case "play":
        setIsPlaying(true);
        setTimeout(() => {
          setJoin(false);
          setStartGame(true);
        }, 1000);
        break;
      default:
        break;
    }
  }, [socketData]);

  const logPlayerReadiness = (players) => {
    console.log("Status Pemain yang Siap:");
    Object.keys(players).forEach((playerId) => {
      console.log(
        `${players[playerId].name} - Ready: ${players[playerId].ready}`
      );
    });
  };

  console.log("Players in LobbyPage:", players);

  // Handle player readiness
  const handleReady = () => {
    const data = {
      action: "ready",
      payload: null,
    };

    sendData(data);
    setIsReady((prev) => {
      const newReadyState = !prev; // Toggle isReady state
      console.log(
        `Player ${newReadyState ? "is now ready." : "is no longer ready."}`
      );
      return newReadyState;
    });
  };

  return (
    <div
      className="flex flex-col items-center w-screen h-screen bg-repeat gap-y-5"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundColor: "#f97316",
      }}
    >
      <div className="flex flex-col items-center gap-y-2 mb-4">
        <img src={Banner} alt="Banner" width={600} className="mt-[50px]" />
        <p className="font-black rounded-xl bg-orange-950 p-2 text-white text-lg md:text-xl text-center">
          Manifest Your Creativity
        </p>
      </div>
      <div className="flex flex-col items-center w-[60%] relative pt-4">
        <h1 className="font-bold absolute top-0 bg-[#FFBF1F] border-2 rounded-full px-4 py-2 border-[#431407] text-sm">
          LOBBY
        </h1>
        <div className="w-full flex flex-wrap items-center justify-center gap-x-6 gap-y-4 bg-white border-2 border-[#431407] rounded-lg p-8">
          {Object.keys(players).map((playerId) => (
            <div
              className="flex flex-col items-center gap-y-2"
              key={players[playerId].id}
            >
              <div className="relative flex items-center justify-center cursor-pointer pb-3">
                <img
                  src={players[playerId].avatar}
                  alt={`Avatar ${players[playerId].name}`}
                  width={80}
                  className="absolute"
                />
                <div
                  className={`border-4 ${
                    players[playerId].ready
                      ? "border-green-500"
                      : "border-orange-500"
                  } rounded-full w-[90px] h-[90px] mt-5`}
                ></div>
                <p
                  className={`font-bold ${
                    players[playerId].ready ? "bg-green-500" : "bg-orange-500"
                  } rounded-full px-2 py-1 text-white absolute bottom-0 text-sm`}
                >
                  {players[playerId].name}
                </p>
              </div>
            )
          )}
        </div>
      </div>
      {isPlaying ? (
        <div className="px-4 py-2 bg-[#FFBF00] font-bold border-[#431407] border-2 rounded-lg flex items-center justify-center">
          Starting Game ...
        </div>
      ) : (
        <button
          className={`${
            isReady
              ? "bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500"
              : "bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500"
          } text-white font-bold py-2 px-4 border-b-4 rounded shadow-md drop-shadow-md`}
          onClick={handleReady}
        >
          {isReady ? <p>Cancel</p> : <p>Ready</p>}
        </button>
      )}
    </div>
  );
}
