import { User } from "../interfaces/users";

export const getLoggedUserLS = (): User | null => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const loginUserLS = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const logoutUserLS = (): void => {
  localStorage.removeItem("user");
};

const getAllUsersLS = (): User[] => {
  const users = localStorage.getItem("users");
  if (users) {
    return JSON.parse(users);
  }
  return [];
};

export const registerUserLS = (user: User): void => {
  const users = getAllUsersLS();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  loginUserLS(user);
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
