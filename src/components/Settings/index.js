
import React from 'react';
import { Typography } from '@material-ui/core';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { firestoreConnect, isLoaded } from 'react-redux-firebase'

import { withAuthorization } from '../Session';
import { MyForm, MyInput } from '../../core';
import { ErrorGenerator } from '../../utilty';
import { addSettings, updateSettings } from '../../actions/settings';
import * as ROLES from '../../constants/roles';

const Settings = ({ settings, addSettings, updateSettings }) => {
    const setting = settings && settings[0];
    const { register, handleSubmit, errors, setValue } = useForm();

    React.useEffect(() => {
        if (setting) {
            setValue('milkRate', setting.milkRate);
            setValue('milkSNF', setting.milkSNF);
        }
    }, [setting]);

    const onSubmit = (data) => {
        if (setting) {
            updateSettings(data, setting.id);
        } else {
            addSettings(data);
        }
    }

    return (
        <>
            <Typography variant="h4" align="center">
                App Settings
            </Typography>
            {isLoaded(settings) &&
                <MyForm onSubmit={handleSubmit(onSubmit)}>
                    <MyInput
                        required
                        type="number"
                        name="milkRate"
                        label="Milk Rate"
                        style={{ width: '100%' }}
                        inputRef={register({ required: true })}
                        error={!!errors.milkRate}
                        helperText={ErrorGenerator.getErrorMessage(errors, 'milkRate')}
                    />

                    <MyInput
                        required
                        type="number"
                        name="milkSNF"
                        label="Milk SNF"
                        style={{ width: '100%' }}
                        inputRef={register({ required: true })}
                        error={!!errors.milkSNF}
                        helperText={ErrorGenerator.getErrorMessage(errors, 'milkSNF')}
                    />
                </MyForm>
            }
        </>
    )
}

const mapStateToProps = state => ({
    settings: state.firestore.ordered.settings
})

const mapDispatchToProps = dispatch => ({
    addSettings: (settings) => dispatch(addSettings(settings)),
    updateSettings: (settings, id) => dispatch(updateSettings(settings, id)),
})

const condition = auth => {
    return auth.role === ROLES.ADMIN || auth.role === ROLES.SUPER_ADMIN;
}

export default compose(
    withAuthorization(condition),
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'settings', },
    ])
)(Settings);