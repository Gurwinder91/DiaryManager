import React from "react";
import { withRouter } from 'react-router-dom';
import { Select, MenuItem, Switch, FormControlLabel } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form'

import { withFirebase } from '../../Firebase';
import { MyForm, MyInput } from '../../../core';
import * as ROUTES from '../../../constants/routes';
import * as ACTIONS from '../../../actions';

const CustomerForm = ({ customer, firebase, history, onCustomerChange, uid }) => {
    const { register, handleSubmit, errors, watch, setValue } = useForm();
    const [milkType, setMilkType] = React.useState('BM');
    const [dateofbirth, setDateofbirth] = React.useState(Date.now());
    const [registeredDate, setRegisteredDate] = React.useState(Date.now());

    const handleMilkType = option => {
        const value = option.target.value;
        setValue("milkType", value);
        setMilkType(value);
    }

    const handleDate = (name, date) => {
        const milliSeconds = date.getTime();
        setValue(name, milliSeconds);
        if (name === 'dateofbirth')
            setDateofbirth(milliSeconds);
        else
            setRegisteredDate(milliSeconds);
    }

    const updateValues = () => {
        setValue('milkType', customer.milkType);
        setValue('dateofbirth', customer.dateofbirth);
        setValue('registeredDate', customer.registeredDate);

        setMilkType(customer.milkType);
        setDateofbirth(customer.dateofbirth);
        setRegisteredDate(customer.registeredDate);
    }

    React.useEffect(() => {
        register({ name: "milkType" });
        register({ name: "dateofbirth" });
        register({ name: "registeredDate" });
        console.log(register({ name: "milkType" }));
        updateValues();
    }, [register])

    const saveCustomer = (data) => {
        data.customerName = data.customerName.charAt(0).toUpperCase() + data.customerName.slice(1);
        let promise;
        let key;
        if (uid) {
            key = uid;
            promise = firebase.customers().child(key).update(data);

        } else {
            key = firebase.customers().push().key;
            promise = firebase.customers().child(key).set(data);
        }
        return promise.then(() => key);
    }

    const onSubmit = (data) => {
        saveCustomer(data)
            .then((key) => {
                return onCustomerChange(data, key);
            })
            .then(() => history.push(ROUTES.CUSTOMER_URLS.customer))
            .catch(console.log);
    }

    return (
        <MyForm onSubmit={handleSubmit(onSubmit)}>
            <MyInput
                required
                name="customerName"
                label="Customer Name"
                style={{ width: '100%' }}
                defaultValue={customer.customerName}
                inputRef={register({ required: true })}
                error={!!errors.customerName}
                helperText={errors.customerName && 'This field is required'}
            />

            <MyInput
                type="number"
                required
                name="phoneNumber"
                label="Phone Number"
                style={{ width: '100%' }}
                defaultValue={customer.phoneNumber}
                inputRef={register({ required: true })}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber && 'This field is required'}
            />

            <MyInput
                required
                name="address"
                label="Address"
                style={{ width: '100%' }}
                defaultValue={customer.address}
                inputRef={register({ required: true })}
                error={!!errors.address}
                helperText={errors.address && 'This field is required'}
            />

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
                    label="Date of Registration"
                    name="registeredDate"
                    format="MM/dd/yyyy"
                    value={registeredDate}
                    onChange={handleDate.bind(this, 'registeredDate')}
                />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    disableFuture
                    autoOk
                    style={{ width: '100%' }}
                    label="Date of Birth"
                    name="dateofbirth"
                    format="MM/dd/yyyy"
                    value={dateofbirth}
                    onChange={handleDate.bind(this, 'dateofbirth')}
                />
            </MuiPickersUtilsProvider>

            <FormControlLabel
                control={<Switch
                    inputRef={register}
                    name="mode"
                    defaultValue={customer.mode}
                />}
                label={watch('mode') ? "Sell milk from home" : "Sell milk in diary"}
            />
        </MyForm>
    );
}

const mapDispatchToProps = dispatch => ({
    onCustomerChange: (customer, uid) => dispatch({ type: ACTIONS.CUSTOMER_SET, customer, uid })
});

export default compose(
    withRouter,
    withFirebase,
    connect(null, mapDispatchToProps),
)(CustomerForm);