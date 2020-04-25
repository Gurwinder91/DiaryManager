
import React, { Fragment } from 'react';
import { Typography, ListItemText, ListItem, Divider } from '@material-ui/core';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import moment from 'moment';

import { withFirebase } from '../Firebase';
import Filter from './Filter';
import { MyList } from '../../core';
import * as ACTIONS from '../../actions';

const PaymentCalculator = ({ customers, firebase, onSetMilks, milks }) => {
    const [payments, setPayments] = React.useState([]);

    React.useEffect(() => {
        firebase.milks().limitToLast(30).once('value', snapshot => {
            onSetMilks(snapshot.val());
        })
        return () => firebase.milks().off();
    }, [firebase]);

    const paymentCalculateHandler = (filterObj) => {
        let payments = arrangeData(filterObj);
        setPayments(groupByCustomer(payments));
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

    const arrangeData = (filterObj) => {
        let payments = []
        Object.keys(milks).filter(key => key >= filterObj.startDate && key <= filterObj.endDate).forEach(date => {
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
        return arr.reduce(fn, 0);
    }

    const getCustomerName = (customerId) => customers[customerId].customerName;

    const renderPayments = () => {
        let elements = [];
        for (let entry of payments.entries()) {
            elements.push( <Fragment key={entry[0]}>
                <ListItem >
                    <ListItemText
                        primary={getCustomerName(entry[0])}
                        secondary={
                            <>
                                <Typography variant="body1" component="span" style={{ display: 'block' }}>
                                    Total Milk in litres: {calculateSum(entry[1], (prevResult, item) => prevResult + Number(item.milkQuantity))}
                                </Typography>
                                <Typography variant="body1" component="span" style={{ display: 'block' }}>
                                    Toal Payment in Rs: {calculateSum(entry[1], (prevResult, item) => prevResult + Number(item.milkPrice))}
                                </Typography>
                            </>
                        }
                    />
                </ListItem>
                <Divider />
            </Fragment>
            );
        }
        return elements;
    }

    return (
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
})

export default compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(PaymentCalculator);