
import { AppRoutes } from "./routes";
import { useSocket } from "./hooks/usesocket";
import "./App.css"; 

function App() {            
  useSocket();
  return (
    <>
      <AppRoutes/>
    </>
  );
}

export default App;
