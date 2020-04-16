import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Typography, Select, MenuItem, Switch, FormControlLabel } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { MyForm, MyInput } from '../../core';
import { MyFormControl, MyFormGroup, EventHandler } from '../../utilty';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = new MyFormGroup({
    id: new MyFormControl(3),
    customerName: new MyFormControl('', [{ name: 'required', message: 'Customer Name is required' }]),
    address: new MyFormControl('', [{ name: 'required', message: 'Address is required' }]),
    email: new MyFormControl('', [{ name: 'email', message: 'Email is not valid' }]),
    milkType: new MyFormControl('BM'),
    dateofbirth: new MyFormControl(Date.now()),
    phoneNumber: new MyFormControl('', [{ name: 'required', message: 'Phone Number is required' }]),
    mode: new MyFormControl(true)
});

class CustomerFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }


    componentDidMount() {
        if (this.props.customer) {
            const { ...controls } = this.state.populateForm(this.props.customer);
            this.setState({ controls: controls });
        }
    }

    formSubmitHandler = (event) => {
        this.state.formSubmit(event)
            .then(form => {
                return this.props.firebase.customers().push().set(form);
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.CUSTOMER_URLS.customer);
            })
            .catch(console.log);
    }

    inputChangeHandler = (event) => {
        const formGroup = this.state.inputChangeHandler(event);
        this.setState({ controls: formGroup.controls, invalid: formGroup.invalid });
    }

    dateChangeHandler = (name, date) => {
        const formGroup = this.state.dateChangeHandler(name, date);
        this.setState({ controls: formGroup.controls, invalid: formGroup.invalid });
    }

    render = () => {
        return (
            <>
                <Typography variant="h4" align="center">
                    Add New Customer
                </Typography>
                <MyForm formSubmit={this.formSubmitHandler} disabled={this.state.invalid}>
                    <MyInput
                        required
                        error={this.state.showError('customerName')}
                        helperText={this.state.showErrorText('customerName')}
                        id="customer-name"
                        name="customerName"
                        label="Customer Name"
                        value={this.state.controls.customerName.value}
                        onChange={EventHandler.debounce(this.inputChangeHandler, 1000)}
                        style={{ width: '100%' }}
                    />
                    <MyInput
                        required
                        id="address"
                        name="address"
                        label="Address"
                        value={this.state.controls.address.value}
                        onChange={EventHandler.debounce(this.inputChangeHandler, 1000)}
                        style={{ width: '100%' }}
                        error={this.state.showError('address')}
                        helperText={this.state.showErrorText('address')}
                    />
                    <MyInput
                        id="email"
                        name="email"
                        label="Email"
                        value={this.state.controls.email.value}
                        onChange={EventHandler.debounce(this.inputChangeHandler, 1000)}
                        style={{ width: '100%' }}
                        error={this.state.showError('email')}
                        helperText={this.state.showErrorText('email')}
                    />
                    <Select
                        style={{ width: '100%', marginTop: '10px' }}
                        labelId="Milk Type"
                        id="milk-type"
                        name="milkType"
                        value={this.state.controls.milkType.value}
                        onChange={this.inputChangeHandler}
                    >
                        <MenuItem value="BM">BM</MenuItem>
                        <MenuItem value="CM">CM</MenuItem>
                        <MenuItem value="BOTH">Both</MenuItem>
                    </Select>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            disableFuture
                            autoOk
                            style={{ width: '100%' }}
                            id="date-of-birth"
                            label="Date of Birth"
                            name="dateofbirth"
                            format="MM/dd/yyyy"
                            value={this.state.controls.dateofbirth.value}
                            onChange={this.dateChangeHandler}
                        />
                    </MuiPickersUtilsProvider>

                    <MyInput
                        id="phone-number"
                        type="number"
                        required
                        name="phoneNumber"
                        label="Phone Number"
                        value={this.state.controls.phoneNumber.value}
                        onChange={EventHandler.debounce(this.inputChangeHandler, 1000)}
                        style={{ width: '100%' }}
                        error={this.state.showError('phoneNumber')}
                        helperText={this.state.showErrorText('phoneNumber')}
                    />

                    <FormControlLabel
                        control={<Switch
                            checked={this.state.controls.mode.value}
                            onChange={this.inputChangeHandler}
                            id="mode"
                            name="mode"
                        />}
                        label={this.state.controls.mode.value ? "Sell milk from home" : "Sell milk in diary"}
                    />
                </MyForm>
            </>
        );
    }

}

const CustomerForm = compose(
    withRouter,
    withFirebase
)(CustomerFormBase);

export default CustomerForm;