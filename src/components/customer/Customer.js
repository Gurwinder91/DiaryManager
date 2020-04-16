import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { MyCard, AddCircleIcon } from '../../core';
import "./Customer.scss";

class Customer extends Component {

    state = {
        users: []
    }

    transformData = (response) => {
        return response.json();
    };

    dataReciever = (response) => {
        this.setState({ users: response.data });
    };

    componentDidMount() {
        fetch('https://reqres.in/api/users').then(this.transformData)
            .then(this.dataReciever);
    }

    navigateTo = (to) => {
        this.props.history.push(`/customer/${to}/`);
    }

    deleteMilkEntry = (id) => {
        const milk = [...this.state.milk];
        const index = milk.findIndex(m => m.id === id);
        milk.splice(index, 1)
        this.setState({ milk: milk })
    }

    renderCards = () => (
        this.state.users.map((user) => (
            <MyCard key={user.id} {...user} />
        ))
    )

    render() {
        return (
            <div className="customer-cards">
                {this.renderCards()}
                <AddCircleIcon whenClicked={this.navigateTo.bind(this, 'add')} />
            </div>
        )
    }

}

export default withRouter(Customer);