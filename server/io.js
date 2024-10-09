const { Server } = require("socket.io");

const io = new Server(3000, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
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
