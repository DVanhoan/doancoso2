
const initialState = {
    user: JSON.parse(localStorage.getItem('userInfo')) || null,
    token: localStorage.getItem('authToken') || null,
    role: localStorage.getItem('userRole') || null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          role: action.payload.user.role,
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          token: null,
          role: null,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  