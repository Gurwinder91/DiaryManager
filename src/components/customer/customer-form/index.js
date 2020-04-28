import React from "react";
import { withRouter } from 'react-router-dom';
import { MenuItem, Switch, FormControlLabel } from '@material-ui/core';
import moment from "moment";
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form'

import { withFirebase } from '../../Firebase';
import { MyForm, MyInput, MySelect, MyDatePicker } from '../../../core';
import * as ROUTES from '../../../constants/routes';
import * as ACTIONS from '../../../actions';
import { ErrorGenerator } from '../../../utilty';

const CustomerForm = ({ customer, firebase, history, onCustomerChange, uid, showSnackbar }) => {
    const { register, handleSubmit, errors, watch, setValue } = useForm({
        defaultValues: {
            ...customer
        }
    });
    const [milkType, setMilkType] = React.useState('BM');
    const [registeredDate, setRegisteredDate] = React.useState(Date.now());
    const [mode, setMode] = React.useState(false);

    React.useEffect(() => {
        register({ name: "milkType" });
        register({ name: "registeredDate" });
        register({ name: "mode" });
    }, [register]);

    React.useEffect(() => {
        if (Object.keys(customer || {}).length) {
            setValue('milkType', customer.milkType);
            setValue('registeredDate', customer.registeredDate);
            setValue('mode', customer.mode);

            setMode(customer.mode);
            setMilkType(customer.milkType);
            setRegisteredDate(moment(customer.registeredDate, 'DD-MM-YYYY'));
        }

    }, [customer]);


    const handleMilkType = option => {
        const value = option.target.value;
        setValue("milkType", value);
        setMilkType(value);
    }

    const handleDate = (momentInstance) => {
        const formattedDate = momentInstance.format('DD-MM-YYYY');
        setValue('registeredDate', formattedDate);
        setRegisteredDate(momentInstance);
    }

    const modeHandler = (event) => {
        const value = event.target.checked;
        setValue("mode", value);
        setMode(value);
    }

    const saveCustomer = (data) => {
        data.customerName = captializeFirstLetter(data.customerName);
        if (uid) {
            return firebase.customers().child(uid).update(data)
                .then(() => uid);

        } else {
            const key = firebase.customers().push().key;
            return firebase.customers().child(key).set(data)
                .then(() => key);
        }
    }

    const captializeFirstLetter = (custName) => {
        const arr = (custName || '').split(' ');
        for (let key in arr) {
            arr[key] = arr[key].charAt(0).toUpperCase() + arr[key].slice(1);
        }
        return arr.join(' ');
    }

    const onSubmit = (data) => {
        saveCustomer(data)
            .then((key) => {
                return onCustomerChange(data, key);
            })
            .then(() => {
                showSnackbar(`Customer ${uid ? 'updated' : 'added'} successfully`, 'success');
                history.push(ROUTES.CUSTOMER_URLS.customer);
            })
            .catch(err => showSnackbar(err.message || err.errors.message, 'error'));
    }

    return (
            <MyForm onSubmit={handleSubmit(onSubmit)}>
                <MyInput
                    required
                    name="customerName"
                    label="Customer Name"
                    style={{ width: '100%' }}
                    inputRef={
                        register({
                            required: true,
                            pattern: {
                                value: /^[A-Za-z ']*$/,
                                message: 'This field is not valid'
                            }
                        })
                    }
                    error={!!errors.customerName}
                    helperText={ErrorGenerator.getErrorMessage(errors, 'customerName')}
                />

                <MyInput
                    type="number"
                    required
                    name="phoneNumber"
                    label="Phone Number"
                    style={{ width: '100%' }}
                    inputRef={
                        register({
                            required: true,
                            pattern: {
                                value: /^\d*$/,
                                message: 'Only numbers are allowed'
                            },
                            minLength: {
                                value: 10,
                                message: 'Not less then 10 digits'
                            },
                            maxLength: {
                                value: 10,
                                message: 'Not more then 10 digits'
                            },
                        })
                    }
                    error={!!errors.phoneNumber}
                    helperText={ErrorGenerator.getErrorMessage(errors, 'phoneNumber')}
                />

                <MyInput
                    required
                    name="address"
                    label="Address"
                    style={{ width: '100%' }}
                    inputRef={register({ required: true })}
                    error={!!errors.address}
                    helperText={ErrorGenerator.getErrorMessage(errors, 'address')}
                />

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
                    label="Date of Registration"
                    name="registeredDate"
                    value={registeredDate}
                    onChange={handleDate}
                />

                <FormControlLabel
                    control={<Switch
                        name="mode"
                        checked={mode}
                        onChange={modeHandler}
                    />}
                    label={watch('mode') ? "Sell milk from home" : "Sell milk in diary"}
                />
            </MyForm>
    );
}

const mapDispatchToProps = dispatch => ({
    onCustomerChange: (customer, uid) => dispatch({ type: ACTIONS.CUSTOMER_SET, customer, uid }),
    showSnackbar: (message, severity) => dispatch({ type: ACTIONS.SHOW_SNACKBAR, message, severity })
});

export default compose(
    withRouter,
    withFirebase,
    connect(null, mapDispatchToProps),
)(CustomerForm);