import React from 'react';
import { useHistory } from 'react-router-dom';
import { compose } from 'recompose';
import { Typography, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { MyForm, MyInput } from '../../core';
import { ErrorGenerator } from '../../utilty';

const SignInPage = () => (
  <div>
    <Typography variant="h4" align="center">
      Authenticate
    </Typography>
    <SignInForm />
  </div>
);

const SignInFormBase = ({ firebase }) => {
  let history = useHistory();

  const { register, handleSubmit, errors, getValues } = useForm();

  const forgetHandler = () => {
    history.push(ROUTES.FORGET_PASSWORD, { email: getValues('email') })
  }

  const onSubmit = (data) => {
    firebase
      .doSignInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        setTimeout(() => {
          history.push(ROUTES.MILK_URLS.milk);
        }, 500);
      })
      .catch(console.log);
  };

  return (
    <MyForm onSubmit={handleSubmit(onSubmit)}>
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

      <div style={{ width: '100%', marginTop: 10 }}>
        <ForgetPassword forgetPasswordClick={forgetHandler} />
      </div>

    </MyForm>
  );

}
const SignInForm = compose(
  withFirebase,
)(SignInFormBase);
export default SignInPage;
export { SignInForm };

const ForgetPassword = ({ forgetPasswordClick }) => {

  return (
    <Button color="secondary" onClick={forgetPasswordClick}>Forget Password</Button>
  )
}