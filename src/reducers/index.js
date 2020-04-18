import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import milkReducer from './milk';
import customerReducer from './customer';

const rootReducer = combineReducers({
    sessionState: sessionReducer,
    userState: userReducer,
    customerState: customerReducer,
    milkState: milkReducer
});
export default rootReducer;