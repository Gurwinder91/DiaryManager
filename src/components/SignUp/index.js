import React, { Component } from 'react';
import { Link , withRouter} from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { Typography} from '@material-ui/core';

import * as ROUTES from '../../constants/routes';
import { withFirebase} from '../Firebase';
import { MyForm, MyInput } from '../../core';
import {  MyFormGroup, MyFormControl, EventHandler } from '../../utilty';
import * as ACTIONS from '../../actions';

const SignUpPage = () => (
    <>
        <Typography variant="h4" align="center">
            Sign Up
        </Typography>
        <SignUpForm />
    </>
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
        const JSON = {
          username,
          email
        };
        this.props.firebase.users().child(authUser.user.uid).set(JSON)
         return [JSON, authUser.user.uid];
      })
      .then((output) => {
        this.props.onUserSignUp(output[0], output[1]);
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(console.log);
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

const mapDispatchToProps = dispatch => ({
  onUserSignUp: (user, uid) => dispatch({type: ACTIONS.USER_SET, user, uid})
});

const SignUpForm = compose(
    withRouter,
    withFirebase,
    connect(null, mapDispatchToProps)
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };