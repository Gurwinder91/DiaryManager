
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

const MilkForm = ({ milk, customers, firebase, history, mode, onSetMilk, uid, onSetCustomers }) => {
    const { register, handleSubmit, errors, setValue } = useForm({
        defaultValues: { ...milk }
    });
    const [milkType, setMilkType] = React.useState('BM');
    const [date, setDate] = React.useState(moment());
    const [customerId, setCustomerId] = React.useState('');
    const [displaySNF, setDisplaySNF] = React.useState(false);

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

            if (milk.milkType === 'CM') {
                setDisplaySNF(true);
            }
            setMilkType(milk.milkType);
            setDate(milk.date);
            setCustomerId(milk.customerId);
        }
    }, [milk])

    React.useEffect(() => {
        firebase.customers().on('value', snapshot => {
            onSetCustomers(snapshot.val())
        });

        return () => firebase.customers().off();
    }, [firebase])

    const handleDate = (momentInstance) => {
        const formattedDate = momentInstance.format('DD-MM-YYYY');
        setValue('date', formattedDate);
        setDate(momentInstance);
    }

    const handleMilkType = option => {
        const value = option.target.value;
        if (value === 'CM') {
            setDisplaySNF(true);
        }
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
        if (milk.milkType === 'BM') {
            return calculateBMPrice(milk);
        } else {
            return calculateCMPrice(milk);
        }

    }

    const calculateCMPrice = (milk) => {
        console.log(milk);
        const milkRate = Number(milk.milkRate);
        const powderRate = (milkRate / 3) * Number(milk.milkSNF);
        const gheeRate = (milkRate / 2) * Number(milk.milkFat);
        const rate = (gheeRate + powderRate) / 10;
        return (Number(milk.milkQuantity) * rate).toFixed(2);
    }

    const calculateBMPrice = (milk) => {
        const cream = Number(milk.milkQuantity) * Number(milk.milkFat);
        return (cream * Number(milk.milkRate) / 10).toFixed(2);
    }

    const onSubmit = (data) => {
        saveMilkData(data)
            .then((output) => {
                return onSetMilk(output[0], output[1], output[2]);
            })
            .then(() => {
                history.push(ROUTES.MILK_URLS.milk)
            })
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
                    inputRef={register({ required: true })}
                    error={!!errors.milkRate}
                    helperText={ErrorGenerator.getErrorMessage(errors, 'milkRate')}
                />

                {
                    displaySNF ?
                        <MyInput
                            type="number"
                            name="milkSNF"
                            label="Milk SNF"
                            style={{ width: '100%' }}
                            inputRef={register({ required: true })}
                            error={!!errors.milkSNF}
                            helperText={ErrorGenerator.getErrorMessage(errors, 'milkSNF')}
                        />
                        : null
                }

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
                                value: /^\d*\.?\d$/,
                                message: 'Only numbers and one digit after decimal are allowed'
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
                                value: /^[1-9]\d{0,1}(\.\d{0,1})?$/,
                                message: 'Only numbers and one digit after decimal are allowed'
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
    onSetCustomers: (customers) => dispatch({ type: ACTIONS.CUSTOMERS_SET, customers }),
})

export default compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(MilkForm);