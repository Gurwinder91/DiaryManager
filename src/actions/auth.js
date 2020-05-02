
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
                dispatch(showSnackbar('milk entry updated successfully', 'success'));
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
        return firebase.auth().signOut()
            .then(() => {
                dispatch(hideLoader());
                dispatch(showSnackbar('milk entry updated successfully', 'success'));
            }).catch((err) => {
                dispatch(hideLoader());
                dispatch(showSnackbar(err.message || err.errors.message, 'error'));
            });
    }
}
