import React from "react";

import { Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import './style.scss';
import { Customer, AddCustomer, EditCustomer } from "../customer";
import { Milk, AddMilk, EditMilk } from '../Milk';
import Footer from '../Footer';

import * as ROUTES from '../../constants/routes';
import AdminPage from "../Admin";
import SignInPage from "../Signin";
import PaymentCalculator from "../PaymentCalculator";
import AddUser from "../AddUser";
import ForgetPassword from "../ForgetPassword";
import UpdatePassword from '../UpdatePassword';
import Settings from '../Settings';

export default () => {

    return (
        <Container className="main">
            <Route path={ROUTES.LANDING} exact render={() =>
                (
                    <h1> Welcome to Diary Manager App</h1>
                )
            } />
            <Route path={ROUTES.ADD_USER} exact component={AddUser} />
            <Route path={ROUTES.SIGN_IN} exact component={SignInPage} />
            <Route path={ROUTES.ADMIN} exact component={AdminPage} />
            <Route path={ROUTES.FORGET_PASSWORD} exact component={ForgetPassword} />
            <Route path={ROUTES.UPDATE_PASSWORD} exact component={UpdatePassword} />
            <Route path={ROUTES.CUSTOMER_URLS.customer} exact component={Customer} />
            <Route path={`${ROUTES.CUSTOMER_URLS.customer}${ROUTES.CUSTOMER_URLS.add}`} exact component={AddCustomer} />
            <Route path={`${ROUTES.CUSTOMER_URLS.customer}${ROUTES.CUSTOMER_URLS.edit}:id`} exact component={EditCustomer} />
            <Route path={ROUTES.MILK_URLS.milk} exact component={Milk} />
            <Route path={`${ROUTES.MILK_URLS.milk}${ROUTES.MILK_URLS.add}`} exact component={AddMilk} />
            <Route path={`${ROUTES.MILK_URLS.milk}${ROUTES.MILK_URLS.edit}:id`} exact component={EditMilk} />
            <Route path={`${ROUTES.PAYMENT_CALCULATOR}`} exact component={PaymentCalculator} />
            <Route path={`${ROUTES.SETTINGS}`} exact component={Settings} />
            <Footer />
        </Container>
    );
}