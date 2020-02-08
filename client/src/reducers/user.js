import { GET_USERS, DELETE_USER } from '../actions/actionTypes';

const initialState = {
  loading: true,
  users: []
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS:
      return {
        users: [...payload],
        loading: false
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== payload),
        loading: false
      };

    default:
      return state;
  }
};

export default userReducer;
