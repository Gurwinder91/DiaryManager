import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { List, Typography } from '@material-ui/core';

import { withFirebase } from '../Firebase';
import { MyConfirmDialog } from '../../core';
import UsersList from './UsersList';
import * as ACTIONS from '../../actions';
import { MyObject } from '../../utilty';

const AdminPage = ({ users, firebase, onSetUsers, onSetUser }) => {
    const [open, setOpen] = React.useState(false);
    const [dialogData, setDialogData] = React.useState({});

    React.useEffect(() => {
        firebase.users().once('value', snapshot => {
            onSetUsers(snapshot.val());
        });

        return () => firebase.users().off();
    }, [firebase]);

    const disableUserActionHandler = (user) => {
        setDialogData(user);
        setOpen(true);
    }

    const deleteUserEntry = (user) => {
        console.log(user);
        fetch('https://us-central1-dairy-management-system-9191.cloudfunctions.net/disableUser',
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
            const {uid, ...newUser} = dialogData;
            newUser.disabled = !newUser.disabled;
            onSetUser(newUser, uid)
        }
    }

    return (
        <>
            <Typography variant="h4" align="center">
                Users List
                </Typography>
            <List>
                {users.length ?
                    <UsersList users={users} disableUser={disableUserActionHandler} />
                    : <Typography variant="body1" align="center">
                        No users found
                    </Typography>
                }
            </List>
            <MyConfirmDialog
                data={dialogData}
                onDialogClose={dialogClosedHandler}
                message="Are you sure want to disable this user?"
                open={open} />
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

export default compose(
    withFirebase,
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
)(AdminPage);