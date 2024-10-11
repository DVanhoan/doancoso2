import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import { save, load } from 'redux-localstorage-simple';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = applyMiddleware(save())(createStore);

const store = createStoreWithMiddleware(
  reducer,
  load(),
  composeEnhancers()
);

export default store;
