
import React from 'react';
import MilkForm from '../MilkForm';

export default () => {
    const milk= {
        date: Date.now(),
        customerName: '',
        milkType: 'BM',
        time: 'Morning',
        milkFat: '',
        milkQuantity: ''
    }
    return (
        <MilkForm milk={milk} />
    )

}