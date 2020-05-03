import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import { MyForm, MyInput } from '../../core';
import { ErrorGenerator } from '../../utilty'
import * as ROUTES from '../../constants/routes';
import { forgetPassword } from '../../actions/auth';

const ForgetPassword = ({ forgetPassword }) => {
    const { register, handleSubmit, errors, setValue, reset } = useForm();

    const location = useLocation();
    const history = useHistory();

    React.useEffect(() => setValue('email', location.state.email), [location.state]);

    const onSubmit = (data) => {
        forgetPassword(data.email);
        history.push(ROUTES.SIGN_IN);
    }

    return (
        <>
            <Typography variant="h4" align="center">
                Reset password
            </Typography>
            <Typography variant="body1" style={{ margin: '25px 0' }}>
                After clicking submit button, an email will be sent to your registered email for password reset.
            </Typography>
            <MyForm onSubmit={handleSubmit(onSubmit)} >
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
            </MyForm>
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    forgetPassword: (email) => dispatch(forgetPassword(email)),
});

export default connect(null, mapDispatchToProps)(ForgetPassword);