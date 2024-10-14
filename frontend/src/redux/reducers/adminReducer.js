const initialState = {
  dashCount: {},
  recentAuthors: [],
  companyCategories: [],
  roles: [],
  permissions: [],
  rolesHavePermissions: [],
  loading: false,
  error: null,
};

const adminDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DASHBOARD_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "GET_ALL_ADMIN_DASHBOARD":
      return {
        ...state,
        dashCount: action.payload.dashCount,
        recentAuthors: action.payload.recentAuthors,
        companyCategories: action.payload.companyCategories,
        roles: action.payload.roles,
        permissions: action.payload.permissions,
        rolesHavePermissions: action.payload.rolesHavePermissions,
        loading: false,
        error: null,
      };
    case "FETCH_DASHBOARD_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


export default adminDashboardReducer;
