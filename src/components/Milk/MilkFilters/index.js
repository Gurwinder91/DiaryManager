import React from 'react';
import { MenuItem } from '@material-ui/core';
import moment from 'moment';

import { MyDatePicker, MySelect } from '../../../core';
import useStyles from './style';

export default ({date, time, setTime, setDate}) => {
    const classes = useStyles();
 
    return (
        <div className={classes.root}>
            <MyDatePicker
                width={40}
                name="date"
                value={date}
                onChange={setDate}
            />
            <MySelect
                name="time"
                className={classes.mySelect}
                fullWidth={false}
                value={time}
                onChange={(event) => setTime(event.target.value)}
            >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Morning">Morning</MenuItem>
                <MenuItem value="Evening">Evening</MenuItem>
            </MySelect>
        </div>
    )
}