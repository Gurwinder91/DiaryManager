import React, { Component } from 'react';
import { Link , withRouter} from 'react-router-dom';
import { compose } from 'recompose';

import { Typography} from '@material-ui/core';

import * as ROUTES from '../../constants/routes';
import { withFirebase} from '../Firebase';
import { MyForm, MyInput } from '../../core';
import {  MyFormGroup, MyFormControl, EventHandler } from '../../utilty';

const SignUpPage = () => (
    <div>
        <Typography variant="h4" align="center">
            Sign Up
        </Typography>
      <SignUpForm />
  </div>
);

const INITIAL_STATE = new MyFormGroup({
    userName: new MyFormControl('', [{ name: 'required', message: 'User Name is required' }]),
    email: new MyFormControl('', [{ name: 'email', message: 'Email is not valid' }]),
    passwordOne: new MyFormControl('', [{ name: 'required', message: 'Password is required' }]),
    passwordTwo: new MyFormControl('', [{ name: 'required', message: 'Password is required' }])
});

class SignUpFormBase extends Component {
 
    constructor(props){
        super(props);
        this.state = {...INITIAL_STATE};
    }

    inputChangeHandler = (event) => {
        const formGroup = this.state.inputChangeHandler(event);
        this.setState({ controls: formGroup.controls, invalid: formGroup.invalid });
    }

    formSubmitHandler = event => {
    const username = this.state.controls.userName.value;
    const email = this.state.controls.email.value;
    const password = this.state.controls.passwordOne.value;
    
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  }

  render() {
    return (
        <MyForm formSubmit={this.formSubmitHandler} disabled={this.state.invalid}>
            <MyInput
                required
                error={this.state.showError('userName')}
                helperText={this.state.showErrorText('userName')}
                id="user-name"
                name="userName"
                label="User Name"
                value={this.state.controls.userName.value}
                onChange={EventHandler.debounce(this.inputChangeHandler, 1000)}
                style={{ width: '100%' }}
            />
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
                name="passwordOne"
                label="Password"
                value={this.state.controls.passwordOne.value}
                onChange={EventHandler.debounce(this.inputChangeHandler, 1000)}
                style={{ width: '100%' }}
                error={this.state.showError('passwordOne')}
                helperText={this.state.showErrorText('passwordOne')}
            />
            <MyInput
                id="confirm-password"
                type="password"
                required
                name="passwordTwo"
                label="Confirm Password"
                value={this.state.controls.passwordTwo.value}
                onChange={EventHandler.debounce(this.inputChangeHandler, 1000)}
                style={{ width: '100%' }}
                error={this.state.showError('passwordTwo')}
                helperText={this.state.showErrorText('passwordTwo')}
            />

        </MyForm>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase
)(SignUpFormBase);
export default SignUpPage;
export { SignUpForm, SignUpLink };