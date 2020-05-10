
import { hideLoader, showLoader } from './loader';
import { showSnackbar } from './snackbar';

export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        dispatch(showLoader());
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        )
            .then(() => {
                dispatch(hideLoader());
                dispatch(showSnackbar('Authenticated successfully', 'success'));
            }).catch((err) => {
                dispatch(hideLoader());
                dispatch(showSnackbar(err.message || err.errors.message, 'error'));
            });

    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        dispatch(showLoader());
        firebase.auth().signOut()
            .then(() => {
                dispatch(hideLoader());
            }).catch((err) => {
                dispatch(hideLoader());
                dispatch(showSnackbar(err.message || err.errors.message, 'error'));
            });
    }
}

export const forgetPassword = (email) => {
    return (dispatch, getState, { getFirebase }) => {
        dispatch(showLoader());
        const firebase = getFirebase();
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                dispatch(hideLoader());
                dispatch(showSnackbar('Email is sent to your registered Email Address. Please find it and do password reset', 'success'));
            }).catch((err) => {
                dispatch(hideLoader());
                dispatch(showSnackbar(err.message || err.errors.message, 'error'));
            })
    }
}

export const updatePassword = (password) => {
    return (dispatch, getState, { getFirebase }) => {
        dispatch(showLoader());
        const firebase = getFirebase();
        firebase.auth().currentUser.updatePassword(password)
            .then(() => {
                dispatch(hideLoader());
                dispatch(showSnackbar('Password updated successfully', 'success'));
            }).catch((err) => {
                dispatch(hideLoader());
                dispatch(showSnackbar(err.message || err.errors.message, 'error'));
            })
    }
}