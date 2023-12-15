const express = require("express");

const app = express();

const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const {
  addUser,
  getUsersInRoom,
  getUser,
  removeUser,
} = require("./utils/users");
const { generateMessage } = require("./utils/messages");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("socket", socket.id);

  // 1. 방 입장시
  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });
    if (error) {
      return callback(error); // chat.js  콜백함수
    }
    socket.join(user.room);
    socket.emit(
      "message",
      generateMessage("Admin", `${user.room}방에 오신 것을 환영합니다.`)
    );
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        generateMessage("", `${user.username}이(가) 방에 참여했습니다.`)
      );

    // user.room에 있는 모든 사람에게 메시지 전송
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  // 2. 메시지 보낼 시
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", generateMessage(user.username, message));
    callback(); // chat.js  콜백함수
  });

  // 3. 사용자가 방을 나갈 시
  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage("Admin", `${user.username}이(가) 방을 나갔습니다.`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room), // 누가 방을 나갔는지 업데이트
      });
    }
  });
});

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
