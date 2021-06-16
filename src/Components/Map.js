import React from "react";
import GoogleMapReact from "google-map-react";
// import Ping from "./Ping";

const { REACT_APP_APIKEY } = process.env;

const mapStyles = [
  {
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

const Map = ({ initialCenter, zoomLevel, onClick, pings, removePing }) => {
  const _onClick = ({ x, y, lat, lng, event }) => {
    onClick(lat, lng);
  };

  const _mapStyles = {
    styles: mapStyles,
    fullscreenControl: false,
    minZoom: 2,
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
        >
          {/* {pings.map((ping) => (
            <Ping
              key={ping.id}
              className={ping.className}
              lat={ping.lat}
              lng={ping.lng}
              removePing={removePing}
            />
          ))} */}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
