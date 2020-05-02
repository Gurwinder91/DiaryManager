import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import moment from "moment";
import { Divider, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@material-ui/core';

import useStyles from './style';
import { ActionIcon, MyConfirmDialog } from '../../../core';
import * as ROUTES from '../../../constants/routes';
import { removeCustomer } from '../../../actions/customer';

const CustomerList = ({ customers, onRemoveCustomer }) => {
    const classes = useStyles();
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const [dialogValue, setDialogValue] = React.useState('');

    const removeCustomer = (id) => {
        onRemoveCustomer(id);
    }

    const onMenuclosed = (customer, actionType) => {
        switch (actionType) {
            case 'delete':
                setOpen(true);
                setDialogValue(customer);
                break;
            case 'edit':
                history.push(`${ROUTES.CUSTOMER_URLS.customer}${ROUTES.CUSTOMER_URLS.edit}${customer.id}`, { childRoute: true });
                break;
            default:
                break;
        }
    }

    const dialogClosedHandler = (output) => {
        setOpen(false);
        if (output) {
            removeCustomer(output.id);
        }
    }

    return (
        <>
            {customers.map(customer =>
                <Fragment key={customer.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="No Image" src={customer.image}
                                className={classes.largeAvatar} >
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText className={classes.listItemText}
                            primary={
                                <Typography
                                    component="span"
                                    variant="h6"
                                    color="textPrimary"
                                >
                                    {`${customer.customerName}`}
                                </Typography>
                            }
                            secondary={`+91 ${customer.phoneNumber}, ${moment(customer.registeredDate).format('DD-MM-YYYY')}`}
                        />
                        <ActionIcon whenMenuClosed={onMenuclosed.bind(this, customer)} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </Fragment>
            )}
            <MyConfirmDialog
                onDialogClose={dialogClosedHandler}
                data={dialogValue}
                open={open}>
            </MyConfirmDialog>
        </>
    )
}



const mapDispatchToProps = dispatch => ({
    onRemoveCustomer: (id) => dispatch(removeCustomer(id)),
})

export default compose(
    connect(
        null,
        mapDispatchToProps)
)(CustomerList);



