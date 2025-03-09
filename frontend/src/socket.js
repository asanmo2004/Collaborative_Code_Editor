import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000"; // Replace with your actual backend URL

export const socket = io(SOCKET_SERVER_URL, {
    transports: ["websocket"], 
    reconnectionAttempts: 5, 
    timeout: 5000,
});
