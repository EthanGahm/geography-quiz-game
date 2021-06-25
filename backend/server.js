const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

// Users format:
// Each entry represents a single user
/* 
{
  id_1: {
    username: username_1,
    score: score_1,
    room: room_1
  },
  id_2: {
    username: username_2,
    score: score_2,
    room: room_2
  }
}
*/

// Rooms format:
// Each entry represents a single set of users (those inside that particular room)
/* 
{
  room_1: {
    id_1: {...user_1},
    id_2: {...user_2},
    id_3: {...user_3}, 
  },
  room_2: {
    id_4: {...user_4},
    id_5: {...user_5},
  }
}
*/


let users = {}
let rooms = {}

function usernameInRoom(username, room) {
  for (const user in rooms[room].users) {
    if (user.username === username) {
      return true;
    }
  }
  return false;
}

io.on("connection", (socket) => {
  users[socket.id] = { username: "", score: 1, room: "" }
  socket.emit("your id", socket.id);

  socket.on("create room", (room, username) => {
    if (room in rooms) {
      socket.emit("room already exists")
    } else {
      users[socket.id].username = username;
      users[socket.id].room = room;
      rooms[room] = { gameActive: false, users: {} };
      rooms[room].users[socket.id] = users[socket.id];
      socket.join(room);
      socket.emit("joined room");
      io.to(room).emit("update users list", rooms[room].users);
    }
  })

  socket.on("join room", (room, username) => {
    if (!(room in rooms)) {
      socket.emit("room does not exist");
    } else if (usernameInRoom(username, room)) {
      socket.emit("name in use");
    } else if (Object.keys(rooms[room].users).length >= 6) {
      socket.emit("room full");
    } else if (rooms[room].gameActive === true) {
      socket.emit("game active");
    } else {
      users[socket.id].username = username;
      users[socket.id].room = room;
      rooms[room].users[socket.id] = users[socket.id];
      socket.join(room);
      socket.emit("joined room");
      io.to(room).emit("update users list", rooms[room].users);
    };
  });

  socket.on("correct guess", () => {
    room = users[socket.id].room;
    users[socket.id].score++;
    io.to(users[socket.id].room).emit("update users list", rooms[room].users);
  });

  socket.on("start", (startTime, room) => {
    for (const user in rooms[room].users) {
      if (user.score != 1) {
        user.score = 1;
      }
    };
    rooms[room].gameActive = true;
    io.to(users[socket.id].room).emit("update users list", rooms[room].users);
    io.to(room).emit("start", startTime);
  });

  socket.on("finished", (username, room, finishTime) => {
    rooms[room].gameActive = false;
    io.to(room).emit("finished", username, finishTime);
  });

  socket.on("disconnect", () => {
    if (users[socket.id].room !== "") {
      let room = users[socket.id].room;
      delete rooms[room][socket.id];
      if (Object.keys(rooms[room].users).length === 0) {
        delete rooms[room];
      } else {
        io.to(room).emit("update users list", rooms[room].users);
      };
    };
    delete users[socket.id];
  });
});

server.listen(8000, () => console.log("server is running on port 8000"));
