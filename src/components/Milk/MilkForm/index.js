
import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    Typography, MenuItem, FormControlLabel,
    FormControl, FormLabel, RadioGroup, Radio
} from '@material-ui/core';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import moment from 'moment';

import { MyForm, MyInput, MySelect, MyDatePicker } from '../../../core';
import { MyObject, ErrorGenerator } from '../../../utilty';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';
import * as ACTIONS from '../../../actions';

const MilkForm = ({ milk, customers, firebase, history, onSetCustomers, mode, onSetMilk, uid }) => {
    const { register, handleSubmit, errors, setValue } = useForm({
        defaultValues: { ...milk }
    });
    const [milkType, setMilkType] = React.useState('BM');
    const [date, setDate] = React.useState(moment());
    const [customerName, setCustomerName] = React.useState('');


    React.useEffect(() => {
        firebase.customers().on('value', snapshot => {
            onSetCustomers(snapshot.val())
        });

        register({ name: "milkType" });
        register({ name: "date" });
        register({ name: "customerName" }, { required: true });

        return () => {
            firebase.customers().off();
        }
    }, [register, firebase]);

    React.useEffect(() => {
        if (Object.keys(milk).length) {
            setValue('milkType', milk.milkType);
            setValue('date', milk.date.format('DD-MM-YYYY'));
            setValue('customerName', milk.customerName);

            setMilkType(milk.milkType);
            setDate(milk.date);
            setCustomerName(milk.customerName);
        }
    }, [milk])

    const handleDate = (momentInstance) => {
        const formattedDate = momentInstance.format('DD-MM-YYYY');
        setValue('date', formattedDate);
        setDate(momentInstance);
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

    const saveMilkData = (data) => {
        const { date, ...other } = data;
        if (mode === 'edit') {
            return firebase.milks().child(date).child(uid).update(other)
                .then(() => [other, date, uid]);
        } else {
            let key = firebase.milks().child(date).push().key;
            return firebase.milks().child(date).child(key).set(other)
                .then(() => [other, date, key]);
        }
    }

    const onSubmit = (data) => {
        saveMilkData(data)
            .then((output) => {
                return onSetMilk(output[0], output[1], output[2]);
            })
            .then(() => history.push(ROUTES.MILK_URLS.milk))
            .catch(console.log);
    }

    return (
        <>
            <Typography variant="h4" align="center">
                {mode === 'edit' ? 'Edit Milk' : 'Add Milk'}
            </Typography>
            <MyForm onSubmit={handleSubmit(onSubmit)}>
                <MySelect
                    required
                    labelName="Customer Name"
                    labelId="customer-name"
                    name="customerName"
                    value={customerName}
                    onChange={handleCustName}
                    error={!!errors.customerName}
                    errorMessage={ErrorGenerator.getErrorMessage(errors, 'customerName')}
                >
                    {customers.map(customer =>
                        <MenuItem key={customer.uid} value={customer.customerName}>{customer.customerName}</MenuItem>
                    )}
                </MySelect>
                <MySelect
                    labelName="Milk Type"
                    labelId="milk-type"
                    name="milkType"
                    value={milkType}
                    onChange={handleMilkType}
                >
                    <MenuItem value="BM">BM</MenuItem>
                    <MenuItem value="CM">CM</MenuItem>
                    <MenuItem value="BCM">BCM</MenuItem>
                </MySelect>

                <MyDatePicker
                    label="Date"
                    name="date"
                    value={date}
                    onChange={handleDate}
                />

                <MyInput
                    required
                    type="number"
                    name="milkQuantity"
                    label="Milk Quantity (in litres)"
                    style={{ width: '100%' }}
                    inputRef={
                        register({
                            required: true,
                            pattern: {
                                value: /^[0-9.]*$/,
                                message: 'Only numbers are allowed'
                            }
                        })
                    }
                    error={!!errors.milkQuantity}
                    helperText={ErrorGenerator.getErrorMessage(errors, 'milkQuantity')}
                />
                <MyInput
                    required
                    type="number"
                    name="milkFat"
                    label="Milk Fat"
                    style={{ width: '100%' }}
                    inputRef={
                        register({
                            required: true,
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
                    helperText={ErrorGenerator.getErrorMessage(errors, 'milkFat')}
                />
                <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend">Time</FormLabel>
                    <RadioGroup aria-label="time" name="time" style={{ flexDirection: 'row' }} defaultValue={milk.time} >
                        <FormControlLabel value="Morning" inputRef={register} control={<Radio />} label="Morning" />
                        <FormControlLabel value="Evening" inputRef={register} control={<Radio />} label="Evening" />
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
    onSetMilk: (milk, date, uid) => dispatch({ type: ACTIONS.MILK_SET, milk, date, uid }),
})

export default compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(MilkForm);