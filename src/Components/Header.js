const Header = ({ currLocation, lives, gameState, score }) => {
  let text = "";
  if (gameState === "start") {
    text =
      "Correctly identify as many countries as you can before running out of lives.";
  } else if (gameState === "game") {
    text = `Find: ${currLocation}`;
  } else if (gameState === "game over") {
    text = "Game over!";
  }

  return (
    <div>
      <h1>Geography Quiz</h1>
      <h2>{text}</h2>
      <h2>
        Lives: {lives}, Score: {score}{" "}
      </h2>
    </div>
  );
};

export default Header;
