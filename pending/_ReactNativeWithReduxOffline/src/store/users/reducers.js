import {
  GET_USERS,
  GET_USERS_SUCCESS,
  ERROR,
  FOLLOW_USER,
  FOLLOW_USER_ROLLBACK,
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_ROLLBACK
} from "./types";

const initialState = {
  user: [],
  error: "",
  isLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        error: "",
        isLoading: true
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: "",
        isLoading: false
      };
    case FOLLOW_USER_REQUEST:
      return {
        ...state,
        user: state.user.map(user => {
          user.id == action.payload && (user.following = true);
          return user;
        })
      };
    case FOLLOW_USER_ROLLBACK:
      return {
        ...state,
        user: state.user.map(user => {
          user.id == action.payload && (user.following = false);
          return user;
        })
      };
    case UNFOLLOW_USER_REQUEST:
      return {
        ...state,
        user: state.user.map(user => {
          user.id == action.payload && (user.following = false);
          return user;
        })
      };
    case UNFOLLOW_USER_ROLLBACK:
      return {
        ...state,
        user: state.user.map(user => {
          user.id == action.payload && (user.following = true);
          return user;
        })
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};

export default reducer;
