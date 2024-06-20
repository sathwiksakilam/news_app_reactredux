import { combineReducers } from "redux";
import userreducer from "./reducers";

const rootReducer = combineReducers({
    user:userreducer
});

export default rootReducer;
