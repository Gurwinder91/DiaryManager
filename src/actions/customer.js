import { hideLoader, showLoader } from './loader';
import { showSnackbar } from './snackbar';

export const CREATE_CUSTOMER_SUCCESS = 'CREATE_CUSTOMER_SUCCESS';
export const CREATE_CUSTOMER_ERROR = 'CREATE_CUSTOMER_ERROR';
export const REMOVE_CUSTOMER_SUCCESS = 'REMOVE_CUSTOMER_SUCCESS';
export const REMOVE_CUSTOMER_ERROR = 'REMOVE_CUSTOMER_ERROR';

export const createCustomer = (customer) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        dispatch(showLoader());
        firestore.collection('customers').add({
            ...customer
        })
            .then(() => {
                dispatch(hideLoader());
                dispatch(showSnackbar('Customer added successfully', 'success'));
            }).catch((err) => {
                dispatch(hideLoader());
                dispatch(showSnackbar(err.message || err.errors.message, 'error'));
            });
    }
}

export const updateCustomer = (customer, id) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        dispatch(showLoader());
        firestore.collection('customers').doc(id).update({
            ...customer
        })
            .then(() => {
                dispatch(hideLoader());
                dispatch(showSnackbar('Customer updated successfully', 'success'));
            }).catch((err) => {
                dispatch(hideLoader());
                dispatch(showSnackbar(err.message || err.errors.message, 'error'));
            });
    }
}

export const removeCustomer = (id) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection('customers').doc(id).delete()
            .then(() => {
                dispatch(hideLoader());
                dispatch(showSnackbar('Customer removed successfully', 'success'));
            }).catch((err) => {
                dispatch(hideLoader());
                dispatch(showSnackbar(err.message || err.errors.message, 'error'));
            });
    }
}

