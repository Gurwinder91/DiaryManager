import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import milkReducer from './milk';
import customerReducer from './customer';
import snackBarReducer from './snackbar';

const rootReducer = combineReducers({
    sessionState: sessionReducer,
    userState: userReducer,
    customerState: customerReducer,
    milkState: milkReducer,
    snackBarState: snackBarReducer,
});
export default rootReducer;