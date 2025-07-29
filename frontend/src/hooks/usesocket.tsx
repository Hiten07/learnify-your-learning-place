import { useEffect, useContext,useState } from "react";
import { io, Socket } from "socket.io-client";
import { showToastMessage } from "../utils/Toast.errors";
import { useAuthContext } from "./Createcontext";

export const useSocket = () => {
  const { authToken} = useContext(useAuthContext);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if(authToken) {

      const socket: Socket = io("http://localhost:3007", {
        withCredentials: true
      });
  
    socket.on("assignmentAdded", (data) => {
      showToastMessage(data.message, 200);
    });
    socket.emit("assignmentAdded", (data) => {
      showToastMessage(data.message, 200);
    });

    return () => {
      socket.disconnect();
      setIsConnected(false)
    };
  }
  }, [authToken]);
};
