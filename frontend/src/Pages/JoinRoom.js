import React from "react";
import { SocketContext } from '../Context/Socket';

const JoinRoom = ({ username, setUsername, room, setRoom, setPage }) => {
  const socket = React.useContext(SocketContext);

  React.useEffect(() => {
    socket.on("room does not exist", () => {
      alert("A room by that name does not exist.");
    });

    socket.on("name in use", () => {
      alert("That username is already in use.");
    });

    socket.on("room full", () => {
      alert("Room full.");
    });

    socket.on("game active", () => {
      alert("That room is in the middle of a game. Wait until their game is over before joining.")
    })

    socket.on("joined room", () => {
      setPage("multiplayer");
    });
  }, [socket, setPage]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (room.length === 0) {
      alert("Please enter a room name.")
    } else if (username.length === 0) {
      alert("Please enter a name");
    } else if (username.length > 20) {
      alert(
        "Username too long. Usernames must be between 1 and 20 characters in length."
      );
    } else {
      socket.emit("join room", room, username)
    };
  };


  return (
    <>
      <div className="headerPanel">
        <h1>Join a Room</h1>
      </div>
      <div className="optionsPanel">
        <form onSubmit={onSubmit}>
          <input
            className="inputField"
            type="text"
            placeholder="Room Name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <input
            className="inputField"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input className="button" type="submit" value="Join" />
        </form>
      </div>
    </>
  );
};

export default JoinRoom;
