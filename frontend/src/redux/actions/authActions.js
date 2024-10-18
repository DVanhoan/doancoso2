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

export const getMyUser = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
      const response = await axios.get(API_URL +'/api/v1/my-account', {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      dispatch({ type: 'SET_MY_USER', payload: response.data });
  } catch (error) {
      dispatch({ type: 'AUTH_ERROR' });
      localStorage.removeItem('token');
      localStorage.removeItem('role');
  }
};



export const logout = () => async (dispatch) => {
  try {
    await axios.post(`${API_URL}logout`, {}, { headers: authHeader() });

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });

    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
};

const authHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No auth token found");
  }

  return { Authorization: `Bearer ${token}` };
};
