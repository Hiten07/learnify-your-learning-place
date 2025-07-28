import {Server as HttpServer} from 'http';
import {Server} from "socket.io";

let io: Server;
let userSocketMap = new Map<string,string>();

export const initSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
          origin: "http://localhost:5173", 
          methods: ["GET", "POST","PUT","DELETE"],
        },
    });

    io.on("connection",(socket) => {
    
        const id: string = socket.handshake.query.id as string;
        // if user id exists, set the socket id and userid in map
        if(id) {
            userSocketMap.set(id,socket.id);
        }

        socket.on("disconect",() => {
            console.log("Disconnected");
            userSocketMap.delete(id);
        })
    })
}

export const getIO = () => io;

export const getUserSocketID = (id: string) => {
    const userIdinstring = id.toString(); 
    console.log(userSocketMap)
    const socketid = userSocketMap.get(userIdinstring);
    console.log(socketid);
    console.log(typeof socketid)
    return socketid
}


