
import React, { Fragment } from 'react';
import { Typography, ListItemText, ListItem, Divider } from '@material-ui/core';
import { compose } from 'recompose';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';

import Filter from './Filter';
import { MyList, MySkeleton } from '../../core';
import * as ROLES from '../../constants/roles';
import { withAuthorization } from '../Session';

const PaymentCalculator = () => {
    const [payments, setPayments] = React.useState([]);

    useFirestoreConnect(() => [
        { collection: 'customers' },
        {
            collection: 'milks',
            where: [
                ['date', '>=', moment().subtract(1, 'months').format('DD-MM-YYYY')],
                ['date', '<=', moment().format('DD-MM-YYYY')],
            ],
        }
    ])
    const customers = useSelector(state => state.firestore.data.customers);
    const milks = useSelector(state => state.firestore.ordered.milks);

    const paymentCalculateHandler = (filterObj) => {
        let payments = arrangeData(filterObj);
        const customerGps = groupByCustomer(payments);
        console.log(customerGps);
        setPayments(customerGps);
    }

    const groupByCustomer = (arr) => {
        const map = new Map();
        arr.forEach((item) => {
            const collection = map.get(item.customerId);
            if (!collection) {
                map.set(item.customerId, [item]);
            } else {
                collection.push(item);
            }
        });

        return map;
    }

    const compareLessThanEqualToDate = (dateA, dateB) => {
        const [dayA, monthA, yearA] = dateA.split('-');
        const [dayB, monthB, yearB] = dateB.split('-');
        if (yearA < yearB)
            return true;
        if (monthA < monthB) {
            return true;
        }
        return yearA <= yearB && monthA <= monthB && dayA <= dayB;
    }

    const compareGreatorThanEqualToDate = (dateA, dateB) => {
        const [dayA, monthA, yearA] = dateA.split('-');
        const [dayB, monthB, yearB] = dateB.split('-');
        if (yearA > yearB)
            return true;
        if (monthA > monthB) {
            return true;
        }
        return yearA >= yearB && monthA >= monthB && dayA >= dayB;
    }

    const arrangeData = (filterObj) => {
        let payments = []
        milks.filter(milk => compareLessThanEqualToDate(filterObj.startDate, milk.date) && compareGreatorThanEqualToDate(filterObj.endDate, milk.date))
            .forEach(milk => {
                milk = filterByCustomerId(filterObj, milk);
                if (milk) {
                    payments.push(milk);
                }
            });

        return payments;
    }

    const filterByCustomerId = (filterObj, milk) => {
        if (filterObj.customerId !== 'All') {
            return milk.customerId === filterObj.customerId ? milk : null;
        }

        return milk;
    }

    const calculateSum = (arr, fn) => {
        const sum = arr.reduce(fn, 0);
        return sum.toFixed(2);
    }

    const getCustomerName = (customerId) => customers[customerId].customerName;

    const renderPayments = () => {
        let elements = [];
        for (let entry of payments.entries()) {
            elements.push(<Fragment key={entry[0]}>
                <ListItem >
                    <ListItemText
                        primary={getCustomerName(entry[0])}
                        secondary={
                            <>
                                <Typography variant="body1" component="span" style={{ display: 'block' }}>
                                    Total Milk in litres: {calculateSum(entry[1], (prevResult, item) => prevResult + Number(item.milkQuantity))}
                                </Typography>
                                <Typography variant="body1" component="span" style={{ display: 'block' }}>
                                    Total Payment in Rs: {calculateSum(entry[1], (prevResult, item) => prevResult + Number(item.milkPrice))}
                                </Typography>
                            </>
                        }
                    />
                </ListItem>
                <Divider />
            </Fragment>
            );
        }
        return elements.length ? elements : null;
    }

    return (
        isLoaded(milks) ?
        <>
            <Typography variant="h4" component="h4" align="center">
                Payment Calculator
                </Typography>
            <Filter onCalculate={paymentCalculateHandler} customers={customers} />
            <MyList>
                {renderPayments()}
            </MyList>
        </>
        :
        <MySkeleton />
    )
}

const condition = auth => {
    return auth.role === ROLES.ADMIN || auth.role === ROLES.SUPER_ADMIN;
}

export default compose(
    withAuthorization(condition),
)(PaymentCalculator);