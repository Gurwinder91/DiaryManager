import { hideLoader, showLoader } from './loader';
import { showSnackbar } from './snackbar';

export const addSettings = (settings) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        dispatch(showLoader());
        firestore.collection('settings').add({
            ...settings
        })
            .then(() => {
                dispatch(hideLoader());
                dispatch(showSnackbar('Settings added successfully', 'success'));
            }).catch((err) => {
                dispatch(hideLoader());
                dispatch(showSnackbar(err.message || err.errors.message, 'error'));
            });
    }
}

export const updateSettings = (settings, id) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        dispatch(showLoader());
        firestore.collection('settings').doc(id).update({
            ...settings
        })
            .then(() => {
                dispatch(hideLoader());
                dispatch(showSnackbar('Settings updated successfully', 'success'));
            }).catch((err) => {
                dispatch(hideLoader());
                dispatch(showSnackbar(err.message || err.errors.message, 'error'));
            });
    }
}

