import * as ACTIONS from '../actions';

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
    },
});

const applyRemoveCustomer = (state, action) => ({
    ...state,
    customers: removeUser(state.customers, action.uid),
});

const removeUser = (items, key) => {
    const newItems = { ...items };
    delete newItems[key];
    return newItems;
}

function customerReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ACTIONS.CUSTOMERS_SET: {
            return applySetCustomers(state, action);
        }
        case ACTIONS.CUSTOMER_SET: {
            return applySetCustomer(state, action);
        }
        case ACTIONS.CUSTOMER_REMOVE: {
            return applyRemoveCustomer(state, action);
        }
        default:
            return state;
    }
}
export default customerReducer;