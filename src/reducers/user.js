const INITIAL_STATE = {
    users: null,
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
        case 'USERS_SET': {
            return applySetUsers(state, action);
        }
        case 'USER_SET': {
            return applySetUser(state, action);
        }
        case 'USER_REMOVE': {
            return applyRemoveUser(state, action);
        }
        default:
            return state;
    }
}
export default userReducer;