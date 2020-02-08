import {
  GET_PUBS,
  GET_PUB,
  ADD_PUB,
  UPDATE_PUB,
  DELETE_PUB
} from "../actions/actionTypes";

const initialState = {
  loading: true,
  pubs: [],
  pub: null
};

const pubReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PUBS:
      return {
        ...state,
        pubs: payload,
        loading: false
      };
    case GET_PUB:
      return {
        ...state,
        pub: payload,
        loading: false
      };
    case ADD_PUB:
      return {
        ...state,
        pubs: [...state.pubs, payload]
      };
    case UPDATE_PUB:
      return {
        ...state,
        pubs: state.pubs.map(pub => (pub._id === payload._id ? payload : pub))
      };
    case DELETE_PUB:
      return {
        ...state,
        pubs: state.pubs.filter(pub => pub._id !== payload),
        loading: false
      };
    default:
      return state;
  }
};

export default pubReducer;
