import React from "react";

import { Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import './style.scss';
import { Customer, AddCustomer, EditCustomer } from "../customer";
import { Milk, AddMilk, EditMilk } from '../Milk';
import Footer from '../Footer';

import * as ROUTES from '../../constants/routes';
import SignUpPage from "../SignUp";
import AdminPage from "../Admin";
import SignInPage from "../Signin";
import PaymentCalculator from "../PaymentCalculator";
import { withFirebase } from "../Firebase";
import * as ACTIONS from '../../actions';

const Main = ({ firebase, onSetCustomers }) => {

    React.useEffect(() => {
        firebase.customers().on('value', snapshot => {
            onSetCustomers(snapshot.val())
        });

        return () => firebase.customers().off();
    })

    return (
        <Container className="main">
            <Route path={ROUTES.LANDING} exact render={() =>
                (
                    <h1> Welcome Gurwinder</h1>
                )
            } />
            <Route path={ROUTES.SIGN_UP} exact component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} exact component={SignInPage} />
            <Route path={ROUTES.ADMIN} exact component={AdminPage} />
            <Route path={ROUTES.CUSTOMER_URLS.customer} exact component={Customer} />
            <Route path={`${ROUTES.CUSTOMER_URLS.customer}${ROUTES.CUSTOMER_URLS.add}`} exact component={AddCustomer} />
            <Route path={`${ROUTES.CUSTOMER_URLS.customer}${ROUTES.CUSTOMER_URLS.edit}:uid`} exact component={EditCustomer} />
            <Route path={ROUTES.MILK_URLS.milk} exact component={Milk} />
            <Route path={`${ROUTES.MILK_URLS.milk}${ROUTES.MILK_URLS.add}`} exact component={AddMilk} />
            <Route path={`${ROUTES.MILK_URLS.milk}${ROUTES.MILK_URLS.edit}:date/:uid`} exact component={EditMilk} />
            <Route path={`${ROUTES.PAYMENT_CALCULATOR}`} exact component={PaymentCalculator} />
            <Footer />
        </Container>
    );
}

const mapDispatchToProps = dispatch => ({
    onSetCustomers: (customers) => dispatch({ type: ACTIONS.CUSTOMERS_SET, customers }),
})

export default compose(
    withFirebase,
    connect(null, mapDispatchToProps)
)(Main);
