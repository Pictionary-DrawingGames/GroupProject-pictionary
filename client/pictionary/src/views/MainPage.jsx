import React, { useEffect, useState } from "react";
import Avatar from "../assets/avatars/0.png"; // Default avatar
import Banner from "../assets/banner.png"; // Banner image
import Background from "../assets/bg-repeat.png"; // Background image
import { Avatars } from "../lib/utils"; // Ensure the correct path for Avatars
import { useNavigate } from "react-router-dom";

export default function MainPage({ socket }) {
  const navigate = useNavigate();
  const [viewAvatars, setViewAvatars] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(0); // Avatar index
  const [username, setUsername] = useState(""); // Username state
  const [players, setPlayers] = useState({}); // Players state
  const [join, setJoin] = useState(false); // State to check if the user has joined

  useEffect(() => {
    // Connect to the server when the component mounts
    socket.connect();
    // Listen for server responses for updating the player list
    socket.on("join", data => {
      setPlayers(data.payload.players);
    });

    // Get the player's unique ID from the server
    socket.on("get_id", data => {
      console.log("Player ID:", data.payload.id);
    });

    return () => {
      // Clean up listeners on unmount
      socket.off("join");
      socket.off("get_id");
    };
  }, [socket]);

  const handleJoin = () => {
    if (username.length > 0) {
      const data = {
        action: "join",
        payload: {
          name: username,
          avatar: Avatars[selectedAvatar], // Use the selected avatar
        },
      };

      console.log("Joining with data:", data);

      // Send the join event to the server
      socket.emit("join", data);
      setJoin(true); // Indicate the user has joined

      navigate("/lobby");
    }
  };

  return (
    <div
      className="flex flex-col items-center w-screen h-screen bg-repeat gap-y-5"
      style={{
        backgroundImage: `url(${Background})`, // Set background image
        backgroundColor: "#f97316",
      }}
    >
      <div className="flex flex-col items-center gap-y-2 mb-4">
        <img src={Banner} alt="" width={600} className="mt-[50px]" />
        <p className="font-black rounded-xl bg-orange-950 p-2 text-white text-lg md:text-xl text-center">Manifest Your Creativity</p>
      </div>

      {viewAvatars ? (
        <AvatarSelection selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} setViewAvatars={setViewAvatars} />
      ) : (
        <div className="flex flex-col items-center p-6 relative pt-4">
          <h1 className="font-bold absolute top-0 bg-[#FFBF1F] border-2 rounded-full px-4 py-2 border-[#431407] text-sm">QUICK PLAY</h1>
          <div className="flex flex-col items-center gap-y-4 bg-white border-2 border-[#431407] rounded-lg p-8">
            <div className="relative flex items-center justify-center pb-3 cursor-pointer" onClick={() => setViewAvatars(true)}>
              <img src={Avatars[selectedAvatar]} alt="avatar" width={100} className="absolute mb-1.5" />
              <div className={`border-4 border-orange-500 rounded-full w-[110px] h-[110px] mt-5`}></div>
              <p className="font-bold bg-orange-500 rounded-full px-2 py-1 text-white absolute bottom-0 text-sm">Change Avatar</p>
            </div>
            <input maxLength="10" className="w-48 p-2 text-center border-2 rounded-lg" type="text" value={username} placeholder="Enter your nickname" onChange={e => setUsername(e.target.value)} />
            <button
              onClick={handleJoin}
              className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded w-full shadow-md"
              disabled={username.length === 0} // Disable button if username is empty
            >
              Join Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
