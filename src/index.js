import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import store from './store';
import './index.css';
import App from './App';
import fbConfig from './Firebase';

import * as serviceWorker from './serviceWorker';

const rfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
    attachAuthIsReady: true
  }

    ReactDOM.render(
        <Provider store={store}>
            <ReactReduxFirebaseProvider
                firebase={fbConfig}
                config={rfConfig}
                dispatch={store.dispatch}
                createFirestoreInstance={createFirestoreInstance}>
                <App />
            </ReactReduxFirebaseProvider>
        </Provider>
        ,
        document.getElementById('root'));

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.register();


