import React from "react";
import GoogleMapReact from "google-map-react";
import mapStyles from "./MapStyles.json";

const { REACT_APP_APIKEY } = process.env;

const Map = ({ initialCenter, zoomLevel, onClick }) => {
  const _onClick = ({ x, y, lat, lng, event }) => {
    onClick(lat, lng);
  };

  const _mapStyles = {
    styles: mapStyles,
    fullscreenControl: false,
  };

  return (
    <div>
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: REACT_APP_APIKEY }}
          defaultCenter={initialCenter}
          defaultZoom={zoomLevel}
          onClick={_onClick}
          options={_mapStyles}
        ></GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;