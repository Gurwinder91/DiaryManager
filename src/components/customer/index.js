import React from "react";
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import { AddCircle, MyList, MyListSkeleton } from '../../core';
import * as ROUTES from '../../constants/routes';
import AddCustomer from './add-customer';
import EditCustomer from './edit-customer';
import CustomersList from './customers-list';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

const CustomerBase = ({ customers }) => {
    console.log(customers);
    const history = useHistory();

    const navigateTo = (to) => {
        history.push(`${ROUTES.CUSTOMER_URLS.customer}${to}`, { childRoute: true });
    }

    return (
        <>
            {
                isLoaded(customers) ?
                    <>
                        <MyList>
                            {(customers && customers.length) && <CustomersList customers={customers} />}
                        </MyList>
                        <AddCircle whenClicked={navigateTo.bind(this, ROUTES.CUSTOMER_URLS.add)} />
                    </>
                    :
                    <MyListSkeleton />
            }
        </>
    )
}

const mapStateToProps = state => ({
    customers: state.firestore.ordered.customers,
})

const condition = auth => {
    return auth.role === ROLES.ADMIN || auth.role === ROLES.SUPER_ADMIN;
}

const Customer = compose(
    withAuthorization(condition),
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'customers' },
    ])
)
    (CustomerBase);
export { Customer, AddCustomer, EditCustomer };