const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

let rooms = {}
let users = {}

function usernameInRoom(username, room) {
  for (user of rooms[room]) {
    if (user.username === username) {
      return true;
    }
  }
  return false;
}

io.on("connection", (socket) => {
  socket.on("create room", (room, username) => {
    if (room in rooms) {
      socket.emit("room already exists")
    } else {
      rooms[room] = [{ id: socket.id, username: username }]
      users[socket.id] = { username: username, room: room }
      socket.join(room)
      socket.emit("joined room")
    }
  })

  socket.on("join room", (room, username) => {
    if (!(room in rooms)) {
      socket.emit("room does not exist")
    } else if (usernameInRoom(username, room)) {
      socket.emit("name in use")
    } else {
      rooms[room].push({ id: socket.id, username: username })
      users[socket.id] = { username: username, room: room }
      socket.join(room)
      socket.emit("joined room")
    };
  });

  socket.on("start", (startTime, room) => {
    io.to(room).emit("start", startTime);
  });

  socket.on("finished", (username, room, finishTime) => {
    io.to(room).emit("finished", username, finishTime);
  });

  socket.on("disconnect", () => {
    if (socket.id in users) {
      rooms[users[socket.id].room] = rooms[users[socket.id].room].filter(
        user => user.id != socket.id);
      if (rooms[users[socket.id].room].length === 0) {
        delete rooms[users[socket.id].room]
      }
      delete users[socket.id]
    }
  });
});

server.listen(8000, () => console.log("server is running on port 8000"));
