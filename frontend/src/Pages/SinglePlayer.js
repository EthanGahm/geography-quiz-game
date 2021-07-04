import Map from "../Components/Map";
import Geocode from "react-geocode";
import React from "react";
import getCountryList from "../Methods/PlaceGenerator";
import SinglePlayerGameElements from "../Components/SinglePlayerGameElements";
import checkClick from "../Methods/CheckClick";

const initialMapCenter = {
  lat: 0,
  lng: 0,
};

const { REACT_APP_APIKEY } = process.env;

function SinglePlayer() {
  const [gameState, setGameState] = React.useState("start");
  const [score, setScore] = React.useState(1);
  const [time, setTime] = React.useState(0);
  const [currLocation, setCurrLocation] = React.useState()

  const countryList = React.useRef([]);
  const scoreOutOf = React.useRef(10);
  const startTime = React.useRef()

  React.useEffect(() => {
    Geocode.setApiKey(REACT_APP_APIKEY);

    countryList.current = getCountryList(scoreOutOf.current)
  }, []);

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
          if (score === scoreOutOf.current) {
            finish();
          } else {
            setCurrLocation(countryList.current[score])
            setScore(() => score + 1)
          };
        };
      });
    };
  };

  function start() {
    setGameState("game");
    setCurrLocation(countryList.current[0]);
    setScore(1);
    setTime(0);
    startTime.current = Math.floor(Date.now() / 10)
  };

  function finish() {
    setGameState("game over");
  };

  return (
    <>
      <div className="headerPanel">
        <h1>Single Player</h1>
      </div>
      <div className="gamePanel">
        <SinglePlayerGameElements
          score={score}
          scoreOutOf={scoreOutOf.current}
          onStart={start}
          onRestart={start}
          gameState={gameState}
          time={time}
          currLocation={currLocation}
        />
      </div>
      <div className="mapPanel">
        <Map
          initialCenter={initialMapCenter}
          zoomLevel={3}
          onClick={onMapClick}
        />
      </div>
    </>
  );
}

export default SinglePlayer;