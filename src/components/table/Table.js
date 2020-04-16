import React, { Component } from "react";

import './Table.scss';
import TableBody from './TableBody';

export class Table extends Component {

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

    rowClickHandle(user) {
        console.log(user);
    }

    render() {
        return (
            <table className="table my-box-shadow">
                <thead>
                    <tr className="header-row">
                        <th className="header-cell">
                            Id
                        </th>
                        <th className="header-cell">
                            Email
                        </th>

                        <th className="header-cell">
                            FirstName
                        </th>

                        <th className="header-cell">
                            LastName
                        </th>

                        <th className="header-cell">
                            Avatar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <TableBody users={this.state.users} rowclicked={this.rowClickHandle} />
                </tbody>
            </table>
        )
    };
}

export default Table;