import Pencil from "../assets/pencil.png";
import Avatars from "../assets/avatars/0.png";
import PlayersLabel from "../assets/players.png";

export default function Players() {
  return (
    <>
      <div className="flex flex-col h-screen w-[280px]">
        <div className="flex flex-col items-center w-full h-full p-4 bg-white gap-y-4 border-[#431407] border-r-2">
          {/* <h1 className='font-bold text-lg mb-2 text-slate-700 w-full text-center'>Players</h1> */}
          <img src={PlayersLabel} alt="players" width={140} />
          <div
            className="flex items-center justify-between w-full"
            // key={players[player].id}
          >
            <div className="flex items-center gap-x-3">
              <img src={Avatars} alt="avatar" width={40} />
              <div className="flex flex-col">
                <p className="font-bold text-slate-700">
                  Nopal
                  {" ✅"}
                </p>
                <p className="text-xs text-slate-500">100 points</p>
              </div>
            </div>
            <img src={Pencil} alt="draw-icon" width={25} />
          </div>
        </div>
      </div>
    </>
  );
}
