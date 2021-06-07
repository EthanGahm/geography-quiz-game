import Map from "./Components/Map";
import Geocode from "react-geocode";
import React from "react";
import axios from "axios";
import { getRandomCountry } from "./Components/PlaceGenerator";
import Header from "./Components/Header";

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
  const [lives, setLives] = React.useState(3);
  const [gameState, setGameState] = React.useState("game");
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    Geocode.setApiKey(REACT_APP_APIKEY);
  }, []);

  function checkClick(lat, lng) {
    let clickCountry = getCountry(lat, lng);
    clickCountry
      .then((clickCountry) => {
        if (clickCountry === currLocation[1]) {
          setScore(() => score + 1);
          setCurrLocation(getRandomCountry());
        } else {
          if (lives <= 1) {
            setGameState("game over");
          }
          setLives(() => lives - 1);
        }
      })
      .catch(() => {});
  }

  return (
    <>
      <div className="headerPanel">
        <Header
          currLocation={currLocation[0]}
          lives={lives}
          gameState={gameState}
          score={score}
        />
      </div>
      <div className="progressPanel">
        <h2>Progress</h2>
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
