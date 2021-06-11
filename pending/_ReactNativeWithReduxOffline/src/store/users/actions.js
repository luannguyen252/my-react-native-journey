import {
  GET_USERS,
  FOLLOW_USER,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_ROLLBACK,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER,
  UNFOLLOW_USER_ROLLBACK
} from "./types";

export const getUsers = _ => ({
  type: GET_USERS
});

export const followUser = id => ({
  type: FOLLOW_USER_REQUEST,
  payload: id,
  meta: {
    offline: {
      // the network action to execute:
      effect: {
        url: "https://jsonplaceholder.typicode.com/todos/1",
        method: "GET"
      },
      // action to dispatch when effect succeeds:
      commit: { type: FOLLOW_USER, payload: id },
      // action to dispatch if network action fails permanently:
      rollback: { type: FOLLOW_USER_ROLLBACK, payload: id }
    }
  }
});

export const unfollowUser = id => ({
  type: UNFOLLOW_USER_REQUEST,
  payload: id,
  meta: {
    offline: {
      // the network action to execute:
      effect: {
        url: "https://jsonplaceholder.typicode.com/todos/1",
        method: "GET"
      },
      // action to dispatch when effect succeeds:
      commit: { type: UNFOLLOW_USER, payload: id },
      // action to dispatch if network action fails permanently:
      rollback: { type: UNFOLLOW_USER_ROLLBACK, payload: id }
    }
  }
});
