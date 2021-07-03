import React from "react";
import Home from "./Pages/Home";
import CreateRoom from "./Pages/CreateRoom";
import JoinRoom from "./Pages/JoinRoom"
import Multiplayer from "./Pages/Multiplayer";
import SinglePlayer from "./Pages/SinglePlayer";
import { SocketContext, socket } from "./Context/Socket";

const App = () => {
  // Global state variables
  const [page, setPage] = React.useState("home");
  const [username, setUsername] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [gameState, setGameState] = React.useState("");
  const myId = React.useRef()
  console.log(myId.current)

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
        <SinglePlayer />
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
            setGameState={setGameState}
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
            setGameState={setGameState}
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
            gameState={gameState}
            setGameState={setGameState}
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
