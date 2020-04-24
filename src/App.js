import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Toolbar } from '@material-ui/core';

import "./App.scss";

import Header from "./components/Header";
import Main from "./components/main";
import { withAuthentication } from './components/Session';
import { MySwipeableDrawer } from "./core";
import * as ROUTES from "./constants/routes";

export class App extends Component {

    state = {
        drawer: {
            open: false,
            navList: [
                {
                    text: 'Customer',
                    link: ROUTES.CUSTOMER_URLS.customer,
                    id: 2
                },
                {
                    text: 'Add Customer',
                    link: `${ROUTES.CUSTOMER_URLS.customer}${ROUTES.CUSTOMER_URLS.add}`,
                    id: 4
                }, {
                    text: 'Milk',
                    link: ROUTES.MILK_URLS.milk,
                    id: 5
                }, {
                    text: 'Add Milk',
                    link: `${ROUTES.MILK_URLS.milk}${ROUTES.MILK_URLS.add}`,
                    id: 6
                },
                {
                    text: 'Admin',
                    link: ROUTES.ADMIN,
                    id: 7
                },
                {
                    text: 'Payment Calculator',
                    link: ROUTES.PAYMENT_CALCULATOR,
                    id: 8
                }
            ]
        }
    }

    toggleDrawerHandler = (value, event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        const drawer = { ...this.state.drawer };
        drawer.open = value;
        this.setState({ drawer: drawer });
    }

    render() {
        return (
            <>
                <Router>
                    <Header menuIconClick={this.toggleDrawerHandler} />
                    <MySwipeableDrawer
                        open={this.state.drawer.open}
                        toggleDrawer={this.toggleDrawerHandler}
                        navList={this.state.drawer.navList}
                    />
                    <Toolbar />
                    <Main />
                </Router>
            </>
        )
    };
}

export default withAuthentication(App);