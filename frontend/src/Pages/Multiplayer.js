import Map from "../Components/Map";
import Geocode from "react-geocode";
import React from "react";
import { getRandomCountry } from "../Methods/PlaceGenerator";
import GameElements from "../Components/GameElements";
import checkClick from "../Methods/CheckClick";
import { SocketContext } from '../Context/Socket';

const initialPinLocation = {
  lat: 0,
  lng: 0,
};

const { REACT_APP_APIKEY } = process.env;

const Multiplayer = ({ username, room, myId, gameState, setGameState }) => {
  const socket = React.useContext(SocketContext);

  const [currLocation, setCurrLocation] = React.useState([]);
  const [time, setTime] = React.useState(0);
  const [winner, setWinner] = React.useState("");
  const [users, setUsers] = React.useState({})
  // const [users, setUsers] = React.useState({});
  // const [pings, setPings] = React.useState([]);
  // const [pingCount, setPingCount] = React.useState(0);

  const startTime = React.useRef();
  const scoreOutOf = React.useRef(2);
  const scores = React.useRef({})

  const start = React.useCallback((_startTime) => {
    setCurrLocation(getRandomCountry());
    setTime(0);
    startTime.current = _startTime;
    setGameState("game");
  }, [setGameState])

  const finish = React.useCallback((username, finishTime) => {
    setTime(finishTime);
    setWinner(username);
    setGameState("game over");
  }, [setGameState]);

  const restart = React.useCallback(() => {
    setGameState("start");
  }, [setGameState]);

  const abort = React.useCallback(() => {
    setGameState("aborted");
  }, [setGameState]);

  React.useEffect(() => {
    Geocode.setApiKey(REACT_APP_APIKEY);
  }, [])

  React.useEffect(() => {
    socket.on("start", (startTime) => {
      start(startTime);
    });

    socket.on("finished", (username, finishTime) => {
      finish(username, finishTime);
    });

    socket.on("restart", () => {
      restart();
    });

    socket.on("aborted", () => {
      abort();
    })

    socket.on("update users list", (_users) => {
      setUsers(_users);
    });
  }, [socket, start, finish, restart, abort, users]);

  function sendFinish() {
    socket.emit("finished", username, room, time);
  };

  function sendStart() {
    socket.emit("start", Math.floor(Date.now() / 10), room);
  };

  function sendRestart() {
    socket.emit("restart", room);
  }

  function sendCorrectGuess() {
    socket.emit("correct guess");
  };

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
          if (users[myId].score === scoreOutOf.current) {
            sendFinish();
          } else {
            sendCorrectGuess();
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
    };
  };

  // function removePing() {
  //   setPings(pings.slice(0, pings.length - 1));
  // }

  return (
    <>
      <div className="headerPanel">
        <h1>{room}</h1>
      </div>
      <div className="gamePanel">
        <GameElements
          scoreOutOf={scoreOutOf.current}
          currLocation={currLocation[0]}
          onStart={sendStart}
          onRestart={sendRestart}
          gameState={gameState}
          time={time}
          username={username}
          users={users}
          scores={scores.current}
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
