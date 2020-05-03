
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    MenuItem, FormControlLabel,
    FormControl, FormLabel, RadioGroup, Radio
} from '@material-ui/core';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import moment from 'moment';

import { MyForm, MyInput, MySelect, MyDatePicker } from '../../../core';
import { ErrorGenerator } from '../../../utilty';
import * as ROUTES from '../../../constants/routes';
import { addMilk, updateMilk } from '../../../actions/milk';

const MilkForm = ({ milk, customers, addMilk, updateMilk, id, }) => {
    const { register, handleSubmit, errors, setValue } = useForm({
        defaultValues: { ...milk }
    });
    const history = useHistory();
    const [milkType, setMilkType] = React.useState('BM');
    const [date, setDate] = React.useState(moment());
    const [customerId, setCustomerId] = React.useState('');

    React.useEffect(() => {
        register({ name: "milkType" });
        register({ name: "date" });
        register({ name: "customerId" }, { required: true });
    }, [register]);

    React.useEffect(() => {
        if (Object.keys(milk).length) {
            setValue('milkType', milk.milkType);
            setValue('date', milk.date);
            setValue('customerId', milk.customerId);

            setMilkType(milk.milkType);
            setDate(moment(milk.date, 'DD-MM-YYYY'));
            setCustomerId(milk.customerId);
        }
    }, [milk])

    const handleDate = (momentInstance) => {;
        setValue('date', momentInstance.format('DD-MM-YYYY'));
        setDate(momentInstance);
    }

    const handleMilkType = option => {
        const value = option.target.value;
        setValue('milkType', value);
        setMilkType(value);
    }

    const handleCustomerId = option => {
        const value = option.target.value;
        setValue('customerId', value);
        setCustomerId(value);
    }

    const calculateMilkPrice = (milk) => {
        if (milk.milkType === 'BM') {
            return calculateBMPrice(milk);
        } else {
            return calculateCMPrice(milk);
        }

    }

    const calculateCMPrice = (milk) => {

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
        data.milkPrice = calculateMilkPrice(data);
        if (id) {
            updateMilk(data, id);
        } else {
            addMilk(data);
        }
        history.push(ROUTES.MILK_URLS.milk);
    }

    return (
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
                {(customers && customers.length) && customers.map(customer =>
                    <MenuItem key={customer.id} value={customer.id}>{customer.customerName}</MenuItem>
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
    );
}

const mapStateToProps = state => ({
    customers: state.firestore.ordered.customers,
})
const mapDispatchToProps = dispatch => ({
    addMilk: (milk) => dispatch(addMilk(milk)),
    updateMilk: (milk, id) => dispatch(updateMilk(milk, id)),
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'milks' },
        { collection: 'customers' }
    ])
)(MilkForm);