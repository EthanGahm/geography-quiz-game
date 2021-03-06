import FormatTime from "../Methods/FormatTime";

const Timer = ({ time }) => {
  return (
    <div className="timer">
      <h2>{`Time: ${FormatTime(time)}`}</h2>
    </div>
  );
};

export default Timer;
