
import React from 'react';
import moment from 'moment';
import { Typography } from '@material-ui/core';

import MilkForm from '../MilkForm';
import {withAuthorization} from '../../Session';

const AddMilk = () => {
    const time = moment().format('A');
    const milk = {
        date: moment().format('DD-MM-YYYY'),
        customerId: '',
        milkType: 'BM',
        time: time === 'PM' ? 'Evening' : 'Morning',
        milkSNF: 8.0,
        milkRate: 64,
        milkFat: '',
        milkQuantity: ''
    }

    return (
        <>
            <Typography variant="h4" align="center">
                Add Milk
            </Typography>
            <MilkForm milk={milk} />
        </>
    )

}

export default withAuthorization(authUser => !!authUser)(AddMilk);