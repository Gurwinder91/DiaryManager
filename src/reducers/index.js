import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

import snackBarReducer from './snackbar';
import loaderReducer from './loader';

const rootReducer = combineReducers({
    snackBar: snackBarReducer,
    loader: loaderReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
});
export default rootReducer;