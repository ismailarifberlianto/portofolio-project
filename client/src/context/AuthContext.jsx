import { createContext, useContext, useState } from "react";
import { getToken, setToken, clearToken } from "../services/api";
import { login as loginRequest } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getToken()));
  const [admin, setAdmin] = useState(null);

  async function login(email, password) {
    const res = await loginRequest(email, password);
    setToken(res.token);
    setAdmin(res.user);
    setIsAuthenticated(true);
    return res;
  }

  function logout() {
    clearToken();
    setAdmin(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}