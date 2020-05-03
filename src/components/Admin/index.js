import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import { MyConfirmDialog, AddCircle, MyList, MyListSkeleton } from '../../core';
import UsersList from './UsersList';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { disableUser } from '../../actions/user';
import { withAuthorization } from '../Session';

const AdminPage = ({ users, authUser, disableUser }) => {
    console.log(users)
    let history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [dialogData, setDialogData] = React.useState({});

    const disableUserActionHandler = (user) => {
        setDialogData(user);
        setOpen(true);
    }

    const dialogClosedHandler = (user) => {
        setOpen(false);
        if (user) {
            disableUser(user);
        } else {
            const { uid, ...newUser } = dialogData;
            newUser.disabled = !newUser.disabled;
        }
    }

    return (
        <>
            <Typography variant="h4" align="center">
                Users List
            </Typography>
            {isLoaded(users) ?
                <MyList>
                    {(users && users.length) && <UsersList users={users} disableUser={disableUserActionHandler} />}
                </MyList>
                : <MyListSkeleton />
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
    users: state.firestore.ordered.users,
    auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => ({
    disableUser: user => dispatch(disableUser(user)),
})

const condition = auth => {
    return auth.role === ROLES.ADMIN || auth.role === ROLES.SUPER_ADMIN;
}

export default compose(
    withAuthorization(condition),
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect([{
        collection: 'users'
    }])
)(AdminPage);