import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/rootReducer';
import {thunk} from 'redux-thunk';  // Import 'thunk' as a default export

// Create store with middleware applied directly
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
