import React from "react";
import { withRouter, useHistory } from 'react-router-dom';
import {  Switch, FormControlLabel } from '@material-ui/core';
import moment from "moment";
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form'

import { MyForm, MyInput } from '../../../core';
import * as ROUTES from '../../../constants/routes';
import { createCustomer, updateCustomer } from '../../../actions/customer';
import { ErrorGenerator } from '../../../utilty';

const CustomerForm = ({ customer, updateCustomer, addCustomer, id }) => {
    const history = useHistory();
    const { register, handleSubmit, errors, watch, setValue } = useForm({
        defaultValues: {
            ...customer
        }
    });
    const [mode, setMode] = React.useState(false);

    React.useEffect(() => {
        register({ name: "mode" });
    }, [register]);

    React.useEffect(() => {
        if (Object.keys(customer || {}).length) {
            setValue('mode', customer.mode);
            setMode(customer.mode);
        }

    }, [customer]);

    const modeHandler = (event) => {
        const value = event.target.checked;
        setValue("mode", value);
        setMode(value);
    }

    const captializeFirstLetter = (custName) => {
        const arr = (custName || '').split(' ');
        for (let key in arr) {
            arr[key] = arr[key].charAt(0).toUpperCase() + arr[key].slice(1);
        }
        return arr.join(' ');
    }

    const onSubmit = (data) => {
        data.customerName = captializeFirstLetter(data.customerName);
        data.registeredDate = moment().valueOf();
        if(id){
            updateCustomer(data, id);
        }else{
            addCustomer(data);
        }
        history.push(ROUTES.CUSTOMER_URLS.customer);
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
    addCustomer: (customer) => dispatch(createCustomer(customer)),
    updateCustomer: (customer, id) => dispatch(updateCustomer(customer, id)),
});

export default compose(
    withRouter,
    connect(null, mapDispatchToProps),
)(CustomerForm);