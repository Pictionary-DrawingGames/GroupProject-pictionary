import { useEffect, useState } from "react";
import ChatLabel from "../assets/chat.png";

export default function Chat({ socket }) {
  const [answer, setAnswer] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentWord, setCurrentWord] = useState("");

  // State untuk melacak apakah sudah menjawab benar untuk currentWord
  const [hasAnsweredCorrectly, setHasAnsweredCorrectly] = useState(false);

  // Ambil score dari localStorage, atau default ke 0 jika tidak ada
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem("userScore");
    return savedScore ? parseInt(savedScore, 10) : 0;
  });

  // Mendengarkan perubahan kata dari server
  useEffect(() => {
    socket.on("word:update", (word) => {
      setCurrentWord(word); // Mengupdate currentWord setiap kali server mengirimkan kata baru
      setHasAnsweredCorrectly(false); // Reset state ketika currentWord berubah
    });

    // Cleanup listener ketika komponen unmount
    return () => {
      socket.off("word:update");
    };
  }, [socket]);

  const handleSendMessage = (event) => {
    event.preventDefault();

    // Mengirimkan pesan yang mencakup nilai answer dan currentWord
    socket.emit("message:new", { answer, currentWord });

    setAnswer(""); // Reset input setelah pesan dikirim
  };

  useEffect(() => {
    // Set auth untuk socket
    socket.auth = {
      username: localStorage.getItem("username"),
      score: localStorage.getItem("userScore"),
      avatar: localStorage.getItem("useravatar"),
    };

    // Connect socket setelah auth diset
    socket.connect();

    // Mendengarkan update message dari server
    socket.on("message:update", (newMessage) => {
      setMessages((current) => {
        return [...current, newMessage];
      });

      // Jika pesan benar dan belum menjawab benar sebelumnya, tambahkan 20 poin
      if (newMessage.correct && !hasAnsweredCorrectly) {
        setScore((prevScore) => prevScore + 20);
        setHasAnsweredCorrectly(true); // Set bahwa sudah menjawab benar untuk currentWord ini
      }
    });

    return () => {
      socket.off("message:update");
      socket.disconnect();
    };
  }, [socket, hasAnsweredCorrectly]);

  // Simpan score ke localStorage setiap kali nilai score berubah
  useEffect(() => {
    localStorage.setItem("userScore", score);
  }, [score]);

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
              <div
                key={index}
                className={`flex items-center gap-x-2 ${
                  msg.correct ? "text-green-600" : "text-black"
                }`}
              >
                {msg.correct ? (
                  <p className="font-bold">{msg.username} guessed the word!</p>
                ) : (
                  <p>
                    <strong>{msg.username}</strong>: {msg.message}
                  </p>
                )}
              </div>
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
