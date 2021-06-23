import { Progress } from "semantic-ui-react";
import FormatTime from "../Methods/FormatTime";
import Timer from "./Timer";

const GameElements = ({
  gameState,
  currLocation,
  score,
  scoreOutOf,
  onStart,
  onRestart,
  time,
  username,
  winner
}) => {
  switch (gameState) {
    case "start":
      return (
        <>
          <button className="button" onClick={onStart}>
            Start
          </button>
        </>
      );
    case "game":
      return (
        <>
          <Progress
            value={score}
            total={scoreOutOf}
            progress="ratio"
            color="green"
            size="medium
            "
          />
          <div className="placeName">
            <h2>Find: {currLocation}</h2>
          </div>
          <div className="timer">
            <Timer time={time} />
          </div>
        </>
      );
    case "game over":
      return (
        <>
          <h2>{winner === username ? "You won!" : "Winner: " + winner}</h2>
          <h3>Your time: {FormatTime(time)}</h3>
          <button className="button" onClick={onRestart}>
            Play Again
          </button>
        </>
      );
    default:
      return <>GameState error</>;
  }
};

export default GameElements;
