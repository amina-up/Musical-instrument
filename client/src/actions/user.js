import axios from 'axios';
import { GET_USERS, DELETE_USER } from './actionTypes';

export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get('/users');

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = id => async dispatch => {
  try {
    await axios.delete(`/users/${id}`);
    dispatch({
      type: DELETE_USER,
      payload: id
    });
    dispatch(getUsers);
  } catch (error) {
    console.log(error);
  }
};
