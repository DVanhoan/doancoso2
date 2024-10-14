import { API_URL } from "../../utils/apiRequest";
import axios from "axios";
import store from "../store";
import { LOGIN, GET_ALL, SET_MY_USER } from "../types";

export const login = async (user) => {
  const res = await axios.post(`${API_URL}login`, user);

  if (res.data.access_token) {
    localStorage.setItem('token', res.data.access_token);
    localStorage.setItem('role', res.data.role);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    store.dispatch({
      type: LOGIN,
      payload: res.data,
    });
  }

  return res;
};

export const register = async (user) => {
  return axios.post(API_URL + "/register", user);
};

export const resetPassword = async (id, password) => {
  try {
    return axios.put(API_URL + "/password/" + id, password);
  } catch (error) {
    console.error(error);
  }
};

export const getAll = async () => {
  const res = await axios.get(API_URL + "/users");
  store.dispatch({
    type: GET_ALL,
    payload: res.data,
  });
  return res;
};

export const getMyUser = () => {
  return async (dispatch) => {
  try {
    

    const res = await axios.get(API_URL + "my-account", {
      headers: authHeader(),
    });

    store.dispatch({
      type: SET_MY_USER,
      payload: res.data,
    });
    return res;
  } catch (error) {
    console.error(error);
  }
  }

};



export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "LOGOUT" });
  window.location.href = "/user-auth";
};

const authHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No auth token found");
  }

  return { Authorization: `Bearer ${token}` };
};
