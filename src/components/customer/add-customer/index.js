import 'date-fns';
import React from "react";
import { Typography } from '@material-ui/core';

import CustomerForm from '../customer-form';

const AddCustomer = (props) => {
    return (
        <>
            <Typography variant="h4" align="center">
                Add New Customer
                </Typography>
            <CustomerForm />
        </>
    )
}

export default AddCustomer;