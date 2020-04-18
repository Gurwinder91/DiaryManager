import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux'

import { withFirebase } from '../Firebase';
import { AddCircleIcon, MyList, MyListSkeleton } from '../../core';
import * as ROUTES from '../../constants/routes';
import * as ACTIONS from '../../actions';
import { MyObject } from '../../utilty';
import AddCustomer from './add-customer';
import EditCustomer from './edit-customer';
import CustomersList from './customers-list';

class CustomerBase extends Component {
    state = {
        loading: true
    }
    componentDidMount() {
        this.props.firebase.customers().on('value', snapshot => {
            this.props.onSetCustomers(snapshot.val());
            this.setState({ loading: false })
        },
            () => this.setState({ loading: false }));
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

    render() {
        return (
            this.state.loading ?
                <MyListSkeleton /> :
                <>
                    <MyList>
                        <CustomersList customers={this.props.customers} />
                    </MyList>
                    <AddCircleIcon whenClicked={this.navigateTo.bind(this, ROUTES.CUSTOMER_URLS.add)} />
                </>
        )
    }
}

const mapStateToProps = state => ({
    customers: new MyObject(state.customerState.customers).toArray(),
})

const mapDispatchToProps = dispatch => ({
    onSetCustomers: (customers) => dispatch({ type: ACTIONS.CUSTOMERS_SET, customers })
})

const Customer = compose(
    withRouter,
    withFirebase,
    connect(
        mapStateToProps,
        mapDispatchToProps)
)(CustomerBase);

export { Customer, AddCustomer, EditCustomer }