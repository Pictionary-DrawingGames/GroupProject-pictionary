import Banner from "../assets/banner.png";
import Background from "../assets/bg-repeat.png";
import Avatars from "../assets/avatars/0.png";

export default function LobbyPage() {
  return (
    <>
      <div
        className="flex flex-col items-center w-screen h-screen bg-repeat gap-y-5"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundColor: "#f97316",
        }}
      >
        <div className="flex flex-col items-center gap-y-2 mb-4">
          <img src={Banner} alt="" width={600} className="mt-[50px]" />
          <p className="font-black rounded-xl bg-orange-950 p-2 text-white text-xl">
            Manifest Your Creativity
          </p>
        </div>
        <div className="flex flex-col items-center w-[60%] relative pt-4">
          <h1 className="font-bold absolute top-0 bg-[#FFBF1F] border-2 rounded-full px-4 py-2 border-[#431407] text-sm">
            LOBBY
          </h1>
          <div className="w-full flex flex-wrap items-center justify-center gap-x-6 gap-y-4 bg-white border-2 border-[#431407] rounded-lg p-8">
            <div className="flex flex-col items-center gap-y-2">
              <div className="relative flex items-center justify-center cursor-pointer pb-3">
                <img src={Avatars} width={80} className="absolute" />
                <div
                  className={`border-4 border-green-500 rounded-full w-[90px] h-[90px] mt-5`}
                ></div>
                <p
                  className={`font-bold bg-green-500 rounded-full px-2 py-1 text-white absolute bottom-0 text-sm`}
                >
                  Nopal
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className={`bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500 ext-white font-bold py-2 px-4 border-b-4 rounded shadow-md drop-shadow-md`}
        >
          <p>Cancel</p>
        </button>
      </div>
    </>
  );
}
