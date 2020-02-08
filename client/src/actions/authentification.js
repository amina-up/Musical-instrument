import axios from "axios";
import {
  REGISTER_SUCCESS,
  FAILED_REGISTER,
  USER_LOADED,
  AUTHENTIFICATION_ERROR,
  LOGIN_SUCCESS,
  fAILED_LOGIN,
  LOGOUT
} from "./actionTypes";
import { setAlert } from "./alert";
import setAuthToken from "../services/setAuthToken";

export const register = (
  name,
  email,
  password,
  role,
  phone
) => async dispatch => {
  try {
    const res = await axios.post("/authentification/register", {
      name,
      email,
      password,
      role,
      phone
    });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data.msg;
    error && dispatch(setAlert(error, "danger"));
    dispatch({
      type: FAILED_REGISTER
    });
  }
};

export const login = (email, password) => async dispatch => {
  try {
    const res = await axios.post("/authentification/login", {
      email,
      password
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data.msg;
    error && dispatch(setAlert(error, "danger"));
    dispatch({
      type: fAILED_LOGIN
    });
  }
};

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/authentification/current");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTHENTIFICATION_ERROR
    });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
