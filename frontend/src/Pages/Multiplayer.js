import Map from "../Components/Map";
import Geocode from "react-geocode";
import React from "react";
import { getRandomCountry } from "../Components/PlaceGenerator";
import GameElements from "../Components/GameElements";
import checkClick from "../Methods/CheckClick";

const initialPinLocation = {
  lat: 0,
  lng: 0,
};

const { REACT_APP_APIKEY } = process.env;

const Multiplayer = ({ socket, username, room }) => {
  const [currLocation, setCurrLocation] = React.useState([]);
  const [gameState, setGameState] = React.useState("start");
  const [score, setScore] = React.useState(1);
  const [time, setTime] = React.useState(0);
  const [winner, setWinner] = React.useState("")
  // const [pings, setPings] = React.useState([]);
  // const [pingCount, setPingCount] = React.useState(0);

  const startTime = React.useRef();
  const scoreOutOf = React.useRef(2);

  React.useEffect(() => {
    Geocode.setApiKey(REACT_APP_APIKEY);

    socket.on("finished", (username, finishTime) => {
      finish(username, finishTime);
    });

    socket.on("start", (startTime) => {
      start(startTime);
    });
  }, [socket]);

  function sendFinish(username, room, finishTime) {
    socket.emit("finished", username, room, finishTime);
  }

  function sendStart() {
    socket.emit("start", Math.floor(Date.now() / 10), room);
  }

  // Timer
  // When gameState changes to "game" a repeating interval of 10
  // millisenconds is set. When gameState changes away from "game"
  // interval is cleared and no longer runs.
  React.useEffect(() => {
    let interval = null;

    if (gameState === "game") {
      interval = setInterval(() => {
        setTime(Math.floor(Date.now() / 10) - startTime.current);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gameState]);

  function onMapClick(lat, lng) {
    if (gameState === "game") {
      let correct = checkClick(lat, lng, currLocation);
      correct.then((correct) => {
        if (correct) {
          setScore(() => score + 1);
          if (score === scoreOutOf.current) {
            sendFinish(username, room, time);
            finish();
          } else {
            // setPingCount(() => pingCount + 1);
            // setPings([
            //   { lat: lat, lng: lng, class: "correctPing", id: pingCount },
            //   ...pings,
            // ]);
            setCurrLocation(getRandomCountry());
          }
        } else {
          // setPingCount(() => pingCount + 1);
          // setPings([
          //   { lat: lat, lng: lng, class: "incorrectPing", id: pingCount },
          //   ...pings,
          // ]);
        }
      });
    }
  }

  function start(_startTime) {
    setGameState("game");
    setCurrLocation(getRandomCountry());
    setScore(1);
    setTime(0);
    startTime.current = _startTime;
  }

  function finish(username, finishTime) {
    setTime(finishTime)
    setWinner(username)
    setGameState("game over");
  }

  // function removePing() {
  //   setPings(pings.slice(0, pings.length - 1));
  // }

  return (
    <>
      <div className="headerPanel">
        <h1>Room: {room}</h1>
      </div>
      <div className="gamePanel">
        <GameElements
          score={score}
          scoreOutOf={scoreOutOf.current}
          currLocation={currLocation[0]}
          onStart={sendStart}
          onRestart={sendStart}
          gameState={gameState}
          time={time}
          username={username}
          winner={winner}
        />
      </div>
      <div className="mapPanel">
        <Map
          initialCenter={initialPinLocation}
          zoomLevel={3}
          onClick={onMapClick}
        // pings={pings}
        // removePing={removePing}
        />
      </div>
    </>
  );
};

export default Multiplayer;
