import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { MyForm, MyInput } from '../../core';

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

  const getErrorMessage = (inputName) => {
    let message = '';
    if (errors[inputName]) {
      switch (errors[inputName].type) {
        case 'required':
          message = errors[inputName].message;
          break;
        case 'pattern':
          message = errors[inputName].message;
          break;
        case 'minLength':
          message = errors[inputName].message;
          break;
        default:
          break;
      }
    }
    return message;
  }

  return (
    <MyForm onSubmit={handleSubmit(onSubmit)}>
      <MyInput
        name="email"
        label="Email"
        style={{ width: '100%' }}
        inputRef={
          register({
            required: 'This field is required',
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Email address is not valid'
            }
          })}
        error={!!errors.email}
        helperText={getErrorMessage('email')}
      />

      <MyInput
        type="password"
        required
        name="password"
        label="Password"
        style={{ width: '100%' }}
        inputRef={register({
          required: 'This field is required',
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters"
          },
        })}
        error={!!errors.password}
        helperText={getErrorMessage('password')}
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