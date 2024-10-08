import Banner from "../assets/banner.png";
import Background from "../assets/bg-repeat.png";
import Avatars from "../assets/avatars/0.png";

export default function FinalPage() {
  return (
    <>
      <div
        className="flex flex-col items-center h-screen"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundColor: "#f97316",
        }}
      >
        <div className="flex flex-col items-center gap-y-2 mb-4">
          <img src={Banner} alt="" width={600} className="mt-[50px]" />
          <p className="font-black text-white text-xl">DRAW, GUESS, WIN</p>
        </div>
        <div className="flex flex-col items-center p-6 relative pt-4 w-[50%]">
          <h1 className="font-bold absolute top-0 bg-[#FFBF1F] border-2 rounded-full px-4 py-2 border-[#431407] text-sm">
            FINAL SCORE
          </h1>
          <div className="bg-white rounded-lg w-full min-h-[350px] flex flex-col items-center border-2 border-[#431407]">
            <div className="bg-white border rounded-lg w-full h-full flex flex-col items-center gap-y-4 p-6">
              <p className="font-bold text-green-500 mt-6 text-xl">You won!</p>

              <div
                className="w-full flex items-center justify-between"
                //   key={players[player].id}
              >
                <div className="flex items-center gap-x-3">
                  <img src={Avatars} alt="avatar" width={35} />
                  <div className="flex flex-col">
                    <p className="font-bold">Nopal</p>
                    <p className="text-sm text-slate-500">100 points</p>
                  </div>
                </div>

                {/* display number here */}
                <p>#1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
