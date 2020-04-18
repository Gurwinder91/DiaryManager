import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { MyCard, AddCircleIcon } from '../../core';
import "./Customer.scss";
import * as ROUTES from '../../constants/routes';

class Customer extends Component {

    state = {
        customers: []
    }   

    componentDidMount() {
        this.props.firebase.customers().on('value', snapshot => {
            const customersObject = snapshot.val();
            const customersList = Object.keys(customersObject).map(key => ({
                ...customersObject[key],
                id: key
            }));
            this.setState({ customers : customersList})
        });
    }

    componentWillUnmount() {
        this.props.firebase.customers().off();
    }

    navigateTo = (to) => {
        this.props.history.push(`${ROUTES.CUSTOMER_URLS.customer}${to}`);
    }

    deleteCustomerEntry = (id) => {
        const customers = [...this.state.customers];
        const index = customers.findIndex(m => m.id === id);
        customers.splice(index, 1)
        this.setState({ customers: customers })
    }

    renderCards = () => (
        this.state.customers.map((customer) => (
            <MyCard key={customer.id} {...customer} />
        ))
    )

    render() {
        return (
            <div className="customer-cards">
                {this.renderCards()}
                <AddCircleIcon whenClicked={this.navigateTo.bind(this, ROUTES.CUSTOMER_URLS.add)} />
            </div>
        )
    }

}

export default compose(
    withRouter,
    withFirebase
)(Customer);