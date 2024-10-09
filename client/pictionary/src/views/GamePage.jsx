import React, { useContext, useState, useEffect } from "react";
import Chat from "../components/Chat";
import DrawingBoard from "../components/DrawingBoard";
import StaticBoard from "../components/StaticBoard";
import Timer from "../components/Timer";
import Players from "../components/Players";
import RevealWord from "../components/RevealWord";

import Banner from "../assets/banner.png";
import Background from "../assets/bg-repeat.png";

export default function GamePage({ socket }) {
  // const [timerIsActive, setTimerIsActive] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [currentWord, setCurrentWord] = useState("");
  const [players, setPlayers] = useState({});

  const words = [
    "apple",
    "house",
    "sun",
    "tree",
    "flower",
    "car",
    "boat",
    "plane",
    "dog",
    "cat",
    "umbrella",
    "heart",
    "figure",
    "cake",
    "balloon",
    "ball",
    "cloud",
    "star",
    "rainbow",
    "book",
    "chair",
    "table",
    "scissors",
    "bulb",
    "ladder",
    "skateboard",
    "bicycle",
    "tent",
    "burger",
    "cone",
    "pizza",
    "butterfly",
    "bird",
    "fish",
    "moon",
    "key",
    "crown",
    "hat",
    "glasses",
    "sock",
    "shirt",
    "pants",
    "shoe",
    "glove",
    "backpack",
    "basket",
    "gift",
    "box",
    "bag",
    "envelope",
    "clock",
    "watch",
    "phone",
    "camera",
    "computer",
    "laptop",
    "mouse",
    "keyboard",
    "printer",
    "television",
    "radio",
    "microwave",
    "oven",
    "fridge",
    "toilet",
    "bath",
    "shower",
    "sink",
    "bed",
    "pillow",
    "chair",
    "table",
    "desk",
    "lamp",
    "mirror",
    "vase",
    "bowl",
    "plate",
    "cup",
    "mug",
    "fork",
    "spoon",
    "knife",
    "bottle",
    "box",
    "carton",
    "paper",
    "pen",
    "pencil",
    "ruler",
  ];

  // Pilih kata secara acak dan kirim ke server
  const randomWord = words[Math.floor(Math.random() * words.length)];

  useEffect(() => {
    setCurrentWord(randomWord);

    // Mengirim kata ke semua klien yang terhubung
    socket.emit("word:chosen", randomWord);
  }, []);

  useEffect(() => {
    // Update players data from the server
    socket.on("updatePlayers", playersData => {
      setPlayers(playersData);
      console.log("Pemain yang diterima dari server: ", playersData);
    });

    // Clean up the event listener when component unmounts
    return () => {
      socket.off("updatePlayers");
    };
  }, [socket]);

  useEffect(() => {
    if (seconds === 0) {
      setSeconds(30);
      setCurrentWord(randomWord);

      // Mengirim kata ke semua klien yang terhubung
      socket.emit("word:chosen", randomWord);
    }
  }, [socket, words, seconds]);

  useEffect(() => {
    console.log("Current players state: ", players); // Log current players state
  }, [players]);

  return (
    <>
      <div
        className="flex flex-col lg:flex-row items-center lg:items-start justify-between"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundColor: "#f97316",
        }}
      >
        <Players />
        <div className="flex flex-col items-center gap-y-2 w-full lg:w-[440px] h-full p-4">
          <div className="flex flex-col items-center gap-y-2 mb-8">
            <img src={Banner} alt="" className="w-[200px] md:w-[300px]" />
            <p className="font-black rounded-xl bg-orange-950 p-2 text-white text-lg md:text-xl text-center">Manifest Your Creativity</p>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="mt-4 md:mt-0">
              <DrawingBoard socket={socket} seconds={seconds} setSeconds={setSeconds} />
            </div>
            {/* <div className="text-center mr-0 md:mr-1 mt-5">
              <Timer
                socket={socket}
                seconds={seconds}
                setSeconds={setSeconds}
              />
            </div> */}
          </div>
        </div>
        <Chat socket={socket} />
      </div>
    </>
  );
}
