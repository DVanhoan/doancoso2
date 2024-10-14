import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers/rootReducer'; // Đường dẫn tới file reducer chính của bạn

// Cấu hình store để sử dụng middleware thunk
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
