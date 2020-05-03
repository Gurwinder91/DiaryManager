import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Toolbar } from '@material-ui/core';

import "./App.scss";

import Header from "./components/Header";
import Main from "./components/Main";
import { MySwipeableDrawer, MySnackbar } from "./core";
import * as ROUTES from "./constants/routes";
import * as ROLES from './constants/roles';

const navList = [
    {
        text: 'Customer',
        link: ROUTES.CUSTOMER_URLS.customer,
        id: 1,
        access: [ROLES.SUPER_ADMIN, ROLES.ADMIN]
    }, {
        text: 'Milk',
        link: ROUTES.MILK_URLS.milk,
        id: 2,
        access: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MILK_ENTRY]
    },
    {
        text: 'Admin',
        link: ROUTES.ADMIN,
        id: 3,
        access: [ROLES.SUPER_ADMIN, ROLES.ADMIN]
    },
    {
        text: 'Payment Calculator',
        link: ROUTES.PAYMENT_CALCULATOR,
        id: 4,
        access: [ROLES.SUPER_ADMIN, ROLES.ADMIN]
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
            <MySnackbar/>
        </Router>
    )
}

export default App;