import {
  EMAIL_REGEX,
  MAX_EMAIL_LENGTH,
  MIN_EMAIL_LENGTH,
} from "../constants/email";
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_REGEX,
} from "../constants/password";

export const isEmailValid = (email: string): string => {
  if (!email) {
    return "Email is required";
  }
  if (email.includes(" ")) {
    return "Email cannot contain spaces";
  }
  if (email.length > MAX_EMAIL_LENGTH) {
    return `Email cannot be more than ${MAX_EMAIL_LENGTH} characters long`;
  }
  if (email.length < MIN_EMAIL_LENGTH) {
    return `Email must be at least ${MIN_EMAIL_LENGTH} characters long`;
  }
  if (!EMAIL_REGEX.test(email)) {
    return "Email is not valid";
  }
  return "";
};

export const isPasswordValid = (password: string): string => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
  }
  if (password.length > MAX_PASSWORD_LENGTH) {
    return `Password cannot be more than ${MAX_PASSWORD_LENGTH} characters long`;
  }
  if (password.includes(" ")) {
    return "Password cannot contain spaces";
  }
  if (!PASSWORD_REGEX.test(password)) {
    return "Password must contain at least one uppercase letter, one lowercase letter, one special character and one number";
  }
  return "";
};

export const isConfirmPasswordValid = (
  password: string,
  confirmPassword: string
): string => {
  if (!!isPasswordValid(confirmPassword)) {
    return isPasswordValid(confirmPassword);
  }
  if (confirmPassword !== password) {
    return "Passwords do not match";
  }
  return "";
};
