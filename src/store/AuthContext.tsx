import React, { createContext, useContext, useState, useEffect } from "react";
import { DashboardUser, User } from "../interfaces/users";
import {
  registerUserLS,
  getUserByEmailandPasswordLS,
  getUserByEmailLS,
  getLoggedUserLS,
  logoutUserLS,
  loginUserLS,
  getDashboardUserByUserIdLS,
  updateDashboardUserLS,
  getDashboardUserByUsernameLS,
} from "../localStorage/users";
import {
  isConfirmPasswordValid,
  isEmailValid,
  isPasswordValid,
} from "../utils/validation";

interface AuthContextType {
  user: User | null;
  dashboardUser: DashboardUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateDashboardUser: (updatedUser: DashboardUser) => void;
  getDashboardUserByUsername: (username: string) => DashboardUser | null;
  isLoading: boolean;
}

const initialState: AuthContextType = {
  user: null,
  dashboardUser: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  updateDashboardUser: () => {},
  getDashboardUserByUsername: () => {
    return null;
  },
  isLoading: false,
};

const AuthContext = createContext<AuthContextType>(initialState);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dashboardUser, setDashboardUser] = useState<DashboardUser | null>(
    null
  );

  const setUserAndDashboardUser = (
    user: User | null,
    dashboardUser: DashboardUser | null
  ): void => {
    setUser(user);
    setDashboardUser(dashboardUser);
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    if (isEmailValid(email) || isPasswordValid(password)) {
      setIsLoading(false);
      throw new Error("Invalid email or password");
    }

    const user = getUserByEmailandPasswordLS(email, password);

    if (!user) {
      setIsLoading(false);
      throw new Error("Invalid email or password");
    }

    const dashboardUser = getDashboardUserByUserIdLS(user.id);

    if (!dashboardUser) {
      throw new Error("User not found");
    }

    loginUserLS(user, dashboardUser);
    setUserAndDashboardUser(user, dashboardUser);

    setIsLoading(false);
  };

  const logout = async (): Promise<void> => {
    logoutUserLS();
    setUserAndDashboardUser(null, null);
  };

  const register = async (
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<void> => {
    setIsLoading(true);
    if (
      isEmailValid(email) ||
      isPasswordValid(password) ||
      isConfirmPasswordValid(password, confirmPassword)
    ) {
      setIsLoading(false);
      throw new Error("Invalid email or password");
    }

    const userAlreadyExists = getUserByEmailLS(email);

    if (userAlreadyExists) {
      setIsLoading(false);
      throw new Error("Registration failed, try another email");
    }

    const user: User = {
      id: Math.random().toString(36).substring(2, 9),
      email,
      password,
    };

    const dashboardUser: DashboardUser = {
      username: email.split("@")[0],
      name: "",
      bio: "",
      profilePicture: "",
      userId: user.id,
    };

    registerUserLS(user, dashboardUser);
    setUserAndDashboardUser(user, dashboardUser);

    setIsLoading(false);
  };

  const updateDashboardUser = (updatedUser: DashboardUser): void => {
    updateDashboardUserLS(updatedUser.userId, updatedUser);
    setDashboardUser(updatedUser);
  };

  const getDashboardUserByUsername = (
    username: string
  ): DashboardUser | null => {
    setIsLoading(true);
    const dashboardUserData = getDashboardUserByUsernameLS(username);
    if (!dashboardUserData) {
      setIsLoading(false);
      return null;
    }
    setIsLoading(false);
    return dashboardUserData;
  };

  useEffect(() => {
    setIsLoading(true);
    const loggedUser = getLoggedUserLS();

    if (loggedUser) {
      setUser(loggedUser);
      setDashboardUser(getDashboardUserByUserIdLS(loggedUser?.id || ""));
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        dashboardUser,
        login,
        logout,
        register,
        updateDashboardUser,
        getDashboardUserByUsername,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = (): AuthContextType => useContext(AuthContext);
