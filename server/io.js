const express = require("express");
const app = express();
const { createServer } = require("node:http");
const { v4: uuidv4 } = require("uuid");
const { Server } = require("socket.io");

const PORT = 3000;
let players = {};
let drawerIndex = 0;
let gotCorrect = 0;
let rounds = 0;
let status = "waiting";

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Ganti dengan port front-end Anda jika perlu
  },
});

io.on("connection", (socket) => {
  const id = uuidv4();
  console.log("A client has connected:", socket.id);

  // Event join
  socket.on("join", (data) => {
    players[socket.id] = {
      id: socket.id,
      name: data.payload.name,
      avatar: data.payload.avatar,
      ready: false,
      score: 0,
      correct: false,
    };
    console.log(players);

    // Broadcast pemain yang sudah bergabung kepada semua klien
    io.emit("updatePlayers", players);
  });

  // Event player ready
  socket.on("ready", (data) => {
    const { action, payload } = data;

    if (action === "ready") {
      if (players[payload.playerId]) {
        players[payload.playerId].ready = true;
        console.log(`Player ${payload.playerId} is ready`);

        // Emit update ke semua klien
        io.emit("updatePlayers", players);

        if (allPlayersReady()) {
          io.emit("startGame", { players: players });
          io.emit("next", {
            players: players,
            drawer: players[Object.keys(players)[drawerIndex]],
          });
          status = "playing";
        }
      }
    } else if (action === "cancelReady") {
      if (players[payload.playerId]) {
        players[payload.playerId].ready = false;
        console.log(`Player ${payload.playerId} canceled readiness`);

        io.emit("updatePlayers", players);
      }
    }
  });

  // Event untuk putaran permainan berikutnya
  socket.on("next", () => {
    gotCorrect = 0;
    rounds += 1;

    if (rounds === Object.keys(players).length) {
      players = Object.fromEntries(
        Object.entries(players).sort((a, b) => b[1].score - a[1].score)
      );
      io.emit("end", { players: players });
      status = "waiting";
      rounds = 0;
      return;
    }

    for (const player of Object.values(players)) {
      player.correct = false;
    }

    drawerIndex = (drawerIndex + 1) % Object.keys(players).length;
    io.emit("next", {
      players: players,
      drawer: players[Object.keys(players)[drawerIndex]],
    });
  });

  // Event untuk mengatur kata yang akan ditebak
  socket.on("word:chosen", (word) => {
    io.emit("word:update", word);
  });

  // Event untuk memperbarui skor pemain secara real-time
  socket.on("incrementScore", (playerId) => {
    if (players[playerId]) {
      players[playerId].score += 10; // Tambah 10 poin ke pemain
      console.log(`Player ${playerId} score updated:`, players[playerId].score);

      // Kirim pembaruan skor ke semua klien
      io.emit("scoreUpdate", players);
    }
  });

  // Event untuk menerima jawaban pemain dan mengupdate skor
  socket.on("message:new", ({ answer, currentWord }) => {
    let correct = false;
    if (answer === currentWord) {
      correct = true;
      players[socket.id].correct = true;
      players[socket.id].score += 20; // Misal tambahkan 50 poin untuk jawaban benar
      io.emit("scoreUpdate", players); // Kirim pembaruan skor
    }

    io.emit("message:update", {
      username: players[socket.id].name,
      score: players[socket.id].score,
      avatar: players[socket.id].avatar,
      message: answer,
      correct,
    });

    // Emit update skor kepada semua klien
    io.emit("updatePlayers", players);
  });

  socket.on("drawing:data", (data) => {
    // Mengirim data gambar ke semua klien (termasuk pengirim)
    io.emit("drawing:receive", data);
  });

  // Mendengarkan event clear dan menyebarkannya ke semua klien
  socket.on("drawing:clear", () => {
    io.emit("drawing:clear");
  });

  // Mendengarkan perubahan timer dari klien
  socket.on("timer:update", (newSeconds) => {
    // Kirim update ke semua klien yang terhubung
    io.emit("timer:update", newSeconds);
  });

  // Event ketika pemain disconnect
  socket.on("disconnect", () => {
    console.log("A client has disconnected:", socket.id);
    removePlayer(socket, socket.id);
  });
});

// Fungsi untuk memeriksa apakah semua pemain sudah siap
function allPlayersReady() {
  return Object.values(players).every((player) => player.ready);
}

// Fungsi untuk menghapus pemain saat mereka disconnect
function removePlayer(socket, id) {
  const player_left = players[id];
  delete players[id];
  io.emit("leave", { players: players, player_left: player_left });

  if (allPlayersReady()) {
    io.emit("start", { players: players });
  }
}

// Memulai server pada port yang ditentukan
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
