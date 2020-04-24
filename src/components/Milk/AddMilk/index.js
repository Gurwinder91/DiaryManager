
import React from 'react';
import moment from 'moment';

import MilkForm from '../MilkForm';
import MILK_RATES from '../milkRates';

export default () => {
    const time = moment().format('A');
    const milk = {
        date: moment(),
        customerName: '',
        milkType: 'BM',
        time: time === 'PM' ? 'Evening': 'Morning',
        milkRate: MILK_RATES.BM,
        milkFat: '',
        milkQuantity: ''
    }

    return (
        <MilkForm milk={milk} mode='add' />
    )

}