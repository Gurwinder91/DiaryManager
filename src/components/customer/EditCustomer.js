
import React, { Component } from 'react';
import CustomerForm from './CustomerForm';

export default class EditCustomer extends Component {
    state = {
        customer: {
            id: 3,
            customerName: 'Gurwinder Singh',
            address: 'Village: Pohlomajra District: Fatehgarh sahib',
            email: 'somal.gurwinder7@gmail.com',
            milkType: 'BM',
            dateofbirth: Date.now(),
            phoneNumber: 8872409191,
            mode: false
        }
    }
    render = () => {
        return (
            <CustomerForm customer={this.state.customer} />
        )
    }
} 