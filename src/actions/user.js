
import { showSnackbar } from './snackbar';
import { showLoader, hideLoader } from './loader';

export const createUser = (user) => {
    return (dispatch) => {
        dispatch(showLoader());
        fetch(`${process.env.REACT_APP_BASE_URL}create`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((signedUser) => signedUser.json())
            .then((signedUser) => {
                const { password, ...userProfile } = user;
                dispatch(addFirestoreUser(signedUser.uid, userProfile))
            })
    }
}


export const disableUser = (user) => {
    return dispatch => {
        dispatch(showLoader());
        fetch(`${process.env.REACT_APP_BASE_URL}disable`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user.email, disabled: user.disabled })
            })
            .then(() => dispatch(updateFirestoreUser(user)))
    }
}

const updateFirestoreUser = (user) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('users').doc(user.id).update({ ...user })
            .then(() => {
                dispatch(hideLoader());
                dispatch(showSnackbar('User disabled successfully', 'success'));
            }).catch((err) => {
                dispatch(hideLoader());
                dispatch(showSnackbar(err.message || err.errors.message, 'error'));
            });
    }
}

const addFirestoreUser = (userId, user) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        user.initials = getInitials(user.name);
        user.disabled = false;
        firestore.collection('users').doc(userId).set({ ...user })
            .then(() => {
                dispatch(hideLoader());
                dispatch(showSnackbar('User added successfully', 'success'));
            }).catch((err) => {
                dispatch(hideLoader());
                dispatch(showSnackbar(err.message || err.errors.message, 'error'));
            });

    }
}


const getInitials = (name) => {
    const nameArr = name.split(' ');
    const firstNameIntials = nameArr.shift().slice(0, 1).toUpperCase();
    let lastNameIntials = nameArr.pop() || '';
    if (lastNameIntials) {
        lastNameIntials = lastNameIntials.slice(0, 1).toUpperCase()
    }

    return `${firstNameIntials}${lastNameIntials}`;
}