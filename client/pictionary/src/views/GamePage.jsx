import React, { useContext, useState, useEffect } from "react";
import Chat from "../components/Chat";
import DrawingBoard from "../components/DrawingBoard";
import StaticBoard from "../components/StaticBoard";
import Timer from "../components/Timer";
import Players from "../components/Players";
import RevealWord from "../components/RevealWord";

import Banner from "../assets/banner.png";
import Background from "../assets/bg-repeat.png";
import { themeContext } from "../context/themeContext.jsx";

export default function GamePage({ socket }) {
  const { currentTheme, theme, setCurrentTheme } = useContext(themeContext);
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
  const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

  useEffect(() => {
    const randomWord = getRandomWord();
    setCurrentWord(randomWord);

    socket.emit("word:chosen", randomWord);
  }, []);

  useEffect(() => {
    // Listen for updated player data
    socket.on("updatePlayers", (playersData) => {
      setPlayers(playersData);
      console.log("Pemain yang diterima dari server: ", playersData);
    });

    // Listen for message updates and adjust scores
    socket.on("message:update", ({ correct, username, message, score }) => {
      if (correct) {
        // Find the player and update their score
        setPlayers((prevPlayers) => {
          const updatedPlayers = { ...prevPlayers };
          const player = Object.values(updatedPlayers).find(
            (p) => p.name === username
          );
          if (player) {
            player.score += 100; // Increment score
          }
          return updatedPlayers;
        });
      }
    });

    return () => {
      socket.off("updatePlayers");
      socket.off("message:update");
    };
  }, [socket]);

  useEffect(() => {
    // Atur ulang kata dan timer setiap kali waktu habis
    if (seconds === 0) {
      const randomWord = getRandomWord();
      setCurrentWord(randomWord);
      setSeconds(30); // Reset the timer to 30

      // Mengirim kata baru ke semua klien yang terhubung
      socket.emit("word:chosen", randomWord);
    }
  }, [seconds, socket]);

  // Ini akan mencegah timer stuck di -1
  useEffect(() => {
    if (seconds < 0) {
      setSeconds(30); // Reset to 30 if it goes negative
    }
  }, [seconds]);

  useEffect(() => {
    socket.emit("players", players);
    console.log("Current players state: ", players); // Log current players state
  }, [players]);

  return (
    <>
      <div
        className="flex flex-col lg:flex-row items-center lg:items-start justify-between"
        style={{
          backgroundImage: theme[currentTheme]?.bgImage, // Set background image
          backgroundColor: theme[currentTheme]?.bgColor,
        }}
      >
        <Players socket={socket} players={players} />
        <div className="flex flex-col items-center gap-y-2 w-full lg:w-[440px] h-full p-4">
          {/* USE CONTEXT */}
          {currentTheme == "male" ? (
            <button
              className="bg-white p-5"
              onClick={() => setCurrentTheme("female")}
            >
              THEME FEMALE
            </button>
          ) : (
            <button
              className="bg-white p-5"
              onClick={() => setCurrentTheme("male")}
            >
              THEME MALE
            </button>
          )}
          {/* USE CONTEXT */}

          <div className="flex flex-col items-center gap-y-2 mb-8">
            <img src={Banner} alt="" className="w-[200px] md:w-[300px]" />
            <p className="font-black rounded-xl bg-orange-950 p-2 text-white text-lg md:text-xl text-center">
              Manifest Your Creativity
            </p>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="mt-4 md:mt-0">
              <DrawingBoard
                socket={socket}
                seconds={seconds}
                setSeconds={setSeconds}
                players={players}
              />
            </div>
          </div>
        </div>
        <Chat socket={socket} players={players} />
      </div>
    </>
  );
}
