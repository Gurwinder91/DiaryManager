import React from "react";
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { AddCircleIcon, MyList } from '../../core';
import { MyObject } from '../../utilty';
import * as ROUTES from '../../constants/routes';
import AddCustomer from './add-customer';
import EditCustomer from './edit-customer';
import CustomersList from './customers-list';

const CustomerBase = ({ customers }) => {
    const history = useHistory();

    const navigateTo = (to) => {
        history.push(`${ROUTES.CUSTOMER_URLS.customer}${to}`);
    }

    return (
        <>
            <MyList>
                {customers.length ? <CustomersList customers={customers} /> : null}
            </MyList>
            <AddCircleIcon whenClicked={navigateTo.bind(this, ROUTES.CUSTOMER_URLS.add)} />
        </>
    )
}

const mapStateToProps = state => ({
    customers: new MyObject(state.customerState.customers).toArray(),
})

const Customer = connect(mapStateToProps)(CustomerBase);
export { Customer, AddCustomer, EditCustomer };