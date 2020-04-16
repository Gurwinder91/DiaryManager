import { customersRef } from '../firebase'

const FETCH_CUSTOMERS = 'FETCH_CUSTOMERS';

export const addNewCustomer = newCustomer => async dispatch => {
    customersRef.push().set(newCustomer);
};
export const removeCustomer = customer => async dispatch => {
    customersRef.child(customer).remove();
};
export const fetchCustomers = () => async dispatch => {
    customersRef.on("value", snapshot => {
        dispatch({
            type: FETCH_CUSTOMERS,
            payload: snapshot.val()
        });
    });
};