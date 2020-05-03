
import React from "react";
import { Typography } from '@material-ui/core';
import moment from "moment";

import CustomerForm from '../customer-form';
import {withAuthorization} from '../../Session';
import * as ROLES from '../../../constants/roles';

const customer = {
    customerName: '',
    mode: false,
    milkType: 'BM',
    registeredDate: moment().format('DD-MM-YYYY'),
    address: '',
    phoneNumber: ''
}
const AddCustomer = (props) => {
    return (
        <>
            <Typography variant="h4" align="center">
                Add New Customer
                </Typography>
            <CustomerForm customer={customer} />
        </>
    )
}

const condition = auth => {
    return auth.role === ROLES.ADMIN || auth.role === ROLES.SUPER_ADMIN;
}

export default withAuthorization(condition)(AddCustomer);