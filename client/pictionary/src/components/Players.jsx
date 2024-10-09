// Players.js
import { useEffect, useState } from "react";
import Pencil from "../assets/pencil.png";
import Avatars from "../assets/avatars/0.png";
import PlayersLabel from "../assets/players.png";

export default function Players({ socket }) {
  const [currentPlayer, setCurrentPlayer] = useState({
    name: "",
    avatar: Avatars,
    score: 0,
  });
  const [players, setPlayers] = useState({}); // Menyimpan semua pemain

  useEffect(() => {
    // Ambil data pengguna dari localStorage
    const username = localStorage.getItem("username") || "Anonymous";
    const userScore = localStorage.getItem("userScore") || 0;
    const userAvatar = localStorage.getItem("userAvatar") || Avatars;

    const playerData = {
      name: username,
      avatar: userAvatar,
      score: parseInt(userScore, 10) || 0,
    };

    setCurrentPlayer(playerData);

    // Kirim data pengguna ke server menggunakan event 'players'
    socket.emit("players", {
      payload: playerData,
    });

    // Menerima pembaruan pemain dari server
    socket.on("updatePlayers", updatedPlayers => {
      setPlayers(updatedPlayers);
      console.log("Updated players:", updatedPlayers);
    });

    return () => {
      // Hapus listener saat komponen unmount
      socket.off("updatePlayers");
    };
  }, [socket]);

  return (
    <div className="flex flex-col w-full lg:w-[280px] lg:h-screen md:h-screen">
      <div className="flex flex-col items-center w-full h-full p-4 bg-white gap-y-4 border-[#431407] border-r-2">
        <img src={PlayersLabel} alt="players" width={140} />
        <div className="flex flex-col w-full">
          {/* Tampilkan semua pemain */}
          {Object.values(players).map(player => (
            <div key={player.id} className="flex items-center justify-between w-full p-2 border-b border-slate-200">
              <div className="flex items-center gap-x-3">
                <img src={player.avatar} alt="avatar" width={40} />
                <div className="flex flex-col">
                  <p className="font-bold text-slate-700">
                    {player.name} {player.id === currentPlayer.id ? "✅" : ""}
                  </p>
                  <p className="text-xs text-slate-500">{player.score} points</p>
                </div>
              </div>
              <img src={Pencil} alt="draw-icon" width={25} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
