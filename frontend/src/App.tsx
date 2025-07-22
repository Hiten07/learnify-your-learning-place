import { AppRoutes } from "./routes";
import "./App.css";
import { AuthProvider } from "./hooks/AuthContext";

function App() {
  return (
    <>
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
    </>
  );
}

export default App;
