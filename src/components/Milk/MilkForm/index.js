
import React from 'react';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { withRouter } from 'react-router-dom';
import {
    Typography, MenuItem, Select, FormControlLabel,
    FormControl, FormLabel, RadioGroup, Radio
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import { MyForm, MyInput } from '../../../core';
import { MyObject } from '../../../utilty';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';
import * as ACTIONS from '../../../actions';

const MilkForm = ({ milk, customers, firebase, history, onSetCustomers, uid, onSetMilk, }) => {

    const { register, handleSubmit, errors, setValue } = useForm({mode: 'onBlur'});
    const [milkType, setMilkType] = React.useState('BM');
    const [date, setDate] = React.useState(Date.now());
    const [customerName, setCustomerName] = React.useState('');

    React.useEffect(() => {
        register({ name: "milkType" });
        register({ name: "date" });
        register({ name: "customerName" });
        updateValues();

        firebase.customers().on('value', snapshot => {
            onSetCustomers(snapshot.val())
        });
        return () => {
            firebase.customers().off();
        }
    }, [register])

    const handleDate = (date) => {
        const milliSeconds = date.getTime();
        setValue('date', milliSeconds);
        setDate(milliSeconds);
    }

    const handleMilkType = option => {
        const value = option.target.value;
        setValue('milkType', value);
        setMilkType(value);
    }

    const handleCustName = option => {
        const value = option.target.value;
        setValue('customerName', value);
        setCustomerName(value);
    }

    const updateValues = () => {
        const customerName = milk.customerName || customers.length > 0 ? customers[0].customerName : '';

        setValue('milkType', milk.milkType);
        setValue('date', milk.date);
        setValue('customerName', customerName);

        setMilkType(milk.milkType);
        setDate(milk.date);
        setCustomerName(customerName);
    }

    const getErrorMessage = (inputName) => {
        let message = '';
        if (errors[inputName]) {
            switch (errors[inputName].type) {
                case 'required':
                    message = errors[inputName].message;
                    break;
                case 'pattern':
                    message = errors[inputName].message;
                    break;
                case 'max':
                    message = errors[inputName].message;
                    break;
            }
        }
        return message;
    }

    const savemilkData = (data) => {
        if (uid) {
            return firebase.milks().child(uid).update(data)
                .then(() => uid);

        } else {
            const key = firebase.milks().push().key;
            return firebase.milks().child(key).set(data)
                .then(() => key);
        }
    }

    const onSubmit = (data) => {
        savemilkData(data)
            .then((key) => {
                return onSetMilk(data, key);
            })
            .then(() => history.push(ROUTES.MILK_URLS.milk))
            .catch(console.log);
    }

    return (
        <>
            <Typography variant="h4" align="center">
                Add Milk
                </Typography>
            <MyForm onSubmit={handleSubmit(onSubmit)}>
                <Select
                    style={{ width: '100%', marginTop: '10px' }}
                    labelId="Customer Name"
                    name="customerName"
                    value={customerName}
                    onChange={handleCustName}
                >
                    {customers.map(customer =>
                        <MenuItem key={customer.uid} value={customer.customerName}>{customer.customerName}</MenuItem>
                    )}
                </Select>
                <Select
                    style={{ width: '100%', marginTop: '10px' }}
                    labelId="Milk Type"
                    name="milkType"
                    value={milkType}
                    onChange={handleMilkType}
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
                        label="Date"
                        name="date"
                        format="MM/dd/yyyy"
                        value={date}
                        onChange={handleDate.bind(this, 'date')}
                    />
                </MuiPickersUtilsProvider>
                <MyInput
                    required
                    type="number"
                    name="milkQuantity"
                    label="Milk Quantity (in litres)"
                    style={{ width: '100%' }}
                    defaultValue={milk.milkQuantity}
                    inputRef={
                        register({
                            required: 'This field is required',
                            pattern: {
                                value: /^[0-9.]*$/,
                                message: 'Only numbers are allowed'
                            }
                        })
                    }
                    error={!!errors.milkQuantity}
                    helperText={getErrorMessage('milkQuantity')}
                />
                <MyInput
                    required
                    type="number"
                    name="milkFat"
                    label="Milk Fat"
                    style={{ width: '100%' }}
                    defaultValue={milk.milkFat}
                    inputRef={
                        register({
                            required: 'This field is required',
                            max: {
                                value: 10,
                                message: 'More than 10 is not allowed'
                            },
                            pattern: {
                                value: /^[0-9.]*$/,
                                message: 'Only numbers are allowed'
                            }
                        })
                    }
                    error={!!errors.milkFat}
                    helperText={getErrorMessage('milkFat')}
                />
                <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend">Time</FormLabel>
                    <RadioGroup aria-label="time" style={{ flexDirection: 'row' }} defaultValue={milk.time}>
                        <FormControlLabel name="time" value="Morning" inputRef={register} control={<Radio />} label="Morning" />
                        <FormControlLabel name="time" value="Evening" inputRef={register} control={<Radio />} label="Evening" />
                    </RadioGroup>
                </FormControl>
            </MyForm>
        </>
    );
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