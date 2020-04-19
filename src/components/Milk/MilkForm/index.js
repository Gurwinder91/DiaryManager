
import React, { Component } from 'react';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { withRouter } from 'react-router-dom';
import {
    Typography, MenuItem, Select, FormControlLabel,
    FormControl, FormLabel, RadioGroup, Radio
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { MyForm, MyInput } from '../../../core';
import { MyFormGroup, MyFormControl, EventHandler, MyObject } from '../../../utilty';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';
import * as ACTIONS from '../../../actions';

const INITIAL_STATE = new MyFormGroup({
    id: new MyFormControl(2),
    customerName: new MyFormControl(),
    milkType: new MyFormControl('BM'),
    milk: new MyFormControl(),
    date: new MyFormControl(Date.now()),
    time: new MyFormControl('morning'),
    milkFat: new MyFormControl('', [{ name: 'required', message: 'Milk Fat is required' }])
});

class MilkForm extends Component {

    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
        if (this.props.milk) {
            const { ...controls } = this.state.populateForm(this.props.milk);
            this.setState({ controls: controls })
        }

        this.props.firebase.customers().on('value', snapshot => {
            this.props.onSetCustomers(snapshot.val())
        });
    }

    componentWillUnmount() {
        this.props.firebase.customers().off();
    }

    inputChangeHandler = (event) => {
        const formGroup = this.state.inputChangeHandler(event);
        this.setState({ controls: formGroup.controls, invalid: formGroup.invalid });
    }

    dateChangeHandler = (name, date) => {
        const formGroup = this.state.dateChangeHandler(name, date);
        this.setState({ controls: formGroup.controls, invalid: formGroup.invalid });
    }

    formSubmitHandler = (event) => {
        this.state.formSubmit(event)
            .then(form => {
                 this.props.firebase.milks()
                    .child(form.date)
                        .child(form.time)
                            .child(form.milkType).set(form);
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.MILK_URLS.milk);
            })
            .catch(console.log);
    }

    render = () => {
        return (
            <>
                <Typography variant="h4" align="center">
                    Add Milk
                </Typography>
                <MyForm formSubmit={this.formSubmitHandler} disabled={this.state.invalid}>
                    <Select
                        style={{ width: '100%', marginTop: '10px' }}
                        labelId="customerName"
                        id="customer-name"  
                        name="customerName"
                        value={this.state.controls.customerName.value}
                        onChange={this.inputChangeHandler}
                    >
                        {this.props.customers.map(customer =>
                            <MenuItem key={customer.uid} value={customer.customerName}>{customer.customerName}</MenuItem>
                        )}
                    </Select>
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
                            id="date"
                            label="Date"
                            name="date"
                            format="MM/dd/yyyy"
                            value={this.state.controls.date.value}
                            onChange={this.dateChangeHandler.bind(this, 'date')}
                        />
                    </MuiPickersUtilsProvider>
                    <MyInput
                        required
                        type="number"
                        error={this.state.showError('milk')}
                        helperText={this.state.showErrorText('milk')}
                        id="milk"
                        name="milk"
                        label="Milk Quantity"
                        value={this.state.controls.milk.value}
                        onChange={EventHandler.debounce(this.inputChangeHandler, 1000)}
                        style={{ width: '100%' }}
                    />
                    <MyInput
                        required
                        type="number"
                        error={this.state.showError('milkFat')}
                        helperText={this.state.showErrorText('milkFat')}
                        id="milk-fat"
                        name="milkFat"
                        label="Milk Fat"
                        value={this.state.controls.milkFat.value}
                        onChange={EventHandler.debounce(this.inputChangeHandler, 1000)}
                        style={{ width: '100%' }}
                    />
                    <FormControl component="fieldset" style={{ width: '100%' }}>
                        <FormLabel component="legend">Time</FormLabel>
                        <RadioGroup aria-label="time" name="time" style={{ flexDirection: 'row' }}
                            value={this.state.controls.time.value} onChange={this.inputChangeHandler}>
                            <FormControlLabel value="Morning" control={<Radio />} label="Morning" />
                            <FormControlLabel value="Evening" control={<Radio />} label="Evening" />
                        </RadioGroup>
                    </FormControl>
                </MyForm>
            </>
        );
    }
}

const mapStateToProps = state => ({
    customers: new MyObject(state.customerState.customers).toArray(),
})
const mapDispatchToProps = dispatch => ({
    onSetCustomers: (customers) => dispatch({ type: ACTIONS.CUSTOMERS_SET, customers }),
    onSetMilk: (milk) => dispatch({ type: ACTIONS.MILK_SET, milk }),
})

export default compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(MilkForm);