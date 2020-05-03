import React from 'react';
import { useHistory } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Typography, MenuItem } from '@material-ui/core';

import * as ROUTES from '../../constants/routes';
import { MyForm, MyInput, MySelect } from '../../core';
import { createUser } from '../../actions/user';
import { ErrorGenerator } from '../../utilty';
import * as ROLES from '../../constants/roles';
import { withAuthorization } from '../Session';

export default () => (
    <>
        <Typography variant="h4" align="center">
            Add User
        </Typography>
        <Typography variant="body1" style={{ marginTop: 20 }}>
            Email you enter while creating user should be valid. It will help to reset your
            password in case you forget it.
        </Typography>
        <AddUserForm />
    </>
);

const AddUserFormBase = ({ onUserSignUp, showSnackbar }) => {
    const history = useHistory();
    const { register, handleSubmit, errors, getValues, setValue } = useForm();
    const [role, setRole] = React.useState('MILK_ENTRY');

    const handleRole = (event) => {
        setValue('role', event.target.value);
        setRole(event.target.value);
    }

    React.useEffect(() => {
        register({ name: 'role' });
        setValue('role', 'MILK_ENTRY');
    }, [register]);

    const onSubmit = (data) => {
        const { confirmPassword, ...user } = data;
        onUserSignUp(user);
        history.push(ROUTES.ADMIN);
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
    onUserSignUp: (user) => dispatch(createUser(user)),
});

const condition = auth => {
    return auth.role === ROLES.ADMIN || auth.role === ROLES.SUPER_ADMIN;
}

const AddUserForm = compose(
    withAuthorization(condition),
    connect(null, mapDispatchToProps)
)(AddUserFormBase);

