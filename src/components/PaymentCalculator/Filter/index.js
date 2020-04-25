import React from 'react';
import { Button, MenuItem, Card, CardContent } from '@material-ui/core';
import moment from "moment";
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { MyDatePicker, MySelect } from '../../../core';
import { MyObject } from '../../../utilty';
import useStyles from "./style";

const FilterBase = ({ customers, onCalculate }) => {
    const classes = useStyles();
    const [startDate, setStartDate] = React.useState(moment());
    const [endDate, setEndDate] = React.useState(moment());
    const [customerId, setCustomerId] = React.useState('All');
    const minDate = moment().subtract(1, 'months');

    const handleStateDate = (date) => {
        setStartDate(date);
    }

    const handleEndDate = (date) => {
        if (date < startDate) {
            setStartDate(date);
        }
        setEndDate(date);
    }

    const handleCustomerId = (event) => {
        setCustomerId(event.target.value);
    }

    const calculateProxy = () => {
        const data = {
            startDate: startDate.format('DD-MM-YYYY'),
            endDate: endDate.format('DD-MM-YYYY'),
            customerId: customerId,
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
                    name="customerId"
                    value={customerId}
                    onChange={handleCustomerId}
                >
                    <MenuItem value="All">All</MenuItem>
                    {customers.map(customer =>
                        <MenuItem key={customer.uid} value={customer.uid}>{customer.customerName}</MenuItem>
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

export default compose(
    connect(mapStateToProps)
)(FilterBase);