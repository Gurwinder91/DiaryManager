import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';

import rootReducer from '../reducers';
import app from '../Firebase';

let middelwares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middelwares.push(logger);
}

const store = createStore(rootReducer,
    compose(
        applyMiddleware(...middelwares),
        reduxFirestore(app),
    )
);

export default store;