import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/rootReducer';
// import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import {thunk} from 'redux-thunk';  // Import 'thunk' as a default export

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)  
));

export default store;