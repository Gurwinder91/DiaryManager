import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { List, Typography } from '@material-ui/core';

import { withFirebase } from '../Firebase';
import { MyConfirmDialog } from '../../core';
import UsersList from './UsersList';
import * as ACTIONS from '../../actions';
import { MyObject } from '../../utilty';

const INITIAL_STATE = {
    selectedUser: {},
    openConfirmDialog: false
};

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
        this.props.firebase.users().on('value', snapshot => {
            this.props.onSetUsers(snapshot.val());
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    deleteUserActionHandler = (user) => {
        this.setState({ selectedUser: user, openConfirmDialog: true });
    }

    deleteUserEntry = () => {
        const selectedUser = this.state.selectedUser; 
        this.props.firebase.user(selectedUser.uid).remove();
        this.props.onRemoveUsers(selectedUser.uid);
    }

    dialogClosedHandler = (state, value) => {
        this.setState({ openConfirmDialog: false });
        if (state === 'ok') {
            this.deleteUserEntry();
        }
    }

    render() {

        return (
            <>
                <Typography variant="h4" align="center">
                    Users List
                </Typography>
                <List>
                    {this.props.users.length ?
                        <UsersList users={this.props.users} deleteUser={this.deleteUserActionHandler} />
                        : <Typography variant="body1" align="center">
                            No users found
                        </Typography>
                    }
                </List>
                <MyConfirmDialog
                    maxWidth="xs"
                    onDialogClose={this.dialogClosedHandler}
                    open={this.state.openConfirmDialog}>

                    <Typography variant="body1" component="div" color="textPrimary">
                        Are you sure want to remove&nbsp;
                        <Typography variant="h6" component="span">
                            {this.state.selectedUser.username}
                        </Typography>
                        &nbsp;milk?
                    </Typography>

                </MyConfirmDialog>
            </>
        );
    }
}


const mapStateToProps = state => ({
    users: new MyObject(state.userState.users).toArray()
});

const mapDispatchToProps = dispatch => ({
    onSetUsers: users => dispatch({ type: ACTIONS.USERS_SET, users }),
    onRemoveUsers: uid => dispatch({ type: ACTIONS.USER_REMOVE, uid })
});

export default compose(
    withFirebase,
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
)(AdminPage);