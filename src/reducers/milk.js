import * as ACTIONS from '../actions';
import { MyObject } from '../utilty';

const INITIAL_STATE = {
    milks: {},
};

const applySetMilks = (state, action) => ({
    ...state,
    milks: action.milks,
});

const applySetMilk = (state, action) => ({
    ...state,
    milks: {
        ...state.milks,
        [action.date]: {
            ...state.milks[action.date],
            [action.uid]: action.milk
        },
    },
});

const applySetMilkByDate = (state, action) => ({
    ...state,
    milks: {
        ...state.milks,
        [action.date]: action.milks,
    },
});


const applyRemoveMilk = (state, action) => ({
    ...state,
    milks: {
      ...state.milks,
      [action.date]: new MyObject(state.milks[action.date]).removeObject(action.uid),
    } 
});

function milkReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ACTIONS.MILKS_SET: {
            console.log(state, action);
            const newState = applySetMilks(state, action);
            console.log("MILKS_SET NEW STATE", newState);
            return newState;
        }
        case ACTIONS.MILKS_SET_BY_DATE: {
            console.log(state, action);
            const newState = applySetMilkByDate(state, action);
            console.log("NEW STATE MILKS SET BY DATE", newState);
            return newState;
        }
        case ACTIONS.MILK_SET: {
            console.log(state, action);
            const newState = applySetMilk(state, action);
            console.log("MILK_SET NEW STATE", newState);
            return newState
        }
        case ACTIONS.MILK_REMOVE: {
            console.log(state, action);
            const newState = applyRemoveMilk(state, action);
            console.log("NEW STATE REMOVE", newState);
            return newState;
        }
        default:
            return state;
    }
}
export default milkReducer;