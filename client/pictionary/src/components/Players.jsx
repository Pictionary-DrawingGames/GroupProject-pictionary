import { useEffect, useState } from "react";
import Pencil from "../assets/pencil.png";
import Avatars from "../assets/avatars/0.png";
import PlayersLabel from "../assets/players.png";

export default function Players({ socket }) {
  const [player, setPlayer] = useState("");
  const [avatar, setAvatar] = useState("");
  const [score, setScore] = useState(0);
  useEffect(() => {
    // Ambil data pengguna dari localStorage
    const username = localStorage.getItem("username") || "Anonymous";
    const userScore = localStorage.getItem("userScore") || 0;
    const userAvatar = localStorage.getItem("userAvatar") || Avatars;

    setPlayer(username);
    setAvatar(avatar);
    setScore(score);

    // Kirim data pengguna ke server menggunakan event 'join'
    socket.emit("player", {
      payload: {
        name: username,
        avatar: userAvatar,
        score: userScore,
      },
    });
  }, [socket]);

  return (
    <div className="flex flex-col w-full lg:w-[280px] lg:h-screen md:h-screen">
      <div className="flex flex-col items-center w-full h-full p-4 bg-white gap-y-4 border-[#431407] border-r-2">
        <img src={PlayersLabel} alt="players" width={140} />
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-x-3">
            <img src={Avatars} alt="avatar" width={40} />
            <div className="flex flex-col">
              <p className="font-bold text-slate-700">
                {player}
                {" ✅"}
              </p>
              <p className="text-xs text-slate-500">{score} points</p>
            </div>
          </div>
          <img src={Pencil} alt="draw-icon" width={25} />
        </div>
      </div>
    </div>
  );
}
