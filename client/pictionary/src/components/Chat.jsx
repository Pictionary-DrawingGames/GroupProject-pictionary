import { useEffect, useState } from "react";
import ChatLabel from "../assets/chat.png";

export default function Chat({ socket }) {
  const [answer, setAnswer] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentWord, setCurrentWord] = useState("");

  const handleSendMessage = (event) => {
    event.preventDefault();
    socket.emit("message:new", answer);
    setAnswer("");
  };

  useEffect(() => {
    // ngeset auth buat socketnya
    socket.auth = {
      username: localStorage.getItem("username"),
      score: localStorage.getItem("userScore"),
      avatar: localStorage.getItem("useravatar"),
    };

    // kenapa butuh connect manual? supaya bisa set auth dlu sblm connect
    socket.connect();

    socket.on("message:update", (newMessage) => {
      setMessages((current) => {
        return [...current, newMessage];
      });
    });

    return () => {
      socket.off("message:update");
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="w-full lg:w-[280px] h-screen">
        <div className="bg-white h-full w-full p-4 relative flex flex-col items-center border-[#431407] border-l-2">
          <img
            src={ChatLabel}
            alt="players"
            className="w-[65px] md:w-[85px] mt-1 mb-4"
          />
          <div className="chat-messages w-full border h-full mb-16 md:h-[500px] rounded-lg p-2 overflow-y-scroll">
            {messages.map((msg, index) => (
              <p key={index}>
                <strong>{msg.username} : </strong>
                {msg.message}
              </p>
            ))}
          </div>
          <div className="absolute bottom-1 p-4 w-full">
            <form className="w-full h-[45px] flex items-center justify-center rounded-md">
              <input
                type="text"
                className="border-2 py-2 px-2 h-full w-full rounded-none rounded-l-md text-sm"
                placeholder="What's your guess?"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button
                className="flex items-center justify-center h-full px-4 bg-orange-500 rounded-none rounded-r-md"
                onClick={handleSendMessage}
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
