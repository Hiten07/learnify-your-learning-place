import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { getUserDetailsFromToken } from "../middlewares/socketmiddleware";

let io: Server;
let userSocketMap = new Map<string, string>();

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.use((socket, next) => {
    let decodedUserToken = getUserDetailsFromToken(socket);
    try {
      if (!decodedUserToken) {
        return next(new Error("Authentication error: user not found"));
      }
      socket.data.user = decodedUserToken;
      next();
    } catch (error) {
        console.log(error)
    }
  });

  io.on("connection", (socket) => {

    // if user id exists, set the socket id and userid in map
    if (socket.data.user.id) {
      userSocketMap.set(socket.data.user.id, socket.id);
      console.log(userSocketMap)
    }

    socket.on("disconnect", () => {
      console.log("Disconnected");
      userSocketMap.delete(socket.data.user.id);
    });
  });
};

export const getIO = () => io;

export const getUserSocketID = (id: string) => {
//   console.log(userIdinstring)
  const socketid = userSocketMap.get(id);
  console.log(socketid);
  console.log(typeof socketid);
  return socketid;
};
