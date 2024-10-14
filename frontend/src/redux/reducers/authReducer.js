
import { LOGIN, LOGOUT, GET_ALL, SET_MY_USER} from '../types';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };
    case GET_ALL:
      return {
        ...state,
        users: action.payload,
        error: null,
      };
    case SET_MY_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
