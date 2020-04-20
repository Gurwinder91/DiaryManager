import React from 'react';
import { Link , withRouter} from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Typography} from '@material-ui/core';

import * as ROUTES from '../../constants/routes';
import { withFirebase} from '../Firebase';
import { MyForm, MyInput } from '../../core';
import * as ACTIONS from '../../actions';

const SignUpPage = () => (
    <>
        <Typography variant="h4" align="center">
            Sign Up
        </Typography>
        <SignUpForm />
    </>
);

const SignUpFormBase = ({firebase, history, onUserSignUp}) => {
  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    let uid;
    firebase
      .doCreateUserWithEmailAndPassword(data.email, data.password)
      .then(authUser => {
        uid = authUser.user.uid;
        return firebase.users().child(uid)
        .set({userName: data.userName, email: data.email})
      })
      .then(() => {
        onUserSignUp({userName: data.userName, email: data.email}, uid);
        history.push(ROUTES.LANDING);
      })
      .catch(console.log);
  }

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
            case 'passwordMatch':
                message = 'Password and Confirm Password is not matched';
                break;
        }
    }
    return message;
}


    return (
        <MyForm onSubmit={handleSubmit(onSubmit)} >
            <MyInput
                required
                name="userName"
                label="User Name"
                style={{ width: '100%' }}
                inputRef={register({
                  required: 'This field is required'
                })}
                error={!!errors.userName}
                helperText={getErrorMessage('userName')}
            />
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
            <MyInput
                type="password"
                required
                name="confirmPassword"
                label="Confirm Password"
                style={{ width: '100%' }}
                inputRef={register({
                  required: 'This field is required',
                  validate:{
                    passwordMatch: value => value === watch('password'),
                  }
                })}
                error={!!errors.confirmPassword}
                helperText={getErrorMessage('confirmPassword')}
            />
    
            
               
                
              
      
        </MyForm>
    );
}

const SignUpLink = () => (
  <Typography align="center">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </Typography>
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