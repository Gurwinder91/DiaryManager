import { hideLoader, showLoader } from './loader';
import { showSnackbar } from './snackbar';

export const addMilk = (milk) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        dispatch(showLoader());
        firestore.collection('milks').add({
            ...milk
        })
            .then(() => {
                dispatch(hideLoader());
                dispatch(showSnackbar('milk entry added successfully', 'success'));
            }).catch((err) => {
                dispatch(hideLoader());
                dispatch(showSnackbar(err.message || err.errors.message, 'error'));
            });
    }
}

export const updateMilk = (milk, id) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        dispatch(showLoader());
        firestore.collection('milks').doc(id).update({
            ...milk
        })
            .then(() => {
                dispatch(hideLoader());
                dispatch(showSnackbar('milk entry updated successfully', 'success'));
            }).catch((err) => {
                dispatch(hideLoader());
                dispatch(showSnackbar(err.message || err.errors.message, 'error'));
            });
    }
}

export const removeMilk = (id) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        dispatch(showLoader());
        firestore.collection('milks').doc(id).delete()
            .then(() => {
                dispatch(hideLoader());
                dispatch(showSnackbar('milk entry removed successfully', 'success'));
            }).catch((err) => {
                dispatch(hideLoader());
                dispatch(showSnackbar(err.message || err.errors.message, 'error'));
            });
    }
}

