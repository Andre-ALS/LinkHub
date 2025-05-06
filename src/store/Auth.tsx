import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../interfaces/users";
import {
  registerUserLS,
  getUserByEmailandPasswordLS,
  getUserByEmailLS,
  getLoggedUserLS,
  logoutUserLS,
  loginUserLS,
} from "../localStorage/users";
import {
  isConfirmPasswordValid,
  isEmailValid,
  isPasswordValid,
} from "../utils/validation";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const initialState: AuthContextType = {
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
};

const AuthContext = createContext<AuthContextType>(initialState);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getLoggedUserLS());
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    if (isEmailValid(email) || isPasswordValid(password)) {
      throw new Error("Invalid email or password");
    }

    const user = getUserByEmailandPasswordLS(email, password);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    setUser(user);
    loginUserLS(user);
  };

  const logout = async (): Promise<void> => {
    setUser(null);
    logoutUserLS();
  };

  const register = async (
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<void> => {
    if (
      isEmailValid(email) ||
      isPasswordValid(password) ||
      isConfirmPasswordValid(password, confirmPassword)
    ) {
      throw new Error("Invalid email or password");
    }

    console.log("Registering user:", email, password, confirmPassword);

    const userAlreadyExists = getUserByEmailLS(email);

    if (userAlreadyExists) {
      throw new Error("Registration failed, try another email");
    }

    const user: User = {
      id: Math.random().toString(36).substring(2, 9),
      email,
      password,
    };

    setUser(user);
    registerUserLS(user);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
