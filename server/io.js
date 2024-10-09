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
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", socket => {
  const id = uuidv4();
  console.log("A client has connected.");

  // join
  socket.on("join", payload => {
    // Pastikan payload dan payload.payload tidak null atau undefined
    if (payload && payload.payload) {
      const { name, avatar } = payload.payload;

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
    }
  });

  // player ready
  socket.on("ready", () => {
    if (players[id]) {
      players[id].ready = true;
      socket.broadcast.emit("ready", { action: "ready", payload: { players: players } });

      if (allPlayersReady()) {
        io.emit("play", { players: players });
        io.emit("next", { players: players, drawer: players[Object.keys(players)[drawerIndex]] });
        status = "playing";
      }
    } else {
      console.error("Player not found for 'ready' event:", id);
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

  // pesan dari pemain
  socket.on("message", payload => {
    const { correct, drawerId, timeGuessed } = payload;
    if (correct) {
      players[id].correct = true;
      players[id].score += (Object.keys(players).length - gotCorrect - 1) * 10 + timeGuessed;
      players[drawerId].score += 10;
      gotCorrect += 1;
      io.emit("score", { players: players });
    }

    io.emit("message", payload);
  });

  // pemain disconnect
  socket.on("disconnect", () => {
    console.log("A client has disconnected.");
    removePlayer(socket, id);
  });

  // message
  // socket.on("message:new", message => {
  //   io.emit("message:update", {
  //     username: socket.handshake.auth.username,
  //     score: socket.handshake.auth.score,
  //     avatar: socket.handshake.auth.avatar,
  //     message,
  //   });
  // });
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

server.listen(PORT, () => {
  console.log(`i love u ${PORT}`);
});
