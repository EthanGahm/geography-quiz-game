import React from "react";

const Home = ({ setPage }) => {
  return (
    <>
      <div className="headerPanel">
        <h1>Place Race</h1>
      </div>
      <div className="optionsPanel">
        <button className="button" onClick={() => setPage("single player")}>Single Player</button>
        <button className="button" onClick={() => setPage("create room")}>Create Room</button>
        <button className="button" onClick={() => setPage("join room")}>Join Room</button>
      </div>
    </>
  );
};

export default Home;
