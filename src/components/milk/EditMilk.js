import React, { Component } from 'react';

import MilkForm from './MilkForm';

export default class EditMilk extends Component {

    state = {
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

    render() {
        return (
            <MilkForm milk={this.state.milk} />
        )
    }
} 