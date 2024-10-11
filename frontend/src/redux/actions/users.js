import store from '../store';
import axios from 'axios';
import { API_URL } from '../../utils/apiRequest';


export const login = async (data) => {
  try {
    const result = await axios.post(`${API_URL}/login`, data);
    const user = result.data.user;
    const token = result.data.token;

 
    store.dispatch({
      type: 'LOGIN',
      payload: { user, token },
    });

    

 
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('userInfo', JSON.stringify(user));

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const register = async (data) => {
  try {
    const result = await axios.post(`${API_URL}/register`, data);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userInfo');

  store.dispatch({
    type: 'LOGOUT',
  });
};
