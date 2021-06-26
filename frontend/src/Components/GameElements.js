import FormatTime from "../Methods/FormatTime";
import Timer from "./Timer";
import UsersList from "./UsersList";
import ProgressBars from "./ProgressBars";

const GameElements = ({
  gameState,
  currLocation,
  score,
  scoreOutOf,
  onStart,
  onRestart,
  time,
  username,
  users,
  winner
}) => {
  const start = () => {
    if (Object.keys(users).length <= 1) {
      alert("At least two players must be present in order to start the game.")
    } else {
      onStart()
    }
  }

  switch (gameState) {
    case "start":
      return (
        <>
          <button className="button" onClick={start}>
            Start
          </button>
          <UsersList users={users} username={username} />
        </>
      );
    case "game":
      return (
        <>
          <ProgressBars users={users} username={username} scoreOutOf={scoreOutOf} />
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
          <h3>Time: {FormatTime(time)}</h3>
          <button className="button" onClick={onRestart}>
            Play Again
          </button>
        </>
      );
    case "aborted":
      return (
        <>
          <h2>Game aborted! All but one player left the game.</h2>
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
