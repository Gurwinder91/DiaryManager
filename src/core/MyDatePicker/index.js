
import React from 'react';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import moment from "moment";
import MomentUtils from '@date-io/moment';

export default ({ width = 100, ...others }) => {
    return (
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
            <DatePicker
                disableFuture
                autoOk
                style={{ width: `${width}%` }}
                format="LL"
                {...others}
            />
        </MuiPickersUtilsProvider>
    );
}