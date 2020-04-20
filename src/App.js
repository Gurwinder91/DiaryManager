import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Toolbar } from '@material-ui/core';

import "./App.scss";

import Header from "./components/Header";
import Main from "./components/main";
import { withAuthentication } from './components/Session';
import { MySwipeableDrawer } from "./core";

export class App extends Component {

    state = {
        drawer: {
            open: false,
            navList: [
                {
                    text: 'Customer',
                    link: '/customer/',
                    id: 2
                },
                {
                    text: 'Add Customer',
                    link: '/customer/add/',
                    id: 4
                }, {
                    text: 'Milk',
                    link: '/milk/',
                    id: 5
                }, {
                    text: 'Add Milk',
                    link: '/milk/add/',
                    id: 6
                },
                {
                    text: 'Admin',
                    link: '/admin',
                    id: 7
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