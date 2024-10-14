import { combineReducers } from 'redux';
import authReducer from './authReducer';
import jobReducer from './jobReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobReducer,
  adminDashboard: adminReducer,
});

export default rootReducer;
