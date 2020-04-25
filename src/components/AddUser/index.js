import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Typography, Switch, FormControlLabel } from '@material-ui/core';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { MyForm, MyInput } from '../../core';
import * as ACTIONS from '../../actions';
import { ErrorGenerator } from '../../utilty';
import * as CONSTANTS from '../../constants';
import { withAuthorization } from '../Session';

export default () => (
    <>
        <Typography variant="h4" align="center">
            Add User
        </Typography>
        <AddUserForm />
    </>
);

const AddUserFormBase = ({ firebase, history, onUserSignUp }) => {
    const { register, handleSubmit, errors, getValues } = useForm();

    const onSubmit = (data) => {
        const { confirmPassword, ...user } = data;
        let uid;
        fetch(`${CONSTANTS.BASE_URL}create`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((user) => user.json())
            .then((user) => setClaims(user.uid, data))
            .then((output) => firebase.users().child(output.uid).set({ name: data.name, email: data.email, disabled: false, admin: data.role }))
            .then(() => setClaims)
            .then(() => onUserSignUp({ name: data.name, email: data.email, disabled: false, admin: data.role }, uid))
            .then(() => history.push(ROUTES.ADMIN))
            .catch(console.log);
    }

    const setClaims = (uid, data) => {
        return fetch(`${CONSTANTS.BASE_URL}setClaims`, {
            method: 'POST',
            body: JSON.stringify({uid: uid, role: data.role}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
    }

    return (
        <MyForm onSubmit={handleSubmit(onSubmit)} >
            <MyInput
                required
                name="name"
                label="Name"
                style={{ width: '100%' }}
                inputRef={register({
                    required: true
                })}
                error={!!errors.name}
                helperText={ErrorGenerator.getErrorMessage(errors, 'name')}
            />
            <MyInput
                name="email"
                label="Email"
                style={{ width: '100%' }}
                inputRef={
                    register({
                        required: true,
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Email address is not valid'
                        }
                    })}
                error={!!errors.email}
                helperText={ErrorGenerator.getErrorMessage(errors, 'email')}
            />

            <MyInput
                type="password"
                required
                name="password"
                label="Password"
                style={{ width: '100%' }}
                inputRef={register({
                    required: true,
                    minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters"
                    },
                })}
                error={!!errors.password}
                helperText={ErrorGenerator.getErrorMessage(errors, 'password')}
            />
            <MyInput
                type="password"
                required
                name="confirmPassword"
                label="Confirm Password"
                style={{ width: '100%' }}
                inputRef={register({
                    required: true,
                    validate: {
                        passwordMatch: value => {
                            const { password } = getValues();
                            return password === value || 'Passwords should match!';
                        }
                    }
                })}
                error={!!errors.confirmPassword}
                helperText={ErrorGenerator.getErrorMessage(errors, 'confirmPassword')}
            />
            <FormControlLabel
                control={<Switch
                    inputRef={register}
                    name="role"
                    defaultChecked={false}
                />}
                label="Wants to give Admin access"
            />
        </MyForm>
    );
}

const mapDispatchToProps = dispatch => ({
    onUserSignUp: (user, uid) => dispatch({ type: ACTIONS.USER_SET, user, uid })
});

const AddUserForm = compose(
    withAuthorization(authUser => !!authUser),
    withRouter,
    withFirebase,
    connect(null, mapDispatchToProps)
)(AddUserFormBase);

