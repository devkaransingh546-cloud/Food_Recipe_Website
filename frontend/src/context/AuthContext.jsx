import { createContext, useContext, useMemo, useState } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

const USERS_KEY = "local_auth_users";

const loadLocalUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (_err) {
    return [];
  }
};

const saveLocalUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch (_err) {
      localStorage.removeItem("user");
      return null;
    }
  });

  const login = async (payload) => {
    try {
      const { data } = await api.post("/auth/login", payload);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
    } catch (err) {
      const isNetworkError = !err?.response;
      if (!isNetworkError) throw err;

      const users = loadLocalUsers();
      const email = payload.email.trim().toLowerCase();
      const matched = users.find((u) => u.email === email && u.password === payload.password);
      if (!matched) {
        throw new Error("Invalid credentials");
      }
      const localUser = { id: matched.id, name: matched.name, email: matched.email };
      localStorage.setItem("token", `local-token-${matched.id}`);
      localStorage.setItem("user", JSON.stringify(localUser));
      setToken(`local-token-${matched.id}`);
      setUser(localUser);
    }
  };

  const register = async (payload) => {
    try {
      const { data } = await api.post("/auth/register", payload);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
    } catch (err) {
      const isNetworkError = !err?.response;
      if (!isNetworkError) throw err;

      const users = loadLocalUsers();
      const email = payload.email.trim().toLowerCase();
      if (users.some((u) => u.email === email)) {
        throw new Error("Email already in use");
      }

      const created = {
        id: `local-${Date.now()}`,
        name: payload.name.trim(),
        email,
        password: payload.password
      };
      users.push(created);
      saveLocalUsers(users);

      const localUser = { id: created.id, name: created.name, email: created.email };
      localStorage.setItem("token", `local-token-${created.id}`);
      localStorage.setItem("user", JSON.stringify(localUser));
      setToken(`local-token-${created.id}`);
      setUser(localUser);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
