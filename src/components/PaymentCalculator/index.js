
import React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import moment from 'moment';

import { withFirebase } from '../Firebase';
import Filter from './Filter';
import * as ACTIONS from '../../actions';

const PaymentCalculator = ({ firebase, onSetMilks, milks }) => {
    const [payments, SetPayments] = React.useState([]);

    React.useEffect(() => {
        firebase.milks().limitToLast(30).once('value', snapshot => {
            onSetMilks(snapshot.val());
        })
        return () => firebase.milks().off();
    }, [firebase]);

    const paymentCalculateHandler = (filterObj) => {

        let payments = arrangeData(filterObj);

        console.log(payments);

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


                milk = filterByMilkType(filterObj, milk);
                if (!milk)
                    return

                milk = filterByCustomerName(filterObj, milk);

                if (milk) {
                    payments.push(milk);
                }
            });
        });

        return payments;
    }

    const filterByMilkType = (filterObj, milk) => {
        if (filterObj.milkType !== 'All') {
            return milk.milkType === filterObj.milkType ? milk : null;
        }

        return milk;
    }

    const filterByCustomerName = (filterObj, milk) => {
        if (filterObj.customerName !== 'All') {
            return milk.customerName === filterObj.customerName ? milk : null;
        }

        return milk;
    }

    return (
        <>
            <Typography variant="h4" component="h4" align="center">
                Payment Calculator
            </Typography>
            <Filter onCalculate={paymentCalculateHandler} />
            {
                payments.map(item =>
                    <Card>
                        <CardContent>
                            <div>Gurwinder's Card</div>
                        </CardContent>
                    </Card>
                )
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
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