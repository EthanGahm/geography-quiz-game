import React from "react";

const Ping = ({ key, className, lat, lng, removePing }) => {
  React.useEffect(() => {
    setTimeout(() => removePing(), 1100);
  }, [removePing]);

  return (
    <div
      key={key}
      className={className}
      lat={lat}
      lng={lng}
      style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
      }}
    ></div>
  );
};

export default Ping;
