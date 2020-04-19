import * as ACTIONS from '../actions';
import { MyObject } from '../utilty';

const INITIAL_STATE = {
    milks: null,
};

const applySetMilks = (state, action) => ({
    ...state,
    milks: action.milks,
});

const applySetMilk = (state, action) => ({
    ...state,
    milks: {
        ...state.milks,
        [action.uid]: action.milk,
    },
});

const applyRemoveMilk = (state, action) => ({
    ...state,
    milks: new MyObject(state.milks).removeObject(action.uid),
});

function milkReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ACTIONS.MILKS_SET: {
            return applySetMilks(state, action);
        }
        case ACTIONS.MILK_SET: {
            return applySetMilk(state, action);
        }
        case ACTIONS.MILK_REMOVE: {
            return applyRemoveMilk(state, action);
        }
        default:
            return state;
    }
}
export default milkReducer;