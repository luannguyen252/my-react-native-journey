import { LOGIN, LOGOUT, UPDATE_USER } from "./types";

export const onLogin = payload => ({
  type: LOGIN,
  payload
});

export const onLogout = () => ({
  type: LOGOUT
});

export const updataUser = payload => ({
  type: UPDATE_USER,
  payload
});
