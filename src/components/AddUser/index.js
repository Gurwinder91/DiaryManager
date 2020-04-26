import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Typography, MenuItem } from '@material-ui/core';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { MyForm, MyInput, MySelect } from '../../core';
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
    const { register, handleSubmit, errors, getValues, setValue } = useForm();
    const [ role, setRole ] = React.useState('MILK_ENTRY');

    const handleRole = (event) => {
        setValue('role', event.target.value);
        setRole(event.target.value);
    }

    React.useEffect(() => {
        register({name: 'role'});
        setValue('role', 'MILK_ENTRY');
    }, [register]);
     
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
            .then((user) => {
                uid = user.uid;
                return firebase.users().child(user.uid).set({ name: data.name, email: data.email, disabled: false, role: data.role })
            })
            .then(() => onUserSignUp({ name: data.name, email: data.email, disabled: false, role: data.role }, uid))
            .then(() => history.push(ROUTES.ADMIN))
            .catch(console.log);
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

            <MySelect
                labelName="Role"
                labelId="role"
                name="role"
                value={role}
                onChange={handleRole}
            >
                <MenuItem value="ADMIN">Admin</MenuItem>
                <MenuItem value="MILK_ENTRY">Milk Entry</MenuItem>
            </MySelect>

        </MyForm>
    );
}

const mapDispatchToProps = dispatch => ({
    onUserSignUp: (user, uid) => dispatch({ type: ACTIONS.USER_SET, user, uid })
});

const condition = authUser => {
    return authUser && (authUser.role === CONSTANTS.ADMIN || authUser.role === CONSTANTS.SUPER_ADMIN);
}

const AddUserForm = compose(
    withAuthorization(condition),
    withRouter,
    withFirebase,
    connect(null, mapDispatchToProps)
)(AddUserFormBase);

