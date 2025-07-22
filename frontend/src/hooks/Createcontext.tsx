import { createContext } from "react";

type defaultAuthContextValue = {
    authToken: string | null,
    setAuthToken: React.Dispatch<React.SetStateAction<string | null>>
    logout: () => void,
  }

  export const AuthContext = createContext<defaultAuthContextValue>({} as defaultAuthContextValue);