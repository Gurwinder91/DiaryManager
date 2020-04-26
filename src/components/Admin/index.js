import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import { withFirebase } from '../Firebase';
import { MyConfirmDialog, AddCircle, MyList, MyListSkeleton } from '../../core';
import UsersList from './UsersList';
import * as ACTIONS from '../../actions';
import * as CONSTANTS from '../../constants';
import * as ROUTES from '../../constants/routes';
import { MyObject } from '../../utilty';
import { withAuthorization } from '../Session';

const AdminPage = ({ users, firebase, onSetUsers, onSetUser }) => {
    let history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [dialogData, setDialogData] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        firebase.users().once('value', snapshot => {
            onSetUsers(snapshot.val());
            setLoading(false);
        });

        return () => firebase.users().off();
    }, [firebase]);

    const disableUserActionHandler = (user) => {
        setDialogData(user);
        setOpen(true);
    }

    const deleteUserEntry = (user) => {
        console.log(user);
        fetch(`${CONSTANTS.BASE_URL}disable`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user.email, disabled: user.disabled })
            })
            .then(() => firebase.users().child(user.uid).update({ disabled: user.disabled }))
            .then(() => onSetUser(user, user.uid))
            .catch(console.log);
    }

    const dialogClosedHandler = (user) => {
        setOpen(false);
        if (user) {
            deleteUserEntry(user);
        } else {
            const { uid, ...newUser } = dialogData;
            newUser.disabled = !newUser.disabled;
            onSetUser(newUser, uid)
        }
    }

    return (
        <>
            <Typography variant="h4" align="center">
                Users List
                </Typography>
            {loading ?
                <MyListSkeleton /> :
                <MyList>
                    {users.length ?
                        <UsersList users={users} disableUser={disableUserActionHandler} />
                        : null
                    }
                </MyList>
            }
            <MyConfirmDialog
                data={dialogData}
                onDialogClose={dialogClosedHandler}
                message="Are you sure want to disable this user?"
                open={open} />
            <AddCircle whenClicked={() => history.push(ROUTES.ADD_USER, { childRoute: true })} />
        </>
    );
}


const mapStateToProps = state => ({
    users: new MyObject(state.userState.users).toArray()
});

const mapDispatchToProps = dispatch => ({
    onSetUsers: users => dispatch({ type: ACTIONS.USERS_SET, users }),
    onSetUser: (user, uid) => dispatch({ type: ACTIONS.USER_SET, user, uid })
});

const condition = authUser => {
    return !!authUser;
}
export default compose(
    withAuthorization(condition),
    withFirebase,
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
)(AdminPage);