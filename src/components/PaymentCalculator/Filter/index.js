import React from 'react';
import { Button, MenuItem, Card, CardContent } from '@material-ui/core';
import moment from "moment";
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withFirebase } from '../../Firebase';
import { MyDatePicker, MySelect, MyInput } from '../../../core';
import { MyObject } from '../../../utilty';
import * as ACTIONS from '../../../actions';
import useStyles from "./style";

const FilterBase = ({ customers, firebase, onSetCustomers, onCalculate }) => {
    const classes = useStyles();
    const [startDate, setStartDate] = React.useState(moment());
    const [endDate, setEndDate] = React.useState(moment());
    const [customerName, setCustomerName] = React.useState('All');
    const minDate = moment().subtract(1, 'months');

    React.useEffect(() => {
        firebase.customers().on('value', snapshot => {
            onSetCustomers(snapshot.val())
        });

        return () => firebase.customers().off();
    }, [firebase]);

    const handleStateDate = (date) => {
        setStartDate(date);
    }

    const handleEndDate = (date) => {
        if (date < startDate) {
            setStartDate(date);
        }
        setEndDate(date);
    }

    const handleCustomerName = (event) => {
        setCustomerName(event.target.value);
    }

    const calculateProxy = () => {
        const data = {
            startDate: startDate.format('DD-MM-YYYY'),
            endDate: endDate.format('DD-MM-YYYY'),
            customerName: customerName,
        };

        onCalculate(data);
    }

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <div className={classes.controls}>
                    <MyDatePicker
                        width="45"
                        minDate={minDate}
                        maxDate={endDate}
                        label="Start Date"
                        name="startDate"
                        value={startDate}
                        onChange={handleStateDate}
                    />

                    <MyDatePicker
                        width="45"
                        label="End Date"
                        name="endDate"
                        minDate={minDate}
                        value={endDate}
                        onChange={handleEndDate}
                    />
                </div>
                <MySelect
                    className={classes.customerName}
                    labelName="Customer Name"
                    labelId="customer-name"
                    name="customerName"
                    value={customerName}
                    onChange={handleCustomerName}
                >
                    <MenuItem value="All">All</MenuItem>
                    {customers.map(customer =>
                        <MenuItem key={customer.uid} value={customer.customerName}>{customer.customerName}</MenuItem>
                    )}
                </MySelect>

                <div className={classes.calculateBtn}>
                    <Button variant="contained" color="primary" onClick={calculateProxy}>Calculate</Button>
                </div>
            </CardContent>
        </Card>
    )
}

const mapStateToProps = state => ({
    customers: new MyObject(state.customerState.customers).toArray(),
})
const mapDispatchToProps = dispatch => ({
    onSetCustomers: (customers) => dispatch({ type: ACTIONS.CUSTOMERS_SET, customers }),
})

export default compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(FilterBase);