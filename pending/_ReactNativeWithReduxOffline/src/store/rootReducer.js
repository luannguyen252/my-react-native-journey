import { combineReducers } from "redux";
import authReducer from "./auth/reducers";
import usersReducer from "./users/reducers";

const rootReducer = combineReducers({
  authReducer,
  usersReducer
});

export default rootReducer;
