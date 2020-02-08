import { SET_ALERT, REMOVE_ALERT } from "./actionTypes";

export const setAlert = (msg, alertType) => dispatch => {
  const id = new Date().getTime();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000);
};
