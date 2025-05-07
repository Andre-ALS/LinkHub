import { DashboardUser, User } from "../interfaces/users";

export const registerUserLS = (
  user: User,
  dashboardUser: DashboardUser
): void => {
  const users = getAllUsersLS();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  const dashboardUsers = getAllDashboardUsersLS();
  dashboardUsers.push(dashboardUser);
  localStorage.setItem("dashboardUsers", JSON.stringify(dashboardUsers));

  loginUserLS(user, dashboardUser);
};

export const loginUserLS = (user: User, dashboardUser: DashboardUser): void => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("dashboardUser", JSON.stringify(dashboardUser));
};

export const logoutUserLS = (): void => {
  localStorage.removeItem("user");
  localStorage.removeItem("dashboardUser");
};

export const updateDashboardUserLS = (
  userId: string,
  updatedUser: DashboardUser
): void => {
  const dashboardUsers = getAllDashboardUsersLS();

  const index = dashboardUsers.findIndex((user) => user.userId === userId);

  if (index !== -1) {
    dashboardUsers[index] = updatedUser;
    localStorage.setItem("dashboardUsers", JSON.stringify(dashboardUsers));
    localStorage.setItem("dashboardUser", JSON.stringify(updatedUser));
  }
};

const getAllUsersLS = (): User[] => {
  const users = localStorage.getItem("users");
  if (users) {
    return JSON.parse(users);
  }
  return [];
};

const getAllDashboardUsersLS = (): DashboardUser[] => {
  const dashboardUsers = localStorage.getItem("dashboardUsers");
  if (dashboardUsers) {
    return JSON.parse(dashboardUsers);
  }
  return [];
};

export const getLoggedUserLS = (): User | null => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const getLoggedDashboardUserLS = (): DashboardUser | null => {
  const dashboardUser = localStorage.getItem("dashboardUser");
  if (dashboardUser) {
    return JSON.parse(dashboardUser);
  }
  return null;
};

export const getUserByEmailLS = (email: string): User | null => {
  const users = getAllUsersLS();
  const user = users.find((user: User) => user.email === email);
  return user || null;
};

export const getUserByEmailandPasswordLS = (
  email: string,
  password: string
): User | null => {
  const users = getAllUsersLS();
  const user = users.find(
    (user: User) => user.email === email && user.password === password
  );
  return user || null;
};

export const getDashboardUserByUserIdLS = (
  userId: string
): DashboardUser | null => {
  const dashboardUsers = getAllDashboardUsersLS();
  const dashboardUser = dashboardUsers.find(
    (user: DashboardUser) => user.userId === userId
  );
  return dashboardUser || null;
};

export const getDashboardUserByUsernameLS = (
  username: string
): DashboardUser | null => {
  const dashboardUsers = getAllDashboardUsersLS();
  const dashboardUser = dashboardUsers.find(
    (user: DashboardUser) => user.username === username
  );
  return dashboardUser || null;
};
