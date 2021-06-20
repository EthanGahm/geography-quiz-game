import React from "react";
import Header from "../Components/Header";
import LinkButton from "../Components/LinkButton";

const Home = () => {
  return (
    <>
      <div className="headerPanel">
        <Header />
      </div>
      <div className="optionsPanel">
        <LinkButton>Single Player</LinkButton>
        <LinkButton to="/Multiplayer">Multiplayer</LinkButton>
      </div>
    </>
  );
};

export default Home;
