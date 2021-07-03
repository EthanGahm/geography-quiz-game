import React from "react";
import socketio from "socket.io-client";

console.log("Creating socket")
export const socket = socketio.connect(process.env.REACT_APP_BACKENDURL);
export const SocketContext = React.createContext();