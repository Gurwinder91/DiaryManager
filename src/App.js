import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Toolbar } from '@material-ui/core';

import "./App.scss";

import Header from "./components/Header";
import Main from "./components/Main";
import { withAuthentication } from './components/Session';
import { MySwipeableDrawer } from "./core";
import * as ROUTES from "./constants/routes";

const navList = [
    {
        text: 'Customer',
        link: ROUTES.CUSTOMER_URLS.customer,
        id: 2
    }, {
        text: 'Milk',
        link: ROUTES.MILK_URLS.milk,
        id: 5
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
];

const App = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawerHandler = (value, event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(value);
    }

    return (
        <Router>
            <Header menuIconClick={toggleDrawerHandler} />
            <MySwipeableDrawer
                open={open}
                toggleDrawer={toggleDrawerHandler}
                navList={navList}
            />
            <Toolbar />
            <Main />
        </Router>
    )
}

export default withAuthentication(App);