import { createContext } from "react";

type defaultAuthContextValue = {
    authToken: string | null,
    setAuthToken: React.Dispatch<React.SetStateAction<string | null>>,
    role: string | null,
    setRole: React.Dispatch<React.SetStateAction<string | null>>,
    logout: () => void,
  }

  export const useAuthContext = createContext<defaultAuthContextValue>({} as defaultAuthContextValue);