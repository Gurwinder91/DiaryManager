
import React from 'react';
import { useForm } from 'react-hook-form';
import { Typography } from '@material-ui/core';
import { compose } from 'recompose';

import { MyForm, MyInput } from '../../core';
import { ErrorGenerator } from '../../utilty';
import { withAuthorization } from '../Session';

const UpdatePassword = () => {
    const { register, handleSubmit, errors, getValues, reset } = useForm();

    const onSubmit = (data) => {
        const { password } = data;
        // firebase.doPasswordUpdate(password)
        //     .then((res) => {
        //         reset();
        //         showSnackbar('New password updated successfully', 'success');
        //     }).catch((err) => {
        //         showSnackbar(err.message || err.errors.message, 'error');
        //     })
    }

    return (
        <>
            <Typography variant="h4" align="center">
                Update password
            </Typography>
            <MyForm onSubmit={handleSubmit(onSubmit)} >
                <MyInput
                    type="password"
                    required
                    name="password"
                    label="New Password"
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
                    label="Confirm New Password"
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
            </MyForm>
        </>
    );
}

export default compose(
    withAuthorization(authUser => !!authUser),
)
(UpdatePassword);