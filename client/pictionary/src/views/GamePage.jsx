import Chat from "../components/Chat";
import DrawingBoard from "../components/DrawingBoard";
import StaticBoard from "../components/StaticBoard";
import Timer from "../components/Timer";
import Players from "../components/Players";
import RevealWord from "../components/RevealWord";

import Banner from "../assets/banner.png";
import Background from "../assets/bg-repeat.png";

export default function GamePage({ socket }) {
  return (
    <>
      <div
        className="flex items-center justify-between h-screen"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundColor: "#f97316",
        }}
      >
        <Players />
        <div className="flex flex-col items-center gap-y-2 w-[440px] h-full p-4">
          <div className="flex flex-col items-center gap-y-2 mb-8">
            <img src={Banner} alt="" width={300} />
            <p className="font-black rounded-xl bg-orange-950 p-2 text-white text-xl">
              Manifest Your Creativity
            </p>
          </div>
          <DrawingBoard />
          <Timer />
        </div>
        <Chat socket={socket} />
      </div>
    </>
  );
}
