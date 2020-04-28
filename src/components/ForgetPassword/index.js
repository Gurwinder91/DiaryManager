import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { MyForm, MyInput } from '../../core';
import { withFirebase } from '../Firebase';
import { ErrorGenerator } from '../../utilty'
import * as ROUTES from '../../constants/routes';
import * as ACTIONS from '../../actions';

const ForgetPassword = ({ firebase, showSnackbar }) => {
    const { register, handleSubmit, errors, setValue, reset } = useForm();

    const location = useLocation();
    const history = useHistory();

    React.useEffect(() => setValue('email', location.state.email), [location.state]);

    const onSubmit = (data) => {
        firebase.doPasswordReset(data.email)
            .then(() => {
                reset();
                showSnackbar('Email is sent. Please check your email', 'success');
                history.push(ROUTES.SIGN_IN);
            }).catch((err) => {
                showSnackbar(err.message || err.errors.message, 'error');
            })
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
    showSnackbar: (message, severity) => dispatch({ type: ACTIONS.SHOW_SNACKBAR, message, severity })
})


export default compose(
    withFirebase,
    connect(null, mapDispatchToProps),
)(ForgetPassword);