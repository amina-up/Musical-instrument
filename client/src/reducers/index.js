import { combineReducers } from "redux";
import alertReducer from "./alert";
import authReducer from "./authentification";
import userReducer from "./user";
import pubReducer from "./publication";
export default combineReducers({
  alertReducer,
  authReducer,
  userReducer,
  pubReducer
});
