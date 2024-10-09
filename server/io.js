const express = require("express");
const app = express();
const PORT = 3000;
const { createServer } = require("node:http");
const { v4: uuidv4 } = require("uuid");
const { Server } = require("socket.io");

let players = {};
let drawerIndex = 0;
let gotCorrect = 0;
let rounds = 0;
let status = "waiting";

const server = createServer(app);
const io = new Server(3000, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  const id = uuidv4();
  console.log("A client has connected.");

  // join
  socket.on("join", payload => {
    const { name, avatar } = payload.payload;
    console.log(payload);

    players[id] = {
      id: id,
      name: name,
      avatar: avatar,
      score: 0,
      ready: false,
      correct: false,
    };

    console.log("Players after join:", players);
    socket.broadcast.emit("join", { action: "join", payload: { players: players } });
    socket.emit("get_id", { action: "get_id", payload: { id: id } });
  });

  // player ready
  socket.on("ready", () => {
    players[id].ready = true;
    io.emit("ready", { players: players });

    if (allPlayersReady()) {
      io.emit("play", { players: players });
      io.emit("next", { players: players, drawer: players[Object.keys(players)[drawerIndex]] });
      status = "playing";
    }
  });

  // mengatur putaran permainan
  socket.on("next", () => {
    gotCorrect = 0;
    rounds += 1;

    if (rounds == Object.keys(players).length) {
      players = Object.fromEntries(Object.entries(players).sort((a, b) => b[1].score - a[1].score));
      io.emit("end", { players: players });
      status = "waiting";
      rounds = 0;
      return;
    }

    for (const player of Object.values(players)) {
      player.correct = false;
    }

    drawerIndex = (drawerIndex + 1) % Object.keys(players).length;
    io.emit("next", { players: players, drawer: players[Object.keys(players)[drawerIndex]] });
  });

  // mengatur kata
  socket.on("set_word", payload => {
    io.emit("set_word", { word: payload.word });
  });

  // pesan dari pemain (baru)
  // socket.on("message", payload => {
  //   const { correct, drawerId, timeGuessed } = payload;
  //   if (correct) {
  //     players[id].correct = true;
  //     players[id].score += (Object.keys(players).length - gotCorrect - 1) * 10 + timeGuessed;
  //     players[drawerId].score += 10;
  //     gotCorrect += 1;
  //     io.emit("score", { players: players });
  //   }

  //   io.emit("message", payload);
  // });

  // pemain disconnect
  socket.on("disconnect", () => {
    console.log("A client has disconnected.");
    removePlayer(socket, id);
  });

  socket.on("message:new", (message) => {

    // if (message === 'baju') {
    //   message = 'guessed right'
    // }

    io.emit("message:update", {
      username: socket.handshake.auth.username,
      score: socket.handshake.auth.score,
      avatar: socket.handshake.auth.avatar,
      message,
    });
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

  // Menerima kata yang dipilih dan mengirimnya ke semua klien
  socket.on("word:chosen", (word) => {
    io.emit("word:update", word);
  });
});

// cek semua pemain ready
function allPlayersReady() {
  return Object.values(players).every(player => player.ready);
}

// hapus pemain jika disconnect
function removePlayer(socket, id) {
  const player_left = players[id];
  delete players[id];
  io.emit("leave", { players: players, player_left: player_left });

  if (allPlayersReady()) {
    io.emit("start", { players: players });
  }
}

// server.listen(PORT, () => {
//   console.log(`i love u ${PORT}`);
// });
