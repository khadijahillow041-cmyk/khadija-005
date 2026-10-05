import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("medicare_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.get(
      `/users?email=${email}&password=${password}`
    );
    if (data.length === 0) throw new Error("Invalid email or password");
    localStorage.setItem("medicare_user", JSON.stringify(data[0]));
    setUser(data[0]);
    return data[0];
  };

  const register = async (payload) => {
    const exists = await api.get(`/users?email=${payload.email}`);
    if (exists.data.length > 0) throw new Error("Email already registered");
    const newUser = {
      ...payload,
      role: "patient",
      avatar: `https://i.pravatar.cc/150?u=${payload.email}`,
    };
    const { data } = await api.post("/users", newUser);
    localStorage.setItem("medicare_user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("medicare_user");
    setUser(null);
  };

  const updateUser = (updated) => {
    localStorage.setItem("medicare_user", JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);