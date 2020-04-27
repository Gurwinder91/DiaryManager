import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { MyForm, MyInput, MySnackbar } from '../../core';
import { withFirebase } from '../Firebase';
import { ErrorGenerator } from '../../utilty'
import * as ROUTES from '../../constants/routes';

const ForgetPassword = ({ firebase }) => {
    const { register, handleSubmit, errors, setValue, reset } = useForm();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [severity, setSeverity] = React.useState('success');

    const location = useLocation();
    const history = useHistory();

    React.useEffect(() => setValue('email', location.state.email), [location.state]);

    const onSubmit = (data) => {
        firebase.doPasswordReset(data.email)
            .then(() => {
                reset();
                setSnackBarProps(true, 'Email is sent. Please check your email', 'success');
                history.push(ROUTES.SIGN_IN);
            }).catch((err) => {
                setSnackBarProps(true, err.message || err.errors.message, 'error');
            })
    }

    const setSnackBarProps = (open, message, severity = 'success') => {
        setSeverity(severity);
        setMessage(message);
        setOpen(open);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Typography variant="h4" align="center">
                Reset password
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
            <MySnackbar open={open} severity={severity} message={message} handleClose={handleClose} />
        </>
    );
};

export default withFirebase(ForgetPassword);