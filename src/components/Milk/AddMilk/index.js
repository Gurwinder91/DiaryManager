
import React from 'react';
import moment from 'moment';

import MilkForm from '../MilkForm';
import { withAuthorization } from '../../Session';

const AddMilk = () => {
    const time = moment().format('A');
    const milk = {
        date: moment(),
        customerId: '',
        milkType: 'BM',
        time: time === 'PM' ? 'Evening' : 'Morning',
        milkSNF: 8.0,
        milkRate: 64,
        milkFat: '',
        milkQuantity: ''
    }

    return (
        <MilkForm milk={milk} mode='add' />
    )

}

export default withAuthorization(authUser => !!authUser)(AddMilk);