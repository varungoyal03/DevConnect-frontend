
import { io } from "socket.io-client";
import { SOCKET_URL } from "./constants";

let socket = null;


export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
    });
  }
  return socket;
};


export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null; // <-- VERY IMPORTANT to allow new socket later
  }
};
