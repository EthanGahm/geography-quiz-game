import { Progress } from "semantic-ui-react";
import FormatTime from "./FormatTime";
import Timer from "./Timer";

const GameElements = ({
  gameState,
  currLocation,
  score,
  scoreOutOf,
  onStart,
  onRestart,
  time,
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
            percent={(score / scoreOutOf) * 100}
            value={score}
            total={scoreOutOf}
            progress="ratio"
            color="green"
            size="big"
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
          <h2>Nice work!</h2>
          <h3>Your time: {FormatTime(time)}</h3>
          <button className="button" onClick={onRestart}>
            Play Again
          </button>
        </>
      );
  }
};

export default GameElements;
