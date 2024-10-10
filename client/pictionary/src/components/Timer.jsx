import React, { useState, useEffect } from "react";

export default function Timer({ socket, seconds, setSeconds }) {
  useEffect(() => {
    let intervalId;

    // Emit perubahan seconds setiap detik
    if (seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => {
          const newSeconds = prevSeconds - 1;
          socket.emit("timer:update", newSeconds); // Emit perubahan waktu ke server
          return newSeconds;
        });
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(intervalId);
    }

    // Mendengarkan perubahan waktu dari server
    socket.on("timer:update", newSeconds => {
      setSeconds(newSeconds); // Update nilai waktu berdasarkan data dari server
    });

    return () => {
      clearInterval(intervalId);
      socket.off("timer:update"); // Cleanup listener saat komponen di-unmount
    };
  }, [seconds, socket, setSeconds]);

  return (
    <>
      <div className="flex flex-col gap-y-1 w-full md:w-32 lg:w-32 justify-center items-center bg-white p-2 border-2 border-[#431407] rounded-lg">
        <p className="font-bold text-orange-500 text-xs">TIME</p>
        <p>{seconds} seconds left</p>
      </div>
    </>
  );
}
