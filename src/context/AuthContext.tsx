"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  email: string;
  name: string;
  password?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, name: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user_session");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedUsersList = localStorage.getItem("registered_users_db");
    if (savedUsersList) {
      setRegisteredUsers(JSON.parse(savedUsersList));
    } else {
      // Inicia vacía o con un solo usuario demo específico
      const initialUsers: User[] = [
        { email: "usuario@udb.edu.sv", name: "Usuario Demo", password: "123" },
      ];
      setRegisteredUsers(initialUsers);
      localStorage.setItem("registered_users_db", JSON.stringify(initialUsers));
    }
  }, []);

  const register = (email: string, name: string, password: string) => {
    const exists = registeredUsers.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) return false;

    const newUser = { email, name, password };
    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem("registered_users_db", JSON.stringify(updatedUsers));

    // Iniciar sesión con el usuario recién creado
    setUser({ email, name });
    localStorage.setItem("user_session", JSON.stringify({ email, name }));
    return true;
  };

  const login = (email: string, password: string) => {
    const found = registeredUsers.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (found) {
      const userData = { email: found.email, name: found.name };
      setUser(userData);
      localStorage.setItem("user_session", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_session");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};