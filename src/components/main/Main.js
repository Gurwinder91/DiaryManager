import React, { Component } from "react";

import { Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import './Main.scss';
import Table from "../table/Table";
import Customer from "../customer/Customer";
import AddCustomer from "../customer/AddCustomer";
import EditCustomer from "../customer/EditCustomer";
import AddMilk from '../milk/AddMilk';
import Milk from '../milk/Milk';
import EditMilk from '../milk/EditMilk';
import Footer from '../footer/Footer';

import * as ROUTES from '../../constants/routes';
import SignUpPage from "../SignUp";
import AdminPage from "../Admin";
import SignInPage from "../Signin";

class Main extends Component {

    render() {
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
                <Route path={ROUTES.TABLE} exact component={Table} />
                <Route path={ROUTES.CUSTOMER_URLS.customer} exact component={Customer} />
                <Route path={`${ROUTES.CUSTOMER_URLS.customer}${ROUTES.CUSTOMER_URLS.add}`}  exact component={AddCustomer} />
                <Route path={`${ROUTES.CUSTOMER_URLS.customer}${ROUTES.CUSTOMER_URLS.edit}`} exact component={EditCustomer} />
                <Route path={ROUTES.MILK_URLS.milk} exact component={Milk} />
                <Route path={`${ROUTES.MILK_URLS.milk}${ROUTES.MILK_URLS.add}`} exact component={AddMilk} />
                <Route path={`${ROUTES.MILK_URLS.milk}${ROUTES.MILK_URLS.edit}`} exact component={EditMilk} />
                <Footer />
            </Container>
        );
    }
}

export default Main;