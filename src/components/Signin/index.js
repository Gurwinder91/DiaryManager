import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Typography } from '@material-ui/core';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { MyFormGroup, MyFormControl, EventHandler } from '../../utilty';
import { MyForm, MyInput } from '../../core';

const SignInPage = () => (
  <div>
    <Typography variant="h4" align="center">
      Sign Up
      </Typography>
    <SignInForm />
    <SignUpLink />
  </div>
);
const INITIAL_STATE = new MyFormGroup({
  email: new MyFormControl('', [{ name: 'email', message: 'Email is not valid' }]),
  password: new MyFormControl('', [{ name: 'required', message: 'Password is required' }])
})
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  inputChangeHandler = (event) => {
    const formGroup = this.state.inputChangeHandler(event);
    this.setState({ controls: formGroup.controls, invalid: formGroup.invalid });
  }

  formSubmitHandler = event => {
    const { email, password } = this.state.controls;
    this.props.firebase
      .doSignInWithEmailAndPassword(email.value, password.value)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    return (
      <MyForm formSubmit={this.formSubmitHandler} disabled={this.state.invalid}>
        <MyInput
          id="email"
          name="email"
          label="Email"
          value={this.state.controls.email.value}
          onChange={EventHandler.debounce(this.inputChangeHandler, 1000)}
          style={{ width: '100%' }}
          error={this.state.showError('email')}
          helperText={this.state.showErrorText('email')}
        />

        <MyInput
          id="password"
          type="password"
          required
          name="password"
          label="Password"
          value={this.state.controls.password.value}
          onChange={EventHandler.debounce(this.inputChangeHandler, 1000)}
          style={{ width: '100%' }}
          error={this.state.showError('password')}
          helperText={this.state.showErrorText('password')}
        />
      </MyForm>
    );
  }
}
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
export default SignInPage;
export { SignInForm };