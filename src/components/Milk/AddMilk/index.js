
import React from 'react';
import moment from 'moment';

import MilkForm from '../MilkForm';

export default () => {
    const time = moment().format('A');
    const milk = {
        date: moment(),
        customerName: '',
        milkType: 'BM',
        time: time === 'PM' ? 'Evening': 'Morning',
        milkFat: '',
        milkQuantity: ''
    }

    return (
        <MilkForm milk={milk} mode='add' />
    )

}