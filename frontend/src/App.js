import Map from "./Components/Map";
import Geocode from "react-geocode";
import React from "react";
import { getRandomCountry } from "./Components/PlaceGenerator";
import Header from "./Components/Header";
import GameElements from "./Components/GameElements";
import checkClick from "./Methods/CheckClick";
import io from "socket.io-client";

const initialPinLocation = {
  lat: 0,
  lng: 0,
};

const { REACT_APP_APIKEY } = process.env;

function App() {
  const [currLocation, setCurrLocation] = React.useState([]);
  const [gameState, setGameState] = React.useState("start");
  const [score, setScore] = React.useState(1);
  const [scoreOutOf, setScoreOutOf] = React.useState(2);
  const [time, setTime] = React.useState(0);
  const [yourID, setYourID] = React.useState();
  // const [pings, setPings] = React.useState([]);
  // const [pingCount, setPingCount] = React.useState(0);

  const socketRef = React.useRef();

  React.useEffect(() => {
    Geocode.setApiKey(REACT_APP_APIKEY);

    socketRef.current = io.connect("/");

    socketRef.current.on("your id", (id) => {
      setYourID(id);
    });

    socketRef.current.on("player finished", (id) => {
      finish();
    });
  }, []);

  function sendFinish() {
    socketRef.current.emit("finished", yourID);
  }

  // Timer
  // When gameState changes to "game" a repeating interval of 10
  // millisenconds is set. When gameState changes away from "game"
  // interval is cleared and no longer runs.
  React.useEffect(() => {
    let interval = null;

    if (gameState === "game") {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
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
          if (score === scoreOutOf) {
            sendFinish();
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

  function start() {
    setGameState("game");
    setCurrLocation(getRandomCountry());
    setScore(1);
    setTime(0);
  }

  function finish() {
    setGameState("game over");
  }

  // function removePing() {
  //   setPings(pings.slice(0, pings.length - 1));
  // }

  return (
    <>
      <div className="headerPanel">
        <Header />
      </div>
      <div className="gamePanel">
        <GameElements
          score={score}
          scoreOutOf={scoreOutOf}
          currLocation={currLocation[0]}
          onStart={start}
          onRestart={start}
          gameState={gameState}
          time={time}
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
}

export default App;
