
import React from 'react';
import { Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase'

import CustomerForm from '../customer-form';
import { withAuthorization } from '../../Session';
import * as ROLES from '../../../constants/roles';

const EditCustomer = (props) => {

    return (
        <>
            <Typography variant="h4" align="center">
                Edit Customer
                </Typography>
            {
                props.customer && <CustomerForm customer={props.customer} id={props.match.params.id} />
            }

        </>
    )
}

const mapStateToProps = (state, { match }) => {
    const customers = state.firestore.data.customers;
    const customer = customers ? customers[match.params.id] : null

    return {
        customer: customer
    };
}

const condition = auth => {
    return auth.role === ROLES.ADMIN || auth.role === ROLES.SUPER_ADMIN;
}

export default compose(
    withAuthorization(condition),
    connect(mapStateToProps),
    firestoreConnect([{
        collection: 'customers'
    }])
)(EditCustomer)

