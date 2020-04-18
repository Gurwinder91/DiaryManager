import * as ACTIONS from '../actions';

const INITIAL_STATE = {
    users: [],
};

const applySetUsers = (state, action) => ({
    ...state,
    users: action.users,
});

const applySetUser = (state, action) => ({
    ...state,
    users: {
        ...state.users,
        [action.uid]: action.user,
    },
});

const applyRemoveUser = (state, action) => ({
    ...state,
    users: removeUser(state.users, action.uid),
});

const removeUser = (items, key) => {
    const newItems = { ...items };
    delete newItems[key];
    return newItems;
}

function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ACTIONS.USERS_SET: {
            return applySetUsers(state, action);
        }
        case ACTIONS.USER_SET: {
            return applySetUser(state, action);
        }
        case ACTIONS.USER_REMOVE: {
            return applyRemoveUser(state, action);
        }
        default:
            return state;
    }
}
export default userReducer;