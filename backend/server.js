const PlaceGenerator = require("./PlaceGenerator.js")

const app = require("express")();
const httpServer = require("http").createServer(app);
const options = { cors: { origin: '*' } };
const io = require("socket.io")(httpServer, options);

let users = {}
let rooms = {}

const numCountries = 10;

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
      rooms[room] = { gameState: "start", users: {}, countryList: [] };
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
    } else if (rooms[room].gameState === "game") {
      socket.emit("game active");
    } else {
      users[socket.id].username = username;
      users[socket.id].room = room;
      rooms[room].users[socket.id] = users[socket.id];
      socket.join(room);
      socket.emit("joined room", rooms[room].gameState);
      io.to(room).emit("update users list", rooms[room].users);
    };
  });

  socket.on("correct guess", (country) => {
    let room = users[socket.id].room;
    if (users[socket.id].score != numCountries && country[0] === rooms[room].countryList[users[socket.id].score - 1][0]) {
      users[socket.id].score++;
      socket.emit("new country", rooms[room].countryList[users[socket.id].score - 1]);
      io.to(users[socket.id].room).emit("update users list", rooms[room].users);
    }
  });

  socket.on("start", (startTime, room) => {
    rooms[room].gameState = "game";
    rooms[room].countryList = PlaceGenerator.getCountryList(numCountries);
    io.to(room).emit("start", startTime, rooms[room].countryList[0], numCountries);
  });

  socket.on("restart", (room) => {
    for (const user of Object.values(rooms[room].users)) {
      if (user.score != 1) {
        user.score = 1;
      }
    };
    io.to(users[socket.id].room).emit("update users list", rooms[room].users);
    rooms[room].gameState = "start";
    io.to(room).emit("restart");
  });

  socket.on("finished", (username, room, finishTime) => {
    rooms[room].gameState = "game over";
    io.to(room).emit("finished", username, finishTime);
  });

  socket.on("disconnect", () => {
    if (users[socket.id].room !== "") {
      let room = users[socket.id].room;
      delete rooms[room].users[socket.id];
      if (Object.keys(rooms[room].users).length === 0) {
        delete rooms[room];
      } else if (Object.keys(rooms[room].users).length === 1) {
        io.to(room).emit("update users list", rooms[room].users);
        io.to(room).emit("aborted");
      } else {
        io.to(room).emit("update users list", rooms[room].users);
      };
    };
    delete users[socket.id];
  });
});

httpServer.listen(process.env.PORT || 8000, () => console.log("server is running on port 8000"));
