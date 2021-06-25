import React from "react";
import { SocketContext } from '../Context/Socket';

const CreateRoom = ({ username, setUsername, room, setRoom, setPage }) => {
  const socket = React.useContext(SocketContext);

  React.useEffect(() => {
    socket.on("room already exists", () => {
      alert("Room name already in use. Please choose a different name.")
    });

    socket.on("joined room", () => {
      setPage("multiplayer")
    })
  }, [socket, setPage])

  const onSubmit = (event) => {
    event.preventDefault();

    if (room.length === 0) {
      alert("Please enter a room name.")
    } else if (room.length > 30) {
      alert(
        "Room name too long. Room names must be between 1 and 30 characters in length"
      );
    } else if (username.length === 0) {
      alert("Please enter a name");
    } else if (username.length > 20) {
      alert(
        "Username too long. Usernames must be between 1 and 20 characters in length."
      );
    } else {
      socket.emit("create room", room, username)
    }
  };


  return (
    <>
      <div className="headerPanel">
        <h1>Create a New Room</h1>
      </div>
      <div className="optionsPanel">
        <form onSubmit={onSubmit}>
          <input
            className="inputField"
            type="text"
            placeholder="Enter a Room Name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <input
            className="inputField"
            type="text"
            placeholder="Enter a Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input className="button" type="submit" value="Join" />
        </form>
      </div>
    </>
  );
};

export default CreateRoom;
