import React from "react";
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { AddCircle, MyList, MyListSkeleton } from '../../core';
import { MyObject } from '../../utilty';
import * as ROUTES from '../../constants/routes';
import * as ACTIONS from '../../actions';
import AddCustomer from './add-customer';
import EditCustomer from './edit-customer';
import CustomersList from './customers-list';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import * as CONSTANTS from '../../constants';

const CustomerBase = ({ customers, onSetCustomers, firebase }) => {
    const history = useHistory();
    const [loading, setloading] = React.useState(false);

    React.useEffect(() => {
        setloading(true);
        firebase.customers().on('value', snapshot => {
            onSetCustomers(snapshot.val());
            setloading(false);
        });

        return () => firebase.customers().off();
    }, [firebase])

    const navigateTo = (to) => {
        history.push(`${ROUTES.CUSTOMER_URLS.customer}${to}`, { childRoute: true });
    }

    return (
        <>
            {
                loading ?
                    <MyListSkeleton />
                    :
                    <>
                        <MyList>
                            {customers.length ? <CustomersList customers={customers} /> : null}
                        </MyList>
                        <AddCircle whenClicked={navigateTo.bind(this, ROUTES.CUSTOMER_URLS.add)} />
                    </>
            }
        </>
    )
}

const mapStateToProps = state => ({
    customers: new MyObject(state.customerState.customers).toArray(),
})

const mapDispatchToProps = dispatch => ({
    onSetCustomers: (customers) => dispatch({ type: ACTIONS.CUSTOMERS_SET, customers }),
})

const condition = authUser => {
    return authUser && (authUser.role === CONSTANTS.ADMIN || authUser.role === CONSTANTS.SUPER_ADMIN);
}

const Customer = compose(
    withAuthorization(condition),
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps))
    (CustomerBase);
export { Customer, AddCustomer, EditCustomer };