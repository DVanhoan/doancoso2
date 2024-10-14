import axios from "axios";
import store from "../store";
import { API_URL } from "../../utils/apiRequest";
export const adminDashboard = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_DASHBOARD_LOADING" }); 
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      if (!token) {
        throw new Error("No token found, please login again.");
      }


      const res = await axios.get(`${API_URL}admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        store.dispatch({
          type: "GET_ALL_ADMIN_DASHBOARD",
          payload: res.data,
        });
      }

    } catch (error) {
      console.error("Error fetching admin dashboard data", error);
      dispatch({
        type: "FETCH_DASHBOARD_ERROR",
        payload: error.message,
      });
    }
  };
};
