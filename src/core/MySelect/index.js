import React from 'react';
import { FormControl, InputLabel, FormHelperText, Select } from '@material-ui/core';

export default ({ errorMessage, className, required, error, children, labelName, fullWidth = true,  ...others }) => {
    return (
        <FormControl fullWidth={fullWidth} error={error} required={required} className={className}>
            <InputLabel id={others.labelId}>{labelName}</InputLabel>
            <Select
                {...others}
            >
                {children}
            </Select>
            <FormHelperText>{errorMessage}</FormHelperText>
        </FormControl>
    )
}