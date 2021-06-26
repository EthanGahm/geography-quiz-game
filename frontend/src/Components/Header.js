const Header = ({ page, room }) => {
  switch (page) {
    case "home":
      return (
        <div>
          <h1>Place Race</h1>
        </div>
      );
    case "create room":
      return (
        <div>
          <h1>Create a New Room</h1>
        </div>
      );
    case "join room":
      return (
        <div>
          <h1>Join a Room</h1>
        </div>
      );
    case "multiplayer":
      return (
        <div>
          <h1>{room}</h1>
        </div>
      );
    default:
      return (
        <div>
          <h1>Place Race</h1>
        </div>
      );
  }
};

export default Header;
