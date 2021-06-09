import Map from "./Components/Map";
import Geocode from "react-geocode";
import React from "react";
import axios from "axios";
import { getRandomCountry } from "./Components/PlaceGenerator";
import Header from "./Components/Header";
import GameElements from "./Components/GameElements";
import { Progress } from "semantic-ui-react";

const initialPinLocation = {
  lat: 0,
  lng: 0,
};

const { REACT_APP_APIKEY } = process.env;

const getCountry = async (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat.toString()},${lng.toString()}&location_type=APPROXIMATE&result_type=country&key=${REACT_APP_APIKEY}`;

  let res = axios.get(url);

  return res.then(
    (res) => res.data.results[0].address_components[0].short_name
  );
};

function App() {
  const [currLocation, setCurrLocation] = React.useState(getRandomCountry());
  const [gameState, setGameState] = React.useState("start");
  const [score, setScore] = React.useState(1);
  const [scoreOutOf, setScoreOutOf] = React.useState(10);

  React.useEffect(() => {
    Geocode.setApiKey(REACT_APP_APIKEY);
  }, []);

  function checkClick(lat, lng) {
    let clickCountry = getCountry(lat, lng);
    clickCountry
      .then((clickCountry) => {
        console.log(clickCountry);
        if (clickCountry === currLocation[1]) {
          setScore(() => score + 1);
          if (score === scoreOutOf) {
            finish();
          } else {
            setCurrLocation(getRandomCountry());
          }
        }
      })
      .catch(() => {});
  }

  function start() {
    setGameState("game");
  }

  function finish() {
    setGameState("game over");
  }

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
        />
      </div>
      <div className="mapPanel">
        <Map
          initialCenter={initialPinLocation}
          zoomLevel={0}
          onClick={checkClick}
        />
      </div>
    </>
  );
}

export default App;
