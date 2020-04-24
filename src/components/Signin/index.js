import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { SignUpLink } from '../SignUp';
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
    <SignUpLink />
  </div>
);

const SignInFormBase = ({ firebase, history }) => {

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    firebase
      .doSignInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        history.push(ROUTES.LANDING);
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
    </MyForm>
  );

}
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
export default SignInPage;
export { SignInForm };