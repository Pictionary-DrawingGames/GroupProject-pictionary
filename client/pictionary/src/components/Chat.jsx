import ChatLabel from "../assets/chat.png";

export default function Chat() {
  return (
    <>
      <div className="w-[280px] h-screen">
        <div className="bg-white h-full w-full p-4 relative flex flex-col items-center border-[#431407] border-l-2">
          <img src={ChatLabel} alt="players" width={85} className="mt-1 mb-4" />
          <div className="chat-messages w-full border h-[500px] rounded-lg p-2">
            <div
              //   key={index}
              className={`flex items-center gap-x-2 "text-green-600"`}
            >
              <p className="font-bold">Nopal guessed the word!</p>
            </div>
          </div>
          <div className="absolute bottom-1 p-4">
            <div className="w-full h-[45px] flex items-center justify-center rounded-md">
              <input
                // disabled={!canChat || guessed}
                type="text"
                className="border-2 py-2 px-2 h-full w-full rounded-none rounded-l-md text-sm"
                // value={message}
                placeholder="What's your guess?"
                // onChange={(e) => setMessage(e.target.value)}
                // onKeyUp={(e) => {
                //   if (e.key === "Enter") {
                //     handleSendMessage();
                //   }
                // }}
              />
              <button
                className="flex items-center justify-center h-full px-4 bg-orange-500 rounded-none rounded-r-md"
                // onClick={handleSendMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#ffffff"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
