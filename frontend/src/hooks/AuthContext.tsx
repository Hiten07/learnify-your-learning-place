import { useState, useEffect, useMemo, useCallback } from 'react';
import { AuthContext } from './Createcontext';
import Cookies from 'js-cookie';

export const AuthProvider = ({children}) => {
  const [authToken, setAuthToken] = useState<string | null>(Cookies.get('authtoken') as string | null);

  // Check for token when the app loads
  useEffect(() => {
    const token = Cookies.get('authtoken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const logout = useCallback(() => {
    Cookies.remove('authtoken');
    setAuthToken(null);
    window.location.href = "/users/login";
  },[]);

  const value = useMemo(() => {
    return {authToken,setAuthToken,logout}
  },[authToken,setAuthToken,logout])

  return (
    <AuthContext.Provider value={value}>
     {children}
    </AuthContext.Provider>  
  );
};
