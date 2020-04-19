import 'date-fns';
import React from "react";
import { Typography } from '@material-ui/core';

import CustomerForm from '../customer-form';

const customer = {
    customerName: '',
    mode: false,
    milkType: 'BM',
    registeredDate: Date.now(),
    dateofbirth: Date.now(),
    address: '',
    phoneNumber: ''
}
const AddCustomer = (props) => {
    return (
        <>
            <Typography variant="h4" align="center">
                Add New Customer
                </Typography>
            <CustomerForm customer={customer}/>
        </>
    )
}

export default AddCustomer;