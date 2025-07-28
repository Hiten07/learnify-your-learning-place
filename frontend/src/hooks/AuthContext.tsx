import { useState, useEffect, useMemo, useCallback,ReactNode } from 'react';
import {Getrolefromtoken, Getidfromtoken } from '../utils/Getrolefromtoken';
import { useAuthContext } from './Createcontext';
import Cookies from 'js-cookie';

interface MyContextProviderProps {
  children: ReactNode; 
}

export const UseAuthProvider = ({children}: MyContextProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(Cookies.get('authtoken') as string | null);
  const [role,setRole] = useState<string | null>(null)
  const [id,setId] = useState<string | null>("0");
  
  // Check for token when the app loads
  useEffect(() => {
    const token = Cookies.get('authtoken');
    if (token) {
      setAuthToken(token);
      setId(Getidfromtoken(token))
      setRole(Getrolefromtoken(token))
    }
  }, []);

  const logout = useCallback(() => {
    Cookies.remove('authtoken');
    setAuthToken(null);
    setRole(null)
    window.location.href = "/users/login";
  },[]);

  const value = useMemo(() => {
    return { authToken, setAuthToken, logout, role, setRole, id, setId}
  },[ authToken, setAuthToken, logout, role, id, setId])

  return (
    <useAuthContext.Provider value={value}>
     {children}
    </useAuthContext.Provider>  
  );
};
