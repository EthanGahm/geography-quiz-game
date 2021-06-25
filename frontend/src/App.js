import React from "react";
import Home from "./Pages/Home";
import CreateRoom from "./Pages/CreateRoom";
import JoinRoom from "./Pages/JoinRoom"
import Multiplayer from "./Pages/Multiplayer";
import { SocketContext, socket } from "./Context/Socket";

const App = () => {
  // Global state variables
  const [page, setPage] = React.useState("home");
  const [username, setUsername] = React.useState("");
  const [room, setRoom] = React.useState("");
  const myId = React.useRef()

  React.useEffect(() => {
    socket.on("your id", (id) => {
      myId.current = id;
    });
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
        <SocketContext.Provider value={socket}>
          <CreateRoom
            username={username}
            setUsername={setUsername}
            room={room}
            setRoom={setRoom}
            setPage={setPage}
          />
        </SocketContext.Provider>
      )
    case "join room":
      return (
        <SocketContext.Provider value={socket}>
          <JoinRoom
            username={username}
            setUsername={setUsername}
            room={room}
            setRoom={setRoom}
            setPage={setPage}
          />
        </SocketContext.Provider>
      )
    case "multiplayer":
      return (
        <SocketContext.Provider value={socket}>
          <Multiplayer
            username={username}
            room={room}
            setPage={setPage}
            myId={myId.current}
          />
        </SocketContext.Provider>
      )
    default:
      return (
        <h1>Page not found</h1>
      )
  }
};

export default App;
