import 'date-fns';
import React, { Component } from "react";
import { Typography } from '@material-ui/core';

import CustomerForm from './CustomerForm';

export default class AddCustomer extends Component {

    render() {
        return (
            <>
                <Typography variant="h4" align="center">
                    Add New Customer
                </Typography>
                <CustomerForm />
            </>
        )

    }
}