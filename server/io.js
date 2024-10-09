const { Server } = require("socket.io");

const io = new Server(3000, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  socket.on("message:new", (message) => {
    io.emit("message:update", {
      username: socket.handshake.auth.username,
      score: socket.handshake.auth.score,
      avatar: socket.handshake.auth.avatar,
      message,
    });
  });
});
