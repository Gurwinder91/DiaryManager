
import React, { Fragment } from 'react';
import { Typography, ListItemText, ListItem, Divider } from '@material-ui/core';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import moment from 'moment';

import { withFirebase } from '../Firebase';
import Filter from './Filter';
import { MyList, MySkeleton } from '../../core';
import * as ACTIONS from '../../actions';
import * as CONSTANTS from '../../constants';
import { withAuthorization } from '../Session';

const PaymentCalculator = ({ customers, firebase, onSetMilks, milks, onSetCustomers }) => {
    const [payments, setPayments] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        firebase.milks().limitToLast(30).once('value', snapshot => {
            onSetMilks(snapshot.val());
            setLoading(false);
        })
        return () => firebase.milks().off();
    }, [firebase]);

    React.useEffect(() => {
        firebase.customers().on('value', snapshot => {
            onSetCustomers(snapshot.val())
        });

        return () => firebase.customers().off();
    }, [firebase])

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
        Object.keys(milks).filter(date => compareLessThanEqualToDate(filterObj.startDate, date) && compareGreatorThanEqualToDate(filterObj.endDate, date)).forEach(date => {
            Object.keys(milks[date]).forEach(uid => {
                let milk = {
                    ...milks[date][uid],
                    uid: uid,
                    date: date
                };

                milk = filterByCustomerId(filterObj, milk);

                if (milk) {
                    payments.push(milk);
                }
            });
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

    const getCustomerName = (customerId) => Object.keys(customers).length ? customers[customerId].customerName : '';

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
        loading ?
            <MySkeleton />
            :
            <>
                <Typography variant="h4" component="h4" align="center">
                    Payment Calculator
            </Typography>
                <Filter onCalculate={paymentCalculateHandler} />
                <MyList>
                    {renderPayments()}
                </MyList>
            </>
    )
}

const mapStateToProps = state => {
    return {
        customers: state.customerState.customers,
        milks: state.milkState.milks,
    }
}

const mapDispatchToProps = dispatch => ({
    onSetMilks: (milks) => dispatch({ type: ACTIONS.MILKS_SET, milks }),
    onSetCustomers: (customers) => dispatch({ type: ACTIONS.CUSTOMERS_SET, customers }),
})

const condition = authUser => {
    return authUser && (authUser.role === CONSTANTS.ADMIN || authUser.role === CONSTANTS.SUPER_ADMIN);
}

export default compose(
    withAuthorization(condition),
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(PaymentCalculator);