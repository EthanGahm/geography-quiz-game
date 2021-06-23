import React from "react";
import Home from "./Pages/Home";
import CreateRoom from "./Pages/CreateRoom";
import JoinRoom from "./Pages/JoinRoom"
import Multiplayer from "./Pages/Multiplayer";
import io from "socket.io-client"

const App = () => {
  // Global state variables
  const [page, setPage] = React.useState("home");
  const [username, setUsername] = React.useState("");
  const [room, setRoom] = React.useState("");
  const socketRef = React.useRef();

  React.useEffect(() => {
    socketRef.current = io.connect("/");
  }, [])

  switch (page) {
    case "home":
      return (
        <Home
          setPage={setPage}
        />
      )
    case "single player":
      return (
        <h1>Not yet implemented</h1>
      )
    case "create room":
      return (
        <CreateRoom
          socket={socketRef.current}
          username={username}
          setUsername={setUsername}
          room={room}
          setRoom={setRoom}
          setPage={setPage}
        />
      )
    case "join room":
      return (
        <JoinRoom
          socket={socketRef.current}
          username={username}
          setUsername={setUsername}
          room={room}
          setRoom={setRoom}
          setPage={setPage}
        />
      )
    case "multiplayer":
      return (
        <Multiplayer
          socket={socketRef.current}
          username={username}
          room={room}
          setPage={setPage}
        />
      )
    default:
      return (
        <h1>Page not found</h1>
      )
  }
};

export default App;
