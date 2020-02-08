import axios from "axios";
import {
  GET_PUBS,
  GET_PUB,
  ADD_PUB,
  UPDATE_PUB,
  DELETE_PUB
} from "./actionTypes";

export const getPubs = (vendeur_id, marque) => async dispatch => {
  try {
    const res = vendeur_id
      ? await axios.get(`/publications?user_id=${vendeur_id}`)
      : marque
      ? await axios.get(`/publications?marque=${marque}`)
      : await axios.get(`/publications/`);

    dispatch({
      type: GET_PUBS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const getRecentPubs = () => async dispatch => {
  try {
    const res = await axios.get(`/publications/recent`);
    dispatch({
      type: GET_PUBS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPub = id => async dispatch => {
  try {
    const res = await axios.get(`/publications/${id}`);
    dispatch({
      type: GET_PUB,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
export const addPub = (
  title,
  description,
  image,
  price,
  marque
) => async dispatch => {
  try {
    const res = await axios.post("/publications/", {
      title,
      description,
      image,
      price,
      marque
    });
    dispatch({
      type: ADD_PUB,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePub = (
  id,
  title,
  description,
  image,
  price,
  marque
) => async dispatch => {
  try {
    const res = await axios.put(`/publications/${id}`, {
      title,
      description,
      image,
      price,
      marque
    });
    dispatch({
      type: UPDATE_PUB,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePub = id => async dispatch => {
  try {
    await axios.delete(`/publications/${id}`);
    dispatch({
      type: DELETE_PUB,
      payload: id
    });
    dispatch(getRecentPubs);
  } catch (error) {
    console.log(error);
  }
};

export const addComment = (id, text) => async dispatch => {
  try {
    await axios.post(`/publications/comment/${id}`, { text });

    dispatch(getPub(id));
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (id, comment_id) => async dispatch => {
  try {
    await axios.delete(`/publications/comment/${id}/${comment_id}`);

    dispatch(getPub(id));
  } catch (error) {
    console.log(error);
  }
};
