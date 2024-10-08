import Avatar from "../assets/avatars/0.png";
import Banner from "../assets/banner.png";
import Background from "../assets/bg-repeat.png";

export default function MainPage() {
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
        <div className="flex flex-col items-center p-6 relative pt-4">
          <h1 className="font-bold absolute top-0 bg-[#FFBF1F] border-2 rounded-full px-4 py-2 border-[#431407] text-sm">
            QUICK PLAY
          </h1>
          <div className="flex flex-col items-center gap-y-4 bg-white border-2 border-[#431407] rounded-lg p-8">
            <div
              className="relative flex items-center justify-center pb-3 cursor-pointer"
              //   onClick={() => {
              //     setViewAvatars(true);
              //   }}
            >
              <img
                // src={Avatars[selectedAvatar]}
                src={Avatar}
                alt="avatar"
                width={100}
                className="absolute mb-1.5"
              />
              <div
                className={`border-4 border-orange-500 rounded-full w-[110px] h-[110px] mt-5`}
              ></div>
              <p
                className={`font-bold bg-orange-500 rounded-full px-2 py-1 text-white absolute bottom-0 text-sm whitespace-nowrap`}
              >
                Change Avatar
              </p>
            </div>
            <input
              maxlength="10"
              className="w-48 p-2 text-center border-2 rounded-lg"
              type="text"
              //   value={username}
              placeholder="Enter your nickname"
              //   onChange={(e) => setUsername(e.target.value)}
            />
            <button
              //   disabled={username.length == 0}
              //   onClick={handleJoin}
              className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded w-full shadow-md drop-shadow-md"
            >
              Join Room
            </button>
          </div>
        </div>
        {/* {viewAvatars ? (
          <AvatarSelection
            selectedAvatar={selectedAvatar}
            setSelectedAvatar={setSelectedAvatar}
            setViewAvatars={setViewAvatars}
          />
        ) : (
          <div className="flex flex-col items-center p-6 relative pt-4">
            <h1 className="font-bold absolute top-0 bg-[#FFBF1F] border-2 rounded-full px-4 py-2 border-[#431407] text-sm">
              QUICK PLAY
            </h1>
            <div className="flex flex-col items-center gap-y-4 bg-white border-2 border-[#431407] rounded-lg p-8">
              <div
                className="relative flex items-center justify-center pb-3 cursor-pointer"
                onClick={() => {
                  setViewAvatars(true);
                }}
              >
                <img
                  src={Avatars[selectedAvatar]}
                  alt="avatar"
                  width={100}
                  className="absolute mb-1.5"
                />
                <div
                  className={`border-4 border-orange-500 rounded-full w-[110px] h-[110px] mt-5`}
                ></div>
                <p
                  className={`font-bold bg-orange-500 rounded-full px-2 py-1 text-white absolute bottom-0 text-sm whitespace-nowrap`}
                >
                  Change Avatar
                </p>
              </div>
              <input
                maxlength="10"
                className="w-48 p-2 text-center border-2 rounded-lg"
                type="text"
                value={username}
                placeholder="Enter your nickname"
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                disabled={username.length == 0}
                onClick={handleJoin}
                className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded w-full shadow-md drop-shadow-md"
              >
                Join Room
              </button>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
}
