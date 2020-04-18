import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withFirebase } from '../Firebase';
import { MyCard, AddCircleIcon } from '../../core';
import "./Customer.scss";
import * as ROUTES from '../../constants/routes';
import * as ACTIONS from '../../actions';

class Customer extends Component {

    componentDidMount() {
        this.props.firebase.customers().on('value', snapshot => {
            this.props.onSetCustomers(snapshot.val());
        });
    }

    componentWillUnmount() {
        this.props.firebase.customers().off();
    }

    navigateTo = (to) => {
        this.props.history.push(`${ROUTES.CUSTOMER_URLS.customer}${to}`);
    }

    deleteCustomerEntry = (id) => {
        const customers = [...this.props.customers];
        const index = customers.findIndex(m => m.id === id);
        customers.splice(index, 1)
        this.setState({ customers: customers })
    }

    renderCards = () => (
        this.props.customers.map((customer) => (
            <MyCard key={customer.uid} {...customer} />
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

const mapStateToProps = state => ({
    customers: Object.keys(state.customerState.customers || {}).map(key => ({
        ...state.customerState.customers[key],
        uid: key,
    })),
})

const mapDispatchToProps = dispatch => ({
    onSetCustomers: (customers) => dispatch({ type: ACTIONS.CUSTOMERS_SET, customers })
})

export default compose(
    withRouter,
    withFirebase,
    connect(
        mapStateToProps,
        mapDispatchToProps)
)(Customer);