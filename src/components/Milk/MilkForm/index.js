
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
import MILK_RATES from '../milkRates';

const MilkForm = ({ milk, customers, firebase, history, onSetCustomers, mode, onSetMilk, uid }) => {
    const { register, handleSubmit, errors, setValue } = useForm({
        defaultValues: { ...milk }
    });
    const [milkType, setMilkType] = React.useState('BM');
    const [date, setDate] = React.useState(moment());
    const [customerId, setCustomerId] = React.useState('');


    React.useEffect(() => {
        register({ name: "milkType" });
        register({ name: "date" });
        register({ name: "customerId" }, { required: true });

        return () => firebase.milks().off();
    }, [register, firebase]);

    React.useEffect(() => {
        if (Object.keys(milk).length) {
            setValue('milkType', milk.milkType);
            setValue('date', milk.date.format('DD-MM-YYYY'));
            setValue('customerId', milk.customerId);

            setMilkType(milk.milkType);
            setDate(milk.date);
            setCustomerId(milk.customerId);
        }
    }, [milk])

    const handleDate = (momentInstance) => {
        const formattedDate = momentInstance.format('DD-MM-YYYY');
        setValue('date', formattedDate);
        setDate(momentInstance);
    }

    const handleMilkType = option => {
        const value = option.target.value;
        setValue('milkRate', MILK_RATES[value]);
        setValue('milkType', value);
        setMilkType(value);
    }

    const handleCustomerId = option => {
        const value = option.target.value;
        setValue('customerId', value);
        setCustomerId(value);
    }

    const saveMilkData = (data) => {
        const { date, ...other } = data;
        other.milkPrice = calculateMilkPrice(other);

        if (mode === 'edit') {
            return firebase.milks().child(date).child(uid).update(other)
                .then(() => [other, date, uid]);
        } else {
            let key = firebase.milks().child(date).push().key;
            return firebase.milks().child(date).child(key).set(other)
                .then(() => [other, date, key]);
        }
    }

    const calculateMilkPrice = (milk) => {
        const cream = milk.milkQuantity * milk.milkFat;
        return (cream * milk.milkRate / 10).toFixed(2);
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
                    name="customerId"
                    value={customerId}
                    onChange={handleCustomerId}
                    error={!!errors.customerId}
                    errorMessage={ErrorGenerator.getErrorMessage(errors, 'customerId')}
                >
                    {customers.map(customer =>
                        <MenuItem key={customer.uid} value={customer.uid}>{customer.customerName}</MenuItem>
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
                </MySelect>

                <MyDatePicker
                    label="Date"
                    name="date"
                    value={date}
                    disabled={mode === 'edit'}
                    onChange={handleDate}
                />

                <MyInput
                    type="number"
                    name="milkRate"
                    label="Milk Rate"
                    style={{ width: '100%' }}
                    inputRef={register}
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
    onSetMilk: (milk, date, uid) => dispatch({ type: ACTIONS.MILK_SET, milk, date, uid }),
})

export default compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(MilkForm);