import { useEffect, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { showToastMessage } from "../utils/Toast.errors";
import { useAuthContext } from "./Createcontext";

export const useSocket = () => {
  const { authToken,id } = useContext(useAuthContext);




  useEffect(() => {

    if(authToken && id) {
    const socket: Socket = io("http://localhost:3007", {
      query: { id },
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
    };
  }
  }, [id,authToken]);
};
