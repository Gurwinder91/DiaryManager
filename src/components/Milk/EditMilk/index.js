import React from 'react';

import MilkForm from '../MilkForm';

export default () => {

    const state = {
        milk: {
            id: 1,
            customerName: 2,
            milkFat: 5.5,
            milk: 8,
            milkType: 'CM',
            date: Date.now(),
            time: 'evening'
        }
    }

    return (
        <MilkForm milk={state.milk} />
    )

} 