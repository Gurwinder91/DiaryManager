import * as ACTIONS from '../actions';
import { MyObject } from '../utilty';

const INITIAL_STATE = {
    customers: null
};

const applySetCustomers = (state, action) => ({
    ...state,
    customers: action.customers,
});

const applySetCustomer = (state, action) => ({
    ...state,
    customers: {
        ...state.customers,
        [action.uid]: action.customer,
    }
});

const applyRemoveCustomer = (state, action) => ({
    ...state,
    customers: new MyObject(state.customers).removeObject(action.uid),
});


function customerReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ACTIONS.CUSTOMERS_SET: {
            return applySetCustomers(state, action);
        }
        case ACTIONS.CUSTOMER_SET: {
            console.log(state);
            const newState = applySetCustomer(state, action);
            console.log("new", newState);
            return newState;
        }
        case ACTIONS.CUSTOMER_REMOVE: {
            return applyRemoveCustomer(state, action);
        }
        default:
            return state;
    }
}
export default customerReducer;