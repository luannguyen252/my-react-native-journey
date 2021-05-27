import { applyMiddleware, combineReducers, createStore } from "redux";
import { appReducer } from "./Reducers";
import { mainMiddleware } from "./Middlewares";

export const store = createStore(
  combineReducers({
    app: appReducer,
  }),
  applyMiddleware(mainMiddleware)
);
